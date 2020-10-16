import React, { Component } from "react";

const { __ } = wp.i18n;
const { ColorPalette, AlignmentToolbar } = wp.blockEditor;
const { TextControl, PanelRow, SelectControl } = wp.components;
const { Fragment } = wp.element;

const TypoAttr = {
  FontSize: {
    type: "number"
  },
  FontWeight: {
    type: "number"
  },
  LineHeight: {
    type: "number"
  },
  LetterSpacing: {
    type: "number"
  },
  FontColor: {
    type: "string",
    default: "#000"
  },
  TextUppercase: {
    type: "string"
  },
  TextAlign: {
    type: "string",
    default: "left"
  },
  fontFamily: {
    type: "string"
  }
};

class WPBricksFonts extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      bricksFonts: []
    };
  }

  componentWillMount() {
    fetch(
      wpbricks_plugin_path.path + "/assets/js/google-font.json"
    )
      .then(response => response.json())
      .then(json => {
        this.setState({ bricksFonts: json });
      });
  }

  render() {
    const {
      attributes: {
        fontFamily,
        FontSize,
        FontWeight,
        LineHeight,
        LetterSpacing,
        TextUppercase,
        FontColor,
        TextAlign
      },
      setAttributes
    } = this.props;
    return (
      <Fragment>
        <label>Font Family</label>
        <PanelRow>
          <SelectControl
            value={fontFamily}
            options={this.state.bricksFonts}
            onChange={value => setAttributes({ fontFamily: value })}
          />
        </PanelRow>
        <PanelRow>
          <div className="col-main-2">
            <div className="col-main-inner">
              <label className="mt10">Font Size</label>
              <TextControl
                type="number"
                min="1"
                value={FontSize}
                placeholder="px"
                onChange={value => setAttributes({ FontSize: parseInt(value) })}
              />
            </div>
            <div className="col-main-inner">
              <label className="mt10">Font Weight</label>
              <SelectControl
                value={FontWeight}
                options={[
                  { label: "300", value: "300" },
                  { label: "500", value: "500" },
                  { label: "600", value: "600" },
                  { label: "700", value: "700" },
                  { label: "800", value: "800" }
                ]}
                onChange={value =>
                  setAttributes({ FontWeight: parseInt(value) })
                }
              />
            </div>
          </div>
        </PanelRow>
        <label className="mt10">Line Height</label>
        <PanelRow>
          <TextControl
            type="number"
            min="1"
            value={LineHeight}
            placeholder="px"
            onChange={value => setAttributes({ LineHeight: parseInt(value) })}
          />
        </PanelRow>
        <label className="mt10">Letter Spacing </label>
        <PanelRow>
          <TextControl
            type="number"
            min="1"
            value={LetterSpacing}
            placeholder="px"
            onChange={value =>
              setAttributes({ LetterSpacing: parseInt(value) })
            }
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Select Transform"
            value={TextUppercase}
            options={[
              { label: "none", value: "none" },
              { label: "Capitalze", value: "capitalize" },
              { label: "Uppercae", value: "uppercase" },
              { label: "Lowercae", value: "lowercase" },
              { label: "Initial", value: "initial" }
            ]}
            onChange={value => setAttributes({ TextUppercase: value })}
          />
        </PanelRow>
        <PanelRow>
          <label>Alignment</label>
          <AlignmentToolbar
            value={TextAlign}
            onChange={newAlignment =>
              setAttributes({
                TextAlign: newAlignment === undefined ? "none" : newAlignment
              })
            }
          />
        </PanelRow>
        <label className="mt10">Font color</label>
        <ColorPalette
          value={FontColor}
          onChange={value =>
            setAttributes({
              FontColor: value
            })
          }
        />
      </Fragment>
    );
  }
}

// export { TypoAttr, TypoEditAttr, WPBricksFonts };
export { TypoAttr, WPBricksFonts };