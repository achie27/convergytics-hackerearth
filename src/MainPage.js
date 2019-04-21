import React from 'react';
import axios from 'axios';

import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import AddExpense from './AddExpense';
import SubmittedExpenses from './SubmittedExpenses';
import Reimbursements from './Reimbursements';

class MainPage extends React.Component {
	constructor(){
		super();
		this.state = {
			auth : 0
		};

		this.authHandler = this.authHandler.bind(this);
	}

	authHandler = (authVal) => {
		this.setState({auth : authVal});
	};

	render(){
		return(
			<div>
				<Header />
				<div className='content'>
					<Menu auth={this.state.auth} items={[
						{comp : AddExpense, name : 'Add expense'}, 
						{comp : SubmittedExpenses, name : 'Submitted expenses'}, 
						{comp : Reimbursements, name : 'Reimbursements'}
					]}/>
				</div>
				<Footer authHandler={this.authHandler}/>
			</div>
		);
	}

}

export default MainPage;