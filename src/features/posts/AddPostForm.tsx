import { useState } from 'react'
import { useAddPostMutation } from '../../services/postApi'

export function AddPostForm() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const [addPost, { isLoading, error }] = useAddPostMutation()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !body) return

    try {
      await addPost({
        title,
        body,
        userId: 1,
      }).unwrap()

      setTitle('')
      setBody('')
    } catch (err) {
      console.error('Failed to add post', err)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mb-8 rounded-xl bg-slate-800 p-4 space-y-4"
    >
      <h2 className="text-xl font-semibold">Add Post</h2>

      <input
        className="w-full rounded bg-slate-700 p-2 text-white"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full rounded bg-slate-700 p-2 text-white"
        placeholder="Body"
        rows={3}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="rounded bg-blue-600 px-4 py-2 font-medium disabled:opacity-50"
      >
        {isLoading ? 'Saving…' : 'Add Post'}
      </button>

      {error && (
        <p className="text-sm text-red-400">
          Failed to save post
        </p>
      )}
    </form>
  )
}
