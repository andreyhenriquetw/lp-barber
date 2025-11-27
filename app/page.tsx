import Image from "next/image"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"

const Home = () => {
  return (
    <div>
      {/* HEADER */}
      <Header />

      {/* Banner logo */}
      <div className="relative mt-1 h-[500px] w-full">
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

      {/* DIV P-5 */}
      <div className="p-5">
        {/* AGENDAMENTO */}

        <Card>
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
    </div>
  )
}

export default Home
