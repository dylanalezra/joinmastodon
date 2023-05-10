import React from "react"
import Link from "next/link"
import { FormattedMessage } from "react-intl"
import Image from "next/image"
import footerImage from "../public/illustrations/footer.png"
import LogoWhite from "../public/logos/logo_whito.svg?inline"
import GitHub from "../public/ui/github.svg?inline"
import { FaYoutube, FaDiscord, FaInstagram } from "react-icons/fa";

/** Sitewide footer component */
export const Footer = () => (
  <footer className="full-width-bg relative mt-footer-offset bg-chakragreen-300 pb-24 text-center text-white md:pt-24 md:text-start">
    <div className="pointer-events-none absolute bottom-full left-1/2 z-0 ml-[-1px] h-48 w-full -translate-x-1/2 translate-y-[1px] md:bottom-footer-offset md:h-full">
      {/* <Image
        src={footerImage}
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center top"
        placeholder="empty"
        unoptimized
      /> */}
    </div>

    <nav className="full-width-bg__inner relative z-10">
      <div className="grid gap-x-4 gap-y-16 md:grid-cols-12 md:gap-x-5">
        <div className="flex flex-col items-center gap-8 text-white md:col-start-1 md:col-end-5 md:items-start lg:col-start-1 lg:col-end-5">
          <LogoWhite className="w-20 max-w-full" fill="currentColor" />
          <p className="mt-2 max-w-[28ch]">
            <FormattedMessage
              id="footer.quip"
              defaultMessage="Donnez-vous les moyens de réussir !"
            />
          </p>
        </div>

        <div className="grid gap-10 gap-x-4 md:col-start-6 md:col-end-13 md:grid-cols-3 md:gap-x-5">
          {[
            {
              heading: (
                <FormattedMessage
                  id="nav.product.title"
                  defaultMessage="Produits"
                />
              ),
              links: [
                <Link key="servers" href="/servers">
                  <a className="inline-block py-2 hover:underline">
                    <FormattedMessage
                      id="nav.servers.title"
                      defaultMessage="Les contenus"
                    />
                  </a>
                </Link>,
                <Link key="apps" href="/apps">
                  <a className="inline-block py-2 hover:underline">
                    <FormattedMessage
                      id="nav.apps.title"
                      defaultMessage="Applications"
                    />
                  </a>
                </Link>,
                <Link key="sponsors" href="/sponsors">
                  <a className="inline-block py-2 hover:underline">
                    <FormattedMessage
                      id="nav.sponsors.title"
                      defaultMessage="Soutenir"
                    />
                  </a>
                </Link>,
                <Link key="roadmap" href="/roadmap">
                  <a className="inline-block py-2 hover:underline">
                    <FormattedMessage
                      id="nav.roadmap.title"
                      defaultMessage="Feuille de route"
                    />
                  </a>
                </Link>,
              ],
            },
            {
              heading: (
                <FormattedMessage
                  id="nav.resources.title"
                  defaultMessage="Resources"
                />
              ),
              links: [
                <a
                  className="inline-block py-2 hover:underline"
                  key="mastodon/mastodon"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.dropbox.com/home/Prepalib"
                >
                  <FormattedMessage
                    id="nav.code.title"
                    defaultMessage="Toute la Dropbox"
                  />
                </a>,
                <a
                  className="inline-block py-2 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  key="https://blog.prepalib.fr"
                  href="https://blog.prepalib.fr/"
                >
                  <FormattedMessage id="nav.blog.title" defaultMessage="Blog" />
                </a>,
                <a
                  className="inline-block py-2 hover:underline"
                  key="mastodon/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="mailto:dylan.alezra@gmail.com"
                >
                  <FormattedMessage
                    id="nav.support.title"
                    defaultMessage="Contact"
                  />
                </a>,
              ],
            },
            {
              heading: (
                <FormattedMessage
                  id="nav.company.title"
                  defaultMessage="Prepalib"
                />
              ),
              links: [
                <Link key="/about" href="/about">
                  <a className="inline-block py-2 hover:underline">
                    <FormattedMessage
                      id="nav.about_us.title"
                      defaultMessage="A propos"
                    />
                  </a>
                </Link>,
              ],
            },
          ].map((menu, i) => (
            <div className="flex flex-col gap-2" key={i}>
              <h2 className="h6 py-1">{menu.heading}</h2>
              <ul className="b2 m-0 flex flex-col gap-2 p-0 text-black">
                {menu.links.map((link) => (
                  <li key={link.key}>{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-6 border-nightshade-600 sm:mx-auto lg:my-8" />

      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-center text-black md:text-start">
          Copyright © 2023 Prepalib.{" "}
          <span aria-hidden>{" • "}</span>
          <Link href="/privacy-policy">
            <a className="hover:underline">
              <FormattedMessage
                id="nav.privacy_policy.title"
                defaultMessage="Politique de confidentialité"
              />
            </a>
          </Link>
          <span aria-hidden>{" • "}</span>
        </span>

        <div className="mt-4 flex space-x-2 justify-center md:mt-0 md:space-x-6">
          <a
            href="https://www.youtube.com/channel/UCQyH7onDYssixio1DNcekIA"
            rel="noopener noreferrer"
            target="_blank"            
            className="text-nightshade-100 hover:text-nightshade-50"
          >
            <FaYoutube className="h-5 w-5" fill="white" />
            <span className="sr-only">
              Youtube
            </span>
          </a>
          <a
            href="https://discord.gg/nPpB63Nbby"
            className="text-nightshade-100 hover:text-nightshade-50"
          >
            <FaDiscord className="h-5 w-5" fill="white" />
            <span className="sr-only">
              Discord
            </span>
          </a>
          <a
            href="https://www.instagram.com/prepalib/?hl=fr"
            rel="noopener noreferrer"
            target="_blank"

            className="text-nightshade-100 hover:text-nightshade-50"
          >
            <FaInstagram className="h-5 w-5" fill="white" />
            <span className="sr-only">
              Instagram
            </span>
          </a>
        </div>
      </div>
    </nav>
  </footer>
)

export default Footer
