"use client"

import Image from "next/image"

import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"

import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"

const SidebarSheet = () => {
  const { data } = useSession()

  const handleLoginWithGoogleClick = () => signIn("google")

  const handleLogoutClick = () => signOut()

  return (
    <SheetContent className="overflow-y-auto p-0">
      <SheetHeader className="px-5 pt-5 pb-0">
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid px-5 pt-0 pb-4">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>

            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <DialogHeader>
                  <DialogTitle>Faça seu login na plataforma</DialogTitle>
                  <DialogDescription>
                    Conecte-se usando sua conta do Google.
                  </DialogDescription>
                </DialogHeader>

                <Button
                  variant="outline"
                  className="gap-2 font-bold"
                  onClick={handleLoginWithGoogleClick}
                >
                  <Image
                    alt="Fazer login com o Google"
                    src="/google.svg"
                    width={18}
                    height={18}
                  />
                  Google
                </Button>
              </DialogContent>
            </Dialog>
          </>
        )}
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
            asChild
          >
            <Link href="/barbershops/32e412f2-314f-41ae-90f1-18ec1929d05b">
              <Image
                alt={option.title}
                src={option.imageUrl}
                height={18}
                width={18}
              />
              {option.title}
            </Link>
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-2 px-5 pt-0 pb-4">
        <Button
          variant="ghost"
          className="justify-start gap-3"
          onClick={handleLogoutClick}
        >
          <LogInIcon size={18} /> Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
