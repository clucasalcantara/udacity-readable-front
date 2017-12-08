import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { postsFetchData, deletePost, handleSort } from '../../../actions/posts'
import { handleVoteScore } from '../../../actions/votescore'
import Header from '../../common/Header'
import VoteScore from '../../common/VoteScore'
import Post from '../../common/Post'
import OrderBox from '../../common/OrderBox'
import InfoBox from '../../common/InfoBox'

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
    const { posts, hasError, isLoading } = this.props
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
            {posts.map(post => (
              <Post
                key={post.id}
                post={post}
                handleScore={this.handleScore}
                onDeletePost={this.onDeletePost} 
              />
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

const mapDispatchToProps = (dispatch) => ({
  fetchData: (idCategory) => dispatch(postsFetchData(idCategory)),
  deletePost: (idPost) => dispatch(deletePost(idPost)),
  handleScore: (url, value) => dispatch(handleVoteScore(url, value)),
  handleSort: (sortBy) => dispatch(handleSort(sortBy))
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
