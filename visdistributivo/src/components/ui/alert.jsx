export function Alert({ className, variant, ...props }) {
  return (
    <div
      role="alert"
      className={`relative w-full rounded-lg border p-4 ${
        variant === "destructive"
          ? "bg-destructive/15 text-destructive border-destructive/50"
          : "bg-background text-foreground"
      } ${className}`}
      {...props}
    />
  )
}

export function AlertDescription({ className, ...props }) {
  return <div className={`mt-1 text-sm ${className}`} {...props} />
}
