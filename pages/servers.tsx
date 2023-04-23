import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { FormattedMessage, FormattedDate, useIntl } from "react-intl"
import classnames from "classnames"
import { orderBy as _orderBy } from "lodash"
import ServerCard from "../components/ServerCard"
import { IconCard } from "../components/IconCard"
import SelectMenu from "../components/SelectMenu"
import Statistic from "../components/Statistic"
import { categoriesMessages } from "../data/categories"
import type { Server, Category, Region } from "../types/api"
import Hero from "../components/Hero"
import { withDefaultStaticProps } from "../utils/defaultStaticProps"
import { formatNumber } from "../utils/numbers"
import { fetchEndpoint } from "../utils/api"

import serverHeroMobile from "../public/illustrations/servers_hero_mobile.png"
import serverHeroDesktop from "../public/illustrations/servers_hero_desktop.png"
import SkeletonText from "../components/SkeletonText"
import Head from "next/head"
import Layout from "../components/Layout"
import Link from "next/link"
import servers1 from "../data/servers"
import { categoriesData } from '../data/categoriesData';


const DUNBAR = Math.log(800)
const Pagination = ({
  currentPage,
  setCurrentPage,
  filteredServers,
  serversPerPage,
}) => {
  const totalPages = Math.ceil(filteredServers.length / serversPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={`${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        } bg-chakragreen-300 text-white py-2 px-4 rounded-l focus:outline-none`}
        disabled={currentPage === 1}
      >
        Précédent
      </button>
      <div className="border border-chakragreen-300 mx-1 w-16 text-center">
        {currentPage}
      </div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className={`${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        } bg-chakragreen-300 text-white py-2 px-4 rounded-r focus:outline-none`}
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
    </div>
  );
};


