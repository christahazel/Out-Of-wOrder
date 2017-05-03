import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import EventView from './EventView'
import Nav from './Nav'
import App from '../App'
import Name from './Name'




const Home = (props) => (
<Router>
	<div>
		<Nav />
		<Route exact path="/" component={App} />
		<Route path="/name" component={Name} />

	</div>
</Router>
)

export default Home;