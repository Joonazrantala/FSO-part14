import { getBlogs } from "../services/blogs";
import Link from "next/link";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>;
}) => {
  const allBlogs = await getBlogs();
  const { title } = await searchParams;
  const blogs = title
    ? allBlogs.filter((b) =>
        b.title.toLowerCase().includes(title?.toLowerCase()),
      )
    : allBlogs;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs:</h2>
      <div>
        <form>
          <label>
            <input type="text" name="title" data-testid="filter-input"></input>
          </label>
          <button type="submit" data-testid="search-button">
            Search by title
          </button>
        </form>
      </div>
      <ul data-testid="blogs-list">
        {blogs.map((blog) => (
          <li key={blog.id}>
            <h4>
              <Link
                href={`/blogs/${blog.id}`}
                className="border rounded p-1 hover:bg-gray-50"
                data-testid="blog-title"
              >
                {blog.title}
              </Link>
            </h4>
            <p data-testid="blog-detail">Blog details:</p>
            <p data-testid="blog-author"> Author: {blog.author}</p>
            <br />
            <p>URL: {blog.url}</p>
            <br />
            <p>{blog.likes} likes</p>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