const Servers = () => {
  const intl = useIntl()
  const { locale } = useRouter()
  const [filters, setFilters] = useState({
    language: locale === "en" ? "en" : "",
    category: "",
    concours: "",
    niveau: "",
    nature: "",
    format: ""
  })
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const serversPerPage = 12;

  const params = new URLSearchParams(filters)

  const queryOptions = {
    cacheTime: 30 * 60 * 1000, // 30 minutes
  }

  function mergeCategoryData(categoriesData) {
    return categoriesData.map((categoryData) => {
      const message = categoriesMessages[categoryData.category];
      return {
        ...categoryData,
        displayName: message ? message.defaultMessage : categoryData.category,
      };
    });
  }
  const mergedCategoriesData = mergeCategoryData(categoriesData);
 
  const allCategories = {
    data: _orderBy(mergedCategoriesData, "servers_count", "desc"),
    isLoading: false,
    isError: false
  };
 
  const apiCategories = {
    data: allCategories.data,
    isLoading: false,
    isError: false
  };
 
 

  let defaultOption = {
    value: "",
    label: intl.formatMessage({
      id: "wizard.filter.all_languages",
      defaultMessage: "All languages",
    }),
  }

  const concoursOptions = [
    {
      value: "",
      label: intl.formatMessage({
        id: "wizard.filter.sign_up.all",
        defaultMessage: "Tous",
      }),
    },
    {
      value: "ecg",
      label: intl.formatMessage({
        id: "wizard.filter.sign_up.instant",
        defaultMessage: "ECG",
      }),
    },
    {
      value: "iep",
      label: intl.formatMessage({
        id: "wizard.filter.sign_up.manual",
        defaultMessage: "IEP",
      }),
    },
{
      value: "bl",
      label: intl.formatMessage({
        id: "wizard.filter.sign_up.manual",
        defaultMessage: "B/L",
      }),
    },
{
      value: "administratif",
      label: intl.formatMessage({
        id: "wizard.filter.sign_up.manual",
        defaultMessage: "Administratifs",
      }),
    },
  ]

  const niveauOptions = [
    {
      value: "",
      label: intl.formatMessage({
        id: "wizard.filter.concours.all",
        defaultMessage: "Tous",
      }),
    },
    {
      value: "terminale",
      label: intl.formatMessage({
        id: "wizard.filter.concours.juridicial",
        defaultMessage: "Terminale",
      }),
    },
    {
      value: "una",
      label: intl.formatMessage({
        id: "wizard.filter.concours.natural",
        defaultMessage: "1A",
      }),
    },
  {
      value: "deuza",
      label: intl.formatMessage({
        id: "wizard.filter.concours.natural",
        defaultMessage: "2A",
      }),
    },
  ]

  const natureOptions = [
    {
      value: "",
      label: intl.formatMessage({
        id: "wizard.filter.concours.all",
        defaultMessage: "Tous",
      }),
    },
    {
      value: "cours",
      label: intl.formatMessage({
        id: "wizard.filter.concours.juridicial",
        defaultMessage: "Cours",
      }),
    },
    {
      value: "fiches",
      label: intl.formatMessage({
        id: "wizard.filter.concours.natural",
        defaultMessage: "Fiches",
      }),
    },
 {
      value: "methodes",
      label: intl.formatMessage({
        id: "wizard.filter.concours.natural",
        defaultMessage: "Méthodes",
      }),
    },
 {
      value: "annales",
      label: intl.formatMessage({
        id: "wizard.filter.concours.natural",
        defaultMessage: "Annales",
      }),
    },

  ]


  const formatOptions = [
    {
      value: "",
      label: intl.formatMessage({
        id: "wizard.filter.concours.all",
        defaultMessage: "Tous",
      }),
    },
    {
      value: "cours",
      label: intl.formatMessage({
        id: "wizard.filter.concours.juridicial",
        defaultMessage: "Exercices",
      }),
    },
    {
      value: "fiches",
      label: intl.formatMessage({
        id: "wizard.filter.concours.natural",
        defaultMessage: "Sujets",
      }),
    },
 {
      value: "methodes",
      label: intl.formatMessage({
        id: "wizard.filter.concours.natural",
        defaultMessage: "Corrigés",
      }),
    },
 {
      value: "annales",
      label: intl.formatMessage({
        id: "wizard.filter.concours.natural",
        defaultMessage: "Bonnes copies",
      }),
    },

  ]




  const apiLanguages = useQuery<any[]>(
    ["languages", filters.category],
    () => fetchEndpoint("languages", params),
    {
      ...queryOptions,
      select: (data) => {
        let updated = data
          .filter((language) => language.language && language.locale)
          .map((language) => ({
            label: language.language,
            value: language.locale,
          }))

        updated = [defaultOption, ...updated]
        return updated
      },
    }
  )

  const filteredServers = servers1.data.filter(server =>
    (!filters.category || filters.category.split(',').some(c => server.category.includes(c))) &&
    (!filters.concours || server.concoursOptions.includes(filters.concours)) &&
    (!filters.niveau || server.niveauOptions === filters.niveau) &&
    (!filters.nature || server.natureOptions === filters.nature) &&
    (!filters.format || server.formatOptions === filters.format) &&
    (searchTerm === "" ||
    server.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    server.description.toLowerCase().includes(searchTerm.toLowerCase()))
);

const paginatedServers = filteredServers.slice(
    (currentPage - 1) * serversPerPage,
    Math.min(currentPage * serversPerPage, filteredServers.length)
  );

  const servers = useQuery<Server[]>(
    [
      "servers",
      filters.language,
      filters.category,
      filters.concours,
      filters.niveau,
      filters.concours,
      filters.nature,
      filters.format
    ],
    () =>
      Promise.resolve(
        filteredServers.map(server => ({
          ...server,
          approval_required: false // assign the appropriate value here
        }))
      ),
    queryOptions
  );
  




  const regions = [
    {
      value: "",
      label: intl.formatMessage({
        id: "server.regions.all",
        defaultMessage: "All regions",
      }),
    },
    {
      value: "europe",
      label: intl.formatMessage({
        id: "server.regions.europe",
        defaultMessage: "Europe",
      }),
    },
    {
      value: "north_america",
      label: intl.formatMessage({
        id: "server.regions.north_america",
        defaultMessage: "North America",
      }),
    },
    {
      value: "south_america",
      label: intl.formatMessage({
        id: "server.regions.south_america",
        defaultMessage: "South America",
      }),
    },
    {
      value: "africa",
      label: intl.formatMessage({
        id: "server.regions.africa",
        defaultMessage: "Africa",
      }),
    },
    {
      value: "asia",
      label: intl.formatMessage({
        id: "server.regions.asia",
        defaultMessage: "Asia",
      }),
    },
    {
      value: "oceania",
      label: intl.formatMessage({
        id: "server.regions.oceania",
        defaultMessage: "Oceania",
      }),
    },
  ]

  return (
    <Layout>
      <Hero mobileImage={serverHeroMobile} desktopImage={serverHeroDesktop}>
        <h1 className="h2 mb-5">
          <FormattedMessage id="servers" defaultMessage="Les contenus" />
        </h1>

        <p className="sh1 mb-14 max-w-[36ch]">
          <FormattedMessage
            id="servers.hero.body"
            defaultMessage="Nous fournissons des contenus propres à Prepalib pour de nombreux concours et de nombreuses matières. Nous centralisons également toutes les ressources de qualité trouvables sur Internet pour vous éviter de chercher."
            values={{
              b: (text) => <b>{text}</b>,
            }}
          />
        </p>
      </Hero>

      <div className="grid gap-20 pb-40 mt-10">
        <GettingStartedCards />
        <div className="grid grid-cols-4 gap-gutter md:grid-cols-12">
          <div className="col-span-full mb-4 flex flex-wrap gap-gutter md:mb-2 md:justify-end">
          <input
  type="text"
  placeholder={intl.formatMessage({
    id: "search.placeholder",
    defaultMessage: "Cherchez...",
  })}
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="block w-full py-3 pl-3 pr-10 md:w-auto bg-chakragreen-1 rounded-md text-black-5 focus:outline-none focus:ring-2 focus:ring-chakragreen-300 z-10"
/>

            <SelectMenu
              label={
                <FormattedMessage
                  id="wizard.filter_by_niveau"
                  defaultMessage="Concours"
                />
              }
              onChange={(v) => {
                setFilters({ ...filters, concours: v })
              }}
              value={filters.concours}
              options={concoursOptions}
            />


 <SelectMenu
              label={
                <FormattedMessage
                  id="wizard.filter_by_niveau"
                  defaultMessage="Niveau"
                />
              }
              onChange={(v) => {
                setFilters({ ...filters, niveau: v })
              }}
              value={filters.niveau}
              options={niveauOptions}
            />


<SelectMenu
              label={
                <FormattedMessage
                  id="wizard.filter_by_niveau"
                  defaultMessage="Nature"
                />
              }
              onChange={(v) => {
                setFilters({ ...filters, nature: v })
              }}
              value={filters.nature}
              options={natureOptions}
            />

            <SelectMenu
              label={
                <FormattedMessage
                  id="wizard.filter_by_structure"
                  defaultMessage="Type"
                />
              }
              onChange={(v) => {
                setFilters({ ...filters, format: v })
              }}
              value={filters.format}
              options={formatOptions}
            />
          </div>
          <div className="col-span-4 mb-8 md:col-span-3 md:mb-0">

            <ServerFilters
              initialCategories={allCategories.data}
              regions={regions}
              categories={apiCategories.data}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="col-span-4 md:col-start-4 md:col-end-13">
            <ServerList servers={paginatedServers} />
             <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              filteredServers={filteredServers}
              serversPerPage={serversPerPage}/>
          </div>
        </div>
      </div>
      <Head>
        <title>
          {intl.formatMessage({
            id: "servers.page_title",
            defaultMessage: "Les contenus",
          })}{" "}
          - Prepalib
        </title>
        <meta
          property="og:title"
          content={intl.formatMessage({
            id: "servers.page_title",
            defaultMessage: "Les contenus",
          })}
        />
        <meta
          name="description"
          content={intl.formatMessage({
            id: "servers.page_description",
            defaultMessage:
              "Retrouvez tous les contenus proposés ou recensés par Prepalib !",
          })}
        />
        <meta
          property="og:description"
          content={intl.formatMessage({
            id: "servers.page_description",
            defaultMessage:
              "Retrouvez tous les contenus proposés ou recensés par Prepalib !",
          })}
        />
      </Head>
    </Layout>
  )
}

