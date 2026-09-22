import { likeBlog } from "../actions/blogs"
import { getBlogs } from "../services/blogs"
import Link from "next/link"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>
}) => {
  const allBlogs = await getBlogs()
  const {title} = await searchParams
  console.log(title)
  const blogs = title  ? allBlogs.filter(b => b.title.toLowerCase().includes(title?.toLowerCase())) : allBlogs

  return (
    <div>
      <h2>
        Blogs:
      </h2>
      <div>
        <form>
          <label>
            <input type="text" name="title"></input>
          </label>
        <button type="submit">Search by title</button>
      </form>
      </div>
        {blogs.map(blog => (                        
            <li key={blog.id}>
              <h4><Link href={`/blogs/${blog.id}`}>{blog.title}</Link></h4>
                Author: {blog.author}<br/>
                Url: {blog.url}<br/>
                Likes: {blog.likes}<br/>
            </li>
        ))}

    </div>
  )
}

export default Blogs