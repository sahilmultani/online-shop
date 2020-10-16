import React, { Component } from "react";

const { __ } = wp.i18n;
const { InspectorAdvancedControls } = wp.blockEditor;
const { PanelRow, TextareaControl } = wp.components;

const AdvancedInlineAttr = {
  customCssText: {
    type: "string",
    default: ""
  },
};

class WPBricksAdvanceInlineCss extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      attributes: {
        BRICKS,
        customCssText,
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
      </InspectorAdvancedControls>
    );
  }
}

export { AdvancedInlineAttr, WPBricksAdvanceInlineCss };
