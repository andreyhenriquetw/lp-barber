import Image from "next/image"

import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"

const SidebarSheet = () => {
  return (
    <SheetContent className="overflow-y-auto p-0">
      <div className="px-5 pt-5 pb-0">
        <SheetTitle className="text-left">Menu</SheetTitle>
      </div>

      <div className="flex items-center gap-3 border-b border-solid px-5 pt-0 pb-4">
        <Avatar>
          <AvatarImage src="https://img.freepik.com/fotos-premium/homem-das-cavernas-ou-retrato-3d-realista-neandertal_691560-1082.jpg" />
        </Avatar>

        <div>
          <p className="font-bold">Andrey Henrique</p>
          <p className="text-xs">Andreyhenriquetw3@gmail.com</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-b border-solid px-5 pt-0 pb-4">
        <SheetClose asChild>
          <Button className="justify-start gap-3" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>

        <Button className="justify-start gap-3" variant="ghost">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col gap-2 border-b border-solid px-5 pt-0 pb-4">
        {quickSearchOptions.map((option) => (
          <Button
            key={option.title}
            className="justify-start gap-3"
            variant="ghost"
          >
            <Image
              alt={option.title}
              src={option.imageUrl}
              height={18}
              width={18}
            />
            {option.title}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-2 px-5 pt-0 pb-4">
        <Button variant="ghost" className="justify-start gap-3">
          <LogInIcon size={18} /> Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
