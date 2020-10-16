import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Model from './model';
import { Loader } from './icon';

const { __ } = wp.i18n;

export default class Theme_lib extends Component {
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
			path: 'client/theme-data?paged=' + pageNumber + '&s=' + this.state.searchData,
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
						<h2 className="tbl-getting-heading-library">{__('Theme Library', 'wpbricks')}</h2>
					</div>
					<div className="bricks_main_search">
						<form>
							<div className={"bricks-filter-opt"}>
								<div className="bricks_search">
									<input type="search" 
									name="bricks_search_inp" 
									id="bricks_search_inp_id" 
									data-attr={this.state.tabName} placeholder={__('Search Theme', 'wpbricks')}
									value={this.state.searchValue}
									onChange={this.onChangeSearchInput}/>
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
														<li id={"unique-" + val.themetoken} className="tmpl_li" key={index}>
														<div className="block-theme-detail">
															<div className="block-image-outer">
																{
																 val.themeimage && (
																	<div className="img-data" data-src={val.themeimage} style={{ backgroundImage:`url(${val.themeimage})` }}></div>
																 )
																}
															</div>
															<span className="more-details detail-priview_btn"
																id={val.themetitle + "-action"}
																data-theme-token={val.themetoken}
																data-theme-attr={val.themetitle}
																data-theme-url={val.theme_demo_url}>
																{__('Preview', 'wpbricks')}
															</span>
															<div className="block-detail-footer">
																{
																 val.themetitle && (
																	<h2>{val.themetitle}</h2>
																 )
																}
																<div className="block-detail-btn">
																	<button
																	className="button button-secondary priview_btn"
																	data-theme-token={val.themetoken}
																	data-theme-attr={val.themetitle}
																	data-theme-url={val.theme_demo_url}>
																		{__('Preview', 'wpbricks')}
																	</button>
																	<button className="button button-primary wpbricks-theme-import"
																	data-theme-token={val.themetoken}
																	data-install-type={this.state.tabName}
																	>
																		{__('Import', 'wpbricks')}
																	</button>
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
														<p>{__("Don't find a theme you would like to Import?", 'wpbricks')}<br></br><a target="_blank" href="https://www.thedotstore.com/suggest-a-feature/">{__('Submit', 'wpbricks')}</a>{__(' your desire theme suggestion!', 'wpbricks')}</p>
														<div className="back-to-layout-button"><span className="button wpbricks-sites-back" onClick={this.backToTemplate}>{__('Back to Themes', 'wpbricks')}</span></div>
													</div>
												</div>
											</div>
										</div>
									)
								)
							}
						</InfiniteScroll>
				
					</div>
					{
						<Model data={this.state.tabName}/>
					}
				</div>		
			</div>
			
	
	    );
	}
}