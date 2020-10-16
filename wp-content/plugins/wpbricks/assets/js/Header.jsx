import React, { Component } from 'react';

const myelement = (
	<table>
		<tr>
			<th>Name</th>
		</tr>
		<tr>
			<td>John</td>
		</tr>
		<tr>
			<td>Elsa</td>
		</tr>
	</table>
);

ReactDOM.render(myelement, document.getElementById('block_lib'));

class Header extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		const urlParams = new URLSearchParams(window.location.search);
	}
	render() {
		document.getElementById('root');
	}
}