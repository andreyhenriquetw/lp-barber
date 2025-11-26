import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"

const Header = () => {
  return (
    <Card className="p-4">
      <CardContent className="flex flex-row items-center justify-between">
        <Image alt="LP Barber" src="/logolp.png" height={18} width={62} />
        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  )
}

export default Header
