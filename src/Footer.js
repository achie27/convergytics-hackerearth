import React from 'react';
import axios from 'axios';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Footer extends React.Component {
	state = {
		open: false,
		passkey:'',
		auth : this.props.auth
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleSubmit = ()=>{
		this.setState({ open: false });
		axios.post('/api/checkKey', {
			key : this.state.passkey
		})
		.then(res => {
			console.log(res);
			if(res.data.auth == 1){
				this.setState({auth : 1});
				this.props.authHandler(1);
				alert('Logged in as Admin');
			} else {
				alert('Not authorised');
			}
		})
		.catch(err => {
			alert('Not authorised');
		});
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	render(){
		return (
			<div>
				<BottomNavigation showLabels>
					<BottomNavigationAction onClick={this.handleClickOpen} label="Login as Admin" />
				</BottomNavigation>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle>Login</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Enter the Passkey for Admins.
						</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="dialog-name"
							label="Passkey"
							type='password'
							onChange={this.handleChange('passkey')}
							value={this.state.passkey}
							fullWidth
						/>
					</DialogContent>
					<DialogActions>1
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.handleSubmit} color="primary">
							Submit
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default Footer;