import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
                <strong>Phone:</strong>{" "}
                <a href="tel:01205212339" className="text-primary hover:underline">
                  01205 212339
                </a>
              </li>
              <li>
                <strong>WhatsApp:</strong>{" "}
                <a
                  href="https://wa.me/441205212339"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message us
                </a>
              </li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">Last updated: January 2025</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
