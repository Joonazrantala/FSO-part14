const blogs = [
  { id: 1, title: "paska", author: "seppo räty", url: "www.google.com", likes: 9000 },
  { id: 2, title: "test title", author: "test author", url: "www.testurl.com", likes: 69 }
]

let nextId = 3

export const getBlogs = () => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    return sortedBlogs
}

export const addBlog = (title: string, author:string, url: string, likes:number) => {
  blogs.push({id: nextId++, title, author, url, likes})
}

export const getBlogById = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id)
  return blog
}

export const addLike = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id)
  if (blog) {
    blog.likes = blog.likes + 1
  }
}