import Header from "./_components/header"

import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"

import BarbershopImageItem from "./_components/barbershop-image-item"

const Home = async () => {
  //  CHAMAR BANCO DE DADOS
  const barbershops = await db.barbershop.findMany({})

  return (
    <div>
      {/* HEADER */}
      <Header />

      {/*
     
        <div className="mt-3 flex gap-3 overflow-x-scroll px-3 [&::-webkit-scrollbar]:hidden">
        <Button className="gap-1 px-3 py-1.5 text-sm" variant="secondary">
          <Image src="/cabeloo.svg" width={16} height={16} alt="Cabelo" />
          Cabelo
        </Button>

        <Button className="gap-1 px-3 py-1.5 text-sm" variant="secondary">
          <Image src="/barbaicone.svg" width={16} height={16} alt="Barba" />
          Barba
        </Button>

        <Button className="gap-1 px-3 py-1.5 text-sm" variant="secondary">
          <Image
            src="/acabamentoo.svg"
            width={16}
            height={16}
            alt="Acabamento"
          />
          Acabamento
        </Button>

        <Button className="gap-1 px-3 py-1.5 text-sm" variant="secondary">
          <Image src="/barbaicone.svg" width={16} height={16} alt="Barba" />
          Barba
        </Button>
      </div>
     
     */}

      {/* Banner logo + BOTAO */}
      {barbershops.map((barbershop) => (
        <BarbershopItem key={barbershop.id} barbershop={barbershop} />
      ))}

      {/* DIV P-5 */}
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

      {/* TEXT SERVIÇOS AND IMAGE, PREÇOS + BOTÃO */}

      {barbershops.map((barbershop) => (
        <BarbershopImageItem key={barbershop.id} barbershop={barbershop} />
      ))}

      {/* FOOTER COM CARD */}
      <footer>
        <Card className="mt-5 border-none shadow-none">
          <CardContent className="flex flex-col items-center gap-1 text-center">
            <h4 className="text-sm font-semibold text-gray-500">
              © 2025 LP Barbearia
            </h4>
            <p className="text-xs text-gray-400">
              Todos os direitos reservados
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}

export default Home
