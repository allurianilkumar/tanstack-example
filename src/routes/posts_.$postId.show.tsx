import { ErrorComponent, ErrorComponentProps, createFileRoute } from '@tanstack/react-router'
// import { fetchPost } from '../api/postService'
import { fetchPost, updatePost } from '../api/posts'

export const Route = createFileRoute('/posts_/$postId/show')({
  loader: async ({ params: { postId } }) => fetchPost(postId),
    errorComponent: PostErrorComponent,
    notFoundComponent: () => {
      return <p>Post not found</p>
    },
  component: PostShowComponent,
})


export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}


function PostShowComponent() {
  const post = Route.useLoaderData()

  return (
    <div>
      <div className="space-y-2">
        <h4 className="text-xl font-bold underline">{post.title}</h4>
        <div className="text-sm">{post.body}</div>
      </div>
      <div>
      </div>
    </div>
  )
}

