import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Stamford Car Buyer ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, and safeguard your personal information when you use our website and
              services.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Information:</strong> Name, email address, phone number, and vehicle registration
                number when you request a valuation
              </li>
              <li>
                <strong>Vehicle Information:</strong> Make, model, year, mileage, condition, and service history of your
                vehicle
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you interact with our website, including IP address,
                browser type, and pages visited
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide vehicle valuations and quotes</li>
              <li>To contact you regarding your valuation request</li>
              <li>To arrange vehicle inspections and purchases</li>
              <li>To improve our services and website functionality</li>
              <li>To comply with legal obligations</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Data Security</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
              over the internet is 100% secure.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Sharing Your Information</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information
              with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers who assist in operating our business</li>
              <li>Legal authorities when required by law</li>
              <li>Vehicle data providers to verify vehicle information</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>Under data protection law, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Cookies</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Our website may use cookies to enhance user experience. Cookies are small files stored on your device that
              help us analyze web traffic and remember your preferences. You can choose to disable cookies through your
              browser settings.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
              updated revision date. We encourage you to review this policy periodically.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              If you have any questions about this Privacy Policy or how we handle your personal information, please
              contact us:
            </p>
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
