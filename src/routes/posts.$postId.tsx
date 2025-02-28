import * as React from 'react'
import { ErrorComponent, createFileRoute, Outlet, Link, useRouter } from '@tanstack/react-router'

import type { ErrorComponentProps } from '@tanstack/react-router'
// import { fetchPost, deletePost } from '../api/postService'
import { deletePost, fetchPost, updatePost } from '../api/posts'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params: { postId } }) => fetchPost(postId),
  errorComponent: PostErrorComponent,
  notFoundComponent: () => {
    return <p>Post not found</p>
  },
  component: PostComponent,
})

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

function PostComponent() {
  const post = Route.useLoaderData()
  const router = useRouter()
  
  const handleDelete = async () => {
    try {
      await deletePost(String(post.id))
      router.navigate({ to: '/posts' }) // Redirect to posts list after deletion
    } catch (error) {
      console.error('Failed to delete post:', error)
    }
  }

  return (
    <div>
      <div className="space-y-2">
        <h4 className="text-xl font-bold underline">{post.title}</h4>
        <div className="text-sm">{post.body}</div>
      </div>
      <Link to="/posts/$postId/show" params={{ postId: String(post.id) }} className="m-[6px] px-5 py-2.5 bg-green-500 text-white rounded-md text-base cursor-pointer hover:bg-green-600 transition-colors">
          Show Post
      </Link>
      
      <Link
          to="/posts/$postId/edit"
          params={{ postId: String(post.id) }}
          className="m-[6px] px-5 py-2.5 bg-blue-600 text-white rounded-md text-base cursor-pointer hover:bg-blue-700 transition-colors"
        >
          Edit Post
        </Link>
      
      <button
          onClick={handleDelete}
          className="m-[6px] px-5 py-2.5 bg-red-500 text-white rounded-md text-base cursor-pointer hover:bg-red-600 transition-colors"
        >
          Delete Post
        </button>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
