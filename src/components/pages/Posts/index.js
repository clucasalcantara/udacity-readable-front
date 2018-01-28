import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { postsFetchData, deletePost, handleSort } from '../../../actions/posts'
import { handleVoteScore } from '../../../actions/votescore'

import Header from '../../common/Header'
import OrderBox from '../../common/OrderBox'
import InfoBox from '../../common/InfoBox'
import VoteScore from '../../common/VoteScore'
import Comments from '../../common/Comments'

import './posts.css'

class Posts extends Component {
  componentWillMount() {
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
      console.log('Rendering by category')
      this.props.fetchData(category)
    } else {
      console.log('Conventional rendering')
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
    const url = `posts/${id}`
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
    const { posts = [], hasError, isLoading, history } = this.props
    console.log(posts, hasError)
    const message = this.getCategoryName() ? true : false
    if (hasError) {
      return <h1>Sorry but there was an error while fetch</h1>
    }
    if (isLoading) {
      return <h1>Loading ...</h1>
    }
    return (
      <div>
        <Header />
        { 
          message && <InfoBox getCategoryName={this.getCategoryName} />
        }
        <OrderBox handleSort={this.handleSort} />
        <div className="posts-wrapper">
        <h1>{message}</h1>
          <ul className="list-posts">
            {posts.length === 0 && <span>No posts found</span>}
            {posts.map(post => (
              <li key={post.id}>
                <article className="post-box">
                  <div className="post-item">
                    <div>
                      <Link to={`/admin/post/${post.id}`}>
                        <h1 className="post-title">{post.title}</h1>
                      </Link>
                      <div className="post-body">
                        {post.body}
                      </div>
                    </div>
                    <VoteScore
                      id={post.id}
                      handleScore={this.handleScore}
                      score={post.voteScore}
                    />
                    <div>{`${post.commentCount} comments`}</div>
                    <div className="post-action-box">
                      <div>
                        <span className="edit">
                          <Link to={`/admin/post/${post.id}`}>
                            Edit post
                          </Link>
                        </span>
                        <button className="delete" onClick={() => this.onDeletePost(post.id)}> Delete </button>
                      </div>
                      <Link to={`/admin/comment/${post.id}`}>Add new COMMENT</Link>
                    </div>
                    <Comments idPost={post.id} history={history} />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  hasError: state.postsHasError,
  isLoading: state.postsIsLoading
})

const mapDispatchToProps = {
  fetchData: (idCategory) => postsFetchData(idCategory),
  deletePost: (idPost) => deletePost(idPost),
  handleScore: (url, value) => handleVoteScore(url, value),
  handleSort: (sortBy) => handleSort(sortBy)
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
