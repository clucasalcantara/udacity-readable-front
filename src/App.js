import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Posts from './Components/Posts'
import Post from './Components/Post'
import NotFound from './Components/NotFound'
import HandlePost from './Components/HandlePost'
import HandleComment from './Components/HandleComment'

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
