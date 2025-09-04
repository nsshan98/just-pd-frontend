import { Card, CardContent } from "@/components/atoms/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/atoms/avatar"
import { Phone, Mail } from "lucide-react"

export function ProfileCard() {
  return (
    <Card className="w-full max-w-sm mx-auto bg-white shadow-sm">
      <CardContent className="p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Avatar */}
          <Avatar className="w-20 h-20">
            <AvatarImage
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0Bae2WEAgIlpo8hWEGvFtWSoSFfM3z.png"
              alt="Sarah Mitchell"
              className="object-cover"
            />
            <AvatarFallback className="text-lg font-medium">SM</AvatarFallback>
          </Avatar>

          {/* Name and Title */}
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-gray-900">Sarah Mitchell</h2>
            <p className="text-gray-600">Senior Product Designer</p>
          </div>

          {/* Contact Information */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-center space-x-3 text-gray-600">
              <Phone className="w-4 h-4" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="text-sm">sarah.mitchell@techflow.com</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}