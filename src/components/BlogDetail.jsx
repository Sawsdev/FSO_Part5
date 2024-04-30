const BlogDetail = ( {url, likes, author} ) => {


    return (
        <div>
            <p>{url}</p>
            <p>likes {likes} <button type="button">like</button></p>
            <p>{author}</p>
        </div>
    )
}

export default BlogDetail