const BlogDetail = ( {url, likes, author, handleLike} ) => {


    return (
        <div>
            <p>{url}</p>
            <p>likes {likes} <button type="button" onClick={handleLike}>like</button></p>
            <p>{author}</p>
        </div>
    )
}

export default BlogDetail