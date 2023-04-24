import Link from "next/link"
import { FormattedMessage, useIntl } from "react-intl"

import mastodonLogo from "../public/logos/logo_brand.svg"
import Image from "next/image"
import { useState, useEffect, useRef, useId } from "react"
import classNames from "classnames"
import { locales } from "../data/locales"
import MenuToggle from "./MenuToggle"
import DisclosureArrow from "../public/ui/disclosure-arrow.svg?inline"
import { useRouter } from "next/router"

type HeaderProps = {
  /** determines whether the header is transparent on load, before scrolling down */
  transparent?: boolean
}

/** Sitewide header and navigation */
const Header = ({ transparent = true }: HeaderProps) => {
  const intl = useIntl()
  const router = useRouter()
  const [pageScrolled, setPageScrolled] = useState(false)

  // prettier-ignore
  const navigationItems = [
    {
      value: "/servers",
      label: <FormattedMessage id="nav.servers.title" defaultMessage="Les contenus" />,
    }, {
      value: "/apps",
      label: <FormattedMessage id="nav.apps.title" defaultMessage="Applications" />,
    }, {
      value: "/sponsors",
      label: <FormattedMessage id="nav.sponsors.title" defaultMessage="Soutenir" />,
    }, {
      key: "resources",
      label: <FormattedMessage id="nav.resources.title" defaultMessage="Ressources" />,
      childItems: [
        {
          value: "https://blog.prepalib.fr/",
          compact:false,
          label: <FormattedMessage id="nav.blog.title" defaultMessage="Blog" />,
          description: <FormattedMessage id="nav.blog.description" defaultMessage="Obtenir l'actualité de Prepalib" />,
        }, {
          value: "https://www.dropbox.com/s/7rdy2nf9uyztju5/Le%20jeu%20de%20la%20pr%C3%A9pa.pdf?dl=0",
          compact:false,
          label: <FormattedMessage id="nav.docs.title" defaultMessage="Le jeu de la prépa" />,
          description: <FormattedMessage id="nav.docs.description" defaultMessage="Comprendre comment la prépa fonctionne" />,
        }, {
          value: "mailto:dylan.alezra@cepremap.org",
          compact: false,
          label: <FormattedMessage id="nav.support.title" defaultMessage="Contact" />,
          description: <FormattedMessage id="nav.support.description" defaultMessage="Pour nous contacter" />,
        },
      ],
      footer: {
        value: "https://www.dropbox.com/sh/ae0rxgflp7irmki/AAD7GYpJA-7g4YheO-2iJQ-0a?dl=0",
        label: <FormattedMessage id="nav.code.action" defaultMessage="Tous les contenus" />,
        title: <FormattedMessage id="nav.code.title" defaultMessage="Accédez à la dropbox" />,
        description: <FormattedMessage id="nav.code.description" defaultMessage="Tous les contenus dans la dropbox" />,
      },
    }, 
    {
    key: "locale",
     label: <span aria-label={intl.formatMessage({
       id: "translate_site",
        defaultMessage: "文A, Translate site",
      })}>文A</span>,
     compact: false,
     childItems: locales.map((locale) => ({
         key: locale.code,
         locale: locale.code,
        scroll: false,
         small: false,
         value: "", // current page
         label: locale.language,
       active: router.locale === locale.code,
      })),
    }
  ]
    // set active status on links
    .map((item) => ({ ...item, active: router.asPath === item.value }))

  const {
    mobileMenuOpen,
    openMenuIndex,
    bindToggle,
    bindPrimaryMenu,
    bindPrimaryMenuItem,
    bindSecondaryMenuItem,
  } = useMenu({ navigationItems })

  const checkPageScroll = () => {
    setPageScrolled(window.scrollY > 0)
  }
  useEffect(() => {
    window.addEventListener("scroll", checkPageScroll)
    checkPageScroll()
    return () => {
      window.removeEventListener("scroll", checkPageScroll)
    }
  }, [])

  return (
    <header
      // background needs to be on the ::before for now to get around nested compositing bug in chrome
      className={classNames(
        'full-width-bg sticky -top-[var(--header-offset)] z-20 -mb-[var(--header-area)] pt-[var(--header-offset)] text-black-md before:absolute before:inset-0 before:bg-white/[1] before:backdrop-blur before:transition-opacity before:content-[""]',
        pageScrolled || !transparent ? "before:opacity-100" : "before:opacity-0",
        pageScrolled ? "shadow-md" : ""

      )}
    >
      <div className="full-width-bg__inner flex h-[var(--header-height)] items-center justify-between">
        <div>
          <Link href="/">
            <a className="relative z-10 flex max-w-[11.375rem] pt-[6%] md:max-w-[12.625rem]">
              <Image src={mastodonLogo} alt="Mastodon" />
            </a>
          </Link>
        </div>

        <nav>
          <MenuToggle {...bindToggle()} />
          <ul
            {...bindPrimaryMenu()}
            className={classNames(
              "fixed inset-0 w-screen flex-col overflow-auto bg-black px-1 pt-[calc(var(--header-area)_+_1rem)] pb-8 md:relative md:w-auto md:flex-row md:gap-1 md:overflow-visible md:rounded-md md:bg-[transparent] md:p-1 md:-mie-1 md:mis-0",
              mobileMenuOpen ? "flex" : "hidden md:flex"
            )}
          >
            {navigationItems.slice(0,-1).map((item, itemIndex) => (
              <li className="relative" key={item.key || item.value}>
                {"childItems" in item ? (
                  // Top-level Dropdown
                  <>
                    <button
                      {...bindPrimaryMenuItem(itemIndex, { hasPopup: true })}
                      className="flex items-center gap-[0.125rem] whitespace-nowrap rounded-md p-3 px-5 text-h5 focus:outline-2 md:text-b2 md:font-medium"
                    >
                      {item.label}
                      <DisclosureArrow
                        className={classNames({
                          "rotate-180": openMenuIndex === itemIndex,
                        })}
                      />
                    </button>

                    <div
                      className={classNames(
                        "top-full rounded-md inline-end-0 md:absolute md:max-h-[calc(100vh_-_var(--header-height))] md:bg-white md:text-black md:shadow-lg",
                        openMenuIndex === itemIndex ? "overflow-auto" : "hidden"
                      )}
                    >
                      <ul
                        className={classNames(
                          item.compact
                            ? "py-2 md:px-2"
                            : "w-screen max-w-md py-2 md:grid md:max-w-lg md:grid-cols-2 md:gap-6 md:px-3 md:py-4"
                        )}
                      >
                        {item.childItems.map((child, childIndex) => (
                          // Child Items
                          <li key={child.key || child.value}>
                            <Link
                              href={child.value}
                              locale={ undefined}
                              scroll={child.scroll ?? true}
                            >
                              <a
                                {...bindSecondaryMenuItem(child)}
                                className={classNames(
                                  "block rounded-md hover:md:bg-chakragreen-300 hover:md:text-white text-grey",
                                  item.compact
                                    ? "py-2 px-5 md:px-4"
                                    : "py-3 px-5 md:px-4",
                                  item.compact &&
                                    child.active &&
                                    "font-extrabold"
                                )}
                                aria-current={child.active ? "page" : undefined}
                                target="_blank" 
                              >
                                <span
                                  className={classNames(
                                    "block",
                                    !item.compact && "font-extrabold"
                                  )}
                                >
                                  {child.label}
                                </span>
                                <span className="mt-1 block font-extranormal">
                                  {child.description}
                                </span>
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {item.footer && (
                        <div className="md:bg-gray-4 md:p-4">
                          <a
                            href={item.footer.value}
                            className="group flex items-center justify-between rounded-md px-5 py-3 md:p-2"
                          >
                            <span>
                              <span className="font-extrabold">
                                {item.footer.title}
                              </span>
                              <span className="mt-1 block font-extranormal text-gray-1">
                                {item.footer.description}
                              </span>
                            </span>

                            <span className="b3 hidden h-12 items-center justify-center rounded-md border-2 border-chakragreen-300 bg-chakragreen-300 p-4 !font-semibold text-white transition-colors group-hover:border-chakragreen-400 group-hover:bg-chakragreen-400 md:flex shadow">
                              {item.footer.label}
                            </span>
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  // Top-level Link
                  <Link href={item.value}>
                    <a
                      className={classNames(
                        "block whitespace-nowrap rounded-md p-3 px-5 text-h5 font-medium md:text-b2",
                        item.active && "font-extrabold"
                      )}
                      aria-current={item.active ? "page" : undefined}
                      {...bindPrimaryMenuItem(itemIndex)}
                    >
                      {item.label}
                    </a>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

/**
 * `useMenu` provides a React Hook for managing menu state and attributes for accessibility.
 */
const useMenu = ({ navigationItems }) => {
  const menuId = useId()
  const rootElement = useRef<HTMLUListElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  /** `null` means the secondary menu is closed */
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null)
  const secondaryMenuOpen = openMenuIndex !== null

  // check for clicks outside of the menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!rootElement.current.contains(e.target as Node)) {
        setOpenMenuIndex(null)
      }
    }
    if (rootElement.current) {
      document.addEventListener("click", handleClickOutside, false)
    }
    return () => {
      document.removeEventListener("click", handleClickOutside, false)
    }
  }, [])

  // Element attributes / listeners
  const bindToggle = () => ({
    open: mobileMenuOpen,
    attributes: {
      "aria-expanded": mobileMenuOpen,
      "aria-controls": menuId,
    },
    onClick: () => setMobileMenuOpen(!mobileMenuOpen),
  })
  const bindPrimaryMenu = () => {
    return {
      ref: rootElement,
      id: menuId,
      onBlur: (e) => {
        const focusLeftMenu = !rootElement.current.contains(e.relatedTarget)
        /*if (focusLeftMenu) {
          setOpenMenuIndex(null)
          setMobileMenuOpen(false)
        }*/
      },
      onKeyDown: (e) => {
        if (e.key === "Escape") {
          if (openMenuIndex) {
            setOpenMenuIndex(null)
          } else {
            setMobileMenuOpen(false)
          }
        }
      },
    }
  }
  const bindPrimaryMenuItem = (
    itemIndex: number,
    { hasPopup } = { hasPopup: false }
  ) => {
    const isDropdownOpen = openMenuIndex === itemIndex
    const isExpanded = hasPopup && isDropdownOpen
    return {
      "aria-haspopup": hasPopup,
      "aria-expanded": hasPopup ? isExpanded : undefined,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          if (hasPopup) {
            e.preventDefault()
          }
          setOpenMenuIndex(itemIndex)
        }
      },
      onClick: () => {
        if (!hasPopup) {
          setMobileMenuOpen(false)
        }
      },
      onMouseDown: () => {
        if (hasPopup) {
          setOpenMenuIndex(isDropdownOpen ? null : itemIndex)
        } else {
          setOpenMenuIndex(null)
        }
      },
    }
  }
  const bindSecondaryMenuItem = (child) => {
    return {
      onKeyDown: (e) => {
        if (e.key === "Escape") {
          setOpenMenuIndex(null)
        }
      },
      onClick: () => {
        setMobileMenuOpen(false)
      },
      hrefLang: child.locale || undefined,
      lang: child.locale || undefined,
      role: "menuitem",
    }
  }

  return {
    mobileMenuOpen,
    openMenuIndex,
    bindToggle,
    bindPrimaryMenu,
    bindPrimaryMenuItem,
    bindSecondaryMenuItem,
    secondaryMenuOpen,
  }
}

export default Header
