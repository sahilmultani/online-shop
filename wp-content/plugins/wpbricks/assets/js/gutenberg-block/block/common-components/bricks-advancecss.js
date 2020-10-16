import React, { Component } from "react";

const { __ } = wp.i18n;
const { InspectorAdvancedControls } = wp.blockEditor;
const { PanelRow, ToggleControl, TextareaControl } = wp.components;

const AdvancedAttr = {
  customCssText: {
    type: "string",
    default: ""
  },
  deviceMobileManager: {
    type: "boolean",
    default: false
  },
  deviceTabletManager: {
    type: "boolean",
    default: false
  }
};

class WPBricksAdvanceCss extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      attributes: {
        BRICKS,
        customCssText,
        deviceMobileManager,
        deviceTabletManager
      },
      setAttributes
    } = this.props;

    return (
      <InspectorAdvancedControls>
        <PanelRow>
          <TextareaControl
            label="Bricks Block CSS"
            placeholder={"Use below text first before your custom class."}
            help={"{BRICKS}"}
            value={customCssText}
            onChange={value => setAttributes({ customCssText: value })}
          />
        </PanelRow>
        <PanelRow>
          <ToggleControl
            label="Hide on Phone"
            checked={deviceMobileManager}
            onChange={() =>
              setAttributes({ deviceMobileManager: !deviceMobileManager })
            }
            className="toggle-setting-class"
          />
        </PanelRow>
        <PanelRow>
          <ToggleControl
            label="Hide on Tablet"
            checked={deviceTabletManager}
            onChange={() =>
              setAttributes({ deviceTabletManager: !deviceTabletManager })
            }
            className="toggle-setting-class"
          />
        </PanelRow>
      </InspectorAdvancedControls>
    );
  }
}

export { AdvancedAttr, WPBricksAdvanceCss };
