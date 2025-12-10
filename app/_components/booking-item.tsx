import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { isFuture, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import PhoneItem from "./phone-item"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date)

  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Card className="mt-3 min-w-[90%]">
          <CardContent className="-m-2 flex justify-between p-0">
            {/* ESQUERDA */}
            <div className="flex flex-col gap-2 pl-6">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>

              <h3 className="font-semibold">{booking.service.name}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/logolp.png" />
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>

            {/* DIREITA */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-6">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="relative -mt-4 h-[180px] w-full px-3">
          <div className="relative h-full w-full overflow-hidden rounded-xl shadow-lg">
            <Image
              alt="Mapa da barbearia"
              src="/maplp.svg"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="px-3">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card className="mt-3 p-2">
            <CardContent className="flex flex-col space-y-1 p-0">
              <div className="flex items-center justify-between">
                <h2 className="pl-1 font-bold">{booking.service.name}</h2>
                <p className="text-[#FFD700]">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </p>
              </div>

              <div className="mt-1 flex items-center justify-between">
                <h2 className="pl-1 text-sm text-gray-400">Data</h2>
                <p className="text-sm text-[#FFD700]">
                  {format(booking.date, "d 'de' MMMM", { locale: ptBR })}
                </p>
              </div>

              <div className="mt-1 flex items-center justify-between">
                <h2 className="pl-1 text-sm text-gray-400">Horário</h2>
                <p className="text-sm text-[#FFD700]">
                  {format(booking.date, "HH:mm", { locale: ptBR })}
                </p>
              </div>

              <div className="mt-1 flex items-center justify-between">
                <h2 className="pl-1 text-sm text-gray-400">Barbeiro</h2>
                <p className="text-sm text-[#FFD700]">{booking.barber}</p>
              </div>
            </CardContent>
          </Card>

          {/* CORREÇÃO AQUI */}
          <div className="mt-6">
            {booking.service.barbershop.phones?.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
