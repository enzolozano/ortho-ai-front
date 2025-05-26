// eslint-disable-next-line react/prop-types
export const GridButton = ({ text, color, onClick }) => {
  return (
    <button
      type="button"
      className={`bg-${color}-500 text-white text-xs font-medium py-1.5 px-3 rounded-lg`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
