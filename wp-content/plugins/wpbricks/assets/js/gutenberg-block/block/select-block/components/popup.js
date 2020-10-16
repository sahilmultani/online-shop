import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-awesome-modal';
import ListingData from './ListingData';
import { SelectBlock } from '../../icons';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  openModal() {
    this.setState({
      visible: true
    });
    document.body.classList.add('select-modal-open');
  }

  closeModal() {
    this.setState({
      visible: false
    });
    document.body.classList.remove('select-modal-open');
  }
  displayBlock(blockName, data) {
    const { className, clientId } = data;
    const block = wp.blocks.createBlock(blockName, { content: '' });

    wp.data.dispatch('core/editor').insertBlocks(block);

    if ('wp-block-md-custom-block-select-block' === className) {
      wp.data.dispatch('core/editor').removeBlock(clientId);
    }
    event.preventDefault();
  }

  render() {

    return (
      <section>
        <div className="select-inner">
          {SelectBlock}
          <h2>Select Block / Template</h2>
          <p>
                You can select 100+ easy to use  non-registered blocks and templates. Using different blocks and templates we can create more beautiful pages as we want.
          </p>
          <a onClick={() => this.openModal()}>Select</a>
        </div>
        <div className="popup-section">
          <div className="modalpopup">
            <Modal
              visible={this.state.visible}
              width="1300"
              height="750"
              effect="fadeInUp"
              onClickAway={() => this.closeModal()}
            >
              <i
                className="fas fa-times close_icon"
                onClick={() => this.closeModal()}
              />
              {this.state.visible ? <ListingData data={this.props.data} /> : '' }
            </Modal>
          </div>
        </div>
      </section>
    );
  }
}

export default Popup;
