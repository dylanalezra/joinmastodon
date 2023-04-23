import Image, { ImageProps } from "next/image"
import { FormattedMessage } from "react-intl"

import downloadOnGooglePlay from "../public/badges/google-play.svg"
import downloadOnAppStore from "../public/badges/app-store.svg"

export type AppHeroProps = {
  /** Image source value passed to `next/image`'s `src` */
  backgroundImage: ImageProps["src"]
  /** Image-framing value passed to `next/image`'s `object-position` */
  backgroundImagePosition?: string
}
/** Renders a hero with links to the app store, typically at the bottom of a page. */
export const AppHero = ({
  backgroundImage,
  backgroundImagePosition = "center center",
}: AppHeroProps) => {
  return (
    <section className="full-width-bg relative -mb-footer-offset pb-footer-offset pt-32">
      <div className="absolute inset-0 -z-10">
      </div>
     
    </section>
  )
}
export default AppHero
