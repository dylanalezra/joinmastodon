import Issue from "../components/Issue"
import Category from "../components/Category"
import { useState } from "react"
import { FormattedMessage, useIntl, defineMessages } from "react-intl"

const messages = defineMessages({
  started: { id: "roadmap.state.started", defaultMessage: "En progrès" },
  unstarted: { id: "roadmap.state.unstarted", defaultMessage: "Planifié" },
  backlog: { id: "roadmap.state.backlog", defaultMessage: "Exploration" },
  completed: { id: "roadmap.state.completed", defaultMessage: "Terminé récemment" },
})

export const IssueTimeline = ({ roadmap }) => {
  const intl = useIntl()
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredRoadmap = roadmap.map(state => {
    const filteredIssues = state.items.filter(
      ({ id }) => id.startsWith(activeCategory) || activeCategory === "all"
    )

    return {
      ...state,
      items: filteredIssues
    }
  }).filter(
    ({ items }) => items.length > 0
  )

  //prettier-ignore
  const categories = [
    { key: "all", label: intl.formatMessage({ id: "roadmap.all", defaultMessage: "Tous" }) },
    { key: "MAS", label: intl.formatMessage({ id: "roadmap.mastodon", defaultMessage: "Contenus" }) },
    { key: "IOS", label: intl.formatMessage({ id: "roadmap.ios", defaultMessage: "Applications" }) },
    { key: "AND", label: intl.formatMessage({ id: "roadmap.android", defaultMessage: "Site" }) },
  ]

  return (
    <div className="mt-64 md:mt-0 md:bg-white md:rounded-md md:p-6 pl-8">
      <div className="-mx-gutter pis-gutter mb-12 md:mb-6 overflow-x-auto">
        <div className="flex flex-wrap gap-gutter md:flex-nowrap">
          {categories.map(category => (
            <Category
              key={category.key}
              label={category.label}
              value={category.key}
              currentValue={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            />
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute h-full w-0 border-dashed border-l border-gray-2" />

        {filteredRoadmap.map(state => (
          <div key={state.type} className="mb-8 pl-8">
            <h2 className="h6 mb-4 text-black">{intl.formatMessage(messages[state.type])}</h2>

            <div className="space-y-2">
              {state.items.map(issue => <Issue key={issue.id} state={state.type} {...issue} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IssueTimeline
