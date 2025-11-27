import Header from "./_components/header"

import { Card, CardContent } from "./_components/ui/card"

import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"

import BarbershopImageItem from "./_components/barbershop-image-item"
import BookingItem from "./_components/booking-item"

const Home = async () => {
  //  CHAMAR BANCO DE DADOS
  const barbershops = await db.barbershop.findMany({})

  return (
    <div>
      {/* HEADER */}
      <Header />

      {/* SEARCH BUSCA RAPIDA */}

      {/* 
      <div className="mt-3 flex gap-3 overflow-x-scroll px-3 [&::-webkit-scrollbar]:hidden">
        {quickSearchOptions.map((option) => (
          <Button
            className="gap-1 px-3 py-1.5 text-sm"
            variant="secondary"
            key={option.title}
          >
            <Image
              src={option.imageUrl}
              width={16}
              height={16}
              alt={option.title}
            />
            {option.title}
          </Button>
        ))}
      </div>

      */}
      {/* Banner logo + BOTAO */}
      {barbershops.map((barbershop) => (
        <BarbershopItem key={barbershop.id} barbershop={barbershop} />
      ))}

      {/* AGENDAMNTOS - DIV P-5  */}
      <BookingItem />

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
