import tusky from "../public/apps/tusky.png"
import subwayTooter from "../public/apps/subway-tooter.png"
import fedilab from "../public/apps/fedilab.png"
import mast from "../public/apps/mast.png"
import mastonaut from "../public/apps/mastonaut.png"
import tokodon from "../public/apps/tokodon.png"
import toot from "../public/apps/toot.jpg"
import tooter from "../public/apps/tooter.png"
import pinafore from "../public/apps/pinafore.png"
import whalebird from "../public/apps/whalebird.png"
import thedesk from "../public/apps/thedesk.png"
import cuckooPlus from "../public/apps/cuckoo-plus.png"
import hyperspace from "../public/apps/hyperspace.png"
import imast from "../public/apps/imast_icon.png"
import mercury from "../public/apps/mercury.png"
import sengi from "../public/apps/sengi.png"
import metatext from "../public/apps/metatext.png"
import tooot from "../public/apps/tooot.png"
import bitlbee from "../public/apps/bitlbee.png"
import icecubes from "../public/apps/icecubes.png"
import elk from "../public/apps/elk.png"
import buffer from "../public/apps/buffer.png"
import ivory from "../public/apps/ivory.png"
import mammoth from "../public/apps/mammoth.png"
import woolly from "../public/apps/woolly.png"
import tuba from "../public/apps/tuba.png"
import type { StaticImageData } from "next/image"

export type appsList = {
  /** the operating system or platform the list of apps is built for */
  [platform: string]: {
    /** the name of the app */
    name: string
    /** app's icon or logo */
    icon: StaticImageData
    /** link to the app on its website or respective app store */
    url: string
    /** the date the app was first released on */
    released_on?: string
    /** whether the app requires a fee to access. defaults to false */
    paid?: boolean
    /** whether the app should be hidden from all, used to avoid duplicates */
    hidden_from_all?: boolean
  }[]
}
export const apps: appsList = {
  android: [
    {
      released_on: "Mar 15, 2017",
      name: "Tusky",
      icon: tusky,
      url: "https://play.google.com/store/apps/details?id=com.keylesspalace.tusky",
    }
  ],
  ios: [
    {
      name: "Toot!",
      icon: toot,
      url: "https://apps.apple.com/app/toot/id1229021451",
      paid: true,
    },
  ],
  web: [
    { name: "Pinafore", icon: pinafore, url: "https://pinafore.social" },
  ],
  desktop: [
    { name: "Tokodon", icon: tokodon, url: "https://apps.kde.org/tokodon/" },
    { name: "Whalebird", icon: whalebird, url: "https://whalebird.social" },

  ],
  sailfish: [
    {
      name: "Tooter",
      icon: tooter,
      url: "https://openrepos.net/content/dysko/tooter",
    },
  ],
}
