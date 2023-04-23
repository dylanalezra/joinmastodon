import { sortBy as _sortBy } from "lodash"

import downloadOnGooglePlay from "../public/badges/google-play.svg"
import downloadOnAppStore from "../public/badges/app-store.svg"

import { FormattedMessage, useIntl } from "react-intl"
import Head from "next/head"
import Image from "next/image"
import AppHero from "../components/AppHero"
import { withDefaultStaticProps } from "../utils/defaultStaticProps"
import footer_festival from "../public/illustrations/footer_festival.png"
import AppsGrid from "../components/AppsGrid"
import TwoUpFeature from "../components/TwoUpFeature"
import { apps as appsList } from "../data/apps"
import Hero from "../components/Hero"
import appsHeroDesktop from "../public/illustrations/apps_hero_desktop.png"
import appsHeroMobile from "../public/illustrations/apps_hero_mobile.png"
import ios_android_apps from "../public/illustrations/ios_android_apps.png"
import Layout from "../components/Layout"

import ProgressiveWebIcon from "../public/icons/progressive-web.svg?inline"
import ApiGearIcon from "../public/icons/api-gear.svg?inline"

const AppsPage = () => {
  const intl = useIntl()
  return (
    <Layout>
      <Hero desktopImage={appsHeroDesktop} mobileImage={appsHeroMobile}>
        <div className="app-intro">
          <div className="container">
            <div className="app-intro__hero">
              <div className="app-intro__hero__unit">
                <h1 className="h1 mb-4">
                  <FormattedMessage id="apps.title" defaultMessage="Applications" />
                </h1>

                <p className="sh1">
                  <FormattedMessage
                    id="apps.lead"
                    defaultMessage="Prepalib cherche à utiliser au mieux l'intelligence artificielle pour aider les élèves. Nous développons actuellement un projet d'IA pour les examens et les concours. Par ailleurs, nous centralisons les meilleures instructions pour utiliser les IA dans le cadre de votre préparation."
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </Hero>

      <div className="grid justify-center gap-x-gutter gap-y-16 pt-1 pb-1 text-center md:grid-cols-12 md:text-start">
        <div className="md:col-span-6 lg:col-span-5 xl:col-span-4 xl:col-start-2">
          <h2 className="h4 mb-4">
          </h2>

          <div className="grid grid-cols-2 justify-center gap-gutter md:justify-start">
            <a href="https://apps.apple.com/us/app/mastodon-for-iphone/id1571998974">
            </a>
            <a href="https://play.google.com/store/apps/details?id=org.joinmastodon.android">
            </a>
          </div>
        </div>
        <div className="md:col-span-6 md:-mt-16 lg:col-span-5 lg:col-start-7 lg:-mt-32 xl:-mt-80">
          <div className="mx-auto max-w-xs md:max-w-none">
          </div>
        </div>
      </div>

      <TwoUpFeature
        features={[
          {
            Icon: ProgressiveWebIcon,
            title: (
              <FormattedMessage
                id="browse_apps.progressive_web_app"
                defaultMessage="Study Bot"
              />
            ),
            copy: (
              <FormattedMessage
                id="browse_apps.you_can_use_it_from_desktop"
                defaultMessage="Créer une sorte de super-professeur pouvant enseigner et traiter tous les sujets."
              />
            ),
            cta: (
              <FormattedMessage
                id="browse_apps.pwa_feature.cta"
                defaultMessage="En développement"
              />
            ),
            cta_link: "/roadmap",
          },
          {
            Icon: ApiGearIcon,
            title: (
              <FormattedMessage
                id="browse_apps.open_api"
                defaultMessage="Prompt-tutoring"
              />
            ),
            copy: (
              <FormattedMessage
                id="browse_apps.make_your_own"
                defaultMessage="Nous créons une documentation pour recenser les meilleures façons d'utiliser l'IA dans le cadre de vos études."
              />
            ),
            cta: (
              <FormattedMessage
                id="browse_apps.api_docs"
                defaultMessage="En développement"
              />
            ),
            cta_link: "/roadmap",
          },
        ]}
      />
      <Head>
        <title>
          {intl.formatMessage({
            id: "browse_apps.page_title",
            defaultMessage: "Utiliser l'IA pour vos études",
          })}{" "}
          - Prepalib
        </title>
        <meta
          property="og:title"
          content={intl.formatMessage({
            id: "browse_apps.page_title",
            defaultMessage: "Utiliser l'IA pour vos études",
          })}
        />
        <meta
          name="description"
          content={intl.formatMessage({
            id: "browse_apps.page_description",
            defaultMessage:
              "Utiliser l'IA pour vos études",
          })}
        />
        <meta
          property="og:description"
          content={intl.formatMessage({
            id: "browse_apps.page_description",
            defaultMessage:
              "Utiliser l'IA pour vos études",
          })}
        />
      </Head>
    </Layout>
  )
}

export const getStaticProps = withDefaultStaticProps()

export default AppsPage
