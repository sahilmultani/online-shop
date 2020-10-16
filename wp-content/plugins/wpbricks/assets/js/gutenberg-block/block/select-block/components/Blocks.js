import React, { Component } from 'react';
import { fetchBlock } from '../../select-block/functions';
import { LoadMoreSmall } from '../../icons';

class BlocksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NoOfPost: 12,
      onImport: false
    };
  }

  render() {
    const { blocks, loadMore } = this.props;
    const { NoOfPost, onImport } = this.state;

    return (
      <React.Fragment>
        {blocks.map((block, i) => {
          return (
            <li className={onImport ? 'import-ongoing' : ''} key={i}>
              <div className="block-grid-inner">
                <div className="Feature-Block">
                  <span className={`pro hide-${block.blocktype} `}>
                    {block.blocktype}
                  </span>
                  <div className="feature-link">
                    <div className="show-and-insert">
                      <a
                        onClick={() => {
                          fetchBlock(block, this.props.data);
                          this.setState({ onImport: true });
                        }}
                      >
                        <i className="fas fa-plus" />
                      </a>
                    </div>
                  </div>

                  {block.blockimage ? (
                    <img
                      className="block-image"
                      src={block.blockimage ? block.blockimage : undefined}
                    />
                  ) : (
                    <span
                      data-title={block.blocktitle}
                      className="No-image-found"
                    />
                  )}
                </div>
                <div className="title-info">
                  <a
                    onClick={() => {
                      fetchBlock(block, this.props.data);
                    }}
                    className="title"
                  >
                    {block.blocktitle}
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </React.Fragment>
    );
  }
}

export default BlocksList;
