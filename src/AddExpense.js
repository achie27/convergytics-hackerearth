import React from 'react';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';


const types = ['food', 'travel', 'accomodation'];

class AddExpense extends React.Component {
	state = {
		emp : '',
		expense : 0,
		extraemp : [],
		expensetype : 'food',
		type : 0,
		num : 0,
		csvContents : []
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	handleCe = (ind) => event => {
		let newextraemp = this.state.extraemp;
		newextraemp[ind] = event.target.value;
		this.setState({
			extraemp : newextraemp
		});
	};

	sendData = () => {

	};

	addContributor = () => {
		let newextraemp = this.state.extraemp;
		newextraemp.push('');
		this.setState({
			extraemp : newextraemp,
			num : this.state.num + 1
		});
	};

    handleFileChosen = (file) => {
        
        const handleFileRead = () => {
	        let csvContent = [];
	        const content = fileReader.result;
	        for(let line of content.split('\n')){
	        	csvContent.push(line.split(','));
	        }

	        csvContent.pop('');
	        this.setState({csvContents : csvContent});
	        console.log(csvContent);        	
        };

        let fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };

    handleCSV = () => {
    	this.setState({
    		type : 1,
    		emp : '',
			expense : 0,
			extraemp : [],
			expensetype : 'food',
			num : 0,
			csvContents : []
    	});
    };

	handleManual = () => {
    	this.setState({
    		type : 0,
    		emp : '',
			expense : 0,
			extraemp : [],
			expensetype : 'food',
			num : 0,
			csvContents : []
    	});
    };

	render(){
			let extra = [];
			for (var i = 0; i < this.state.num; i++) {
				extra.push(
					<TextField
						label="Name"
						value={this.state.extraemp[i]}
						onChange={this.handleCe(i)}
					/>
				);
			}

		return (
			<div>
				<Button variant="contained" color="primary" onClick={this.handleCSV}>
					Upload CSV
				</Button>
				<Button variant="contained" color="primary" onClick={this.handleManual}>
					Manual Entry
				</Button>
				{this.state.type === 0 && (
					<div>
						<TextField
							id="employee"
							label="Name"
							value={this.state.emp}
							onChange={this.handleChange('emp')}
						/>
						{extra}
						<TextField
							id="expense"
							label="Expense"
							value={this.state.expense}
							onChange={this.handleChange('expense')}
						/>
						<TextField
							id="expense-types"
							select
							label="Expense type"
							className='add-expense-expense-types'
							value={this.state.expensetype}
							onChange={this.handleChange('expensetype')}
							SelectProps={{
								native: true,
							}}
							margin="normal"
							variant="filled"
						>
							{types.map((opt, ind) => (
								<option key={ind} value={opt}>
								  {opt}
								</option>
							))}
						</TextField>
						<Button variant="contained" color="primary" onClick={this.sendData}>
							Submit
						</Button>
						<Fab color="primary" aria-label="Add" onClick={this.addContributor}>
							<AddIcon />
						</Fab>
					</div>
				)}

				{this.state.type === 1 && ( 
					<div> 
						<div className='upload-expense'>
					        <input 
								type='file'
								id='add-expense-csv-file'
								accept='.csv'
								onChange={e => this.handleFileChosen(e.target.files[0])}
					        />
					        <label htmlFor="add-expense-csv-file">
							  <Button variant="raised" component="span">
							    Upload
							  </Button>
							</label> 
					    </div>
					    <div>
					    	{this.state.csvContents.map(record => {
						    	return (
						    		<div>
							    		<TextField
											disabled
											label="Name"
											value={record[0]}
										/>
										<TextField
											disabled
											label="Expense"
											value={record[1]}
										/>
										<TextField
											disabled
											label="Type"
											value={record[2]}
										/>
									</div>
								);
					    	})}
					    </div> 
					</div>
				)}
			</div>
		);
	}
}

export default AddExpense;