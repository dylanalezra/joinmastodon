import patreonData from "./patreon.json"

const sponsors = {
  additionalFunding: [],
  platinum: [
    {
      url: "https://www.weid.education/",
      logo: require("../public/sponsors/weid.png"),
      name: "Weid",
    },
  ],
  gold: [
  ],
  silver: [
    {
      url: "https://www.linkedin.com/in/simon-chaussende/",
      logo: require("../public/sponsors/simonchaussende.jpeg"),
      name: "Simon C. / Weid",
      nofollow: false
    },
    {
      url: "https://www.linkedin.com/in/david-colle-41784057/",
      logo: require("../public/sponsors/davidcolle.jpeg"),
      name: "David Colle / Weid",
      nofollow: false
    }

  ],
  generalHighlighted: [
  ],
  general: [{
    }
  ]
}

export const {
  platinum,
  additionalFunding,
  gold,
  silver,
  generalHighlighted,
  general,
} = sponsors
export default sponsors
