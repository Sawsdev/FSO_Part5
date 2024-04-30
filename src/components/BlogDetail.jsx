const BlogDetail = ( {url, likes, user, handleLike} ) => {


    return (
        <div>
            <p>{url}</p>
            <p>likes {likes} <button type="button" onClick={handleLike}>like</button></p>
            <p>{user.name}</p>
        </div>
    )
}

export default BlogDetail