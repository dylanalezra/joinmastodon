import Head from "next/head"
import { FormattedMessage, useIntl } from "react-intl"
import Hero from "../components/Hero"
import SponsorCard from "../components/SponsorCard"
import SponsorLogoGroup from "../components/SponsorLogoGroup"
import TwoUpFeature from "../components/TwoUpFeature"
import { withDefaultStaticProps } from "../utils/defaultStaticProps"
import sponsors from "../data/sponsors"
import sponsorData from "../data/sponsors"
import Layout from "../components/Layout"

import DonateIcon from "../public/icons/donate.svg?inline"
import DonateBoxIcon from "../public/icons/donate-box.svg?inline"

function Sponsors() {
  const intl = useIntl()
  return (
    <Layout>
      <Hero>
        <h1 className="h1 mb-5 lg:col-start-2">
          <FormattedMessage id="sponsors" defaultMessage="Soutenir" />
        </h1>
        <p className="sh1 lg:col-start-2 lg:col-end-6">
          <FormattedMessage
            id="sponsors.hero.body"
            defaultMessage="Vous pouvez nous soutenir en faisant un don sur HelloAsso ou bien établir un partenariat pour afficher votre logo sur le site. Les ressources collectées permettent de financer le fonctionnement de l'association."
          />
        </p>
      </Hero>

      <TwoUpFeature
        padding="md:!pt-1"
        features={[
          {
            Icon: DonateIcon,
            title: (
              <FormattedMessage
                id="sponsors.sponsorship.title"
                defaultMessage="Partenariat"
              />
            ),
            copy: (
              <FormattedMessage
                id="sponsors.sponsorship.body"
                defaultMessage="Si vous souhaitez voir le logo de votre entreprise affiché, n'hésitez pas à nous contacter pour établir un partenariat !"
              />
            ),
            cta: (
              <FormattedMessage
                id="sponsors.become_a_sponsor"
                defaultMessage="Devenir partenaire"
              />
            ),
            cta_link: "mailto:dylan.alezra@cepremap.org",
          },
          {
            Icon: DonateBoxIcon,
            title: (
              <FormattedMessage
                id="sponsors.patreon.title"
                defaultMessage="Faire un don"
              />
            ),
            copy: (
              <FormattedMessage
                id="sponsors.patreon.body"
                defaultMessage="Faire un don sur HelloAsso vous permettra d'avoir accès à certaines comepensations, en plus d'être dans les remerciements du site."
              />
            ),
            cta: (
              <FormattedMessage
                id="sponsors.patreon.cta"
                defaultMessage="Aller sur HelloAsso"
              />
            ),
            cta_link: "https://www.helloasso.com/associations/prepalib",
          },
        ]}
      />

      <section className="platinum-gold-sponsors mb-32">
        <h2 className="h4 mb-10 text-center">
          <FormattedMessage
            id="sponsors.supported_by"
            defaultMessage="Soutenu par"
          />
        </h2>
        <SponsorLogoGroup
          sponsors={[...sponsorData.platinum, ...sponsorData.gold]}
        />
      </section>

      <section className="silver-sponsors mb-32">
        <h2 className="h5 mb-8">
          <FormattedMessage id="sponsors" defaultMessage="Partenaires" />
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-gutter">
          {sponsorData.silver.map((sponsor, i) => {
            if (sponsor.url) {
              return (
                <a
                  key={i}
                  href={sponsor.url}
                  rel={sponsor.nofollow ? "nofollow" : undefined}
                >
                  <SponsorCard sponsor={sponsor} tier="silver" />
                </a>
              )
            } else {
              return <SponsorCard key={i} sponsor={sponsor} tier="silver" />
            }
          })}
        </div>
      </section>

      <section className="general-sponsors mb-24">
        <h2 className="h5 mb-8">
          <FormattedMessage
            id="sponsors.additional_thanks_to"
            defaultMessage="Nous remercions également"
          />
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-1">
          {sponsors.generalHighlighted.map((sponsor) => {
            return (
              <SponsorCard
                key={sponsor}
                sponsor={sponsor}
                tier="generalHighlighted"
              />
            )
          })}
          {sponsors.general.map((sponsor, i) => {
            return (
              <SponsorCard
                key={`sponsor-${i}`}
                sponsor={sponsor}
                tier="general"
              />
            )
          })}
        </div>
      </section>
      <Head>
        <title>
          {intl.formatMessage({
            id: "sponsors.page_title",
            defaultMessage: "Partnaires de Prepalib",
          })}{" "}
          - Prepalib
        </title>
        <meta
          property="og:title"
          content={intl.formatMessage({
            id: "sponsors.page_title",
            defaultMessage: "Partenaires de Prepalib",
          })}
        />
        <meta
          name="description"
          content={intl.formatMessage({
            id: "sponsors.page_description",
            defaultMessage:
              "Voir les personnes et les entreprises qui ont participé au développement de Prepalib.",
          })}
        />
        <meta
          property="og:description"
          content={intl.formatMessage({
            id: "sponsors.page_description",
            defaultMessage:
              "Voir les personnes et les entreprises qui ont participé au développement de Prepalib.",
          })}
        />
      </Head>
    </Layout>
  )
}
export default Sponsors

export const getStaticProps = withDefaultStaticProps()
