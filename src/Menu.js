import React from 'react';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';


class ProfileTabs extends React.PureComponent {
	state = { activeIndex: 0 }

	handleChange = (_, activeIndex) => this.setState({ activeIndex })
	render() {
		const { activeIndex } = this.state;
		return (
			<div
				style={{
					display: 'flex',
				}}
			>
				<VerticalTabs
					value={activeIndex}
					onChange={this.handleChange}
				>
					{this.props.items.map((comp, ind) => <MyTab key={ind} label={comp.name}/>)}
					
				</VerticalTabs>

				{
					this.props.items.map((comp, ind) => {
						const Comp = comp.comp;
						return activeIndex == ind && <Comp auth={this.props.auth} key={ind}/>;
					})
				}

			</div>
		)
	}
}

const VerticalTabs = withStyles(theme => ({
	flexContainer: {
		flexDirection: 'column'
	},
	indicator: {
		display: 'none',
	}
}))(Tabs)

const MyTab = withStyles(theme => ({
	selected: {
		color: 'tomato',
		borderBottom: '2px solid tomato'
	}
}))(Tab);

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

export default ProfileTabs;