
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  image: string;
  fallback: string;
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="bg-card border-primary/20 h-full shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-primary/20">
      <CardContent className="p-6 flex flex-col items-center text-center h-full">
        <Avatar className="w-16 h-16 mb-4 border-2 border-primary/50">
          <AvatarImage src={testimonial.image} alt={testimonial.name} />
          <AvatarFallback>{testimonial.fallback}</AvatarFallback>
        </Avatar>
        <blockquote className="text-lg font-medium mb-4 text-foreground/90 italic flex-grow">
          <p>"{testimonial.quote}"</p>
        </blockquote>
        <div className="mt-auto">
          <p className="font-semibold text-primary">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
