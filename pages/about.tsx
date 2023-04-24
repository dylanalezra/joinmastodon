import BasicPage from "../components/BasicPage"
import Head from "next/head"
import Hero from "../components/Hero"
import { withDefaultStaticProps } from "../utils/defaultStaticProps"
import Layout from "../components/Layout"
import heroImage from "../public/illustrations/apps_hero_desktop.png"
import Image from "next/image"
import { FormattedDate, FormattedMessage } from "react-intl"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import Statistic from "../components/Statistic"
import { Day } from "../types/api"
import team from "../data/team"
import interviews from "../data/interviews"
import press from "../data/press"
import LinkWithArrow from "../components/LinkWithArrow"
import PressArticle from "../components/PressArticle"

import PersonIcon from "../public/ui/person.svg?inline"
import FiltersIcon from "../public/ui/filters.svg?inline"
import LogoWhite from "../public/logos/logo-white.svg?inline"

const About = () => (
  <Layout>
    <div dir="ltr" className="[unicode-bidi:plaintext]">
      <Hero desktopImage={heroImage} mobileImage={heroImage}>
        <h1 className="h1">Prepalib</h1>
        <p className="sh1">Prepalib est une association dont le but est de fournir le plus de ressources gratuites aux élèves qui préparent des concours et des examens.</p>
      </Hero>

      <div className="full-width-bg">
    <div className="full-width-bg__inner">
        <div className="grid grid-cols-12 gap-y-24 py-20 md:gap-x-12">
            <div className="col-span-12 md:col-span-12">
                <h2 className="h3 mb-6">Concept</h2>

              <p className="b1 mb-4">
                <strong>
                  Prepalib est une association dont le but est de fournir le plus de ressources gratuites aux élèves qui préparent des concours et des examens.
                </strong>{" "}
                Prepalib a débuté en 2021. Le but de Prepalib est simple : répondre à la demande des élèves qui cherchent à avoir de bons cours. Trop de fois, les élèves sont dépendants de mauvais profs, d&apos;un mauvais contexte de travail, d&apos;un manque d&apos;information. 
              </p>
              <p className="b1 mb-4">
                Nous pensons que le système scolaire doit non seulement être grandement amélioré en diffusant le plus possible l&apos;information, que ce soit des cours ou des explications sur le fonctionnement du système scolaire.
              </p>
              <p className="b1 mb-4">
                Nous pensons également que l&apos;intelligence artificielle représente une révolution pour l&apos;enseignement et l&apos;éducation. Il nous paraît essentiel de parvenir à l&apos;intégrer dans les façons de fonctionner du système scolaire.
              </p>
              <p className="b1 mb-6">
                <strong>
                L&apos;objectif de Prepalib est de parvenir à complétemenet transformer le système scolaire, au moins pour les classes prépa, d&apos;ici à 2024, en s&apos;appuyant sur des contenus de grande qualité et l&apos;intelligence artificielle.
                </strong>
              </p>
            </div>

          </div>
        </div>
      </div>

      <Head>
        <title>A propos - Prepalib</title>
        <meta property="og:title" content="Prepalib " />
        <meta
          property="og:description"
          content="Our story, mission, annual reports, interviews, press releases and more."
        />
        <meta
          property="description"
          content="Our story, mission, annual reports, interviews, press releases and more."
        />
      </Head>
    </div>
  </Layout>
)

const Metrics = () => {
  const days = useQuery<Day[]>(
    ["statistics"],
    () =>
      fetch("https://api.joinmastodon.org/statistics").then((res) =>
        res.json()
      ),
    { cacheTime: 30 * 60 * 1000 }
  )

  if (days.isError || days.isLoading) {
    return null
  }

  const currentDay = days.data[days.data.length - 2]
  const compareDay = days.data[0]

  return (
    <>
      <div className="space-y-4">
        <Statistic
          key="mau"
          Icon={PersonIcon}
          label={
            <FormattedMessage
              id="stats.monthly_active_users"
              defaultMessage="Monthly Active Users"
            />
          }
          currentValue={parseInt(currentDay.active_user_count)}
          prevValue={parseInt(compareDay.active_user_count)}
        />

        <Statistic
          key="servers"
          Icon={FiltersIcon}
          label={
            <FormattedMessage id="stats.servers" defaultMessage="Servers Up" />
          }
          currentValue={parseInt(currentDay.server_count)}
          prevValue={parseInt(compareDay.server_count)}
        />
      </div>

      <p className="b3 mt-4 text-gray-2">
        <FormattedMessage
          id="stats.disclaimer"
          defaultMessage="Data collected by crawling all accessible Mastodon servers on {date}."
          values={{
            date: (
              <FormattedDate
                value={currentDay.period}
                year="numeric"
                month="short"
                day="2-digit"
              />
            ),
          }}
        />
      </p>
    </>
  )
}

export const getStaticProps = withDefaultStaticProps()

export default About
