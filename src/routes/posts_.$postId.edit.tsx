import * as React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
// import { fetchPost, updatePost } from '../api/postService'
import { fetchPost, updatePost } from '../api/posts'

export const Route = createFileRoute('/posts_/$postId/edit')({
  loader: async ({ params: { postId } }) => fetchPost(postId),
  component: EditPostComponent,
})

function EditPostComponent() {
  const post = Route.useLoaderData()
  const navigate = useNavigate()
  const [title, setTitle] = React.useState(post.title)
  const [body, setBody] = React.useState(post.body)
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const updatedPost = { title, body }
      await updatePost(String(post.id), updatedPost)
      navigate({ to: '/posts/$postId', params: { postId: String(post.id) } })
    } catch (err) {
      console.error('Failed to update post:', err)
      setError('Failed to update post. Please try again.')
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <h5 className="text-lg font-semibold">Edit Post: {post.id}</h5>
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            required
          />
        </div>
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', minHeight: '100px' }}
            required
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            style={{ padding: '8px 16px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: '/posts/$postId', params: { postId: String(post.id) } })}
            style={{ padding: '8px 16px', backgroundColor: '#ccc', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}