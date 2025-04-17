import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function RootLayout(props: {params: {countryCode: string} ,children: React.ReactNode }) {
  const {countryCode} = props.params
  console.log(countryCode)
  return (
    <html lang={countryCode} data-mode="light">
      <body>
        <NextIntlClientProvider>{props.children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
