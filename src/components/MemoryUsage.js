import React from 'react';

import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineMarkSeries} from 'react-vis';

class MemoryUsage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [
				{x: 0, y: 8},
				{x: 1, y: 5},
				{x: 2, y: 4},
				{x: 3, y: 9},
				{x: 4, y: 1},
				{x: 5, y: 7},
				{x: 6, y: 6},
				{x: 7, y: 3},
				{x: 8, y: 2},
				{x: 9, y: 0}
			]
		};

		this.updateMemoryUsage = this.updateMemoryUsage.bind(this);
	}

	updateMemoryUsage() {
		fetch('http://127.0.0.1:8081/get-system-stats')
		.then(res => res.json())
		.then(result => {
			let count = 0;
			let data = result.data.map((stat) => {
				count++;
				return { 
					y: (stat.totalMemory - stat.freeMemory) / stat.totalMemory * 100,
					x: count
				}
			});

			this.setState({data: data});
		});
	}

	componentDidMount() {
		this.updateMemoryUsage();
		setInterval(this.updateMemoryUsage, 5000)
	}

	render() {
		return (
			<div id="app-container">
				<XYPlot height={300} width={300}>
					<LineMarkSeries data={this.state.data} />
				</XYPlot>
			</div>
		);
	}
}

export default MemoryUsage;