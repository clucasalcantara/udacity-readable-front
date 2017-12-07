import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'

import { categoriesFetchData } from '../../../actions/categories'
import './header.css'

class Header extends Component {
  componentDidMount () {
    this.props.fetchData()
  }

  renderMenu () {
    const { categories = {} } = this.props
    const menu = { ...categories }
    if (menu.categories !== undefined) {
      return (
        <ul>
          {menu.categories.map(item => (
            <li key={item.name}>
              <NavLink activeClassName = 'active' to={{
                pathname: `/${item.path}`
              }}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
      )  
    }
    return <span> loading menu ... </span>
  }
  render () {
    return (
      <section className="header">
        <div className="logo">
          <Link to="/">
            <h1>Read Project</h1>
          </Link>
        </div>
        <span className="create-post">
          <Link to="/admin/post">Create a new post</Link>
        </span>
        <nav className="main-menu">
          {this.renderMenu()}
        </nav>
      </section>  
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories
})

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(categoriesFetchData())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
