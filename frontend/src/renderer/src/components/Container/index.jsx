// eslint-disable-next-line react/prop-types
export const Container = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      {children}
    </div>
  )
}
