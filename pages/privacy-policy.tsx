import BasicPage from "../components/BasicPage"
import Head from "next/head"
import Hero from "../components/Hero"
import { withDefaultStaticProps } from "../utils/defaultStaticProps"
import Layout from "../components/Layout"

/** This page does not require translations */
const PrivacyPolicy = () => (
  <Layout>
    <div dir="ltr" className="[unicode-bidi:plaintext]">
      <Hero>
        <h1 className="h1 mb-4">Politique de la vie privée</h1>
        <p className="sh1"></p>
      </Hero>
      <BasicPage>
        <div>
          <p>
            <strong>
              Cette page concerne la politique de vie privée du site Prepalib.
            </strong>{" "}
            Nous ne collectons pas de données personnelles. Contrairement à la majorité des sites qui vivent sur le modèle de la publicité ciblée, vos données n'ont aucun intérêt pour Prepalib. Nous cherchons juste à vous fournir les meilleurs contenus et les meilleurs services.
          </p>

          <hr className="my-8 border-gray-3" />
        </div>

        <Head>
          <title>Politique de la vie privée - Prepalib</title>
          <meta
            property="og:title"
            content="Politique de la vie privée pour Prepalib"
          />
        </Head>
      </BasicPage>
    </div>
  </Layout>
)
export const getStaticProps = withDefaultStaticProps()
export default PrivacyPolicy
