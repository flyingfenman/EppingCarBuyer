import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Terms of Service | Epping Car Buyer",
  description: "The terms and conditions for using the Epping Car Buyer website and services.",
  alternates: { canonical: "/terms-of-service" },
  // Still linked from every page, but kept out of search results so Google's sitelinks show the services.
  robots: { index: false, follow: true },
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Welcome to Epping Car Buyer. These Terms of Service ("Terms") govern your use of our website and
              services. By using our website or services, you agree to be bound by these Terms. If you do not agree to
              these Terms, please do not use our services.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Our Services</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>Epping Car Buyer provides the following services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Vehicle valuation and quotation services</li>
              <li>Purchase of vehicles from private sellers</li>
              <li>Vehicle collection services within our coverage area</li>
              <li>Same-day payment upon vehicle purchase</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Valuation and Quotations</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>Please note the following regarding our valuations:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                All online valuations are estimates based on the information provided and are subject to physical
                inspection
              </li>
              <li>
                Final purchase prices may vary based on the actual condition of the vehicle upon inspection
              </li>
              <li>Quotations are valid for 7 days from the date of issue unless otherwise stated</li>
              <li>We reserve the right to adjust or withdraw any quotation at our discretion</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Vehicle Requirements</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>To sell your vehicle to us, you must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be the legal owner of the vehicle or have authority to sell it</li>
              <li>Provide accurate and truthful information about the vehicle</li>
              <li>Have all necessary documentation including V5C registration document</li>
              <li>Ensure the vehicle is free from any outstanding finance or legal encumbrances</li>
              <li>Disclose any known faults, accidents, or damage to the vehicle</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>Our payment process works as follows:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment is made upon successful completion of the sale and transfer of ownership</li>
              <li>We offer same-day bank transfer for most transactions</li>
              <li>You must provide valid identification and proof of ownership to receive payment</li>
              <li>All payments are made in GBP (British Pounds Sterling)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Inspection Cancellations and Refunds</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ul className="list-disc pl-6 space-y-2">
              <li>You can cancel your inspection free of charge up to 48 hours before the appointment, and we will refund you in full</li>
              <li>
                If you cancel less than 48 hours before the appointment, no refund is given. This includes when the inspection
                cannot go ahead because the car has been sold or withdrawn, or the seller cannot be reached. By then we have
                planned the day, bought the vehicle history check and started your report
              </li>
              <li>Instead of cancelling, you can ask us to move your booking to another date or another car, subject to availability</li>
              <li>To cancel or move a booking, message us on WhatsApp before the 48 hour cut-off. The time of your message counts</li>
              <li>If we have to cancel, we will offer you a new appointment or a full refund</li>
              <li>
                By booking, you ask us to start preparing your inspection straight away. Your 14 day right to cancel under the
                Consumer Contracts Regulations ends once the inspection has been carried out. Nothing in this section affects
                your statutory rights
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Responsibilities</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>When using our services, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information about yourself and your vehicle</li>
              <li>Not misrepresent the condition, history, or ownership of any vehicle</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not use our services for any fraudulent or unlawful purpose</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              To the fullest extent permitted by law, Epping Car Buyer shall not be liable for any indirect,
              incidental, special, or consequential damages arising from your use of our services. Our total liability
              shall not exceed the purchase price of any vehicle involved in the transaction.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              All content on this website, including text, graphics, logos, and images, is the property of Epping Car
              Buyer and is protected by copyright and other intellectual property laws. You may not reproduce,
              distribute, or use any content without our prior written consent.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting
              to our website. Your continued use of our services after any changes indicates your acceptance of the
              modified Terms.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Governing Law</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any
              disputes arising from these Terms or your use of our services shall be subject to the exclusive
              jurisdiction of the courts of England and Wales.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <ul className="list-none space-y-2">
              <li>
                <strong>WhatsApp:</strong>{" "}
                <a
                  href="https://wa.me/441992367909"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  01992 367909
                </a>{" "}
                (messages only, this number doesn&apos;t take calls)
              </li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">Last updated: October 2026</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
