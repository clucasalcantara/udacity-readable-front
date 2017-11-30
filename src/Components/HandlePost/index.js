import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import uuidv1 from 'uuid/v1'
import swal from 'sweetalert2'
import Header from '../Header'
import { postFetchById, insertPost, updatePost } from '../../actions/posts'
import { categoriesFetchData } from '../../actions/categories'
import NotFound from '../NotFound'


class HandlePost extends Component {

  constructor(props) {
    super(props)
    this.state = {
      update: {
        isUpdate: false,
        updatedValues: false
      },
      title: '',
      body: '',
      author: '',
      category: ''
    }
  }

  componentDidMount() {
    const { match = {} } = this.props
    const { params = {} } = match
    if (params.id) {
      this.props.fetchPost(params.id)
      this.setState({
        update: {
          isUpdate: true,
          updatedValues: false
        }
      })
    }
    this.props.categoriesFetchData()
  }

  componentWillReceiveProps(nextProps) {
    const { update } = this.state
    const { post } = nextProps

    if (!update.updatedValues) {
      if (update.isUpdate && post.title) {
        this.setState({
          update: {
            isUpdate: true,
            updatedValues: true
          },
          title: post.title,
          body: post.body,
          category: post.category,
          author: post.author
        })
      }
    }
  }

  handleSubmit = (e) => {
    const { update = {} } = this.state
    const { isUpdate = {} } = update
    const { insertPost, updatePost, match = {}, history } = this.props
    const { params = {} } = match
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    const post = {
      id: uuidv1(),
      timestamp: Date.now(),
      ...values
    }
    if (isUpdate) {
      updatePost(params.id, post)
    } else {
      insertPost(post)
    }
    swal(
      `Saved Post with success !`,
      'success'
    )
    history.goBack()
  }

  handleTextChange = (event) => {
    const { name } = event.target
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { update, title, body, category, author } = this.state
    const { fetchError } = this.props
    const { categories = [] } = this.props.categories
    const command = update.isUpdate === true ? 'Update' : 'Create'

    if (fetchError) {
      return <NotFound />
    }

    return (
      <div>
        <Header />

        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Title</label>
            <input type="text" name="title" value={title} onChange={this.handleTextChange} />
          </div>
          <div>
            <label>Body</label>
            <textarea type="content" name="body" value={body} onChange={this.handleTextChange} />
          </div>

          {!update.isUpdate && (
            <div>
              <div>
                <label>Categories</label>
                <select name="category" value={category} onChange={this.handleTextChange}>
                  {categories.length > 0 && categories.map((c) => {
                    return (
                      <option value={c.name} key={c.path}>
                        {c.name}
                      </option>
                    )
                  }
                  )}
                </select>
              </div>
              <div>
                <label>Author</label>
                <input type="text" name="author" value={author} onChange={this.handleTextChange} />
              </div>
            </div>
          )}
          <button type="submit">{`${command} Post`}</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    fetchError: state.postsHasErrored,
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchPost: (idPost) => dispatch(postFetchById(idPost)),
  insertPost: (post) => dispatch(insertPost(post)),
  updatePost: (id, post) => dispatch(updatePost(id, post)),
  categoriesFetchData: () => dispatch(categoriesFetchData())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HandlePost))