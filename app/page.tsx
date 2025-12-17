import Header from "./_components/header"

import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"

import BarbershopImageItem from "./_components/barbershop-image-item"
import BookingItem from "./_components/booking-item"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { getConfirmedBookings } from "./_data/get-confirmed-bookings"

const Home = async () => {
  await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const confirmedBookings = await getConfirmedBookings()
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

      {confirmedBookings.length > 0 && (
        <>
          <h2 className="mt-4 ml-3 text-xs font-bold text-gray-400 uppercase">
            Agendamentos
          </h2>

          {/* AGENDAMNTOS - DIV P-5  */}
          <div className="ml-3 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {confirmedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </div>
        </>
      )}

      {/* TEXT SERVIÇOS AND IMAGE, PREÇOS + BOTÃO */}
      <div className="mt-3">
        {barbershops.map((barbershop) => (
          <BarbershopImageItem key={barbershop.id} barbershop={barbershop} />
        ))}
      </div>

      {/* FOOTER COM CARD */}
    </div>
  )
}

export default Home
