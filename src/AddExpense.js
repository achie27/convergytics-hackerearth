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
		if(this.state.type == 1){
			axios.post('/api/expense/bulk', {
				data : this.state.csvContents
			})
			.then(res => alert('Successfully inserted'))
			.catch(err => alert('Unsuccesful'));
		} else {
			let data = {
				employees : [],
				expense : this.state.expense,
				share : 1/(this.state.num + 1),
				type : this.state.expensetype
			};

			console.log(data);

			data.employees.push(this.state.emp)
			for(let emp of this.state.extraemp){
				data.employees.push(emp);
			}

			axios.post('/api/expense/', {
				data : data
			})
			.then(res => alert('Successfully inserted'))
			.catch(err => alert('Unsuccesful'));
		}
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
	        	csvContent.push(line.split(',').slice(0, 3));
	        }
	        csvContent.pop('');
	        this.setState({csvContents : csvContent});
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
						variant="filled"
						className='add-expense-extra-emp'
						value={this.state.extraemp[i]}
						onChange={this.handleCe(i)}
					/>
				);
			}

		return (
			<div className='add-expense'>
				<div className='add-expense-buttons'>
					<Button variant="contained" color="primary" onClick={this.handleManual}>
						Manual Entry
					</Button>
					<Button variant="contained" color="primary" onClick={this.handleCSV}>
						CSV Entry
					</Button>
					<Button variant="contained" color="secondary" onClick={this.sendData}>
						Submit
					</Button>
				</div>
				{this.state.type === 0 && (
					<div className='add-expense-fields'>
						<TextField
							id="employee"
							label="Name"
							variant="filled"
							className='add-expense-text'
							value={this.state.emp}
							onChange={this.handleChange('emp')}
						/>
						<TextField
							id="expense"
							label="Expense"
							variant="filled"
							className='add-expense-text'
							value={this.state.expense}
							onChange={this.handleChange('expense')}
						/>
						<TextField
							id="expense-types"
							select
							variant="filled"
							className='add-expense-text'
							label="Expense type"
							className='add-expense-expense-types'
							value={this.state.expensetype}
							onChange={this.handleChange('expensetype')}
							SelectProps={{
								native: true,
							}}
							variant="filled"
						>
							{types.map((opt, ind) => (
								<option key={ind} value={opt}>
								  {opt}
								</option>
							))}
						</TextField>
						<Fab variant='extended' color="primary" aria-label="Add" onClick={this.addContributor}>
							<AddIcon />
							Employee
						</Fab>
						{extra}
						
					</div>
				)}

				{this.state.type === 1 && ( 
					<div className='csv-stuff'> 
						<div className='upload-expense'>
					        <input 
								type='file'
								id='add-expense-csv-file'
								accept='.csv'
								onChange={e => this.handleFileChosen(e.target.files[0])}
					        />
					        <label htmlFor="add-expense-csv-file">
							  <Button variant="raised" component="span">
							    Upload CSV
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
											margin='normal'
										/>
										<TextField
											margin='normal'
											disabled
											label="Expense"
											value={record[1]}
										/>
										<TextField
											margin='normal'
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