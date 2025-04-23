import Link from "next/link"
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
      <Link href={link}>
        <button className="text-base px-8 py-6 flex items-center gap-2 font-medium bg-slate-700 text-white hover:bg-slate-600 rounded-md transition-colors">
          {text}
          <ArrowRight className="w-5 h-5" />
        </button>
      </Link>
    </div>
  )
}
