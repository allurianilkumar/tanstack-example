import { notFound } from '@tanstack/react-router'
import axios from 'redaxios'

export type PostType = {
  userId: number
  id: number
  title: string
  body: string
}

export const fetchPost = async (postId: string) => {
  console.info(`Fetching post with id ${postId}...`)
  await new Promise((r) => setTimeout(r, 500))
  const post = await axios
    .get<PostType>(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((r) => r.data)
    .catch((err) => {
      if (err.status === 404) {
        throw notFound()
      }
      throw err
    })

  return post
}

export const fetchPosts = async () => {
  console.info('Fetching posts...')
  await new Promise((r) => setTimeout(r, 500))
  return axios
    .get<Array<PostType>>('https://jsonplaceholder.typicode.com/posts')
    .then((r) => r.data.slice(0, 10))
}

export const updatePost = async (postId: string, updatedPost: { title: string; body: string }) => {
  console.info(`Updating post ${postId}...`)
  await new Promise((r) => setTimeout(r, 500))
  return axios
    .patch<PostType>(`https://jsonplaceholder.typicode.com/posts/${postId}`, updatedPost)
    .then((r) => r.data)
}

export const deletePost = async (postId: string) => {
  console.info(`Deleting post ${postId}...`)
  await new Promise((r) => setTimeout(r, 500))
  return axios
    .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(() => postId) // Return the deleted post ID
    .catch((err) => {
      if (err.response?.status === 404) {
        throw new Error('Post not found')
      }
      throw err
    })
}