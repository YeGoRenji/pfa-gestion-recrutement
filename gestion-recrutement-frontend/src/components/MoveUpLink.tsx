export default function MoveUpLink({ children } : { children : React.ReactNode })  {
  return (
    <div className="transition-transform hover:-translate-y-[0.1rem]">
      {children}
    </div>
  )
}
