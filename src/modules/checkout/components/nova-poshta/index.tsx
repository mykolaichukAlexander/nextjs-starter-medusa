"use client"

import { useState, useEffect, useRef } from "react"

interface NovaPoshtaButtonProps {
  className?: string
  horizontal?: boolean
  onSelect?: (data: any) => void
  initialDepartment?: SelectedDepartment
}

interface SelectedDepartment {
  id: string
  shortName: string
  addressParts?: {
    city?: string
    street?: string
    building?: string
  }
}

export default function NovaPoshtaButton({ className = "", horizontal = false, onSelect, initialDepartment }: NovaPoshtaButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<SelectedDepartment | null>(initialDepartment || null)
  const [coordinates, setCoordinates] = useState({ latitude: "", longitude: "" })
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          })
        },
        (error) => {
          console.error("Error getting geolocation:", error)
        },
      )
    }
  }, [])

  useEffect(() => {
    const handleFrameMessage = (event: MessageEvent) => {
      if (event.origin !== "https://widget.novapost.com") {
        console.warn("Message from unknown source:", event.origin)
        return
      }

      if (event.data && typeof event.data === "object") {
        setSelectedDepartment(event.data)
        if (onSelect) onSelect(event.data)
        setIsModalOpen(false)
        return
      }

      if (event.data === "closeFrame") {
        setIsModalOpen(false)
        return
      }

      setIsModalOpen(false)
    }

    window.addEventListener("message", handleFrameMessage)
    return () => window.removeEventListener("message", handleFrameMessage)
  }, [onSelect])

  const openFrame = () => {
    setIsModalOpen(true)
  }

  const closeFrame = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (isModalOpen && iframeRef.current) {
      const domain = window.location.hostname
      const data = {
        placeName: "Київ",
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        domain: domain,
        id: selectedDepartment?.id || null,
      }

      const handleIframeLoad = () => {
        iframeRef.current?.contentWindow?.postMessage(data, "*")
      }

      iframeRef.current.onload = handleIframeLoad
    }
  }, [isModalOpen, coordinates, selectedDepartment])

  return (
    <>
      <div
        className={`nova-poshta-button ${horizontal ? "nova-poshta-button-horizontal" : ""} ${className}`}
        onClick={openFrame}
        data-selected-department-id={selectedDepartment?.id}
      >
        <div className={`nova-poshta-button ${horizontal ? "nova-poshta-button-horizontal" : ""}`}>
          <svg width="108" height="24" viewBox="0 0 108 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.8385 10.6409H4.27437V8.14283C4.27437 7.48703 3.78796 6.99949 3.13368 6.99949H0V9.64427H1.42479V17.0005H4.27437V13.359H7.8385V17.0005H10.6881V6.99949H7.8385V10.6409Z"
              fill="#DA291C"
            />
            <path
              d="M17.2481 6.85712C14.2393 6.85712 12.044 9.0273 12.044 12C12.044 14.9726 14.2393 17.1428 17.2481 17.1428C20.257 17.1428 22.4523 14.9726 22.4523 12C22.4523 9.0273 20.2527 6.85712 17.2481 6.85712ZM17.2481 14.3557C15.8922 14.3557 14.8979 13.3547 14.8979 12C14.8979 10.6452 15.8965 9.64427 17.2481 9.64427C18.6041 9.64427 19.5984 10.6452 19.5984 12C19.5984 13.3547 18.5998 14.3557 17.2481 14.3557Z"
              fill="#DA291C"
            />
            <path
              d="M31.2679 11.7109C31.9738 11.2795 32.4129 10.5417 32.4129 9.65721C32.4129 8.11263 31.4143 6.99949 29.4342 6.99949H23.8039V17.0005H29.4342C31.5133 17.0005 32.7271 15.7881 32.7271 14.1141C32.7271 13.0398 32.1589 12.1726 31.2679 11.7109ZM26.4555 9.22576H28.5776C29.2491 9.22576 29.6322 9.55366 29.6322 10.1102C29.6322 10.6668 29.2491 10.9947 28.5776 10.9947H26.4555V9.22576ZM28.7756 14.8001H26.4512V12.9448H28.7756C29.4902 12.9448 29.8862 13.2857 29.8862 13.8725C29.8862 14.4592 29.4902 14.8001 28.7756 14.8001Z"
              fill="#DA291C"
            />
            <path
              d="M37.0876 6.99949L33.1533 17.0005H36.188L36.8207 15.1582H40.8282L41.461 17.0005H44.5559L40.6216 6.99949H37.0876ZM37.5912 12.9146L38.7147 9.64427H38.9299L40.0534 12.9146H37.5912Z"
              fill="#DA291C"
            />
            <path
              d="M58.184 6.99949H48.6366V9.64427H50.0614V17.0005H52.911V9.63995H56.4751V16.9961H59.3247V8.14283C59.3204 7.41368 58.9071 6.99949 58.184 6.99949Z"
              fill="#DA291C"
            />
            <path
              d="M65.8804 6.85712C62.8716 6.85712 60.6763 9.0273 60.6763 12C60.6763 14.9726 62.8716 17.1428 65.8804 17.1428C68.8893 17.1428 71.0846 14.9726 71.0846 12C71.0846 9.0273 68.885 6.85712 65.8804 6.85712ZM65.8804 14.3557C64.5245 14.3557 63.5302 13.3547 63.5302 12C63.5302 10.6452 64.5288 9.64427 65.8804 9.64427C67.232 9.64427 68.2307 10.6452 68.2307 12C68.2307 13.3547 67.232 14.3557 65.8804 14.3557Z"
              fill="#DA291C"
            />
            <path
              d="M83.5547 14.3557H80.8472V6.99949H77.9933V14.3557H75.2858V6.99949H72.4362V17.0005H86.4043V6.99949H83.5547V14.3557Z"
              fill="#DA291C"
            />
            <path d="M97.4496 9.63995V6.99949H87.7602V9.63995H91.178V17.0005H94.0276V9.63995H97.4496Z" fill="#DA291C" />
            <path
              d="M104.905 17.0005H108L104.066 6.99949H100.532L96.5974 17.0005H99.632L100.265 15.1582H104.272L104.905 17.0005ZM101.035 12.9146L102.159 9.64427H102.374L103.497 12.9146H101.035Z"
              fill="#DA291C"
            />
          </svg>
        </div>
        <div className="nova-poshta-angle">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.49399 1.44891L10.0835 5.68541L10.1057 5.70593C10.4185 5.99458 10.6869 6.24237 10.8896 6.4638C11.1026 6.69642 11.293 6.95179 11.4023 7.27063C11.5643 7.74341 11.5643 8.25668 11.4023 8.72946C11.293 9.0483 11.1026 9.30367 10.8896 9.53629C10.6869 9.75771 10.4184 10.0055 10.1057 10.2942L10.0835 10.3147L5.49398 14.5511L4.47657 13.4489L9.06607 9.21246C9.40722 8.89756 9.62836 8.69258 9.78328 8.52338C9.93272 8.36015 9.96962 8.28306 9.98329 8.24318C10.0373 8.08559 10.0373 7.9145 9.98329 7.7569C9.96963 7.71702 9.93272 7.63993 9.78328 7.4767C9.62837 7.3075 9.40722 7.10252 9.06608 6.78761L4.47656 2.55112L5.49399 1.44891Z"
              fill="#475569"
            />
          </svg>
        </div>
        <div className="nova-poshta-wrapper">
          <span className="nova-poshta-text nova-poshta-text-bottom">
            {selectedDepartment?.shortName || "Обрати відділення або поштомат"}
          </span>
          <span className="nova-poshta-wrapper text-description">
            {selectedDepartment
              ? `${selectedDepartment.addressParts?.city || ""} вул. ${selectedDepartment.addressParts?.street || ""}, ${selectedDepartment.addressParts?.building || ""}`
              : ""}
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="nova-poshta-modal-overlay">
          <div className="nova-poshta-modal">
            <header className="nova-poshta-modal-header">
              <h2>Вибрати відділення</h2>
              <span className="nova-poshta-modal-close" onClick={closeFrame}>
                &times;
              </span>
            </header>
            <iframe
              ref={iframeRef}
              className="nova-poshta-modal-iframe"
              src="https://widget.novapost.com/division/index.html"
              allow="geolocation"
            />
          </div>
        </div>
      )}
    </>
  )
}
