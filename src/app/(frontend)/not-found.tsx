import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ResponsiveContainer from '@/components/ui/ResponsiveContainer'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

export default function Page() {
  return (
    <ResponsiveContainer className="flex items-start justify-center mt-16 mb-24 pt-16 pb-26">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl">404</CardTitle>
          <CardDescription className="sr-only">
            The page you are looking for could not be found.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p>
              Oops! The page you are looking for could not be found, it might has been moved or
              deleted.
            </p>
            <Link href="/" className={cn(buttonVariants(), 'mt-8')}>
              Go Back Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </ResponsiveContainer>
  )
}
