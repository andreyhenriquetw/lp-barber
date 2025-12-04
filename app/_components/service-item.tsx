"use client"

import { BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { format, set } from "date-fns"
import { createBooking } from "../_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

interface ServiceItemProps {
  service: BarbershopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  const { data } = useSession()

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [selectedBarber, setSelectedBarber] = useState<string | undefined>(
    undefined,
  )

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string | undefined) => {
    setSelectedTime(time)
  }

  const handleBarberSelect = (barber: string | undefined) => {
    setSelectedBarber(barber)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime || !selectedBarber) return

      const hour = Number(selectedTime.split(":")[0])
      const minute = Number(selectedTime.split(":")[1])
      const newDate = set(selectedDay, {
        minutes: minute,
        hours: hour,
      })

      await createBooking({
        serviceId: service.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userId: (data?.user as any).id,
        date: newDate,
        barber: selectedBarber,
      })

      toast.success("Reserva criada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar reserva!")
    }
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

  const BARBER_LIST = ["Douglas", "Fernando", "Henrique"]

  return (
    <Card className="py-3">
      <CardContent className="flex items-center gap-3 px-3">
        <div className="relative max-h-[110px] min-h-[110px] max-w-[110px] min-w-[110px]">
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

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm">
                  Reservar
                </Button>
              </SheetTrigger>

              <SheetContent className="flex h-screen w-[80%] flex-col">
                <SheetTitle className="mt-3 text-center font-bold text-[#FFD700]">
                  Fazer reserva
                </SheetTitle>

                <div className="flex flex-col items-center justify-center overflow-y-auto border-b border-solid">
                  <Calendar
                    className="w-full max-w-full"
                    mode="single"
                    locale={ptBR}
                    buttonVariant="outline"
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                  />
                </div>

                {selectedDay && (
                  <div className="-mt-1 flex gap-2 overflow-x-auto border-b border-solid px-3 pb-4 [&::-webkit-scrollbar]:hidden">
                    {TIME_LIST.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                {/* --- BARBEIROS AQUI --- */}
                {selectedTime && selectedDay && (
                  <div className="-mt-2 items-center border-b border-solid px-3 pb-4">
                    <div className="mb-3 text-center font-semibold text-gray-400">
                      Selecione o Barbeiro
                    </div>

                    <div className="flex justify-center overflow-x-auto [&::-webkit-scrollbar]:hidden">
                      <div className="flex gap-2">
                        {BARBER_LIST.map((barber) => (
                          <Button
                            key={barber}
                            variant={
                              selectedBarber === barber ? "default" : "outline"
                            }
                            className="rounded-full px-4 py-1 text-xs"
                            onClick={() => handleBarberSelect(barber)}
                          >
                            {barber}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedTime && selectedDay && selectedBarber && (
                  <div className="px-4">
                    <Card className="p-2">
                      <CardContent className="flex flex-col space-y-1 p-0">
                        <div className="flex items-center justify-between">
                          <h2 className="pl-1 font-bold">{service.name}</h2>
                          <p className="text-[#FFD700]">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </p>
                        </div>

                        <div className="mt-1 flex items-center justify-between">
                          <h2 className="pl-1 text-sm text-gray-400">Data</h2>
                          <p className="text-sm text-[#FFD700]">
                            {format(selectedDay, "d 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>

                        <div className="mt-1 flex items-center justify-between">
                          <h2 className="pl-1 text-sm text-gray-400">
                            Horário
                          </h2>
                          <p className="text-sm text-[#FFD700]">
                            {selectedTime}
                          </p>
                        </div>

                        <div className="mt-1 flex items-center justify-between">
                          <h2 className="pl-1 text-sm text-gray-400">
                            Barbeiro
                          </h2>
                          <p className="text-sm text-[#FFD700]">
                            {selectedBarber}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <SheetFooter className="px-5">
                  <SheetClose asChild>
                    <Button
                      onClick={handleCreateBooking}
                      disabled={
                        !selectedDay || !selectedTime || !selectedBarber
                      }
                    >
                      Confirmar
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
