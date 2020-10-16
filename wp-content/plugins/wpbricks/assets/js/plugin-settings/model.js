import React, { Component } from 'react';
const { __ } = wp.i18n;

export default class Model extends Component {
    constructor(props) {
        super(props);
        let tabNameData = ''
        if (this.props.data) {
			tabNameData = this.props.data
		}
		this.state={
			pageType: 'bricks-manager',
			tabName: tabNameData
		}
	}
	componentWillMount() {
        const urlParams = new URLSearchParams(window.location.search);
		
		if (urlParams.has('page')){
			const page = urlParams.get('page');
			this.setState({
				pageType: page,
			});
		}

		if (urlParams.has('tab')){
            const tab = urlParams.get('tab');
            let tabInc = tab.includes("_lib");
            let tabnameSplit = '';
            if (tabInc) {
                tabnameSplit = tab.split("_lib");
            }
            var tabName = '';
            if (tabnameSplit) {
                tabName = tabnameSplit[0].trim();
            }
			this.setState({
				tabName: tabName,
            });
		}
    }
    
    render () {
        return ( 
        <div className="modelSection" id="modelSection">
            <div id="myModal" className="theme-info-main modal">
                    <div className="modal-content"></div>
            </div>
            <div id="preview_section" style={{display: "none"}}>
                <iframe id="preview_frame" src="" width="100%" height="300">
                </iframe>
                <div className="iframe-sidebar">
                    <div className="iframe-sidebar-container">
                        <div className="nav-buttons">
                            <button className="back"><i className="dashicons dashicons-no"></i></button>
                            <div className="prev-next">
                                <button className="back"><i className="dashicons dashicons-arrow-left-alt2"></i></button>
                                <button className="next"><i className="dashicons dashicons-arrow-right-alt2"></i></button>
                            </div>
                        </div>
                        <h5 className="site-title preview_title"></h5>
                        <div className="buttons-wrap">
                            <button className="button button-primary wpbricks-theme-import"
                            data-theme-token="" data-install-type={this.state.tabName}>
                                {__('Import', 'wpbricks')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}