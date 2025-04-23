"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export const FloatingShopButton = ({ title }: { title: string }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <Link
      href="/store"
      className="fixed bottom-6 right-6 bg-slate-700 text-white p-4 rounded-full shadow-lg hover:bg-slate-600 transition-all z-50 flex items-center gap-2"
      aria-label="Shop all products"
    >
      <ShoppingBag className="w-5 h-5" />
      <span className="font-medium">{title}</span>
    </Link>
  )
}
