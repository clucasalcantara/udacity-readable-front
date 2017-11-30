import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import swal from 'sweetalert2'
import Header from '../Header'
import VoteScore from '../VoteScore'
import NotFound from '../NotFound'
import { commentsFetchData } from '../../actions/comments'
import { postFetchById, deletePost } from '../../actions/posts'
import { handleVoteScore } from '../../actions/votescore'
import Comments from '../Comments'
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
      swal(
        `Post deleted with success !`,
        'success'
      )
      history.push('/')
    }
  }

  handleScore = async (id, value) => {
    const { handleScore, fetchPost } = this.props
    const url = `http://localhost:3001/posts/${id}`
    const res = { option: value }
    await handleScore(url, res)
    fetchPost(id)
  }

  render () {
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

          <div className="post-body">
            {post.body}
          </div>

          <VoteScore id={post.id} handleScore={this.handleScore} score={post.voteScore} />

          <div>{`${post.commentCount} comments`}</div>

          <span className="edit">
            <Link to={`/admin/post/${post.id}`}>
              edit
            </Link>
          </span>

          <button className="delete" onClick={() => this.onDeletePost(post.id)}> Delete </button>
          
          <Comments idPost={id} history={history} />
        </article>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    hasErrored: state.postsHasErrored,
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
