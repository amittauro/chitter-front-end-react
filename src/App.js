import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Peeps from './Peeps'
import PostPeep from './PostPeep'

export default function App () {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Peeps</Link>
            </li>
            <li>
              <Link to="/sign_up">Sign Up</Link>
            </li>
            <li>
              <Link to="/sign_in">Sign In</Link>
            </li>
            <li>
              <Link to="/post_peep">Post Peep</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/post_peep">
            <PostPeep />
          </Route>
          <Route path="/sign_in">
            <SignIn />
          </Route>
          <Route path="/sign_up">
            <SignUp />
          </Route>
          <Route path="/">
            <Peeps />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

// function Home() {
//   return <h2>Home</h2>;
// }
//
// function About() {
//   return <h2>About</h2>;
// }
//
// function Users() {
//   return <h2>Users</h2>;
// }
