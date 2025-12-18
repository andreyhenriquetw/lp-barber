"use client"

import { BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Sheet, SheetClose, SheetContent, SheetTitle } from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useMemo, useState } from "react"
import { isPast, set } from "date-fns"
import { createBooking } from "../_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { getBookings } from "../_actions/get-bookings"
import { Dialog, DialogContent } from "./ui/dialog"
import SignInDialog from "./sign-in-dialog"
import BookingSummary from "./booking-summary"
import { useRouter } from "next/navigation"

interface ServiceItemProps {
  service: BarbershopService
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
]

const today = new Date()
today.setHours(0, 0, 0, 0)

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])

    const timeIsOnThePast = isPast(set(new Date(), { hours: hour, minutes }))
    if (timeIsOnThePast && isPast(selectedDay)) {
      return false
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )

    if (hasBookingOnCurrentTime) {
      return false
    }

    return true
  })
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  const { data } = useSession()
  const router = useRouter()
  const [signInDiaLogIsOpen, setSignInDialogIsOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string | undefined>()
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    fetch()
  }, [selectedDay, service.id])

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) return
    return set(selectedDay, {
      hours: Number(selectedTime?.split(":")[0]),
      minutes: Number(selectedTime?.split(":")[1]),
    })
  }, [selectedDay, selectedTime])

  const handleBookingClick = () => {
    if (data?.user) {
      setBookingSheetIsOpen(true)
    } else {
      setSignInDialogIsOpen(true)
    }
  }

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string | undefined) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDate) return

      await createBooking({
        serviceId: service.id,
        date: selectedDate,
      })

      handleBookingSheetOpenChange()
      toast.success("Reserva criada com sucesso!", {
        action: {
          label: "Ver agendamentos",
          onClick: () => router.push("/bookings"),
        },
      })
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar reserva!")
    }
  }

  const timeList = useMemo(() => {
    if (!selectedDay) return []
    return getTimeList({
      bookings: dayBookings,
      selectedDay,
    })
  }, [dayBookings, selectedDay])

  return (
    <>
      <Card className="py-3">
        <CardContent className="flex items-center gap-3 px-3">
          <div className="relative h-[110px] w-[110px]">
            <Image
              alt={service.name}
              src={service.imageUrl}
              fill
              className="rounded-xl object-cover"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-[#FFD700]">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <SheetContent className="flex max-h-[100dvh] w-[80%] flex-col p-0">
                  <div className="overflow-y-auto px-3 pb-24 [-webkit-overflow-scrolling:touch]">
                    <SheetTitle className="mt-2 text-center font-bold text-[#FFD700]">
                      Fazer reserva
                    </SheetTitle>

                    <div className="mt-1 border-b pb-3">
                      <Calendar
                        className="w-full overflow-hidden"
                        mode="single"
                        locale={ptBR}
                        buttonVariant="outline"
                        selected={selectedDay}
                        onSelect={handleDateSelect}
                        disabled={(date) => date < today}
                      />
                    </div>

                    {selectedDay && (
                      <div className="mt-4 flex gap-2 overflow-x-auto border-b pb-3 [&::-webkit-scrollbar]:hidden">
                        {timeList.length > 0 ? (
                          timeList.map((time) => (
                            <Button
                              key={time}
                              variant={
                                selectedTime === time ? "default" : "outline"
                              }
                              className="rounded-full"
                              onClick={() => handleTimeSelect(time)}
                            >
                              {time}
                            </Button>
                          ))
                        ) : (
                          <p className="text-xs">
                            Não há horários disponíveis para este dia.
                          </p>
                        )}
                      </div>
                    )}

                    {selectedDate && (
                      <div className="mt-4">
                        <BookingSummary
                          service={service}
                          selectedDate={selectedDate}
                        />
                      </div>
                    )}

                    <div className="mt-5">
                      <SheetClose asChild>
                        <Button
                          className="w-full"
                          onClick={handleCreateBooking}
                          disabled={!selectedDay || !selectedTime}
                        >
                          Confirmar
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDiaLogIsOpen}
        onOpenChange={(open) => setSignInDialogIsOpen(open)}
      >
        <DialogContent>
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ServiceItem
