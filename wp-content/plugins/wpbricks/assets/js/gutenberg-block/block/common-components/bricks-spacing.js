import React, { Component } from "react";

const { __ } = wp.i18n;
const { TextControl, PanelRow } = wp.components;
const { Fragment } = wp.element;

const SpaceAttr = {
  marginTop: {
    type: "string",
    default: "0"
  },
  marginRight: {
    type: "string",
    default: "0"
  },
  marginBottom: {
    type: "string",
    default: "10"
  },
  marginLeft: {
    type: "string",
    default: "0"
  },
  paddingTop: {
    type: "string",
    default: "0"
  },
  paddingRight: {
    type: "string",
    default: "0"
  },
  paddingBottom: {
    type: "string",
    default: "0"
  },
  paddingLeft: {
    type: "string",
    default: "0"
  }
};

class WPBricksSpacing extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      attributes: {
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
      },
      setAttributes
    } = this.props;

    return (
      <Fragment>
        <label className="mt20">Margin Setting</label>
        <PanelRow>
          <div className="margin-setting">
            <div className="col-main-2">
              <div
                className="padd-top col-main-inner"
                data-tooltip="margin Top"
              >
                <label>Top</label>
                <TextControl
                  type="number"
                  min="1"
                  value={marginTop}
                  onChange={value => setAttributes({ marginTop: value })}
                />
              </div>
              <div
                className="padd-buttom col-main-inner"
                data-tooltip="margin Bottom"
              >
                <label>Bottom</label>
                <TextControl
                  type="number"
                  min="1"
                  value={marginBottom}
                  onChange={value => setAttributes({ marginBottom: value })}
                />
              </div>
            </div>
            <div className="col-main-2">
              <div
                className="padd-left col-main-inner"
                data-tooltip="margin Left"
              >
                <label>Left</label>
                <TextControl
                  type="number"
                  min="1"
                  value={marginLeft}
                  onChange={value => setAttributes({ marginLeft: value })}
                />
              </div>

              <div
                className="padd-right col-main-inner"
                data-tooltip="margin Right"
              >
                <label>Right</label>
                <TextControl
                  type="number"
                  min="1"
                  value={marginRight}
                  onChange={value => setAttributes({ marginRight: value })}
                />
              </div>
            </div>
          </div>
        </PanelRow>
        <label className="mt20">Padding Setting</label>
        <PanelRow>
          <div className="padding-setting">
            <div className="col-main-2">
              <div
                className="padd-top col-main-inner"
                data-tooltip="padding Top"
              >
                <label>Top</label>
                <TextControl
                  type="number"
                  min="1"
                  value={paddingTop}
                  onChange={value => setAttributes({ paddingTop: value })}
                />
              </div>

              <div
                className="padd-buttom col-main-inner"
                data-tooltip="padding Bottom"
              >
                <label>Bottom</label>
                <TextControl
                  type="number"
                  min="1"
                  value={paddingBottom}
                  onChange={value => setAttributes({ paddingBottom: value })}
                />
              </div>
            </div>
            <div className="col-main-2">
              <div
                className="padd-left col-main-inner"
                data-tooltip="padding Left"
              >
                <label>Left</label>
                <TextControl
                  type="number"
                  min="1"
                  value={paddingLeft}
                  onChange={value => setAttributes({ paddingLeft: value })}
                />
              </div>
              <div
                className="padd-right col-main-inner"
                data-tooltip="padding Right"
              >
                <label>Right</label>
                <TextControl
                  type="number"
                  min="1"
                  value={paddingRight}
                  onChange={value => setAttributes({ paddingRight: value })}
                />
              </div>
            </div>
          </div>
        </PanelRow>
      </Fragment>
    );
  }
}

export { SpaceAttr, WPBricksSpacing };
