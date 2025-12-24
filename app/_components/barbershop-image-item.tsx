"use client"

import { useScrollReveal } from "@/app/_components/useScrollReveal"
import { Button } from "./ui/button"
import { Barbershop } from "@prisma/client"
import Link from "next/link"

interface BarberShopImageItemProps {
  barbershop: Barbershop
}

export default function BarbershopItem({
  barbershop,
}: BarberShopImageItemProps) {
  const titleRef = useScrollReveal()
  const listRef = useScrollReveal()

  return (
    <div className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-screen px-5 text-center shadow-sm md:px-10">
      <h2 className="mb-4 text-4xl font-bold text-[#FFD700]">Serviços</h2>

      <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
        Conheça nossa variedade de tratamentos, garantindo qualidade,
        profissionalismo e compromisso.
      </p>

      {/* IMAGEM E PREÇOS */}
      <div className="relative mt-5 h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl">
        <video
          src="/banerbar.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* OVERLAY */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-5 py-10 text-white md:px-16"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          {/* TÍTULO COM ANIMAÇÃO */}
          <h2
            ref={titleRef}
            className="reveal mb-7 text-center text-2xl font-extrabold tracking-wide md:text-4xl"
            style={{ fontFamily: '"Cinzel", serif' }}
          >
            QUAL SERÁ O PEDIDO PARA HOJE?
          </h2>

          {/* LISTA DE PREÇOS COM ANIMAÇÃO */}
          <div
            ref={listRef}
            className="reveal grid w-full max-w-4xl grid-cols-1 text-lg font-semibold text-white delay-200 md:grid-cols-2"
          >
            <div className="space-y-8">
              {[
                ["CORTE", "R$ 45,00"],
                ["BARBA", "R$ 45,00"],
                ["SOBRANCELHA", "R$ 15,00"],
                ["PIGMENTAÇÃO", "R$ 40,00"],
                ["HIDRATAÇÃO", "R$ 25,00"],
                ["SELAGEM", "R$ 80,00"],
              ].map(([name, price]) => (
                <div
                  key={name}
                  className="flex items-center justify-between border-b border-white/40 pb-2"
                >
                  <span>{name}</span>
                  <span>{price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTÃO */}
      <div className="mt-1 flex justify-center py-5">
        <Button
          className="btn-entrando shine-button"
          style={{
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
          asChild
        >
          <Link href={`/barbershops/${barbershop.id}`}>
            AGENDAR MEU HORÁRIO AGORA
          </Link>
        </Button>
      </div>
    </div>
  )
}
