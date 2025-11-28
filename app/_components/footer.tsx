import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer>
      <Card className="p-5">
        {/* remove padding do Card */}
        <CardContent className="flex flex-col items-center gap-1 text-center">
          <h4 className="text-xs font-bold text-gray-500">
            © 2025 LP Barbearia
          </h4>
          <p className="text-xs text-gray-400">Todos os direitos reservados</p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
