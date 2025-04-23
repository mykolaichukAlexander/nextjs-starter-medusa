"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { StoreProduct, StoreRegion } from "@medusajs/types"
import Image from "next/image"
import { cn } from "@lib/util/cn"
import PreviewPrice from "@modules/products/components/product-preview/price"
import { getProductPrice } from "@lib/util/get-product-price"
import { useTranslations } from "next-intl"
import { getTranslationFromMetadata } from "@lib/util/translations"
import { capitalizeFirstLetterOfEachWord } from "@lib/util/string"

// Simple product preview component
const SimpleProductPreview = ({ product, countryCode }: { product: StoreProduct, countryCode: string }) => {
    
  
    // Get thumbnail URL
    const thumbnailUrl = product.thumbnail || "/placeholder.svg?height=200&width=200"


    const title = capitalizeFirstLetterOfEachWord(getTranslationFromMetadata(product.metadata as Record<string, any>, "title", countryCode) || product.title)

    const { cheapestPrice } = getProductPrice({
        product,
    })
  
    return (
      <Link href={`/products/${product.handle}`} className="group">
        <div className="relative aspect-square mb-2 overflow-hidden rounded-md bg-gray-100">
          <Image
            src={thumbnailUrl}
            alt={title || "Product image"}
            fill
            className="object-cover transition-transform group-hover:scale-115"
          />
        </div>
        <h3 className="text-base font-medium">{title}</h3>
        {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
      </Link>
    )
  }

interface TabData {
  id: string
  label: string
  products: StoreProduct[]
  link?: string // Optional link to view all products in this category
}

interface EnhancedTabbedShowcaseProps {
  tabs?: TabData[]
  products?: StoreProduct[]
  title?: string
  itemsPerRow?: 3 | 4
  showViewAll?: boolean
  countryCode: string
}

export const EnhancedTabbedShowcase = ({
  tabs,
  products,
  title = "Discover Our Products",
  itemsPerRow = 4,
  showViewAll = true,
  countryCode,
}: EnhancedTabbedShowcaseProps) => {
  const t = useTranslations('Home')
  const initDefaultTabs = (products: StoreProduct[]): TabData[] => {
        const tabs: TabData[] = [];
        // console.log(products);
    
        tabs.push({
            id: "1",
            label: t("featured"),
            products: products.filter((product) => product.metadata?.featured).slice(0, 4),
        })
        tabs.push({
            id: "2",
            label: t("latest"),
            products: products.sort((a, b) => new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime()).slice(0, 4),
        })
        
   
        return tabs;
     }

  const finalTabs = tabs ? tabs : initDefaultTabs(products || [])

  

  const [activeTab, setActiveTab] = useState(finalTabs[0]?.id || "")
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedProducts, setDisplayedProducts] = useState<StoreProduct[]>(finalTabs[0]?.products || [])


  // Handle tab change with animation
  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab) return

    setIsAnimating(true)
    setTimeout(() => {
      setActiveTab(tabId)
      const newProducts = finalTabs.find((tab) => tab.id === tabId)?.products || []
      setDisplayedProducts(newProducts)
      setIsAnimating(false)
    }, 300) // Match this with the CSS transition duration
  }

  // Initialize products on first render
  useEffect(() => {
    if (finalTabs.length > 0) {
      setDisplayedProducts(finalTabs[0].products || [])
    }
  }, [tabs])

  // Get the active tab data
  const activeTabData = finalTabs.find((tab) => tab.id === activeTab)

  return (
    <div className="py-4">
      <div className="container mx-auto px-2">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-2 hide-scrollbar">
          <div className="inline-flex border border-gray-200 rounded-full p-1 bg-gray-50">
            {finalTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "px-6 py-2 bg-gray-50 text-sm font-medium rounded-full transition-all whitespace-nowrap",
                  activeTab === tab.id ? "bg-slate-700 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800 bg-transparent",
                )}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid with Animation */}
        <div className={cn("transition-opacity duration-300", isAnimating ? "opacity-0" : "opacity-100")}>
          <ul
            className={cn(
              "grid gap-x-4 gap-y-8",
              itemsPerRow === 3
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
            )}
          >
            {displayedProducts.map((product) => (
              <li key={product.id}>
                <SimpleProductPreview product={product} countryCode={countryCode} />
              </li>
            ))}
          </ul>

          {displayedProducts.length === 0 && (
            <div className="flex justify-center py-12 text-gray-500">No products found in this category.</div>
          )}

          {/* View All Link */}
          {showViewAll && activeTabData?.link && displayedProducts.length > 0 && (
            <div className="flex justify-center mt-8">
              <Link
                href={activeTabData.link}
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
              >
                View All {activeTabData.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
