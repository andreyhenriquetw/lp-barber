import Image from "next/image"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"

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
    </div>
  )
}

export default Home
