export type Testimonial = {
  name: string
  vehicle?: string
  service: string
  town?: string
  /** Where the car was inspected, shown as "Inspected at ...". */
  location?: string
  /** Where a review was posted online, e.g. "Google review", shown when there is no photo. */
  source?: string
  rating?: number
  /** One sentence, word for word from the customer, for short review snippets. */
  headline: string
  quote: string
  fullReview?: string[]
  image?: string
  imageAlt?: string
  imagePosition?: string
}

export const testimonials: Testimonial[] = [
  {
    // Posted on the Epping Car Buyer Google profile, 21 October 2026, word for word.
    name: "H",
    service: "Pre-purchase inspection",
    source: "Google review",
    rating: 5,
    headline: "I genuinely feel the £199 inspection was some of the best money I’ve ever spent.",
    quote:
      "I can’t recommend Henry highly enough. He was incredibly thorough and took the time to explain everything clearly … I genuinely feel the £199 inspection was some of the best money I’ve ever spent.",
    fullReview: [
      "I can’t recommend Henry highly enough. He was incredibly thorough and took the time to explain everything clearly, including both the positives and the negatives of the car rather than just giving me a list of faults. I really appreciated that, because it gave me a much more balanced idea of what I was actually buying.",
      "He checked the car properly, talked me through what would likely need doing over the next year, what was minor, and what genuinely mattered. He also reassured me about the things that were good about the car, which helped me make a sensible decision rather than just worrying about every little issue.",
      "He was friendly, honest and clearly very knowledgeable. I genuinely feel the £199 inspection was some of the best money I’ve ever spent. It gave me the confidence to walk away from paying too much initially and then negotiate a better price, and I now feel much more informed about the car I’ve bought.",
      "I would absolutely use him again and would recommend him to anyone buying a used car.",
    ],
  },
  {
    name: "Lina",
    vehicle: "Toyota Yaris",
    service: "Premium inspection",
    town: "Southend-on-Sea",
    location: "a car dealer in Southend-on-Sea, Essex",
    headline: "After comparing different companies, choosing your service was one of the best decisions I made.",
    quote:
      "After comparing different companies, choosing your service was one of the best decisions I made. … As someone who doesn't know much about cars, I felt completely supported and confident in my decision.",
    fullReview: [
      "I just want to say a huge thank you for all your help and support. After having a bad experience with my previous car, I had a lot of concerns about buying another one, so I decided to have a pre-purchase inspection.",
      "After comparing different companies, choosing your service was one of the best decisions I made. From my very first WhatsApp message, communication was excellent. You answered all my questions quickly and clearly, and after I booked the Premium Car Audit, you contacted me straight away to ask if there was anything specific I wanted you to focus on.",
      "You inspected the car the very next day and called me immediately afterwards to explain everything and reassure me. You also provided videos, a detailed report, and continued to answer all my questions promptly.",
      "I really appreciated the level of care and professionalism throughout the whole process. As someone who doesn't know much about cars, I felt completely supported and confident in my decision.",
      "I would absolutely recommend you and your service to anyone looking to buy a car. Thank you again for helping me find the right car with peace of mind!",
    ],
    image: "/images/testimonials/lina-toyota-yaris.jpg",
    imageAlt: "Lina's red Toyota Yaris at a car dealer in Southend-on-Sea, Essex, after its Premium pre-purchase inspection",
    imagePosition: "center 70%",
  },
  {
    name: "Dave",
    vehicle: "Land Rover Discovery",
    service: "Premium inspection + EV battery health check",
    town: "Wickford",
    location: "a prestige car dealer in Wickford, Essex",
    headline: "I am very happy with the service. Value for money was great.",
    quote: "I am very happy with the service. Value for money was great.",
    image: "/images/testimonials/dave-land-rover-discovery.jpg",
    imageAlt:
      "Dave's Land Rover Discovery on ramps during its Premium pre-purchase inspection at a prestige car dealer in Wickford, Essex",
  },
]
