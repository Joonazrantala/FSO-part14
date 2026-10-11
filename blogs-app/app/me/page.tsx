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
      <h1 data-testid="user-profile">My profile</h1>
      <p data-testid="user-name">
        <b>Name:</b> {user?.name}
      </p>
      <p data-testid="user-username">
        <b>Username:</b> {user?.username}
      </p>
      <div>
        <form action={saveToken}>
          <h3 data-testid="api-token-section">API token:</h3>
          <div data-testid="token-display">
            {user?.token ? (
              <p data-testid="api-token">{user.token}</p>
            ) : (
              <p data-testid="no-token-message">
                No token has been generated yet
              </p>
            )}
          </div>
          <input type="hidden" name="id" value={user?.id} />
          <button type="submit" data-testid="generate-token-button">
            Generate a new token
          </button>
        </form>
      </div>

      <h2
        className="text-2xl font-bold mb-4"
        data-testid="reading-list-section"
      >
        My reading list
      </h2>

      {readingList.length === 0 ? (
        <p
          data-testid="empty-reading-list"
          className="text-gray-500 italic mb-6"
        >
          Your reading list is empty.
        </p>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-3">
            Unread ({unreadBlogs.length})
          </h3>
          <ul className="space-y-3 mb-8" data-testid="unread-section">
            {unreadBlogs.length === 0 ? (
              <li
                data-testid="no-unread-blogs"
                className="text-gray-500 italic"
              >
                No unread blogs
              </li>
            ) : (
              unreadBlogs.map((blog) => (
                <li
                  key={blog.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <span>{blog.blog.title}</span>

                  <form action={markBlogAsRead}>
                    <input type="hidden" name="id" value={blog.blog.id} />
                    <button
                      type="submit"
                      data-testid={`mark-read-${blog.blog.id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Mark as read
                    </button>
                  </form>
                </li>
              ))
            )}
          </ul>

          <h3 className="text-xl font-semibold mb-3">
            Read ({readBlogs.length})
          </h3>

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
        </>
      )}
    </div>
  );
};
export default MePage;
