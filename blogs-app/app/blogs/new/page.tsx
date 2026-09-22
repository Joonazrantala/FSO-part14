import {createBlog} from "../../actions/blogs"

const NewNote = () => {
  return (
    <div>
      
      <h2>Create a new note</h2>
      <form action={createBlog}>
        <div>
          <label>
            Title
            <input type="text" name="title" required />
          </label>
          <div>
            <label>
                Author
                <input type="text" name="author" required />
            </label>
          </div>
          <div>
            <label>
                Url
                <input type="text" name="url" required />
            </label>
          </div>
          <div>
            <label>
                Likes
                <input type="number" name="likes" required />
            </label>
          </div>
          
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewNote