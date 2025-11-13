import * as React from "react"
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"

const alertVariants = {
  default: "bg-background text-foreground",
  destructive: "border-red-500/50 text-red-600 dark:border-red-500 [&>svg]:text-red-600",
  success: "border-green-500/50 text-green-600 dark:border-green-500 [&>svg]:text-green-600",
  warning: "border-yellow-500/50 text-yellow-600 dark:border-yellow-500 [&>svg]:text-yellow-600",
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof alertVariants
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={`relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground ${alertVariants[variant]} ${className || ''}`}
      {...props}
    />
  )
)
Alert.displayName = "Alert"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`text-sm [&_p]:leading-relaxed ${className || ''}`}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={`mb-1 font-medium leading-none tracking-tight ${className || ''}`}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

export { Alert, AlertTitle, AlertDescription }

// Icon components for different alert types
export const AlertIcons = {
  default: Info,
  destructive: XCircle,
  success: CheckCircle,
  warning: AlertCircle,
}