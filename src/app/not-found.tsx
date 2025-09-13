import Link from "next/link";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import { Home, Mail, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Main 404 Content */}
        <div className="space-y-6">
          {/* 404 Illustration */}
          <div className="relative">
            <div className="text-9xl font-black text-primary/20 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="h-16 w-16 text-muted-foreground animate-pulse" />
            </div>
          </div>

          {/* Header Text */}
          <div className="space-y-3">
            <h1 className="text-4xl font-black text-foreground text-balance">
              Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-md mx-auto">
              The page you are looking for does not exist or has been moved.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="font-semibold">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="font-semibold bg-transparent"
          >
            <Link href="/departments">
              <Mail className="mr-2 h-4 w-4" />
              Contact List
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
