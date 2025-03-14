import Link from "next/link"
import Image from "next/image"
import type { Testimonial } from "../data/testimonials"

export type TestimonialCardProps = {
  testimonial: Testimonial
}
/**
 * TestimonialCard component.
 * Layout (width, height, positioning) can be set from the parent.
 */
export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="keen-slider__slide inline-block h-max w-full space-y-6 rounded-md bg-white p-8">
      <div className="flex items-center justify-center">
      </div>

      <p className="b1 text-center">{testimonial.text}</p>

      <div className="b2 text-center">
        <span className="block font-bold">{testimonial.name}</span>
        <span className="font-semibold text-chakragreen-300">
          {testimonial.username}
        </span>
      </div>
    </div>
  )
}

export default TestimonialCard
