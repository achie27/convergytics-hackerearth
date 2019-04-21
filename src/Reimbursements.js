import React from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Reimbursements extends React.Component {
	state = {
		expenses : []
	};

	componentDidMount(){
		axios.get('/api/expense')
		.then(res => {
			console.log(res);
			let data = res.data.data;
			let expenses = [];
			for(let record of data){
				if(record.status == 'processed'){
					expenses.push({
						type : record.type,
						employee : record.employee.name,
						amount : record.amount,
						status : record.status
					});
				}
			}
			this.setState({expenses : expenses});
		});	
	}

	render(){
		return (
			<List className='expenses-list' component='nav'>
      			<Divider />

				{
					this.state.expenses.map(exp => {
						return <div>
							<ListItem>
								<TextField label='Name' defaultValue={exp.employee} margin="normal" InputProps={{readOnly: true}} variant="filled"/>
								<TextField label='Amount' defaultValue={exp.amount} margin="normal" InputProps={{readOnly: true}} variant="filled"/>
								<TextField label='Type' defaultValue={exp.type} margin="normal" InputProps={{readOnly: true}} variant="filled"/>
								<TextField label='Status' defaultValue={exp.status} margin="normal" InputProps={{readOnly: true}} variant="filled"/>
								{this.props.auth == 1 && <Button id={exp.id} onClick={(e) => this.handleStatus(e)} color="primary">
									Reimburse
								</Button>}
							</ListItem>
					      	<Divider />
					    </div>
					})
				}
			</List>
		);
	}
}

export default Reimbursements;