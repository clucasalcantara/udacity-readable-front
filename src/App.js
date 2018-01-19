import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Posts from './components/pages/Posts'
import PostBox from './components/common/PostBox'
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
      <Route path="/:category/:id" component={PostBox} />
      <Route path="/:category" component={Posts} />
      <Route exact path="/" component={Posts} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
