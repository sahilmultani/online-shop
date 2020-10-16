import { React, useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './plugin-settings/header';
document.addEventListener('DOMContentLoaded', function() {
	{
		<div className="bricksmain">
			<div className="all-pad">
				{
					(
						null !== document.getElementById('bricks_header_data') && ReactDOM.render(<Header/>, document.getElementById('bricks_header_data'))
					)
				}
			</div>
		</div>
	}
});

