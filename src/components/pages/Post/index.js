import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Header from '../../common/Header'
import VoteScore from '../../common/VoteScore'
import NotFound from '../../pages/NotFound'

import { commentsFetchData } from '../../../actions/comments'
import { postFetchById, deletePost } from '../../../actions/posts'
import { handleVoteScore } from '../../../actions/votescore'

import Comments from '../../common/Comments'

import './post.css'

class Post extends PureComponent {
  componentDidMount() {
    const id = this.getIdPost()
    const { fetchPost, fetchComments } = this.props
    fetchPost(id)
    fetchComments(id)
  }

  getIdPost() {
    const { match = {} } = this.props
    const { params = {} } = match
    const { id } = params
    return id
  }

  onDeletePost = async (id) => {
    const { history } = this.props
    const resultConfirm = window.confirm('Are You Sure you want to Delete this item?')
    if (resultConfirm) {
      await this.props.deletePost(id)
      alert('Post deleted with success !')
      history.push('/')
    }
  }

  handleScore = async (id, value) => {
    const { handleScore, fetchPost } = this.props
    const url = `posts/${id}`
    const res = { option: value }
    await handleScore(url, res)
    fetchPost(id)
  }

  render() {
    const { post, isLoading, history } = this.props
    const { match = {} } = this.props
    const { params = {} } = match
    const { id } = params
    if (isLoading) {
      return <h1>Loading...</h1>
    }
    if (post.title === undefined) {
      return <NotFound />
    }
    return (
      <div>
        <Header />

        <article>

          <h1 className="post-title">{post.title}</h1>
          <div className="post-action">
            <span className="edit">
              <Link to={`/admin/post/${post.id}`}>
                edit
              </Link>
            </span>
            <button className="delete" onClick={() => this.onDeletePost(post.id)}>Delete</button>
          </div>
          <div className="post-body">
            {post.body}
          </div>
          <div className="post-comments">
            <VoteScore id={post.id} handleScore={this.handleScore} score={post.voteScore} />
            <div>{`${post.commentCount} comments`}</div>
          </div>
          <div className="post-comments">
            <Link to={`/admin/comment/${id}`}>Add new COMMENT</Link>
            <Comments idPost={id} history={history} />
          </div>
        </article>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    hasError: state.postsHasError,
    isLoading: state.postsIsLoading,
    post: state.post
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchComments: (idPost) => dispatch(commentsFetchData(idPost)),
  fetchPost: (idPost) => dispatch(postFetchById(idPost)),
  deletePost: (idPost) => dispatch(deletePost(idPost)),
  handleScore: (url, value) => dispatch(handleVoteScore(url, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
