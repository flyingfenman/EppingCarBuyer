import { Phone, MapPin, Clock, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Get in touch with us for a quick valuation or any questions about selling your car.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Phone Contact */}
          <Card>
            <CardHeader className="text-center">
              <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Call Us</CardTitle>
              <CardDescription>
                Speak directly with Henry for an immediate response and quick valuation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="default" className="w-full" size="lg">
                <a href="tel:01205212339">
                  <Phone className="mr-2 h-5 w-5" />
                  01205 212339
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Email Contact */}
          <Card>
            <CardHeader className="text-center">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Email Us</CardTitle>
              <CardDescription>Send us an email and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="default" className="w-full" size="lg">
                <a href="mailto:henry@eppingcarbuyer.com">
                  <Mail className="mr-2 h-5 w-5" />
                  Email Henry
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* WhatsApp Contact */}
          <Card>
            <CardHeader className="text-center">
              <svg
                className="h-12 w-12 mx-auto mb-4"
                fill="#25D366"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <CardTitle>WhatsApp</CardTitle>
              <CardDescription>Send us photos and details of your vehicle for a quick response.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="default" className="w-full bg-[#25D366] hover:bg-[#1da851]" size="lg">
                <a href="https://wa.me/441205212339" target="_blank" rel="noopener noreferrer">
                  Message on WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Service Area</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Within 50 miles of Epping including Loughton, Chigwell, Harlow, and surrounding areas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Response Time</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">We typically respond within 1 hour during business hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Availability</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Monday - Saturday: 9am - 6pm
                <br />
                Sunday: By appointment
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
