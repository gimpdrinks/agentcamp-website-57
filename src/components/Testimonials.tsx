
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { TestimonialCard } from "./TestimonialCard"
import type { Testimonial } from "./TestimonialCard"
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll"
import { useQuestProgress } from "@/context/QuestProgressContext"

const testimonials: Testimonial[] = [
  {
    quote: "AgentCamp didn't just give me tools; it gave me a new way of thinking. My idea is now a profitable reality.",
    name: "Alex Johnson",
    title: "Founder, InsightAI",
    image: "https://i.pravatar.cc/150?u=alexjohnson",
    fallback: "AJ",
  },
  {
    quote: "The collaborative environment is electric. I went from a concept to a launched MVP in one retreat. Unbelievable.",
    name: "Samantha Lee",
    title: "Creator, NomadConnect",
    image: "https://i.pravatar.cc/150?u=samanthalee",
    fallback: "SL",
  },
  {
    quote: "I was stuck in a loop of 'what ifs'. AgentCamp broke that cycle. The mentorship and structure are priceless.",
    name: "Michael Chen",
    title: "Developer, CodeStream",
    image: "https://i.pravatar.cc/150?u=michaelchen",
    fallback: "MC",
  },
  {
    quote: "The best investment I've made in my professional development. The hands-on approach is unparalleled.",
    name: "Jessica Williams",
    title: "Product Manager, DevLaunch",
    image: "https://i.pravatar.cc/150?u=jessicawilliams",
    fallback: "JW",
  },
];

export function Testimonials() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )
  const [sectionRef, animationClasses, isVisible] = useAnimateOnScroll<HTMLElement>();
  const { addProgress } = useQuestProgress();

  React.useEffect(() => {
    if (isVisible) {
      addProgress('VIEW_TESTIMONIALS');
    }
  }, [isVisible, addProgress]);

  return (
    <section ref={sectionRef} className={`py-20 bg-background snap-start ${animationClasses}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          From Idea to Impact
        </h2>
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:inline-flex text-primary border-primary hover:bg-primary/10 hover:text-primary" />
          <CarouselNext className="hidden sm:inline-flex text-primary border-primary hover:bg-primary/10 hover:text-primary" />
        </Carousel>
      </div>
    </section>
  )
}

