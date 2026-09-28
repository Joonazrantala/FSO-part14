"use client"

import {createBlog, FormState} from "../../actions/blogs"
import { useActionState } from "react"

const NewBlog = () => {
  const initialState: FormState = {
      errors: {}
  }

  const [state, formAction] = useActionState(createBlog, initialState)
  console.log(state)
  return (
    <div>
      
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input type="text" name="title" required  defaultValue={state.values?.title}/>
          </label>
          {state.errors?.title && (
          <p style={{ color: "red" }}>{state.errors.title}</p>
          )}
          <div>
            <label>
                Author
                <input type="text" name="author" required  defaultValue={state.values?.author}/>
            </label>
            {state.errors?.author && (
          <p style={{ color: "red" }}>{state.errors.author}</p>
          )}
          </div>
          <div>
            <label>
                Url
                <input type="text" name="url" required  defaultValue={state.values?.url}/>
            </label>
            {state.errors?.url && (
          <p style={{ color: "red" }}>{state.errors.url}</p>
          )}
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

export default NewBlog