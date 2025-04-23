import { Heading, Text } from "@medusajs/ui";
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Image from "next/image";

export const metadata: Metadata = {
    title: "About Us",
    description: "About us",
  }

export default async function About() {
    const t = await getTranslations('About');
    return (
        <div className="content-container flex flex-col py-12">
          <div className="max-w-4xl mx-auto w-full">
            <Heading level="h1" className="text-4xl mb-8 text-center">
              {t("title")}
            </Heading>
            
            <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
              <Text className="mb-6">
                {t("description")}
              </Text>
              <Text className="text-sm text-ui-fg-subtle font-italic">
                {t("with_love")}!
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="rounded-lg overflow-hidden h-74">
                  <Image 
                    src="/images/about/about1.jpg" 
                    alt="About us image 1" 
                    width={500} 
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-74">
                  <Image 
                    src="/images/about/about2.jpg" 
                    alt="About us image 2" 
                    width={500} 
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-74">
                  <Image 
                    src="/images/about/about3.jpg" 
                    alt="About us image 3" 
                    width={500} 
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}
