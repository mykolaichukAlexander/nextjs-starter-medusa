import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getTranslations } from "next-intl/server"
import { BannerCarousel } from "@modules/home/components/bunner"
import { HoverBannerCarousel } from "@modules/home/components/hower-bunner"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const t = await getTranslations('Home')
  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <section className="container mx-auto px-4 py-8">
        <HoverBannerCarousel className="mb-12" />

        {/* Rest of your homepage content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-muted rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Discover our most popular items</p>
          </div>
          <div className="bg-muted rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">New Arrivals</h2>
            <p className="text-muted-foreground">The latest additions to our store</p>
          </div>
          <div className="bg-muted rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Special Offers</h2>
            <p className="text-muted-foreground">Limited time deals and discounts</p>
          </div>
        </div>
      </section>
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
