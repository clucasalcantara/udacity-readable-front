import React from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert2'
import { connect } from 'react-redux'

import { deleteComment, commentsFetchData } from '../../../actions/comments'
import { handleVoteScore } from '../../../actions/votescore'

import VoteScore from '../VoteScore'

import './style.css'

const onDeleteComment = async (id, props, history) => {
  const { deleteComment } = props
  const resultConfirm = window.confirm('Delete this item')
  if (resultConfirm) {
    await deleteComment(id)
    swal(
      `Post deleted with success !`,
      'success'
    )
    history.goBack()
  }
}

const handleScore = async (id, value, props) => {
  const { idPost, handleScore, fetchComments } = props
  const url = `comments/${id}`
  const res = { option: value }
  await handleScore(url, res)
  fetchComments(idPost)
}


const Comments = (props) => {
  const { hasErrored, isLoading, data = [], history } = props

  if (hasErrored) {
    return <h1>Sorry but there was an error while fetch</h1>
  }
  if (isLoading) {
    return <h1>Loading ...</h1>
  }

  const parentId = data.length > 0 ? data[0].parentId : ''

  return (
    <div>
      <div>
        <ul className="comments-list">
          {data && data.map(comment => (
            <li className="comment-item" key={comment.id}>
              <div className="comment-info">
                <div>{comment.body}</div>
                <div>
                  Author: <b>{comment.author}</b>
                </div>
              </div>
              <div className="comments-actions">
                <div style={{ paddingBottom: ".5em" }}>
                  <span className="edit">
                    <Link to={`/admin/comment/${parentId}/${comment.id}`}>
                      Edit this comment
                    </Link>
                  </span>
                  <button
                    className="delete"
                    onClick={() =>
                      onDeleteComment(comment.id, props, history)
                    }
                  >
                    Delete
                  </button>
                </div>
                <VoteScore
                  id={comment.id}
                  handleScore={handleScore}
                  score={comment.voteScore}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}


const mapStateToProps = (state) => ({
  data: state.comments,
  isLoading: state.commentsIsLoading,
  hasErrored: state.commentsHasErrored,
})

const mapDispatchToProps = (dispatch) => ({
  deleteComment: (idComment) => dispatch(deleteComment(idComment)),
  fetchComments: (idPost) => dispatch(commentsFetchData(idPost)),
  handleScore: (url, value) => dispatch(handleVoteScore(url, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments)