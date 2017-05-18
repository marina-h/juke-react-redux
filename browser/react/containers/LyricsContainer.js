import React, {Component} from 'react';
import store from '../store';

export default class LyricsContainer extends Component {
	constructor(){
		super()
		this.state = store.getState()

	}

	componentDidMount(){
		this.unsubscribe = store.subscribe( 
				() =>{
					store.setState(store.getState());
				}
			)

	}

	componentWillUnmount(){
		this.unsubscribe();
	}

	render(){
		return(
			<h1>Just a container, more to come!</h1>
		)
	}
}