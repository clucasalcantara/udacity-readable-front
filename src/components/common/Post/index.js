import React from 'react'
import { Link } from 'react-router-dom'

import VoteScore from '../VoteScore'

const Post = ({ post = {} , onDeletePost, handleScore }) => post ? (
  <li key={post.id}>
    <div className="post-header">
      <Link to={{
        pathname: `/${post.category}/${post.id}`
      }}>
        {post.title}
      </Link>
      <div className="post-actions">
        <span className="edit">
          <Link to={`/admin/post/${post.id}`}>Edit</Link>
        </span>
        <button className="delete" onClick={() => onDeletePost(post.id)}>Delete</button>
      </div>
    </div>
    <div className="post-info">
      <div>
        Author: <strong>{post.author}</strong>
      </div>
      <div>
        Category: <strong>{post.category}</strong>
      </div>
      <div>
        <strong>{post.commentCount}</strong> Comments
      </div>
    </div>
    <div className="vote-score">
      <VoteScore id={post.id} handleScore={handleScore} score={post.voteScore} />
    </div>
  </li>
) : <li>>Buscando post…</li>

export default Post

