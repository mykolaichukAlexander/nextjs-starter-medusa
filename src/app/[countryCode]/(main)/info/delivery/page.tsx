import { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"
import { getTranslations } from "next-intl/server"

export const metadata: Metadata = {
  title: "Delivery Information",
  description: "Information about our delivery process, shipping times and costs",
}

export default async function DeliveryInfo() {
    const t_delivery = await getTranslations("Delivery")
    const t_exchange = await getTranslations("Exchange")
  return (
    <div className="content-container flex flex-col py-12">
      <div className="max-w-4xl mx-auto w-full">
        <Heading level="h1" className="text-4xl mb-8 text-center">
          {t_delivery("title")}
        </Heading>
        
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <Heading level="h2" className="text-2xl mb-4">
            {t_delivery("shipping_times")}
          </Heading>
          <Text className="mb-6">
            {t_delivery("description")}
          </Text>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <Text><span className="font-semibold">{t_delivery("standard_shipping")}:</span> {t_delivery("standard_shipping_description")}</Text>
            </li>
            <li>
              <Text><span className="font-semibold">{t_delivery("international_shipping")}:</span> {t_delivery("international_shipping_description")}</Text>
            </li>
          </ul>
          <Text className="text-sm text-ui-fg-subtle">
            {t_delivery("note")}
          </Text>
        </div>

        {/* <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <Heading level="h2" className="text-2xl mb-4">
            Tracking Your Order
          </Heading>
          <Text className="mb-4">
            Once your order ships, you will receive a shipping confirmation email with tracking information. You can also track your order by:
          </Text>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <Text>Logging into your account and viewing your order history</Text>
            </li>
            <li>
              <Text>Contacting our customer service team with your order number</Text>
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <Heading level="h2" className="text-2xl mb-4">
            Delivery Policies
          </Heading>
          
          <Heading level="h3" className="text-xl mb-2 mt-4">
            Order Changes & Cancellations
          </Heading>
          <Text className="mb-4">
            If you need to modify or cancel your order, please contact us as soon as possible. We can only make changes before your order has been shipped.
          </Text>
          
          <Heading level="h3" className="text-xl mb-2 mt-4">
            Failed Delivery Attempts
          </Heading>
          <Text className="mb-4">
            If a delivery attempt fails, the carrier will leave a notification and your package will be held for pickup or redelivery according to the carrier's policies.
          </Text>
          
          <Heading level="h3" className="text-xl mb-2 mt-4">
            International Orders
          </Heading>
          <Text className="mb-4">
            International customers are responsible for all duties, import taxes, and brokerage fees. These are not included in the shipping cost or product price.
          </Text>
        </div>

        <div className="text-center mt-8">
          <Text className="text-ui-fg-subtle">
            If you have any questions about delivery or shipping, please <a href="/contact" className="underline hover:text-black">contact our customer service team</a>.
          </Text>
        </div> */}

        <Heading level="h1" className="text-4xl mb-8 text-center">
          {t_exchange("title")}
        </Heading>
        
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <Text className="mb-6">
            {t_exchange("description")}
          </Text>
          <Text className="mb-6 text-lg font-bold">
            {t_exchange("exceptions")}:
          </Text>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <Text><span className="font-semibold">{t_exchange("exceptions_1")};</span></Text>
            </li>
            <li>
              <Text><span className="font-semibold">{t_exchange("exceptions_2")};</span></Text>
            </li>
            <li>
              <Text><span className="font-semibold">{t_exchange("exceptions_3")};</span></Text>
            </li>
            <li>
              <Text><span className="font-semibold">{t_exchange("exceptions_4")};</span></Text>
            </li>
            <li>
              <Text><span className="font-semibold">{t_exchange("exceptions_5")};</span></Text>
            </li>
            <li>
              <Text><span className="font-semibold">{t_exchange("exceptions_6")};</span></Text>
            </li>
            <li>
              <Text><span className="font-semibold">{t_exchange("exceptions_7")};</span></Text>
            </li>
            <li>
              <Text><span className="font-semibold">{t_exchange("exceptions_8")}.</span></Text>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
