import Link from 'next/link'
import { buttonVariants } from '../ui/button'

const EmptySite = () => {
  return (
    <div className="flex items-center justify-center h-[80vh] text-center px-4">
      <div className="max-w-md">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">No Content Available</h1>
        <p className="text-gray-600 mb-6">
          This site doesn&apos;t have any content yet. If you are the owner, please log in to create
          some content.
        </p>
        <Link href="/admin" className={buttonVariants()}>
          Go to Admin
        </Link>
      </div>
    </div>
  )
}

export default EmptySite
