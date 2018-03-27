import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// Import post actions
import { postsFetchData, deletePost, handleSort } from '../../actions/posts'
import { handleVoteScore } from '../../actions/votescore'
// Import common components
import Header from '../common/Header'
import VoteScore from '../common/VoteScore'
import Comments from '../common/Comments'

class Posts extends Component {
  componentDidMount() {
    this.listPosts()
  }

  componentWillReceiveProps(nextProps) {
    const { match = {} } = nextProps
    const { params = {} } = match
    const changedRouteCategory = params.category
    const actualCategory = this.getCategoryName()

    if (changedRouteCategory !== actualCategory) {
      this.props.fetchDataByCategory(changedRouteCategory)
    }
  }

  listPosts = () => {
    const category = this.getCategoryName()
    if (this.isRenderedByCategory()) {
      this.props.fetchDataByCategory(category)
    } else {
      this.props.fetchDataByCategory()
    }


  }

  isRenderedByCategory = () => {
    return !!this.getCategoryName()
  }

  getCategoryName = () => {
    const { match = {} } = this.props
    const { params = {} } = match
    return params.category
  }

  onDeletePost = async (id) => {
    const resultConfirm = window.confirm('Are You Sure you want to Delete this item?')
    if (resultConfirm) {
      await this.props.deletePost(id)
      this.props.fetchData()
    }
  }

  handleScore = async (id, value) => {
    const { handleScore } = this.props
    const url = `http://localhost:3001/posts/${id}`
    const res = { option: value }
    await handleScore(url, res)
    this.listPosts()
  }

  handleSort = (sortBy) => {
    return (e) => {
      this.props.handleSort(sortBy)
    }
  }

  render() {
    const { posts, hasErrored, isLoading, history } = this.props
    const message = this.getCategoryName() ? true : false
    if (hasErrored) {
      return <h1>Sorry but there was an error while fetch</h1>
    }
    if (isLoading) {
      return <h1>Loading ...</h1>
    }
    return (
      <div>
        <Header />
        {message && <div className="message-posts-by-category">
          <small>We are displaying all posts from category:
            <span className="category">{` ${this.getCategoryName()}`}</span>
          </small>
        </div>}
        <h1>{message}</h1>
        <div className="orderbox">
          Order By:
          <button onClick={this.handleSort('timestamp')}>Data</button>
          <button onClick={this.handleSort('voteScore')}>Score</button>
        </div>
        <ul className="list-posts">
          {posts.map(post => (
            <li key={post.id}>
                <article>
                  <h1 className="post-title">{post.title}</h1>
                  <div className="post-action">
                    <span className="edit">
                      <Link to={`/admin/post/${post.id}`}> edit</Link>
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
                    <Link to={`/admin/comment/${post.id}`}>Add new COMMENT</Link>
                    <Comments idPost={post.id} history={history} />
                  </div>
                </article>
            </li>
          ))}
        </ul>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  hasError: state.postsHasError,
  isLoading: state.postsIsLoading
})

const mapDispatchToProps = (dispatch) => ({
  fetchDataByCategory: (idCategory) => dispatch(postsFetchData(idCategory)),
  deletePost: (idPost) => dispatch(deletePost(idPost)),
  handleScore: (url, value) => dispatch(handleVoteScore(url, value)),
  handleSort: (sortBy) => dispatch(handleSort(sortBy))
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
