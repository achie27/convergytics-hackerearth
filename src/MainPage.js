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

		};
	}

	componentDidMount(){
	}

	render(){
		return(
			<div>
				<Header />
				<div className='content'>
					<Menu items={[
						{comp : AddExpense, name : 'Add expense'}, 
						{comp : SubmittedExpenses, name : 'Submitted expenses'}, 
						{comp : Reimbursements, name : 'Reimbursements'}
					]}/>
				</div>
				<Footer />
			</div>
		);
	}

}

export default MainPage;