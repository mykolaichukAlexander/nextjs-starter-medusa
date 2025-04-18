"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import clsx from "clsx"
import { Button } from "@medusajs/ui"

// Define the slide type to match Medusa's data structure
export interface BannerSlide {
  id: string
  handle?: string
  title: string
  description: string
  image: {
    url: string
    alt?: string
  }
  cta?: {
    text: string
    link: string
  }
}

// Sample slides data - you can replace this with data from Medusa's CMS or admin
const defaultSlides: BannerSlide[] = [
  {
    id: "1",
    handle: "summer-collection",
    title: "Summer Collection",
    description: "Discover our new summer styles with up to 40% off",
    image: {
      url: "/images/banner_3.jpg",
      alt: "Summer collection banner image",
    },
    cta: {
      text: "Shop Now",
      link: "/collections/summer-collection",
    },
  },
  {
    id: "2",
    handle: "new-arrivals",
    title: "New Arrivals",
    description: "Be the first to check out our latest products",
    image: {
      url: "/images/banner_4.jpg",
      alt: "New arrivals banner image",
    },
    cta: {
      text: "Explore",
      link: "/collections/new-arrivals",
    },
  },
  {
    id: "3",
    handle: "limited-offer",
    title: "Limited Offer",
    description: "Free shipping on all orders over $50",
    image: {
      url: "/images/banner_5.jpg",
      alt: "Limited offer banner image",
    },
    cta: {
      text: "Learn More",
      link: "/promotions",
    },
  },
]

interface HoverBannerCarouselProps {
  slides?: BannerSlide[]
  autoPlayInterval?: number
  className?: string
}

export function HoverBannerCarousel({
  slides = defaultSlides,
  autoPlayInterval = 5000,
  className,
}: HoverBannerCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchedSlide, setTouchedSlide] = useState<string | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [slides.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  // Handle touch for mobile devices
  const handleTouch = useCallback((id: string) => {
    setTouchedSlide((prev) => (prev === id ? null : id))
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      nextSlide()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [nextSlide, autoPlayInterval, isPaused])

  return (
    <div
      className={clsx("relative w-full overflow-hidden rounded-lg", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false)
        setTouchedSlide(null)
      }}
      aria-roledescription="carousel"
      aria-label="Featured Products and Promotions"
    >
      {/* Slides container */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-[300px] sm:h-[400px] md:h-[500px]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full flex-shrink-0 group"
            aria-roledescription="slide"
            aria-label={slide.title}
            onClick={() => handleTouch(slide.id)}
          >
            <Image
              src={slide.image.url || "/placeholder.svg"}
              alt={slide.image.alt || slide.title}
              fill
              priority={slide.id === "1"}
              className="object-cover"
            />

            {/* Overlay that appears on hover/touch */}
            <div
              className={clsx(
                "absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300",
                "group-hover:opacity-100", // Show on hover for desktop
                touchedSlide === slide.id ? "opacity-100" : "", // Show on touch for mobile
              )}
            />

            {/* Content that appears on hover/touch */}
            <div
              className={clsx(
                "absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white",
                "opacity-0 transform translate-y-4 transition-all duration-300 ease-out",
                "group-hover:opacity-100 group-hover:translate-y-0", // Show on hover for desktop
                touchedSlide === slide.id ? "opacity-100 translate-y-0" : "", // Show on touch for mobile
              )}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">{slide.title}</h2>
              <p className="text-lg md:text-xl mb-4 md:mb-6 max-w-md">{slide.description}</p>
              {slide.cta && (
                <Button variant="secondary">
                  <Link href={slide.cta.link}>{slide.cta.text}</Link>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 z-10"
        onClick={(e) => {
          e.stopPropagation()
          prevSlide()
        }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 z-10"
        onClick={(e) => {
          e.stopPropagation()
          nextSlide()
        }}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={clsx(
              "w-3 h-3 rounded-full transition-all",
              currentSlide === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80",
            )}
            onClick={(e) => {
              e.stopPropagation()
              goToSlide(index)
            }}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentSlide === index ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  )
}
