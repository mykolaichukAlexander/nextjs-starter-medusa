import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { getTranslationFromMetadata } from "@lib/util/translations"
import { Text, clx } from "@medusajs/ui"
import { Instagram, Send, Mail, Phone } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import { getTranslations } from "next-intl/server"

export default async function Footer({countryCode}: {countryCode: string}) {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()
  console.log(countryCode)

  const t = await getTranslations("Footer")

  return (
    <footer className="border-t border-ui-border-base w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
          <div>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
            >
              The Wool
            </LocalizedClientLink>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-4">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
                  {t("Categories")}
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-ui-fg-base",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {getTranslationFromMetadata(c.metadata as Record<string, any>, "title", countryCode) || c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
                  {t("Collections")}
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base">The Wool</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <a
                    href="https://www.instagram.com/thewool.ua?igsh=NnY1MDQ1Nmp3NTd0&utm_source=qr"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base flex items-center gap-2"
                  >
                    <Instagram className="w-4 h-4" />
                    @thewool.ua
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/thewoolua"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    @thewoolua
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@thewool.shop"
                    className="hover:text-ui-fg-base flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    info@thewool.shop
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+380939290348"
                    className="hover:text-ui-fg-base flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    +380 (93) 929-03-48
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base">{t("general_information")}</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <a
                    href="/info/delivery"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base flex items-center gap-2"
                  >
                    {t("shipping_returns")}
                  </a>
                </li>
                <li>
                  <a
                    href="/info/privacy"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base flex items-center gap-2"
                  >
                    {t("privacy")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} The Wool.
          </Text>
          {/* <Medusa CTA /> */}
        </div>
      </div>
    </footer>
  )
}
