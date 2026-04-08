import { useGetPostsQuery } from '../../services/postApi'

export function PostsList() {
  const { data, isLoading, error } = useGetPostsQuery()

  if (isLoading) {
    return <p className="p-4 text-lg">Loading…</p>
  }

  if (error) {
    return <p className="p-4 text-red-500">Error loading posts</p>
  }

  return (
    <ul className="space-y-4">
      {data?.slice(0, 5).map((post) => (
        <li
          key={post.id}
          className="rounded-xl bg-slate-800 p-4"
        >
          <h3 className="font-semibold">{post.title}</h3>
          <p className="text-sm text-slate-300">{post.body}</p>
        </li>
      ))}
    </ul>
  )
}