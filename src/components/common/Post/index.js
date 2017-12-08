import React from 'react'
import { Link } from 'react-router-dom'

import VoteScore from '../VoteScore'

const Post = ({ post, onDeletePost, handleScore }) => (
  <li key={post.id}>
    <div className="post-header">
      <Link to={{
        pathname: `/${post.category}/${post.id}`
      }}>
        {post.title}
      </Link>
    </div>
    <span className="edit">
      <Link to={`/admin/post/${post.id}`}>edit</Link>
    </span>
    <button className="delete" onClick={() => onDeletePost(post.id)}>Delete</button>
    <div>
      Author: <strong>{post.author}</strong>
    </div>
    <div>
      Category: <strong>{post.category}</strong>
    </div>
    <div>
      <strong>{post.commentCount}</strong> Comments
    </div>
    <VoteScore id={post.id} handleScore={handleScore} score={post.voteScore} />
  </li>
)

export default Post