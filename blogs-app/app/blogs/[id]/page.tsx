import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { likeBlog } from "@/app/actions/blogs";
import { addBlogToReadingList } from "@/app/actions/readingList";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h4 data-testid="blog-title">{blog.title}</h4>
      <h6 data-testid="blog-detail">
        <u>Blog details:</u>
      </h6>
      <span data-testid="blog-author">Author: {blog.author}</span>
      <br />
      <span data-testid="blog-url">URL: {blog.url}</span>
      <br />
      <span>Likes: {blog.likes}</span>
      <br />
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">Like</button>
      </form>
      <form action={addBlogToReadingList}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" data-testid="add-to-reading-list-button">
          Add blog to reading list
        </button>
      </form>
    </div>
  );
};

export default BlogPage;
