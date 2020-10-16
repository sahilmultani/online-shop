import React, { Component } from 'react';
import Bricks_Overview from './bricks_overview';
import Quick_Info from './quick_info';
import Block_Lib from './block_lib';
import Template_lib from './template_lib';
import Theme_lib from './theme_lib';
import Addon_lib from './addons_lib';

console.log(window.mdbp_bild_js_obj.plugins_url)

const { __ } = wp.i18n;

const sub_menu = [
			{
				label: __('Getting Started', 'wpbricks'),
				value: 'getting_started',
			},
			{
				label: __('Quick Info', 'wpbricks'),
				value: 'quick_info',
			}   
]

const tabArray = [
	{
		label: __('Bricks Overview', 'wpbricks'),
		value: 'getting_started',
		sub_menu
	},
	{
		label: __('Block Library', 'wpbricks'),
		value: 'blocks_lib',
	},
	{
		label: __('Template Library', 'wpbricks'),
		value: 'template_lib'
	},
	{
		label: __('Theme Library', 'wpbricks'),
		value: 'themes_lib'
	},
	{
		label: __('Addons Library', 'wpbricks'),
		value: 'addons_lib'
	}
]

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state={
			pageType: 'bricks-manager',
			tab: 'getting_started',
			childTab: '',
		}
	}
	onClickTab(val, menu_type) {
		if ( 'parent' === menu_type) {
			this.setState({tab: val});
			this.setState({childTab: ''});
		} else {
			this.setState({tab: val});
			this.setState({childTab: val});
		}
	}
	render() {
		const pluginUrl = window.mdbp_bild_js_obj.plugins_url;
		const imgPath = pluginUrl + "/assets/images/";
		const supportUrl = 'https://wordpress.org/support/plugin/wpbricks/';
		const ratingUrl = 'https://wordpress.org/plugins/wpbricks/#reviews';
		const thtmeDownloadUrl = 'https://wordpress.org/themes/wpbricks/';
		return (
			<div className={"header_section"}>
				<header className="bricks-header">
					<div className="bricks-logo-main">
						<img src={imgPath + 'Bricks_Logo_icon.svg'}/>
					</div>
					<div className="logo-detail">
						<strong>{__( 'WPBricks Manager', 'wpbricks' )}</strong>
						<span>{__( 'Free Version 2.0.5', 'wpbricks' )}</span>
						<div className={"ld_ext"}>
							{__( 'Compatible with ', 'wpbricks' )}<b>{__( 'Free WPBricks', 'wpbricks' )}</b>{__( ' Theme. ', 'wpbricks' )}
							<a href={thtmeDownloadUrl} target="_blank"><b>{__( 'Download Now', 'wpbricks' )}</b></a>
						</div>
					</div>
					<div className="bricks-header-right">
						<div className="button-bricks">
							<span className="support_bricks_image">
								<a target="_blank"
								href={ratingUrl}>
									<span className="dashicons dashicons-thumbs-up"></span>
									<strong>{__( 'Submit a Review', 'wpbricks' )}</strong>
								</a>
							</span>
						</div>
						<div className="button-bricks">
							<span className="support_bricks_image">
								<a target="_blank"
								href={supportUrl}>
									{/* <img src={imgPath + 'support_new.png'}/> */}
									<span className="dashicons dashicons-sos"></span>
									<strong>{__( 'Quick Support', 'wpbricks' )}</strong>
								</a>
							</span>
						</div>
					</div>
					<div className="bricks-menu-main">
						<nav>
							<ul>
								{
									tabArray.map((val, index) => {
											let activeClass = '';
											if( sub_menu.some(sub_menus => sub_menus.value === val.value ) && this.state.childTab ) {
												activeClass = "nav-tab-active"
											} else if (this.state.tab == val.value) {
												activeClass = "nav-tab-active"
											} else {
												activeClass = ""
											}
											return (
												<li key={index}>
													<span onClick={() => this.onClickTab(val.value, 'parent')} className={"nav-tab " + activeClass }>
														{val.label}
													</span>
													{
														val.sub_menu && (
															<ul className="sub-menu">
																{
																	val.sub_menu.map((val_sub, index_sub) => (
																		<li key={index_sub}>
																			<span onClick={() => this.onClickTab(val_sub.value,'child')} className={"nav-tab " + ( this.state.tab == val_sub.value ? 'nav-tab-active' : '' )}>
																				{val_sub.label}
																			</span>
																		</li>
																	) )
																}
															</ul>
														)
													}
												</li>
											)
										}
									)
								}
							</ul>
						</nav>
					</div>
				</header>
				<div className="bricks-section-left">
					<div className={"bricks-main-table res-cl " + this.state.tab}>
						{
							(
								'getting_started' == this.state.tab ? <Bricks_Overview data={this.state.tab} plugin_url={pluginUrl}/> : ''
							)
						}
						{
							(
								'quick_info' == this.state.tab ? <Quick_Info data={this.state.tab} support_url={supportUrl}/> : ''
							)
						}
						{
							(
								'blocks_lib' == this.state.tab ? <Block_Lib data={this.state.tab} img_src={imgPath}/> : ''
							)
						}
						{
							(
								'template_lib' == this.state.tab ? <Template_lib data={this.state.tab} img_src={imgPath}/> : ''
							)
						}
						{
							(
								'themes_lib' == this.state.tab ? <Theme_lib data={this.state.tab} img_src={imgPath}/> : ''
							)
						}
						{
							(
								'addons_lib' == this.state.tab ? <Addon_lib data={this.state.tab} img_src={imgPath}/> : ''
							)
						}
					</div>
				</div>
			</div>
			);
	}
}