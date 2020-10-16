import React, { Component } from 'react';
const { __ } = wp.i18n;

export default class Bricks_Overview extends Component {
	constructor(props) {
		super(props);
		let tabnameSplit;
		if (this.props.data) {
			tabnameSplit = this.props.data.split("_lib");
		}
		var tabName = '';
		if (tabnameSplit) {
			 tabName = tabnameSplit[0].trim();
		}

		this.state={
			pageType: 'bricks-manager',
			tabName: tabName,
		}
	}
	render() {
		const imgPath = this.props.plugin_url + "assets/images/";
		return (
			<div className={"overview_section"}>
				<h2 className="tbl-getting-heading">{__("Thanks For Installing WPBricks", 'wpbricks')}</h2>
				<table className="table-outer" id="quick_info">
					<tbody>
						<tr>
								<td className="fr-2">
									<p className="block gettingstarted">
										<strong>{__("Getting Started", 'wpbricks')}</strong>
									</p>
									<p>
										{__("Add Block/Template to page and modify as per your requirement.", 'wpbricks')}
									</p>
									<p className="block textgetting">
										<strong>{__("Step 1: ", 'wpbricks')}</strong>
										{__("Add Block/Template to page", 'wpbricks')}
									</p>
									<p><span><img src={imgPath + "step-1.jpg"}/></span></p>
									<p className="block textgetting">
										<strong>{__("Step 2: ", 'wpbricks')}</strong>
										{__("Add Block/Template through Bricks select block", 'wpbricks')}
									</p>
									<p><span><img src={imgPath + "step-2.jpg"}/></span></p>
									<p className="block textgetting">
										<strong>{__("Step 3: ", 'wpbricks')}</strong>
										{__("You can select pre designed block or template using select block", 'wpbricks')}
									</p>
									<p><span><img src={imgPath + "step-3.jpg"}/></span></p>
									<p className="block textgetting">
										<strong>{__("Step 4: ", 'wpbricks')}</strong>
										{__("Edit block and design modification", 'wpbricks')}
									</p>
									<p><span><img src={imgPath + "step-4.jpg"}/></span></p>
								</td>
							</tr>		
					</tbody>			
				</table>
			</div>
			);
	}
}