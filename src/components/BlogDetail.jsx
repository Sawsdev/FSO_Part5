const BlogDetail = ( { url, likes, user, handleLike, handleRemove } ) => {


  return (
    <div>
      <p>{url}</p>
      <p>likes {likes} <button type="button" onClick={handleLike}>like</button></p>
      <p>{user.name}</p>
      <p><button onClick={handleRemove} style={{ backgroundColor: '#c43f35' }}>remove</button></p>
    </div>
  )
}

export default BlogDetail