const GettingStartedCards = () => {
  const [visited, setVisited] = useState(false)
  useEffect(function checkVisited() {
    let visits = localStorage.getItem("visited")

    // on first visit, set localStorage.visited = true
    if (!visits) {
      localStorage.setItem("visited", "true")
    } else {
      setVisited(true) // on subsequent visits
    }
  }, [])

  return (
    <section className={classnames("mb-8", visited ? "order-1" : "order-0")}>
      <h2 className="h3 mb-8 text-center">
        <FormattedMessage
          id="servers.getting_started.headline"
          defaultMessage="Les contenus sur Prepalib"
        />
      </h2>
      <div className="grid gap-gutter sm:grid-cols-2 xl:grid-cols-2">
   
        <IconCard
          title={
            <FormattedMessage
              id="servers.getting_started.feed.title"
              defaultMessage="Contenus de qualité"
            />
          }
          icon="feed"
          className="md:border md:border-gray-3"
          copy={
            <FormattedMessage
              id="servers.getting_started.feed.body"
              defaultMessage="Facilitez votre travail, vos révisions, votre recherche d'information. Le but de Prepalib, c'est de centraliser tous les meilleurs contenus pour que vous vous posiez le moins de questions possibles."
            />
          }
        />

        <IconCard
          title={
            <FormattedMessage
              id="servers.getting_started.safe_for_all.title"
              defaultMessage="Collaboratif"
            />
          }
          icon="safety-1"
          className="md:border md:border-gray-3"
          copy={
            <FormattedMessage
              id="servers.getting_started.safe_for_all.body"
              defaultMessage="Prepalib est un site associatif et collaboratif. Nous fournissons un maximum de ressources pour vous aider, et nous cherchons à récupérer les contenus des élèves ayant intégré les meilleures écoles pour pouvoir améliorer l'offre en permanence."
            />
          }
        />
      </div>
    </section>
  )
}

