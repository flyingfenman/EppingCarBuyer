const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: "Epping Car Buyer",
  url: "https://www.eppingcarbuyer.com",
  telephone: "+441992367909",
  email: "henry@eppingcarbuyer.com",
  image: "https://www.eppingcarbuyer.com/images/inspection-car.jpg",
  description:
    "Independent mobile pre-purchase vehicle inspections and EV battery State of Health checks across Essex, Hertfordshire, Greater London, South Cambridgeshire and surrounding areas.",
  priceRange: "££",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Waltham Abbey",
    addressRegion: "Essex",
    addressCountry: "GB",
  },
  areaServed: ["Essex", "Hertfordshire", "South Cambridgeshire", "Greater London", "Bedfordshire", "Suffolk"],
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
      url: "https://www.eppingcarbuyer.com/vehicle-inspections",
      itemOffered: {
        "@type": "Service",
        name: "Standard Pre-Purchase Vehicle Inspection",
        serviceType: "Pre-purchase vehicle inspection",
        description: "In-depth 160-point mechanical and condition inspection with diagnostics, road test, history check, video review, photo evidence, same-day report and buying guidance.",
      },
      price: "149.99",
      priceCurrency: "GBP",
    },
    {
      "@type": "Offer",
      url: "https://www.eppingcarbuyer.com/vehicle-inspections",
      itemOffered: {
        "@type": "Service",
        name: "Premium Pre-Purchase Vehicle Inspection",
        serviceType: "Pre-purchase vehicle inspection",
        description: "Everything in Standard, including video review, evidence and buying guidance, plus a deeper 260-point assessment, extended road test and additional vehicle and seller provenance searches subject to available records and cooperation.",
      },
      price: "199.99",
      priceCurrency: "GBP",
    },
    {
      "@type": "Offer",
      url: "https://www.eppingcarbuyer.com/ev-battery-health-check",
      itemOffered: {
        "@type": "Service",
        name: "EV Battery State of Health Report",
        serviceType: "EV traction battery State of Health assessment",
        description: "Optional EV battery SOH assessment using a Battery Health Check CARA Approved Autel EV Battery Health Test, with an end-customer battery health report on compatible electric and plug-in hybrid vehicles.",
      },
      price: "49.99",
      priceCurrency: "GBP",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Vehicle Inspection Services",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Standard Pre-Purchase Vehicle Inspection",
        price: "149.99",
        priceCurrency: "GBP",
      },
      {
        "@type": "Offer",
        name: "Premium Pre-Purchase Vehicle Inspection",
        price: "199.99",
        priceCurrency: "GBP",
      },
      {
        "@type": "Offer",
        name: "EV Battery State of Health Report Add-on",
        price: "49.99",
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
