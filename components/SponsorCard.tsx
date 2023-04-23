import classNames from "classnames"
import Image from "next/image"
import { FormattedMessage } from "react-intl"

/** Sponsor Card, supporting data from `silver`, `generalHighlighted`, and `general` */
const SponsorCard = ({ sponsor, tier }) => {
  return (
    <div
      className={classNames(
        "grid grid-cols-[auto_1fr] gap-4 rounded p-4",
        tier === "generalHighlighted" && "bg-chakragreen-300 text-white",
        tier === "silver" && "border border-gray-3 hover:bg-gray-4"
      )}
    >
      {tier === "silver" && (
        <div className="relative h-[56px] w-[56px] overflow-hidden rounded-md bg-chakragrey-gradient">
          {sponsor.logo && (
            <Image src={sponsor.logo} alt="" layout="fill" objectFit="cover" />
          )}
        </div>
      )}

      <div
        className={classNames("truncate", tier !== "silver" ? "w-full" : null)}
      >
        <span
          className={classNames(
            "b3 !leading-[2]",
            tier === "generalHighlighted"
              ? "text-white"
              : "text-gray-1"
          )}
        >
          {tier === "silver" ? (
            <FormattedMessage
              id="silver_sponsor"
              defaultMessage="Super Soutien"
            />
          ) : (
            <FormattedMessage id="sponsor" defaultMessage="Donateur" />
          )}
        </span>

        <p className="b2 truncate !font-semibold">{sponsor.name || sponsor}</p>
      </div>
    </div>
  )
}
export default SponsorCard
