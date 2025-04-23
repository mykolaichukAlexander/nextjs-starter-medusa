import { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"
import { getTranslations } from "next-intl/server"

export const metadata: Metadata = {
  title: "Delivery Information",
  description: "Information about our delivery process, shipping times and costs",
}

export default async function PrivacyInfo() {
    const t_privacy = await getTranslations("Privacy")
  return (
    <div className="content-container flex flex-col py-12">
      <div className="max-w-4xl mx-auto w-full">
        <Heading level="h1" className="text-4xl mb-8 text-center">
          {t_privacy("title")}
        </Heading>
        
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          {/* <Heading level="h2" className="text-2xl mb-4">
            {t_privacy("privacy_policy")}
          </Heading> */}
          <Text className="mb-6">
            {t_privacy("privacy_policy_description")}
          </Text>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <Heading level="h2" className="text-2xl mb-4">
            {t_privacy("personal_data_gathering")}
          </Heading>
          <Text className="mb-6">
            {t_privacy("personal_data_gathering_description")}
          </Text>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <Heading level="h2" className="text-2xl mb-4">
            {t_privacy("personal_data_use")}
          </Heading>
          <Text className="mb-6">
            {t_privacy("personal_data_use_description")}
          </Text>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <Heading level="h2" className="text-2xl mb-4">
            {t_privacy("cookie_etc")}
          </Heading>
          <Text className="mb-6">
            {t_privacy("cookie_etc_description")}
          </Text>
        </div>

      </div>
    </div>
  )
}
