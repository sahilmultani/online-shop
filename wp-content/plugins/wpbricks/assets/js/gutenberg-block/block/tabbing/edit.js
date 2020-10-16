import React from 'react';

const { Component } = wp.element;
const { __ } = wp.i18n;
const { PanelBody, withNotices, RangeControl, Tooltip, Dashicon, SelectControl, PanelRow, TextControl } = wp.components;
const { RichText, InspectorControls, InnerBlocks, ColorPalette } = wp.blockEditor;
const { Fragment } = wp.element;
import {
	WPBricksAdvanceCss
  } from "../common-components/bricks-advancecss";

class TabEdit extends Component {
	constructor(props) {
		super(props);
		this.setAttributes = this.setAttributes.bind(this);
		this.state = {
			activeClass: false
		};
	}

	setAttributes(attributes) {
		this.props.setAttributes(attributes);
	}

	componentDidMount() {
		setTimeout(() => this.initTabs(), 20);
		if (! this.props.attributes.blockID) {
			this.props.setAttributes({ blockID: this.props.clientId });
		}
	}

	initTabs(refresh = false) {
		if ('undefined' !== typeof jQuery) {
			if (! refresh) {
				jQuery(`#block-${this.props.clientId} .bricks-tabbing`).tabs();
			} else {
				jQuery(`#block-${this.props.clientId} .bricks-tabbing`).tabs('refresh');
			}

			jQuery(`#block-${this.props.clientId} .bricks-tabbing a`).on('keydown', function (e) {
				e.stopPropagation();
			});
		}
	}

	updateTabs(value, index) {
		const { attributes, setAttributes } = this.props;
		const { tabItems } = attributes;

		let newItems = tabItems.map((item, thisIndex) => {
			if (index === thisIndex) {
				item = Object.assign({}, item, value);
			}

			return item;
		});

		setAttributes({ tabItems: newItems });
	}

	componentDidUpdate(prevProps) {
		const { tabItems: prevItems } = prevProps.attributes;
		const { tabItems } = this.props.attributes;

		if (prevItems !== tabItems) {
			this.initTabs(true);
		}

		if (0 === tabItems.length) {
			this.props.setAttributes({
				tabItems: [
					{
						header: 'Click Here',
						body:
							'There should be atleast one tab to remove block by using "Remove Block" button. You can edit this tab also.'
					}
				]
			});
		}
	}

