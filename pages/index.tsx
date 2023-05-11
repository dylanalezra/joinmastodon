import { useEffect, useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import Image from "next/image"
import Head from "next/head"
import classnames from "classnames"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import resolveConfig from "tailwindcss/resolveConfig"
import twConfig from "../tailwind.config"

import { withDefaultStaticProps } from "../utils/defaultStaticProps"
import LinkButton from "../components/LinkButton"
import TestimonialCard from "../components/TestimonialCard"
import SponsorLogoGroup from "../components/SponsorLogoGroup"
import { IconCard } from "../components/IconCard"

import testimonials from "../data/testimonials"
import { platinum, additionalFunding } from "../data/sponsors"

import illoTimeline from "../public/homepage/features_timeline.png"
import illoAudience from "../public/homepage/features_audience.png"
import illoModeration from "../public/homepage/features_moderation.png"
import illoCustomization from "../public/homepage/features_customization.png"
import illoWorld from "../public/homepage/features_timeline.png"

import homeHeroMobile from "../public/illustrations/home_hero_mobile.webp"
import homeHeroDesktop from "../public/illustrations/home_hero_desktop.png"
import Hero from "../components/Hero"
import { getDirForLocale } from "../utils/locales"
import { useRouter } from "next/router"
import Layout from "../components/Layout"

function Home() {
  const intl = useIntl()

  return (
    <Layout>
      <Hero
        mobileImage={homeHeroMobile}
        desktopImage={homeHeroDesktop}
        homepage
      >
        <h1 className="h1 mb-4 max-w-[17ch] md:mb-7">
          <FormattedMessage
            id="home.hero.headline"
            defaultMessage="Une prépa en libre accès."
          />
        </h1>

        <p className="sh1 mb-11 max-w-[50ch]">
          <FormattedMessage
            id="home.hero.body"
            defaultMessage="Vous devriez pouvoir préparer vos concours et vos examens dans les meilleures conditions avec des contenus de qualité. Peu importe votre prépa, votre lycée ou votre origine sociale. Donnez-vous les moyens de réussir."
          />
        </p>

        <div className="flex justify-center gap-12">
          <LinkButton size="large" href="/servers">
            <FormattedMessage
              id="home.get_the_app"
              defaultMessage="Accéder aux contenus"
            />
          </LinkButton>

          <LinkButton size="large" href="https://discord.gg/nPpB63Nbby" light borderless>
            <FormattedMessage
              id="home.create_account"
              defaultMessage="Rejoindre Discord"
            />
          </LinkButton>
        </div>
      </Hero>
      <Features />
      <WhyMastodon />
      <Testimonials testimonials={testimonials} />
      <Sponsors sponsors={{ platinum, additionalFunding }} />
      <Head>
        <title>
          Prepalib -{" "}
          {intl.formatMessage({
            id: "home.page_title",
            defaultMessage: "Une prépa en libre accès",
          })}
        </title>

        <meta
          property="og:title"
          content={`Prepalib - ${intl.formatMessage({
            id: "home.page_title",
            defaultMessage: "Une prépa en libre accès",
          })}`}
        />
        <meta
          property="og:description"
          content={intl.formatMessage({
            id: "home.page_description",
            defaultMessage:
              "En savoir plus sur Prepalib, un site associatif dédié aux élèves de prépa.",
          })}
        />
        <meta
          property="description"
          content={intl.formatMessage({
            id: "home.page_description",
            defaultMessage:
              "En savoir plus sur Prepalib, un site associatif dédié aux élèves de prépa.",
          })}
        />
      </Head>
    </Layout>
  )
}

export default Home

const Features = () => {
  return (
    <section>
      {[
        {
          title: (
            <FormattedMessage
              id="home.features.timeline.title"
              defaultMessage="Un contenu de qualité supérieure"
            />
          ),
          body: (
            <FormattedMessage
              id="home.features.timeline.body"
              defaultMessage="Pourquoi devoir subir votre mauvaise prépa ou de mauvais professeurs ? Pourquoi payer des sommes exorbitantes pour accéder à de l’information qui aurait dû être fournie gratuitement ? Face à ces défaillances, accédez directement à tout ce dont vous avez besoin pour préparer vos concours et examens. Ne perdez plus de temps."
            />
          ),
          button: (
            <LinkButton
              size="large"
              href="/servers"
            >
              <FormattedMessage
                id="home.features.button.learn_more"
                defaultMessage="Voir les contenus"
              />
            </LinkButton>
          ),
          image: illoTimeline,
        },
        {
          title: (
            <FormattedMessage
              id="home.features.audience.title"
              defaultMessage="Rejoignez une communauté de prépas"
            />
          ),
          body: (
            <FormattedMessage
              id="home.features.audience.body"
              defaultMessage="Notre serveur rassemble une communauté d'élèves de classes prépas. Ensemble, nous partageons nos connaissances, nos astuces et nos conseils pour réussir dans ces parcours exigeants. Nous organisons également des points hebdomadaires en vocal pour discuter de sujets de concours. Venez échanger avec nous !"
            />
          ),
          button: (
            <LinkButton
              size="large"
              href="https://discord.gg/nPpB63Nbby"
            >
              <FormattedMessage
                id="home.features.button.learn_more"
                defaultMessage="Rejoindre le Discord"
              />
            </LinkButton>
          ),
          image: illoAudience,
        },
        {
          title: (
            <FormattedMessage
              id="home.features.moderation.title"
              defaultMessage="L'intelligence artificielle pour instruire"
            />
          ),
          body: (
            <FormattedMessage
              id="home.features.moderation.body"
              defaultMessage="Prepalib développe un ensemble d’outils à l’aide de la révolution actuelle en IA pour aider les élèves à préparer leurs épreuves, que ce soit pour apprendre le cours, résoudre des problèmes de mathématiques ou encore rédiger une dissertation dans n’importe quelle matière. Ces projets sont encore en développement, et vous pouvez en suivre l’avancement."
            />
          ),
          button: (
            <LinkButton size="large" href="/apps">
              <FormattedMessage
                id="home.features.button.find_a_server"
                defaultMessage="Voir les applications"
              />
            </LinkButton>
          ),
          image: illoModeration,
        },
        {
          title: (
            <FormattedMessage
              id="home.features.self_expression.title"
              defaultMessage="Le jeu de la prépa"
            />
          ),
          body: (
            <FormattedMessage
              id="home.features.self_expression.body"
              defaultMessage="Prepalib cherche à développer la compréhension du système scolaire, proposer une nouvelle vision et la communiquer au plus grand nombre. Ne vous contentez pas de subir votre prépa, devenez en un acteur ! Comprenez comment le système fonctionne pour en tirer le plus de bénéfices pour vous. Posez-vous les bonnes questions. C’est ce que le livre le jeu de la prépa vous aide à faire."
            />
          ),
          button: (
            <LinkButton
              size="large"
              href="https://www.dropbox.com/s/7rdy2nf9uyztju5/Le%20jeu%20de%20la%20pr%C3%A9pa.pdf?dl=0"
            >
              <FormattedMessage
                id="home.features.button.learn_more"
                defaultMessage="Lire le livre"
              />
            </LinkButton>
          ),
          image: illoCustomization,
        },
      ].map((block, i) => {
        const isOdd = i % 2 != 0
        return (
          <div
            className={classnames("full-width-bg", isOdd && "bg-gray-5")}
            key={i}
          >
            <div className="full-width-bg__inner pt-14 pb-[4.5rem] md:grid md:grid-cols-2 md:items-center md:gap-gutter xl:grid-cols-12">
              <div
                className={classnames(
                  "row-span-full xl:col-span-5",
                  isOdd ? "xl:col-start-2" : "order-2 xl:col-start-8"
                )}
              >
                <Image src={block.image} alt="" />
              </div>

              <div
                className={classnames(
                  "row-span-full xl:col-span-5",
                  isOdd ? "xl:col-start-8" : "xl:col-start-2"
                )}
              >
                <h2 className="h4 md:h2 mb-2 md:mb-5">{block.title}</h2>
                <p className="sh1 mb-8 text-gray-1">{block.body}</p>
                {block.button}
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

const WhyMastodon = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const fullConfig = resolveConfig(twConfig)

  const options = {
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      [`(min-width: ${fullConfig.theme.screens["md"]})`]: {
        disabled: true,
      },
    },
  }
  const [sliderRef, instanceRef] = useKeenSlider(options)

  return (
    <section className="py-20">
      <h3 className="h3 pb-16 text-center">
        <FormattedMessage id="home.why.title" defaultMessage="Pourquoi faire confiance à Prepalib ?" />
      </h3>
      <div dir="ltr">
        <div
          ref={sliderRef}
          className="keen-slider mb-8 md:mb-0 md:grid md:grid-cols-2 md:gap-gutter lg:grid-cols-3"
        >
          <IconCard
            className="keen-slider__slide shadow-none md:border md:border-gray-3"
            title={
              <FormattedMessage
                id="home.why.decentralized.title"
                defaultMessage="Expérience"
              />
            }
            icon="decentralized"
            copy={
              <FormattedMessage
                id="home.why.decentralized.copy"
                defaultMessage="Nous nous appuyons sur l’expérience et les ressources de candidats ayant réussi les plus grandes écoles (HEC, ENS Ulm, IEP, etc.) pour construire un service d’une qualité importante. Dans chaque matière, soyez assuré de trouver les meilleurs contenus possibles."
              />
            }
          />
          <IconCard
            className="keen-slider__slide shadow-none md:border md:border-gray-3"
            title={
              <FormattedMessage
                id="home.why.opensource.title"
                defaultMessage="Open Source"
              />
            }
            icon="open-source"
            copy={
              <FormattedMessage
                id="home.why.opensource.copy"
                defaultMessage="Prepalib est une association loi 1901. Les services fournis par Prepalib et leurs développement sont pour vous mais aussi grâce à vous. Nous développons un maximum de contenus de façon complètement open-source, de sorte à ce que chacun puisse en bénéficier, et éventuellement à son tour y contribuer."
              />
            }
          />
          <IconCard
            className="keen-slider__slide shadow-none md:border md:border-gray-3"
            title={
              <FormattedMessage
                id="home.why.not_for_sale.title"
                defaultMessage="Résoudre vos problèmes"
              />
            }
            icon="price-tag"
            copy={
              <FormattedMessage
                id="home.why.not_for_sale.copy"
                defaultMessage="Les concours et les examens sont une source d'anxiété lorsqu'on ne comprend pas ou que l'on a pas à sa disposition les bons contenus. Nous cherchons avant tout à résoudre les problèmes associés au milieu scolaire, et notamment le manque terrible d'égalité des chances entre élèves."
              />
            }
          />
        </div>
        {loaded && instanceRef.current && (
          <div className="flex items-center justify-center gap-2 md:hidden">
            {instanceRef.current.slides.map((_, idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx)
                  }}
                  className={
                    "rounded-[50%] p-1.5 " +
                    (currentSlide === idx ? "bg-blurple-500" : "bg-gray-3")
                  }
                ></button>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

const Testimonials = ({ testimonials }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const fullConfig = resolveConfig(twConfig)

  const options = {
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      [`(min-width: ${fullConfig.theme.screens["md"]})`]: {
        slides: { perView: 2, spacing: 16 },
      },
      [`(min-width: ${fullConfig.theme.screens["lg"]})`]: {
        slides: { perView: 3, spacing: 16 },
      },
    },
  }
  const [sliderRef, instanceRef] = useKeenSlider(options)

  return (
    <section className="full-width-bg bg-gray-5 pt-20 pb-28">
      <div className="full-width-bg__inner">
        <h2 className="h3 pb-16 text-center">
          <FormattedMessage
            id="home.testimonials.title"
            defaultMessage="Ce qu'en disent les élèves"
          />
        </h2>

        <div dir="ltr">
          <div ref={sliderRef} className="keen-slider mb-8">
            {testimonials.map((testimonial) => {
              return (
                <TestimonialCard
                  key={testimonial.name}
                  testimonial={testimonial}
                />
              )
            })}
          </div>
          {loaded && instanceRef.current && (
            <div className="flex items-center justify-center gap-2">
              {testimonials.map((_, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx)
                    }}
                    className={
                      "rounded-[50%] p-1.5 " +
                      (currentSlide === idx ? "bg-chakragreen-300" : "bg-gray-3")
                    }
                  ></button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

const Sponsors = ({ sponsors }) => {
  return (
    <section className="grid gap-x-gutter text-center lg:grid-cols-12">
      <div className="py-20 lg:col-span-12 lg:grid lg:grid-cols-12 lg:gap-x-gutter lg:py-28">
        <div className="mx-auto mb-12 max-w-lg lg:col-span-4 lg:col-start-5 lg:mb-10 lg:w-full">
        </div>

        <div className=" lg:col-span-8 lg:col-start-3">
          <h2 className="h2 mb-6">
            <FormattedMessage
              id="home.sponsors.title"
              defaultMessage="Préserver la gratuité"
            />
          </h2>

          <p className="b1 lg:sh1 mb-12 lg:mb-10">
            <FormattedMessage
              id="home.sponsors.body"
              defaultMessage="Prepalib est une association loi 1901. Les services fournis par Prepalib et leurs développement sont pour vous mais aussi grâce à vous."
            />
          </p>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <LinkButton href="https://www.helloasso.com/associations/prepalib/" size="large">
              <FormattedMessage
                id="sponsors.become_a_sponsor"
                defaultMessage="Soutenir Prepalib"
              />
            </LinkButton>

            <LinkButton href="/sponsors" light size="large">
              <FormattedMessage
                id="credits.view_sponsors"
                defaultMessage="Voir les partenaires"
              />
            </LinkButton>
          </div>
        </div>
      </div>

      <h3 className="h5 mb-8 text-center lg:col-span-12">
        <FormattedMessage
          id="sponsors.supported_by"
          defaultMessage="Soutenu par"
        />
      </h3>

      <div className="lg:col-start-2 lg:col-end-12">
        <SponsorLogoGroup sponsors={sponsors.platinum} />
      </div>
    </section>
  )
}

export const getStaticProps = withDefaultStaticProps()
