import Link from "next/link"
import Image from "next/image"
import { StoreCollection } from "@medusajs/types"

interface CategoryPreviewProps {
  collection: StoreCollection
  isFeatured?: boolean,
  title?: string
}

const CategoryPreview = ({ collection, isFeatured = false }: CategoryPreviewProps) => {
  // Safely access metadata properties
  const thumbnailUrl =
    collection.metadata && typeof collection.metadata === "object" && collection.metadata.thumbnail
      ? String(collection.metadata.thumbnail)
      : "/placeholder.svg?height=400&width=400"

  const description =
    collection.metadata && typeof collection.metadata === "object" && collection.metadata.description
      ? String(collection.metadata.description)
      : ""

  return (
    <Link
      href={`/collections/${collection.handle}`}
      className={`group block relative ${isFeatured ? "col-span-2 row-span-2" : ""}`}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={thumbnailUrl || "/placeholder.svg"}
          alt={collection.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-bold drop-shadow-md">{collection.title}</h3>
          {description && <p className="mt-2 max-w-md drop-shadow-md">{description}</p>}
        </div>
      </div>
    </Link>
  )
}

interface CategoriesGridProps {
  collections: StoreCollection[]
  title?: string
  subTitle?: string
}

export const CategoriesGrid = ({ collections, title = "Shop by Category" , subTitle = "Browse our collections and find what you're looking for"}: CategoriesGridProps) => {
  if (!collections || collections.length === 0) {
    return null
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 max-w-lg">{subTitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((collection, index) => (
            <CategoryPreview key={collection.id} collection={collection} isFeatured={index === 0} />
          ))}
        </div>
      </div>
    </div>
  )
}
