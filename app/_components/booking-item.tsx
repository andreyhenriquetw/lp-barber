import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

const BookingItem = () => {
  return (
    <>
      <div className="p-5">
        {/* AGENDAMENTO */}
        <h2 className="text-xs font-bold text-gray-400 uppercase">
          Agendamentos
        </h2>

        <Card className="mt-4">
          <CardContent className="-m-2 flex justify-between p-0">
            {/* ESQUERDA */}
            <div className="flex flex-col gap-2 pl-6">
              <Badge>Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://cultura.uol.com.br/webstories/2023/05/como-garantir-uma-barba-bem-feita/assets/5.jpeg" />
                </Avatar>
                <p className="text-sm">LP Barbearia</p>
              </div>
            </div>

            {/* DIREITA */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-6">
              <p className="text-sm">Novembro</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">12:12</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default BookingItem
