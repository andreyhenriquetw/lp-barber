// app/barbershops/[id]/page.tsx
import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  // Next.js 13: params é uma Promise, então use await
  const { id } = await params

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: id, // agora id existe
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      {/* IMAGEM */}
      <div className="relative h-[297px] w-full">
        <Image
          alt={barbershop.name}
          src={barbershop?.imageUrl}
          fill
          className="object-cover"
        />
        {/* BOTÃO DA IMAGE */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 left-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4"
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="border-b border-solid p-5">
        {/* IMAGEM + NOME LADO A LADO */}
        <div className="mb-3 flex items-center gap-2">
          <div className="relative size-[35px] shrink-0 overflow-hidden rounded-full">
            <Image
              src="/logolp.png"
              alt={barbershop.name}
              fill
              className="object-cover"
            />
          </div>

          <h1 className="text-xl font-semibold">{barbershop.name}</h1>
        </div>

        {/* ENDEREÇO */}
        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-[#FFD700]" size={18} />
          <p className="text-sm text-gray-400">{barbershop?.address}</p>
        </div>

        {/* AVALIAÇÃO */}
        <div className="flex items-center gap-2">
          <StarIcon className="fill-amber-400 text-[#FFD700]" size={18} />
          <p className="text-sm text-gray-400">4,8 (297 Avaliações)</p>
        </div>
      </div>

      {/* DESCRIÇÃO */}

      {/* 
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase">Sobre nós</h2>
        <p className="text-justify text-sm">{barbershop?.description}</p>
      </div>
      */}

      {/* SERVICEITEM */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase">Serviços</h2>
        <div className="space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* CONTATO */}

      <div className="space-y-4 p-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase">Contato</h2>
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopPage
