import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postsFetchData, deletePost, handleSort } from '../../actions/posts'
import { handleVoteScore } from '../../actions/votescore'
import Header from '../Header'
import VoteScore from '../VoteScore'
import './posts.css'

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
      this.props.fetchData(changedRouteCategory)
    }
  }

  listPosts = () => {
    const category = this.getCategoryName()
    if (this.isRenderedByCategory()) {
      this.props.fetchData(category)
    } else {
      this.props.fetchData()
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
    const { posts, hasErrored, isLoading } = this.props
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
          <small>All posts from category</small>
          <h2>{this.getCategoryName()}</h2>
        </div>}
        <h1>{message}</h1>
        <div>
          Order By: 
          <button onClick={this.handleSort('timestamp')}>Data</button>
          <button onClick={this.handleSort('voteScore')}>Score</button>
        </div>
        <ul className="list-posts">
          {posts.map(post => (
            <li key={post.id}>
              <div className="post-header">
                <Link to={{
                  pathname: `/${post.category}/${post.id}`
                }}>
                  {post.title}
                </Link>
              </div>

              <span className="edit">
                <Link to={`/admin/post/${post.id}`}>
                  edit
                </Link>
              </span>

              <button className="delete" onClick={() => this.onDeletePost(post.id)}> Delete </button>
              
              <div>Author: <strong>{post.author}</strong></div>

              <div>Category: <strong> {post.category} </strong></div>

              <div><strong>{post.commentCount}</strong> Comments</div>

              <VoteScore id={post.id} handleScore={this.handleScore} score={post.voteScore} />
            </li>
          ))}
        </ul>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  hasErrored: state.postsHasErrored,
  isLoading: state.postsIsLoading
})

const mapDispatchToProps = (dispatch) => ({
  fetchData: (idCategory) => dispatch(postsFetchData(idCategory)),
  deletePost: (idPost) => dispatch(deletePost(idPost)),
  handleScore: (url, value) => dispatch(handleVoteScore(url, value)),
  handleSort: (sortBy) => dispatch(handleSort(sortBy))
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
