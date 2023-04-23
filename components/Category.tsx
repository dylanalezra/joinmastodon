import classNames from "classnames"

export type CategoryProps = {
  onChange: (e: any) => void
  value: string
  currentValue?: string
  label: React.ReactNode
}

export const Category = ({ onChange, value, currentValue, label }: CategoryProps) => {
  return (
    <label
      className={classNames(
        "b3 block cursor-pointer whitespace-nowrap rounded-md border-2 p-4 text-center !font-semibold transition-all md:w-full",
        value === currentValue
          ? "border-chakragreen-300 bg-chakragreen-300 text-white hover:border-chakragreen-400 hover:bg-chakragreen-400 focus-visible-within:border-chakragreen-400 focus-visible-within:bg-chakragreen-400"
          : "border-chakragreen-300 bg-white text-chakaragreen-300 hover:border-chakragreen-400 hover:text-chakragreen-400"
      )}
    >
      <input
        className="sr-only"
        type="radio"
        name="apps-selection"
        id=""
        value={value}
        onChange={onChange}
      />
      {label}
    </label>
  )
}

export default Category
