# Stamford Car Buyer - Next.js Website

A modern, fast, and SEO-friendly car buying website built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- Vehicle registration lookup using DVLA API
- Instant vehicle valuation request forms
- Responsive design for all devices
- Contact via phone and WhatsApp
- Privacy policy compliance
- Image slideshow of vehicles
- Service area information

## Getting Started

### Prerequisites

- Node.js 18+ installed
- DVLA API key (optional, for vehicle lookups)

### Installation

1. Clone the repository
2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:

Create a `.env.local` file in the root directory and add:

\`\`\`
DVLA_API_KEY=your_dvla_api_key_here
\`\`\`

To get a DVLA API key, visit: https://developer-portal.driver-vehicle-licensing.api.gov.uk/

### Development

Run the development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx                 # Homepage
│   ├── vehicle-details/         # Vehicle details page
│   ├── continue/                # Valuation form page
│   ├── contact/                 # Contact page
│   ├── privacy-policy/          # Privacy policy page
│   ├── api/
│   │   ├── vehicle/             # DVLA API integration
│   │   └── submit-valuation/    # Form submission handler
│   ├── layout.tsx               # Root layout with header/footer
│   └── globals.css              # Global styles
├── components/
│   ├── header.tsx               # Navigation header
│   ├── footer.tsx               # Footer component
│   ├── hero-section.tsx         # Homepage hero with video
│   ├── how-it-works.tsx         # Process steps
│   ├── areas-we-cover.tsx       # Service areas
│   ├── valuation-section.tsx    # Bottom valuation form
│   ├── contact-section.tsx      # Contact options
│   └── image-slideshow.tsx      # Auto-playing slideshow
└── public/
    ├── images/                  # Static images
    ├── favicon.ico              # Site favicon
    └── apple-touch-icon.png     # Apple touch icon
\`\`\`

## Key Pages

- **Homepage** (`/`) - Main landing page with video, how it works, and contact options
- **Vehicle Details** (`/vehicle-details?reg=ABC123`) - Shows vehicle information from DVLA
- **Continue** (`/continue?reg=ABC123`) - Valuation request form
- **Contact** (`/contact`) - Contact information and options
- **Privacy Policy** (`/privacy-policy`) - Privacy and data protection information

## API Routes

### GET /api/vehicle

Fetches vehicle information from DVLA API.

Query parameters:
- `reg` - Vehicle registration number

### POST /api/submit-valuation

Handles valuation form submissions.

Body parameters:
- `registration` - Vehicle registration
- `mileage` - Current mileage
- `condition` - Vehicle condition
- `serviceHistory` - Service history status
- `name` - Customer name
- `email` - Customer email
- `phone` - Customer phone
- `additionalInfo` - Additional notes (optional)

## Customization

### Colors

The primary color scheme uses purple (`#8B7BB8`). To change it, edit the `--color-primary` value in `app/globals.css`.

### Fonts

The site uses the Fredoka font. To change it, update the font import in `app/layout.tsx`.

### Contact Information

Update phone numbers and WhatsApp links in:
- `components/contact-section.tsx`
- `app/contact/page.tsx`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add your `DVLA_API_KEY` environment variable
4. Deploy

### Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js.

## License

© 2025 Stamford Car Buyer. All rights reserved.