const ServerList = ({ servers }) => {
 
  if (servers.length === 0) {
    return (
      <div className="b2 flex justify-center rounded bg-gray-5 p-4 text-gray-1 md:p-8 md:py-20">
        <p className="max-w-[48ch] text-center">
          <FormattedMessage
            id="wizard.no_results"
            defaultMessage="Il semble qu'aucun contenu ne corresponde à votre votre recherche."
          />
        </p>
      </div>
    );
  }
 
  return (
    <div className="col-span-4 md:col-start-4 md:col-end-13">
      <div className="grid gap-gutter sm:grid-cols-2 xl:grid-cols-3">
        {servers
          .sort((a, b) => {
            if (a.approval_required === b.approval_required) {
              return b.last_week_users - a.last_week_users;
            } else if (a.approval_required) {
              return 1;
            } else if (b.approval_required) {
              return -1;
            } else {
              return b.last_week_users - a.last_week_users;
            }
          })
          .map((server) => (
            <ServerCard key={server.domain} server={server} />
          ))}
      </div>
    </div>
  );
};


const ServerFilters = ({
  filters,
  setFilters,
  categories,
  initialCategories,
  regions,
}: {
  filters: any
  setFilters: any
  categories: Category[]
  initialCategories: Category[]
  regions: Region[]
}) => {
  const intl = useIntl()
  return (
    <div className="mb-8">
      <h3 className="h5 mb-4" id="category-group-label">
        <FormattedMessage
          id="server.filter_by.category"
          defaultMessage="Matières"
        />
      </h3>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-1 md:-ml-3 md:grid-cols-1 md:gap-x-3">
        {!initialCategories
          ? new Array(11).fill(null).map((_, i) => (
              <li className="h-8 p-3" key={i}>
                <SkeletonText className="!h-full" />
              </li>
            ))
          : categories?.map((item, i) => {
              const isActive = filters.category === item.category

              return (
                <li key={i}>
                  <label
                    className={classnames(
                      "b2 flex cursor-pointer gap-1 rounded p-3 focus-visible-within:outline focus-visible-within:outline-2 focus-visible-within:outline-chakragreen-300",
                      isActive && "bg-chakragrey-300 !font-extrabold",
                      item.servers_count === 0 && "text-gray-2"
                    )}
                  >
                    <input
                      className="sr-only"
                      type="checkbox"
                      name="filters-category"
                      onChange={() => {
                        setFilters({
                          ...filters,
                          category: isActive ? "" : item.category,
                        })
                      }}
                    />
                    {item.category === ""
                      ? intl.formatMessage({
                          id: "wizard.filter.all_categories",
                          defaultMessage: "Toutes les matières",
                        })
                      : (categoriesMessages[item.category] ? intl.formatMessage(categoriesMessages[item.category]) : item.category)}

                    <span
                      className={
                        isActive ? "text-chakragreen-300" : "text-gray-2"
                      }
                    >
                    </span>
                  </label>
                </li>
              )
            })}
      </ul>
    </div>
  )
}

export const getStaticProps = withDefaultStaticProps()

export default Servers