	render() {
		const { attributes, setAttributes, clientId } = this.props;
		const {
			blockID,
			tabItems,
			titleBgColor,
			titleTextColor,
			contentBgColor,
			contentTextColor,
			borderStyle,
			borderWidth,
			borderColor,
			borderRadius,
			activeBgColor,
			activeTextColor,
			titleBottomGap,
			titleLeftGap,
			titleRightGap,
			titleTopGap,
			contentBottomGap,
			contentLeftGap,
			contentRightGap,
			contentTopGap,
			deviceMobileManager,
			deviceTabletManager,
			customCssText,
			BRICKS,
			bricks_style,
          	bricks_fonts
		} = attributes;

		/* Unique ID generate */

		setAttributes({
			BRICKS:
			  "bricks-blocks-" + clientId.split("-")[clientId.split("-").length - 1]
		  });
	
		  /* Style var generate */
	
		  let tab_title_bg_color = titleBgColor
			? "background-color:" + titleBgColor + ";"
			: "";
		  let tab_title_text_color = titleTextColor
			? "color:" + titleTextColor + ";"
			: "";
		  let tab_content_bg_color = contentBgColor
			? "background-color:" + contentBgColor + ";"
			: "";
		  let tab_content_text_color = contentTextColor
			? "color:" + contentTextColor + ";"
			: "";
		  let tab_border_style = borderStyle
			? "border-style:" + borderStyle + ";"
			: "";
		  let tab_border_color = borderColor
			? "border-color:" + borderColor + ";"
			: "";
		  let tab_border_width = borderWidth
			? "border-width:" + borderWidth + "px;"
			: "";
		  let tab_border_radius = borderRadius
			? "border-radius:" + borderRadius + "px;"
			: "";
		  let tab_margin =
			"-" +
			tab_border_width +
			"px 0 -" +
			tab_border_width +
			"px -" +
			tab_border_width +
			"px";
		  let tab_active_bg = activeBgColor
			? "background-color:" + activeBgColor + ";"
			: "";
		  let tab_active_text_color = activeTextColor
			? "color:" + activeTextColor + ";"
			: "";
		  let tab_title_topgap = titleTopGap
			? "padding-top:" + titleTopGap + "px;"
			: "";
		  let tab_title_rightgap = titleRightGap
			? "padding-right:" + titleRightGap + "px;"
			: "";
		  let tab_title_bottomgap = titleBottomGap
			? "padding-bottom:" + titleBottomGap + "px;"
			: "";
		  let tab_title_leftgap = titleLeftGap
			? "padding-left:" + titleLeftGap + "px;"
			: "";
		  let tab_content_topgap = contentTopGap
			? "padding-top:" + contentTopGap + "px;"
			: "";
		  let tab_content_rightgap = contentRightGap
			? "padding-right:" + contentRightGap + "px;"
			: "";
		  let tab_content_bottomgap = contentBottomGap
			? "padding-bottom:" + contentBottomGap + "px;"
			: "";
		  let tab_content_leftgap = contentLeftGap
			? "padding-left:" + contentLeftGap + "px;"
			: "";
	
		  let mobileHide = deviceMobileManager
			? "@media only screen and (max-width: 767px){.wpbricks-wrap-tab ." +
			  BRICKS +
			  "{display:none !important}}"
			: "";
	
		  let tabHide = deviceTabletManager
			? "@media only screen and ( min-width: 768px) and ( max-width: 1024px){.wpbricks-wrap-tab ." +
			  BRICKS +
			  "{display:none !important}}"
			: "";
	
		  /* Style generate */
	
		  let tab_gencss =
			".wpbricks-wrap-tab ." +
			BRICKS +
			" ul.bricks-tab-lists li.bricks-tab{" +
			tab_title_bg_color +
			tab_border_style +
			tab_border_width +
			tab_border_radius +
			tab_border_color +
			tab_margin +
			"}" +
			".wpbricks-wrap-tab ." +
			BRICKS +
			" ul.bricks-tab-lists li.bricks-tab a{" +
			tab_title_text_color +
			tab_title_topgap +
			tab_title_rightgap +
			tab_title_bottomgap +
			tab_title_leftgap +
			"}" +
			".wpbricks-wrap-tab ." +
			BRICKS +
			" .bricks-tab-body.ui-tabs-panel{" +
			tab_content_bg_color +
			tab_border_style +
			tab_border_width +
			tab_border_radius +
			tab_border_color +
			tab_content_topgap +
			tab_content_rightgap +
			tab_content_bottomgap +
			tab_content_leftgap +
			"}" +
			".wpbricks-wrap-tab ." +
			BRICKS +
			" .bricks-tab-body.ui-tabs-panel p{" +
			tab_content_text_color +
			"}" +
			".wpbricks-wrap-tab ." +
			BRICKS +
			" ul li.bricks-tab.ui-tabs-active{" +
			tab_active_bg + tab_active_text_color +
			"}" +
			mobileHide +
			tabHide +
			customCssText.replace("{BRICKS}", "." + BRICKS);
	
	
		  /* Set Font and Style in attributes */
	
		  setAttributes({ bricks_style: tab_gencss });

		let className = 'bricks';
		let TabClass = [''];
		if (this.state.addClass) {
			TabClass.push('active');
		}

		return (
			<Fragment>
				
				<InspectorControls>
					<div className="bricks-clear-none">
						<PanelBody title={__('Tab Title Settings')} initialOpen={false}>
							<label className="mt10">Title Background Color</label>
							<ColorPalette
								value={ titleBgColor }
								onChange={ ( value ) => setAttributes({
									titleBgColor: value
								}) }
							/>
							<label className="mt10">Title Text Color</label>
							<ColorPalette
								value={ titleTextColor }
								onChange={ ( value ) => setAttributes({
									titleTextColor: value
								}) }
							/>
							<label className="mt10">Active Title Background Color</label>
							<ColorPalette
								value={ activeBgColor }
								onChange={ ( value ) => setAttributes({
									activeBgColor: value
								}) }
							/>
							<label className="mt10">Active Title Text Color</label>
							<ColorPalette
								value={ activeTextColor }
								onChange={ ( value ) => setAttributes({
									activeTextColor: value
								}) }
							/>
							<label className="mt20">Padding Setting</label>
							<PanelRow>
								<div className="padding-setting">
									<div className="col-main-2">
										<div className="padd-top col-main-inner" data-tooltip="padding Top">
											<label>Top</label>
											<TextControl
												type="number"
												min="1"
												value={titleTopGap}
												onChange={(value) => setAttributes({ titleTopGap: value })}
											/>
										</div>
										<div className="padd-buttom col-main-inner" data-tooltip="padding Bottom">
											<label>Bottom</label>
											<TextControl
												type="number"
												min="1"
												value={titleBottomGap}
												onChange={(value) => setAttributes({ titleBottomGap: value })}
											/>
										</div>
									</div>
									<div className="col-main-2">
										<div className="padd-left col-main-inner" data-tooltip="padding Left">
											<label>Left</label>
											<TextControl
												type="number"
												min="1"
												value={titleLeftGap}
												onChange={(value) => setAttributes({ titleLeftGap: value })}
											/>
										</div>
										<div className="padd-right col-main-inner" data-tooltip="padding Right">
											<label>Right</label>
											<TextControl
												type="number"
												min="1"
												value={titleRightGap}
												onChange={(value) => setAttributes({ titleRightGap: value })}
											/>
										</div>
									</div>
								</div>
							</PanelRow>
						</PanelBody>
						<PanelBody title={__('Tab Content Settings')} initialOpen={false}>
							<label className="mt10">Background Color</label>
							<ColorPalette
								value={ contentBgColor }
								onChange={ ( value ) => setAttributes({
									contentBgColor: value
								}) }
							/>
							<label className="mt10">Text Color</label>
							<ColorPalette
								value={ contentTextColor }
								onChange={ ( value ) => setAttributes({
									contentTextColor: value
								}) }
							/>
							<label className="mt20">Padding Setting</label>
							<PanelRow>
								<div className="padding-setting">
									<div className="col-main-2">
										<div className="padd-top col-main-inner" data-tooltip="padding Top">
											<label>Top</label>
											<TextControl
												type="number"
												min="1"
												value={contentTopGap}
												onChange={(value) => setAttributes({ contentTopGap: value })}
											/>
										</div>
										<div className="padd-buttom col-main-inner" data-tooltip="padding Bottom">
											<label>Bottom</label>
											<TextControl
												type="number"
												min="1"
												value={contentBottomGap}
												onChange={(value) => setAttributes({ contentBottomGap: value })}
											/>
										</div>
									</div>
									<div className="col-main-2">
										<div className="padd-left col-main-inner" data-tooltip="padding Left">
											<label>Left</label>
											<TextControl
												type="number"
												min="1"
												value={contentLeftGap}
												onChange={(value) => setAttributes({ contentLeftGap: value })}
											/>
										</div>
										<div className="padd-right col-main-inner" data-tooltip="padding Right">
											<label>Right</label>
											<TextControl
												type="number"
												min="1"
												value={contentRightGap}
												onChange={(value) => setAttributes({ contentRightGap: value })}
											/>
										</div>
									</div>
								</div>
							</PanelRow>
						</PanelBody>
						<PanelBody title={__('Border Settings')} initialOpen={false}>
							<SelectControl
								label={__('Border Style')}
								value={borderStyle}
								options={[
									{ label: __('Solid'), value: 'solid' },
									{ label: __('Dashed'), value: 'dashed' },
									{ label: __('Dotted'), value: 'dotted' }
								]}
								onChange={(value) => setAttributes({ borderStyle: value })}
							/>
							<label>Border color</label>
							<ColorPalette
								value={borderColor}
								onChange={(value) => setAttributes({
									borderColor: value
								})}
							/>
							<RangeControl
								label={__('Border width')}
								value={borderWidth}
								min={1}
								max={10}
								onChange={(value) => setAttributes({ borderWidth: value })}
							/>
							<RangeControl
								label={__('Border radius')}
								value={borderRadius}
								min={0}
								max={100}
								onChange={(value) => setAttributes({ borderRadius: value })}
							/>
						</PanelBody>
					</div>
				</InspectorControls>
				<WPBricksAdvanceCss {...this.props}/>
				<style>{tab_gencss}</style>
				<div className={'wpbricks wpbricks-wrap-tab ' + className}>
			<div className={'tabsParentWrapper bricks-tabbing' + ' ' + this.props.className + ' ' + BRICKS}>
				<ul className={className + '-tab-lists'} id={`md-lists-${clientId}`}>
					{tabItems.map((item, index) => (
						<li
							key={index}
							className="bricks-tab"
						>
							<a
								href={`#bricks-tab-${blockID}-${index}`}
								onClick={(e) => e.preventDefault()}
							>
								<RichText
									tagName="p"
									value={item.header}
									onChange={(value) => this.updateTabs({ header: value || '' }, index)}
									unstableOnSplit={() => null}
									placeholder={__('Title…')}
									allowedFormats={['bold', 'italic']}
								/>
							</a>
							<Tooltip text={__('Remove tab')}>
								<span
									className="bricks-tab-remove"
									onClick={() =>
										setAttributes({
											tabItems: tabItems.filter((values, idx) => idx !== index),
											displayTab: 'block'
										})}
								>
									<Dashicon icon="no" />
								</span>
							</Tooltip>
						</li>
					))}
					<li
						className="bricks-tab bricks-add-tab ui-state-default"
					>
						<Tooltip text={__('Add tab')}>
							<span
								onClick={() =>
									setAttributes({
										tabItems: [
											...tabItems,
											{ header: __('New Tab'), body: __('Enter your content.') }
										]
									})}
							>
								<Dashicon icon="plus-alt" />
							</span>
						</Tooltip>
					</li>
				</ul>
				{tabItems.map((item, index) => (
					<div
						key={index}
						id={`bricks-tab-${blockID}-${index}`}
						className="bricks-tab-body"
					>
						<RichText
							tagName="p"
							value={item.body}
							onChange={(value) => this.updateTabs({ body: value }, index)}
							placeholder={__('Enter text…')}
						/>
						{!! blockID && (
							<style>
								{activeBgColor &&
									`#md-lists-${clientId} li.bricks-tab.ui-tabs-active {
									background-color: ${activeBgColor} !important;
								}
								`}
								{activeTextColor &&
									`#md-lists-${clientId} li.bricks-tab.ui-tabs-active a {
									color: ${activeTextColor} !important;
								}`}
							</style>
						)}
					</div>
				))}
			</div>
			</div>
			</Fragment>
		);
	}
}

export default withNotices(TabEdit);
