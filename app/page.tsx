import Header from "./_components/header"

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
    </div>
  )
}

export default Home
