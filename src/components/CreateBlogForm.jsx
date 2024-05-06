import { useState } from 'react'

const CreateBlogForm = ({ addBlog }) => {

  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const [visible, setVisible] = useState(false)


  const createNewBlog = async (event) => {
    event.preventDefault()
    console.log('create blog with', title, author, url)
    const newBlog = {
      title,
      author,
      url
    }

    addBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>

      <h2>create new</h2>
      <form onSubmit={createNewBlog}>
        <div>
                title:
          <input type="text" name="Title" value={title} onChange={({ target }) => {setTitle(target.value)}}/>
        </div>
        <div>
                author:
          <input type="text" name="Author" value={author} onChange={({ target }) => {setAuthor(target.value)}} />
        </div>
        <div>
                url:
          <input type="url" name="Url" value={url} onChange={({ target }) => {setUrl(target.value)}} />
        </div>
        <button type='submit'>create</button>
      </form>

    </div>
  )
}

export default CreateBlogForm