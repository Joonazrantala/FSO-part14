import { notFound } from "next/navigation"
import { getBlogById, addLike } from "../../services/blogs"
import { likeBlog } from "@/app/actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      
      <h4>{blog.title}</h4>
        Author: {blog.author}<br/>
        Url: {blog.url}<br/>
        Likes: {blog.likes}<br/>
        <form action={likeBlog}>
          <input type="hidden" name="id" value={blog.id} />
          <button type="submit">
            Like
          </button>
        </form>
    </div>
  )
}

export default BlogPage