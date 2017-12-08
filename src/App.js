import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Posts from './components/pages/Posts'
import NotFound from './components/pages/NotFound'
import HandlePost from './components/pages/HandlePost'
import HandleComment from './components/pages/HandleComment'

import Post from './components/common/Post'

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/admin/post/:id" component={HandlePost} />
      <Route path="/admin/post" component={HandlePost} />
      <Route path="/admin/comment/:idPost/:id" component={HandleComment} />
      <Route path="/admin/comment/:idPost" component={HandleComment} />
      <Route path="/:category/:id" component={Post} />
      <Route path="/:category" component={Posts} />
      <Route exact path="/" component={Posts} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
