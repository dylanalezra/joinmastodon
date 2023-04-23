export type Testimonial = {
  /** User's preferred image */
  avatar: string
  /** User's preferred name */
  name: string
  /** User's Mastodon username */
  username: string
  /** Tetimonial quote. Omit wrapping quotes and ending attribution */
  text: string
  /** Absolute link to profile */
  profile_url: string
}
const testimonials: Testimonial[] = [
  {
    text: "Avec les cours de Prepalib, je suis devenu première de ma classe en économie, et j'ai eu 19 à l'ESCP.",
    name: "Clélie",
    username: "EDHEC 2022",
    avatar: "/testimonials/avatar_trwnh.png",
    profile_url: "https://mastodon.social/@trwnh",
  },
  {
    text: "Je viens de finir votre livre Le Jeu de la Prepa, je l’ai adoré ! Il m’a vraiment confirmé ma motivation à intégrer HEC. J’ai tout de suite téléchargé vos flashcards. Merci beaucoup, la vision de la prépa que vous avez présentée m’a aidé à bien fixer mon objectif. C’est une des lectures qui m’a le plus marquée.",
    name: "Lucie",
    username: "ECG (ESH/Maths approfondies)",
    avatar: "/testimonials/avatar_jennschiffer.jpeg",
    profile_url: "https://pixel.kitchen/@jenn",
  },
  {
    text: "Je ne pensais pas préparer le concours des IEP. Sans les ressources de Prepalib, je n'aurais jamais préparé le concurs à peine un mois l'avance, et je n'aurais certainnement pas eu l'IEP de Lille",
    name: "A.D",
    username: "IEP Lille 2016",
    avatar: "/testimonials/avatar_dansup.jpg",
    profile_url: "https://mastodon.social/@dansup",
  },
  {
    text: "Si seulement, j'avais découvert Prepalib plus tôt !",
    name: "Inès",
    username: "ENS Ulm 2019",
    avatar: "/testimonials/avatar_craigmaloney.jpeg",
    profile_url: "https://octodon.social/@craigmaloney",
  },
  {
    text: "Je ne vois pas comment j'aurais pu envisagé et structurer mes révisions sans Prepalib...",
    name: "Camille",
    username: "EM Lyon 2018",
    avatar: "/testimonials/avatar_ulrichkelber.png",
    profile_url: "https://bonn.social/@ulrichkelber",
  },
  {
    text: "Tous les contenus sur Prepalib, toute l'argument du jeu de la prépa, c'est tout ce que j'aurais aimé savoir si j'avais été en prépa !",
    name: "Dylan",
    username: "ENS Ulm 2017",
    avatar: "/testimonials/avatar_jaz.jpeg",
    profile_url: "https://toot.wales/@jaz",
  },
  {
    text: "Super cours sur l'Alimentation. Merci beaucoup pour cette superbe  initiative  qui m'aide énormément car n'ayant pas les moyens de me payer les formations payantes",
    name: "Eliott",
    username: "IEP 2023",
    avatar: "/testimonials/avatar_jarm.jpeg",
    profile_url: "https://qdon.space/@jarm",
  },
  {
    text: "C'est le meilleur site pour la prépa !",
    name: "Ilyes",
    username: "ECG 2023",
    avatar: "/testimonials/avatar_vopo.jpg",
    profile_url: "https://mastodon.social/@Vopo",
  },
  {
    text: "C'est hyper satisfaisant de ne plus avoir à chercher des cours sur internet, tout est déjà là !",
    name: "Maxime",
    username: "ENS Rennes 2022",
    avatar: "/testimonials/avatar_noellabo.png",
    profile_url: "https://fedibird.com/@noellabo",
  },
  {
    text: "C'est incroyable d'avoir accès à des contenus d'aussi bonne qualité, bien mieux que ceux de mes profs, gratuitement !",
    name: "Ulysse",
    username: "EDHEC 2021",
    avatar: "/testimonials/avatar_halcy.jpg",
    profile_url: "https://icosahedron.website/@halcy",
  },
]
export default testimonials
