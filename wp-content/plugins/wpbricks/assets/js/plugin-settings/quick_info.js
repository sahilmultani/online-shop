import React, { Component } from 'react';
const { __ } = wp.i18n;

export default class Quick_Info extends Component {
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
        let supportURL;
		if (this.props.data) {
			supportURL = this.props.support_url;
		}
		this.state={
			pageType: 'bricks-manager',
            tabName: tabName,
            support_url: supportURL,
		}
	}
	render() {
		return (
			<div className={"overview_section"}>
				<h2 className="tbl-getting-heading">{__("Quick Info", 'wpbricks')}</h2>
                <table className="table-outer">
                    <tbody>
                        <tr>
                            <td className="fr-1">{__("Plugin Name", 'wpbricks')}</td>
                            <td className="fr-2">{__("WPBricks Manager", 'wpbricks')}</td>
                        </tr>
                        <tr>
                            <td className="fr-1">{__("Installed Version", 'wpbricks')}</td>
                            <td className="fr-2">{__("Free Version 2.0.5", 'wpbricks')}</td>
                        </tr>
                        <tr>
                            <td className="fr-1">{__("Help & Support", 'wpbricks')}</td>
                            <td className="fr-2">
                                <ul>
                                    <li><a href="#">{__("Quick Start", 'wpbricks')}</a></li>
                                    <li><a target="_blank" href="#">{__("Guide Documentation", 'wpbricks')}</a>
                                    </li>
                                    <li><a target="_blank" href={this.state.support_url}>{__("Support Forum", 'wpbricks')}</a></li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="fr-1">{__("Localization", 'wpbricks')}</td>
                            <td className="fr-2">{__("English", 'wpbricks')}</td>
                        </tr>
                    </tbody>
                </table>
			</div>
			);
	}
}