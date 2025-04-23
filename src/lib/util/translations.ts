import { StoreProduct } from "@medusajs/types";

export const getTranslationFromMetadata = (metadata: Record<string, any>, attribute: string, countryCode: string): string | null => {
    return metadata && metadata["translation_" + attribute + "_" + countryCode] 
}
