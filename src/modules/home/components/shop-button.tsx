import Link from "next/link"
import { Button } from "@medusajs/ui"
import { ArrowRight } from "lucide-react"

interface ShopButtonProps {
  text?: string
  link?: string
}

export const ShopButton = ({
  text = "Shop All Products",
  link = "/store",
}: ShopButtonProps) => {
  return (
    <div className="flex justify-center my-8">
      <Button type="button" className="text-base px-8 py-6 flex items-center gap-2 font-medium">
        <Link href={link} className="flex items-center gap-2">
          {text}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </Button>
    </div>
  )
}
