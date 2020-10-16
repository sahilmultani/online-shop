import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Loader } from './icon';

const { __ } = wp.i18n;

export default class Addon_lib extends Component {
	constructor(props) {
		super(props);
		let tabnameSplit;
		if (this.props.data) {
			console.log(this.props.data)
			tabnameSplit = this.props.data.split("_lib");
		}
		var tabName = '';
		if (tabnameSplit) {
			 tabName = tabnameSplit[0].trim();
		}

		this.state={
			pageType: 'bricks-manager',
			tabName: tabName,
			hasError: false,
			apiData: [],
			page: 1,
			isLoading: false,
			isScroll: false,
			hasMoreItems: true,
			total_data: 0,
			searchData: '',
			searchValue: '',
			loadingCount: '0',
			initial: true
		}
		this.loadFunc = this.loadFunc.bind(this);
		this.handleSearchKeyUp = this.handleSearchKeyUp.bind(this);
		this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
		this.backToTemplate = this.backToTemplate.bind(this);
	}
	backToTemplate() {
		this.setState({
			searchData: "",
			searchValue: "",
			page: 1,
			current_data: 0,
			hasMoreItems: true,
			initial: true,
		});
	}
	onChangeSearchInput(e) {
		this.setState({'searchValue': e.target.value});
	}
	handleSearchKeyUp(e) {
		e.preventDefault();
		if ('0' === this.state.loadingCount) {
			this.setState({
				apiData: [],
				searchData: this.state.searchValue,
				page: 1,
				total_data: 0,
				hasMoreItems: true,
				initial: true,
			});
			this.setState({'loadingCount': '1'});
		} else {
			this.setState({
				apiData: [],
				searchData: this.state.searchValue,
				page: 1,
				total_data: 0,
				hasMoreItems: true,
				initial: true,
			});//, this.loadFunc
		}
		
	}
	loadFunc(page) {
		let pageNumber;
		if (this.state.page) {
			pageNumber = this.state.page;
		} else {
			pageNumber = 1;
		}
		wp.apiFetch( {
			path: 'client/addon-data?paged=' + pageNumber + '&s=' + this.state.searchData,
			method: 'POST',
		} ).then( data => {
						if (false == data.status) {
							this.setState({
								isLoading: false,
								isScroll: false,
								hasMoreItems: false,
								initial: false,
							});
						} else {
							let loadData = [];
								if (this.state.apiData) {
									loadData = this.state.apiData;
								}
								data.map((item) => {
									loadData.push(item);
								});
							if (data.length < 12) {
								this.setState({
									apiData: loadData,
									total_data: loadData.length,
									isLoading: false,
									isScroll: false,
									hasMoreItems: false,
								});
							} else {
								this.setState({
									apiData: loadData,
									total_data: loadData.length,
									isLoading: true,
									isScroll: false,
									hasMoreItems: true,
									page: pageNumber + 1,
								});
							}
						}
			} );
	}
	render() {
		if (this.state.hasError) {
			return <h1>{__('Something went wrong.', 'wpbricks')}</h1>;
		}
		return (
			
			<div className={"block_section"}>
				<div className="heading_section">
					<div className="wpbricks_title_section">
						<h2 className="tbl-getting-heading-library">{__('Extend WPBricks Theme with Addons Library', 'wpbricks')}</h2>
					</div>
					<div className="bricks_main_search">
						<form>
							<div className={"bricks-filter-opt"}>
								<div className="bricks_search">
									<input type="search" 
										name="bricks_search_inp" 
										id="bricks_search_inp_id" 
										data-attr={this.state.tabName} placeholder={__('Search Addons', 'wpbricks')}
										value={this.state.searchValue}
										onChange={this.onChangeSearchInput}
									/>
									<button onClick={this.handleSearchKeyUp}>
										<i className="fas fa-search"></i>
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div id="block_lib"></div>
				<div className="blocks-list sep-block">
					<div className="block-list-main">
								<InfiniteScroll
									pageStart={this.state.page}
									loadMore={this.loadFunc}
									hasMore={this.state.hasMoreItems}
									loader={this.state.apiData.length == 0 && this.state.initial == false ? 
									'' : ( <div className="loader" key={this.state.page}>{Loader}</div> )}
								>
									{
										this.state.apiData.length > 0 ? ( 
											<ul className="block_data">
												{
													this.state.apiData.map(
														(val, index) => (
															<li id={"unique-" + val.addonstoken} key={index}>
																	<div className="block-theme-detail">
																													<div className="block-image-outer">
																														{
																														val.addonsimage && (
																															<div className="img-data" data-src={val.addonsimage} style={{ backgroundImage:`url(${val.addonsimage})` }}></div>
																														)
																														}
																													</div>
																													<div className={"addon-one-details detail-priview_btn " + (val.addons_demo_url && val.learn_more_url ? "addon-more-details" : '')}>
																														{
																															val.addons_demo_url && (
																															<span className="addon-detail-priview_btn"
																																id={val.addonstitle + "-action"}
																																data-theme-token={val.addonstoken}
																																data-theme-attr={val.addonstitle}
																																data-theme-url={val.addons_demo_url}>
																																{__('Preview', 'wpbricks')}
																															</span>
																															)
																														}
																														{
																															val.learn_more_url && (
																																<span className="addon-detail-learn-more">
																																	<a href={val.learn_more_url} target="_blank" className="learn-more">
																																		{__( 'Learn More', 'wpbricks')}
																																	</a>
																																</span>
																															)
																														}
																													</div>
																													<div className="block-detail-footer">
																														{
																															val.addonstitle && (
																																<h2>{val.addonstitle}</h2>
																															)
																														}
																														<div className="block-detail-btn addons-detail-btn" key={index}>
																															{
																																'deactive' == val.activation_status && <button className="button button-primary wpbricks-addons-import"
																																	data-theme-token={val.addonstoken}
																																	data-install-type="addons"
																																	data-active-type="active">
																																	{__( 'Activate', 'wpbricks')}
																																</button>
																															}
																															{
																																'active' == val.activation_status && <button className="button button-primary wpbricks-addons-import"
																																	data-theme-token={val.addonstoken}
																																	data-install-type="addons"
																																	data-active-type="deactive">
																																	{__( 'Deactivate', 'wpbricks')}
																																</button>
																															}
																															{
																																'active' == val.activation_status && val.setting_url && (
																																	<a href={val.setting_url} className="button button-primary setting">
																																	{__( 'Setting', 'wpbricks')}
																																	</a>
																																)
																															}
																														</div>
																													</div>
																												</div>											
															</li>
														)
													)
												}
											</ul>
										) : ( 
											this.state.apiData.length == 0 && this.state.initial == false && (
												<div className="wpbricks-sites-no-sites">
													<div className="inner">
														<h3>{__('Sorry No Results Found.', 'wpbricks')}</h3>
														<div className="content">
															<div className="empty-item">
																<img className="empty-collection-part" src={this.props.img_src + 'empty-collection.png'} alt="empty-collection"/>
															</div>
															<div className="description">
																<p>{__("Don't find a ready-made addon you would like to Install?", 'wpbricks')}<br></br><a target="_blank" href="https://www.thedotstore.com/suggest-a-feature/">{__('Submit', 'wpbricks')}</a>{__(' your desire ready-made addon suggestion!', 'wpbricks')}</p>
																<div className="back-to-layout-button"><span className="button wpbricks-sites-back" onClick={this.backToTemplate}>{__('Back to Addons', 'wpbricks')}</span></div>
															</div>
														</div>
													</div>
												</div>
											)
										)
									}
								</InfiniteScroll>
					</div>
				</div>		
			</div>
			
	
	    );
	}
}