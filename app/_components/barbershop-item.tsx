import Image from "next/image"
import { Button } from "./ui/button"
import { Barbershop } from "@prisma/client"

interface BarberShopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarberShopItemProps) => {
  return (
    <div className="relative mt-1 h-[500px] w-full">
      {/* IMAGEM */}
      <Image
        alt="Agende com LP Barber"
        src="/logolpofc.jpg"
        fill
        className="rounded-xl object-cover"
      />

      {/* BOTAO AGENDAR */}
      <Button
        className="btn-entrando shine-button"
        style={{
          position: "absolute",
          right: "14px",
          bottom: "33px",
          padding: "12px 20px",
          borderRadius: "12px",
          color: "#FFD700",
          fontSize: "14px",
          fontWeight: 600,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
          border: "1.5px solid #FFD700",
          cursor: "pointer",
          transition: "all 0.2s ease",
          background: "#000000",
          overflow: "hidden",
        }}
      >
        AGENDAR AGORA
      </Button>
    </div>
  )
}

export default BarbershopItem
