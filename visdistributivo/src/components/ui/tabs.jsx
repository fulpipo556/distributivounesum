export function Tabs({ children, ...props }) {
  return <div {...props}>{children}</div>
}

export function TabsList({ children, ...props }) {
  return (
    <div className="flex space-x-1 rounded-xl bg-gray-200 p-1" {...props}>
      {children}
    </div>
  )
}

export function TabsTrigger({ children, value, ...props }) {
  return (
    <button
      className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 data-[state=active]:bg-white data-[state=active]:shadow"
      {...props}
    >
      {children}
    </button>
  )
}

export function TabsContent({ children, value, ...props }) {
  return <div {...props}>{children}</div>
}
