import { format } from "date-fns"
import { Card, CardContent } from "./ui/card"
import { BarbershopService } from "@prisma/client"
import { ptBR } from "date-fns/locale"

interface BookingSummaryProps {
  service: Pick<BarbershopService, "name" | "price">
  selectedDate: Date
}

const BookingSummary = ({ service, selectedDate }: BookingSummaryProps) => {
  return (
    <Card className="p-2">
      <CardContent className="flex flex-col gap-1 p-0">
        <div className="flex justify-between font-bold">
          <h2>{service.name}</h2>
          <p className="text-[#FFD700]">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(service.price))}
          </p>
        </div>

        <div className="flex justify-between text-sm">
          <h2 className="text-gray-400">Data</h2>
          <p className="text-[#FFD700]">
            {format(selectedDate, "d 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="flex justify-between text-sm">
          <h2 className="text-gray-400">Horário</h2>
          <p className="text-[#FFD700]">{format(selectedDate, "HH:mm")}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingSummary
