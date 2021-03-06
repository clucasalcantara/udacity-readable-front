import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './components/pages/Home'
import Posts from './components/pages/Posts'
import Post from './components/pages/Post'
import NotFound from './components/pages/NotFound'
import HandlePost from './components/pages/HandlePost'
import HandleComment from './components/pages/HandleComment'

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/admin/post/:id" component={HandlePost} />
      <Route path="/admin/post" component={HandlePost} />
      <Route path="/admin/comment/:idPost/:id" component={HandleComment} />
      <Route path="/admin/comment/:idPost" component={HandleComment} />
      <Route path="/:category/:id" component={Post} />
      <Route path="/:category" component={Posts} />
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
