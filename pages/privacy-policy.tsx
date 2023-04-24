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
        <h1 className="h1 mb-4">Politique de confidentialité</h1>
      </Hero>
      <BasicPage>
        <div>
          <p>
            <strong>
              Cette page concerne la politique dela vie privée de Prepalib.
            </strong>{" "}
            Nous ne collectons pas de données personnelles dans le cadre du site.
          </p>

          <hr className="my-8 border-gray-3" />

          <p>
            <strong>
              Si vous envoyez un e-mail, nous collectons, de fait, votre adresse e-mail (et éventuellement votre nom). Vous donnez implicitement votre accord pour recevoir une réponse.
            </strong>
          </p>
          <p className="mt-4">
            Dans l&apos;éventualité de la mise en place d&apos;une newsletter, vous pourrez vous désinscrire.
          </p>
          <p className="mt-4">
            
          </p>
        </div>

        <Head>
          <title>Politique de confidentialité - Prepalib</title>
          <meta
            property="og:title"
            content="Privacy Policy for joinmastodon.org"
          />
        </Head>
      </BasicPage>
    </div>
  </Layout>
)
export const getStaticProps = withDefaultStaticProps()
export default PrivacyPolicy
