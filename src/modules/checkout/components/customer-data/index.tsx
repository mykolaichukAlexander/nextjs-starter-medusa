import { HttpTypes } from "@medusajs/types"
import { useEffect, useMemo } from "react"
import { useState } from "react"
import Input from "@modules/common/components/input"
import { useTranslations } from "next-intl"


const CustomerData = ({
  customer,
  cart,
  checked,
  onChange,
}: {
  customer: HttpTypes.StoreCustomer | null
  cart: HttpTypes.StoreCart | null
  checked: boolean
  onChange: () => void
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    "first_name": cart?.shipping_address?.first_name || "",
    "last_name": cart?.shipping_address?.last_name || "",
    "phone": cart?.shipping_address?.phone || "",
    email: cart?.email || "",
  })

  const t = useTranslations("CustomerData")



  const setFormAddress = (
    address?: HttpTypes.StoreCartAddress,
    email?: string
  ) => {
    address &&
      setFormData((prevState: Record<string, any>) => ({
        ...prevState,
        "first_name": address?.first_name || "",
        "last_name": address?.last_name || "",
        "phone": address?.phone || "",
      }))

    email &&
      setFormData((prevState: Record<string, any>) => ({
        ...prevState,
        email: email,
      }))
  }

  useEffect(() => {
    // Ensure cart is not null and has a shipping_address before setting form data
    if (cart && cart.shipping_address) {
      setFormAddress(cart?.shipping_address, cart?.email)
    }

    if (cart && !cart.email && customer?.email) {
      setFormAddress(undefined, customer.email)
    }
  }, [cart]) // Add cart as a dependency

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Input 
          label={t("first_name")}
          name="first_name"
          autoComplete="given-name"
          value={formData["first_name"]}
          onChange={handleChange}
          required
          data-testid="shipping-first-name-input"
        />
        <Input
          label={t("last_name")}
          name="last_name"
          autoComplete="family-name"
          value={formData["last_name"]}
          onChange={handleChange}
          required
          data-testid="shipping-last-name-input"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 mt-4">
        <Input
          label={t("email")}
          name="email"
          type="email"
          title="Enter a valid email address."
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
          data-testid="shipping-email-input"
        />
        <Input
          label={t("phone")}
          name="phone"
          autoComplete="tel"
          value={formData["phone"]}
          onChange={handleChange}
          required
          data-testid="shipping-phone-input"
        />
      </div>
    </>
  )
}

export default CustomerData
