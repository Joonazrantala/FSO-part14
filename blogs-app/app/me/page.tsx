import { getCurrentUser } from "../services/session";
import { saveToken } from "../actions/users";
import { redirect } from "next/navigation";
import { getReadingList } from "../services/readinglist";
import { markBlogAsRead } from "../actions/readingList";

const MePage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("login");
  }
  const readingList = await getReadingList(user.id);
  const unreadBlogs = readingList.filter((blog) => !blog.read);
  const readBlogs = readingList.filter((blog) => blog.read);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1>My profile</h1>
      <p>
        <b>Name:</b> {user?.name}
      </p>
      <p>
        <b>Username:</b> {user?.username}
      </p>
      <div>
        <form action={saveToken}>
          <h3>API token:</h3>
          <p>
            {user?.token ? (
              <>{user.token}</>
            ) : (
              <>No token has been generated yet</>
            )}
          </p>
          <input type="hidden" name="id" value={user?.id} />
          <button type="submit">Generate a new token</button>
        </form>
      </div>
      <h2 className="text-2xl font-bold mb-4">My reading list</h2>

      <h3 className="text-xl font-semibold mb-3">
        Unread ({unreadBlogs.length})
      </h3>
      <ul className="space-y-3 mb-8">
        {unreadBlogs.map((blog) => (
          <li
            key={blog.id}
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <span>{blog.blog.title}</span>

            <form action={markBlogAsRead}>
              <input type="hidden" name="id" value={blog.blog.id} />
              <button
                type="submit"
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Mark as read
              </button>
            </form>
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold mb-3">Read ({readBlogs.length})</h3>

      <ul className="space-y-3">
        {readBlogs.map((blog) => (
          <li
            key={blog.id}
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <span>{blog.blog.title}</span>

            <form action={markBlogAsRead}>
              <input type="hidden" name="id" value={blog.blog.id} />
              <button
                type="submit"
                className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
              >
                Mark as unread
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MePage;
