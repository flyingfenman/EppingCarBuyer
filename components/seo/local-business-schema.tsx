const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Epping Car Buyer",
  url: "https://www.eppingcarbuyer.com",
  telephone: "+441992367909",
  email: "henry@eppingcarbuyer.com",
  image: "https://www.eppingcarbuyer.com/images/inspection-car.jpg",
  priceRange: "££",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Waltham Abbey",
    addressRegion: "Essex",
    addressCountry: "GB",
  },
  areaServed: ["Essex", "Hertfordshire", "Cambridgeshire", "Greater London", "Bedfordshire", "Suffolk"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Standard Inspection",
        description: "90-point pre-purchase vehicle inspection, 40-60 minutes on site.",
      },
      price: "130",
      priceCurrency: "GBP",
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Premium Inspection",
        description: "140-point pre-purchase vehicle inspection, 70-90 minutes on site.",
      },
      price: "180",
      priceCurrency: "GBP",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Vehicle Inspection Packages",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Standard Inspection",
        price: "130",
        priceCurrency: "GBP",
      },
      {
        "@type": "Offer",
        name: "Premium Inspection",
        price: "180",
        priceCurrency: "GBP",
      },
    ],
  },
}

export function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  )
}
