import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getTranslations } from "next-intl/server"
import { HoverBannerCarousel } from "@modules/home/components/hower-bunner"
import { ShopButton } from "@modules/home/components/shop-button"
import { EnhancedTabbedShowcase } from "@modules/home/components/enhanced-tabbed-showcase"
import { listProducts } from "@lib/data/products"
import { FloatingShopButton } from "@modules/home/components/floating_shop_button"
import { CategoriesGrid } from "@modules/home/components/categories-grid"

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

  const products = await listProducts({
    regionId: region?.id,
    queryParams: {
      // fields: "*,variants.calculated_price,metadata",
    },
  }).then(({ response: { products } }) => products)
  
  if (!collections || !region) {
    return null
  }

  return (
    <>
      <section className="container mx-auto px-4 py-8">
        <HoverBannerCarousel className="mb-12" />
        <ShopButton text={t("shop_button")} link={"/store"} />
      </section>
      <EnhancedTabbedShowcase products={products} region={region} />
      <FloatingShopButton />
      <CategoriesGrid collections={collections} />
    </>
  )
}
