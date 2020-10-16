import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BlocksList from './Blocks';

import { Logo, Loader, LoadMoreSmall } from '../../icons';

class ListingData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks: [],
            template: [],
            isLoading: true,
            NoOfPost: 12,
            blockSearchId: 'all',
            tempSearchId: 'all',
            SearchInputValue: '',
            tempSearchInputValue: '',
            OnSubmitVal: '',
            TempOnSubmitVal: '',
            blocksCategory: '',
            templatesCategory: '',
            customeSelect: false,
            selectName: 'Select Category',
            tempselectName: 'Select Category',
            blockName: 'blocks',
            firstTimeTemp: true,
            pageNo: 1,
            hasMoreData: true,
            loadMore: false,
            templatePageNo: 1,
            templateHasMoreData: true,
            templateLoadMore: false,
        };
        this.changeCategory = this.changeCategory.bind(this);
        this.tabChange = this.tabChange.bind(this);
        this.FirstTampFetch = this.FirstTampFetch.bind(this);
        this.onScrollEvent = this.onScrollEvent.bind(this);
    }

    componentDidMount() {
        this.fetchBlocks();
        this.blocksCategory();
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            blockSearchId,
            OnSubmitVal,
            tempSearchId,
            TempOnSubmitVal
        } = this.state;
        if (blockSearchId !== prevState.blockSearchId) {
            this.setState({
                pageNo: 1,
                loadMore: false,
                isLoading: true
            });
            this.fetchBlocks();
        }
        if (tempSearchId !== prevState.tempSearchId) {
            this.setState({
                templatePageNo: 1,
                templateLoadMore: false,
                isLoading: true
            });
            this.fetchTemplate();
        }
        if (OnSubmitVal !== prevState.OnSubmitVal) {
            this.setState({
                pageNo: 1,
                loadMore: false,
                isLoading: true,
                blocks: []
            });
            this.fetchBlocks();
        }
        if (TempOnSubmitVal !== prevState.TempOnSubmitVal) {
            this.setState({
                templatePageNo: 1,
                templateLoadMore: false,
                isLoading: true,
                template: []
            });
            this.fetchTemplate();
        }
    }

    fetchBlocks() {
        const { pageNo, blocks } = this.state;
        this.setState({ hasMoreData: false });
        let SearchCat = this.state.blockSearchId;
        let SearchBlocks = this.state.OnSubmitVal;
        wp.apiFetch({ path: `client/blocks-data?cat=${SearchCat}&paged=${pageNo}&s=${SearchBlocks}`, method: 'POST' }).then(data => {
            if (false === data.status) {
                this.setState({
                    hasMoreData: false,
                    isLoading: false,
                    loadMore: false
                });
            } else if (1 === pageNo) {
                this.setState({
                    blocks: data,
                    isLoading: false,
                    loadMore: true,
                    hasMoreData: true,
                    pageNo: pageNo + 1
                });
            } else {
                this.setState({
                    blocks: [...blocks, ...data],
                    isLoading: false,
                    loadMore: true,
                    hasMoreData: true,
                    pageNo: pageNo + 1
                });
            }
        });
    }

    fetchTemplate() {
        const { templatePageNo, template } = this.state;
        this.setState({ templateHasMoreData: false });
        let SearchCat = this.state.tempSearchId;
        let SearchBlocks = this.state.TempOnSubmitVal;
        wp.apiFetch({ path: `client/template-data?cat=${SearchCat}&paged=${templatePageNo}&s=${SearchBlocks}`, method: 'POST' }).then(data => {
            if (false === data.status) {
                this.setState({
                    templateHasMoreData: false,
                    isLoading: false,
                    templateLoadMore: false
                });
            } else if (1 === templatePageNo) {
                this.setState({
                    template: data,
                    isLoading: false,
                    templateLoadMore: true,
                    templateHasMoreData: true,
                    templatePageNo: templatePageNo + 1
                });
            } else {
                this.setState({
                    template: [...template, ...data],
                    isLoading: false,
                    templateLoadMore: true,
                    templateHasMoreData: true,
                    templatePageNo: templatePageNo + 1
                });
            }
        });
    }

    blocksCategory() {
        wp.apiFetch({ path: 'client/block-category', method: 'POST' }).then(data => {
            this.setState({
                blocksCategory: data
            });
        });
    }

    templatesCategory() {
        wp.apiFetch({ path: 'client/template-category', method: 'POST' }).then(data => {
            this.setState({
                templatesCategory: data
            });
        });
    }

    changeCategory(e) {
        const { blockName } = this.state;
        this.setState({ loadMore: false, templateLoadMore: false });

        if ('blocks' === blockName) {
            this.setState({
                blockSearchId: e.target.value,
                customeSelect: false,
                isLoading: true,
                pageNo: 1,
                blocks: []
            });
        }
        if ('templates' === blockName) {
            this.setState({
                tempSearchId: e.target.value,
                customeSelect: false,
                isLoading: true,
                templatePageNo: 1,
                template: []
            });
        }
        e.preventDefault();
    }

    tabChange(e, tabName) {
        if (this.state.blockName !== e) {
            this.setState({
                blockName: e
            });
        }
    }

    FirstTampFetch() {
        this.state.firstTimeTemp ?
            (
                this.fetchTemplate(),
                    this.templatesCategory(),
                    this.setState({
                        isLoading: true
                    })
            ) :
            '';
        this.setState({
            firstTimeTemp: false,
        });
    }

    onScrollEvent(e) {
        let CurrentPosion = e.target.scrollTop + 800;
        if (
            CurrentPosion > e.target.scrollHeight
        ) {
            if ('templates' === this.state.blockName && true === this.state.templateHasMoreData) {
                this.fetchTemplate();
            }
            if ('blocks' === this.state.blockName && true === this.state.hasMoreData) {
                this.fetchBlocks();
            }
        }
    }

    render() {
        const {
            blocks,
            template,
            isLoading,
            blockSearchId,
            SearchInputValue,
            tempSearchInputValue,
            blocksCategory,
            templatesCategory,
            customeSelect,
            selectName,
            tempselectName,
            blockName,
            loadMore,
            templateLoadMore,
            tempSearchId
        } = this.state;

        return (
            <div
                className="select_block_popup"
                style={{ overflowY: 'scroll', height: '100%' }}
            >
                <Tabs>
                    <div className="popup-top">
                        <div className="logo">{Logo}</div>
                        <div className="right-tabs">
                            <TabList>
                                <Tab
                                    onClick={() => {
                                        this.tabChange('blocks');
                                    }}
                                >
                                    Blocks
                                </Tab>
                                <Tab
                                    onClick={() => {
                                        this.tabChange('templates');
                                        this.FirstTampFetch();
                                    }}
                                >
                                    Templates
                                </Tab>
                            </TabList>
                        </div>
                    </div>
                    <div className="filter-bar with-out-tab">
                        <div className="filter-bar-left">
                            <strong>
                                <i className="fas fa-filter" />
                                Filter By:
                            </strong>
                            <div className="Select-Category Select-box">
                                <i className="fas fa-caret-down" />
                                <div className="custom-select-box-main">
                  <span
                      className={customeSelect ? 'active' : ''}
                      onClick={() =>
                          this.setState({ customeSelect: ! customeSelect })
                      }
                  >
                    {'blocks' === blockName ? selectName : tempselectName}
                  </span>
                                    <ul className={customeSelect ? 'active' : ''}>
                                        <li
                                            onClick={e => {
                                                if ('blocks' === blockName) {
                                                    this.setState({
                                                        blockSearchId: 'all',
                                                        selectName: 'All',
                                                        customeSelect: false,
                                                        pageNo: 1,
                                                    });
                                                }
                                                if ('templates' === blockName) {
                                                    this.setState({
                                                        tempSearchId: 'all',
                                                        tempselectName: 'All',
                                                        customeSelect: false,
                                                        templatePageNo: 1
                                                    });
                                                }
                                            }}
                                            value="all"
                                        >
                                            All
                                        </li>

                                        {
                                            'blocks' === blockName ? (
                                                blocksCategory ? (
                                                    blocksCategory.map(items => {
                                                        return (
                                                            <li
                                                                onClick={e => {
                                                                    this.setState({
                                                                        customeSelect: false
                                                                    });
                                                                    if (blockSearchId !== items.cat_id) {
                                                                        this.changeCategory(e);
                                                                        if ('blocks' === blockName) {
                                                                            this.setState({
                                                                                selectName: items.cat_name
                                                                            });
                                                                        }
                                                                    }
                                                                }}
                                                                key={items.cat_id}
                                                                value={items.cat_id}
                                                                className={
                                                                    blockSearchId === items.cat_id ? 'selected' : ''
                                                                }
                                                            >
                                                                {items.cat_name}
                                                            </li>
                                                        );
                                                    })
                                                ) : ''
                                            ) : (
                                                templatesCategory ? (
                                                    templatesCategory.map(items => {
                                                        return (
                                                            <li
                                                                onClick={e => {
                                                                    this.setState({
                                                                        customeSelect: false
                                                                    });
                                                                    if (tempSearchId !== items.cat_id) {
                                                                        this.changeCategory(e);
                                                                        if ('templates' === blockName) {
                                                                            this.setState({
                                                                                tempselectName: items.cat_name
                                                                            });
                                                                        }
                                                                    }
                                                                }}
                                                                key={items.cat_id}
                                                                value={items.cat_id}
                                                                className={
                                                                    tempSearchId === items.cat_id ? 'selected' : ''
                                                                }
                                                            >
                                                                {items.cat_name}
                                                            </li>
                                                        );
                                                    })
                                                ) : ''
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="Select-box search-box">
                                <form
                                    onSubmit={event => {
                                        if ('blocks' === blockName) {
                                            this.setState({
                                                OnSubmitVal: SearchInputValue,
                                                pageNo: 1
                                            });
                                        }
                                        if ('templates' === blockName) {
                                            this.setState({ TempOnSubmitVal: tempSearchInputValue, templatePageNo: 1 });
                                        }
                                        event.preventDefault();
                                    }}
                                >
                                    <input
                                        type="text"
                                        value={
                                            'blocks' === blockName ?
                                                SearchInputValue :
                                                tempSearchInputValue
                                        }
                                        placeholder="Search"
                                        onChange={event => {
                                            var searchValueFunc =
                                                '' === event.target.value ? ' ' : event.target.value;
                                            if ('blocks' === blockName) {
                                                this.setState({
                                                    SearchInputValue: searchValueFunc,
                                                    customeSelect: false
                                                });
                                            }
                                            if ('templates' === blockName) {
                                                this.setState({
                                                    tempSearchInputValue: searchValueFunc,
                                                    customeSelect: false
                                                });
                                            }
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        disabled={
                                            'blocks' === blockName ?
                                                ! this.state.SearchInputValue :
                                                ! this.state.tempSearchInputValue
                                        }
                                    >
                                        <i className="fas fa-search" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <TabPanel>
                        <div className="select_block_data">
                            {isLoading ? (
                                <p className="BlocksLoading">{Loader}</p>
                            ) : (
                                <ul onScroll={this.onScrollEvent}>
                                    <BlocksList
                                        data={this.props.data}
                                        blocks={blocks}
                                        isLoading={isLoading}
                                    />
                                    {4 < blocks.length && loadMore ? (
                                        <li
                                            className="MoreDataLoading"
                                            style={{ width: '100%', textAlign: 'center' }}
                                        >
                                            {LoadMoreSmall}
                                        </li>
                                    ) : (
                                        <li className="NoMoreData">No more data found!</li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="select_block_data">
                            {isLoading ? (
                                <p className="BlocksLoading">{Loader}</p>
                            ) : (
                                <ul onScroll={this.onScrollEvent}>
                                    <BlocksList
                                        data={this.props.data}
                                        blocks={template}
                                        isLoading={isLoading}
                                    />
                                    {4 < template.length && templateLoadMore ? (
                                        <li
                                            className="MoreDataLoading"
                                            style={{ width: '100%', textAlign: 'center' }}
                                        >
                                            {LoadMoreSmall}
                                        </li>
                                    ) : (
                                        <li className="NoMoreData">No more data found!</li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default ListingData;
