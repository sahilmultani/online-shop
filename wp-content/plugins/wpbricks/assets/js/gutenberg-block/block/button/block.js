import { Button } from "../icons";

import {
  TypoAttr,
  WPBricksFonts
} from "../common-components/bricks-typography";

import {
  SpaceAttr,
  WPBricksSpacing
} from "../common-components/bricks-spacing";

import {
  AdvancedAttr,
  WPBricksAdvanceCss
} from "../common-components/bricks-advancecss";

import React, { Fragment } from "react";
(function(wpI18n, wpBlocks, wpEditor, wpComponents) {
  const { __ } = wpI18n;
  const { registerBlockType } = wpBlocks;
  const {
    RichText,
    InspectorControls,
    ColorPalette,
    AlignmentToolbar
  } = wpEditor;
  const {
    TextControl,
    PanelBody,
    PanelRow,
    ToggleControl,
    SelectControl
  } = wpComponents;

  const Attr = {
    ButtonText: {
      type: "string",
      default: "READ MORE"
    },
    Link: {
      type: "string",
      default: "#"
    },
    ButtonWidth: {
      type: "string",
      default: "default"
    },
    ButtonCustomWidth: {
      type: "number",
      default: "250"
    },
    ButtonAlignment: {
      type: "string",
      default: "Left"
    },
    BorderWidth: {
      type: "string",
      default: "2"
    },
    BorderRadius: {
      type: "string",
      default: "0"
    },
    newWindow: {
      type: "boolean",
      default: false
    },
    BorderType: {
      type: "string",
      default: "none"
    },
    BorderColor: {
      type: "string",
      default: "#000"
    },
    ButtonBackground: {
      type: "string",
      default: "#f43e56"
    },
    HoverButtonBackground: {
      type: "string",
      default: "#f43e56"
    },
    HoverButtonTextColor: {
      type: "string",
      default: "#000"
    },
    HoverBorderColor: {
      type: "string",
      default: "#000"
    },
    bricks_style: {
      type: "string",
      default: ""
    },
    bricks_fonts: {
      type: "string",
      default: ""
    },
    BRICKS: {
      type: "string",
      default: ""
    }
  };
  let attrObj = Object.assign(Attr, TypoAttr);
  attrObj = Object.assign(attrObj, SpaceAttr);
  attrObj = Object.assign(attrObj, AdvancedAttr);

  registerBlockType("bricks/custom-button", {
    title: __("Bricks Button"),
    icon: Button,
    description: __(
      "Bricks Button is a gutenberg block used to add a clickable button."
    ),
    category: "bricksblocks",
    keywords: [__("Button"), __("gutenberg"), __("Bricks")],
    attributes: attrObj,
    edit(props) {
      const {
        clientId,
        attributes: {
          ButtonText,
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          ButtonBackground,
          FontColor,
          Link,
          BorderType,
          BorderWidth,
          BorderRadius,
          BorderColor,
          FontSize,
          LetterSpacing,
          TextAlign,
          ButtonWidth,
          ButtonCustomWidth,
          ButtonAlignment,
          HoverButtonBackground,
          HoverButtonTextColor,
          HoverBorderColor,
          newWindow,
          FontWeight,
          fontFamily,
          LineHeight,
          TextUppercase,
          customCssText,
          deviceMobileManager,
          deviceTabletManager,
          BRICKS,
          bricks_style,
          bricks_fonts
        },
        setAttributes
      } = props;

      /* Unique ID generate */

      setAttributes({
        BRICKS:
          "bricks-blocks-" + clientId.split("-")[clientId.split("-").length - 1]
      });
      /* Style var generate */

      let FontSizeStyle = FontSize ? "font-size :" + FontSize + "px;" : "";
      let FontWeightStyle = FontWeight
        ? "font-weight :" + FontWeight + ";"
        : "";
      let fontFamilyStyle = fontFamily ? "font-family:" + fontFamily + ";" : "";
      let LineHeightStyle = LineHeight
        ? "line-height :" + LineHeight + "px;"
        : "";
      let LetterSpacingStyle = LetterSpacing
        ? "letter-spacing :" + LetterSpacing + "px;"
        : "";
      let TextUppercaseStyle = TextUppercase
        ? "text-transform :" + TextUppercase + ";"
        : "";
      let TextAlignStyle = TextAlign ? "text-align:" + TextAlign + ";" : "";
      let FontColorStyle = "" !== FontColor ? "color :" + FontColor + ";" : "";
      let marginTopStyle = marginTop ? "margin-top :" + marginTop + "px;" : "";
      let marginBottomStyle = marginBottom
        ? "margin-bottom :" + marginBottom + "px;"
        : "";
      let marginLeftStyle = marginLeft
        ? "margin-left :" + marginLeft + "px;"
        : "";
      let marginRightStyle = marginRight
        ? "margin-right :" + marginRight + "px;"
        : "";
      let paddingTopStyle = paddingTop
        ? "padding-top :" + paddingTop + "px;"
        : "";
      let paddingBottomStyle = paddingBottom
        ? "padding-bottom :" + paddingBottom + "px;"
        : "";
      let paddingLeftStyle = paddingLeft
        ? "padding-left :" + paddingLeft + "px;"
        : "";
      let paddingRightStyle = paddingRight
        ? "padding-right :" + paddingRight + "px;"
        : "";
      let backgroundColorStyle = ButtonBackground
        ? "background :" + ButtonBackground + ";"
        : "";
      let buttonBorderStyle = BorderWidth
        ? "border :" +
          BorderWidth +
          "px " +
          BorderType +
          " " +
          BorderColor +
          ";"
        : "";
      let buttonRadiusStyle = BorderRadius
        ? "border-radius :" + BorderRadius + "px;"
        : "";
      let buttonDecorationStyle = "text-decoration :none;display:inline-block;";

      let buttonWidthStyle = "";

      if ("full" === ButtonWidth) {
        buttonWidthStyle = "width:100%;";
      } else if ("custom" === ButtonWidth) {
        buttonWidthStyle = "width: " + ButtonCustomWidth + "px;";
      }

      let buttonAlignStyle = ButtonAlignment
        ? "text-align: " + ButtonAlignment + ";"
        : "";

      let mobileHide = deviceMobileManager
        ? "@media only screen and (max-width: 767px){.wpbricks-wrap-button ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      let tabHide = deviceTabletManager
        ? "@media only screen and ( min-width: 768px) and ( max-width: 1024px){.wpbricks-wrap-button ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      /* Style generate */

      let button_gencss =
        ".wpbricks.wpbricks-wrap-button ." +
        BRICKS +
        " .wpbricks-button{" +
        fontFamilyStyle +
        TextAlignStyle +
        FontSizeStyle +
        FontWeightStyle +
        LineHeightStyle +
        LetterSpacingStyle +
        TextUppercaseStyle +
        marginTopStyle +
        marginBottomStyle +
        marginLeftStyle +
        marginRightStyle +
        paddingTopStyle +
        paddingBottomStyle +
        paddingLeftStyle +
        paddingRightStyle +
        FontColorStyle +
        backgroundColorStyle +
        buttonBorderStyle +
        buttonRadiusStyle +
        buttonDecorationStyle +
        buttonWidthStyle +
        "}" +
        "." +
        BRICKS +
        "{" +
        buttonAlignStyle +
        "}" +
        "." +
        BRICKS +
        " .wpbricks-button:hover{background:" +
        HoverButtonBackground +
        " !important;color:" +
        HoverButtonTextColor +
        " !important;border-color:" +
        HoverBorderColor +
        " !important; }" +
        mobileHide +
        tabHide +
        customCssText.replace("{BRICKS}", "." + BRICKS);

      let button_fonts;
      if ("inherit" !== fontFamily && "" !== fontFamily && undefined !== fontFamily) {
        button_fonts =
          '@import url("https://fonts.googleapis.com/css?family=' +
          fontFamily +
          '");';
      }
      /* Set Font and Style in attributes */

      props.setAttributes({ bricks_fonts: button_fonts });
      props.setAttributes({ bricks_style: button_gencss });

      return (
        <Fragment>
          <style>
            {button_fonts}
            {button_gencss}
          </style>
          <div
            className={"wpbricks wpbricks-wrap-button" + " " + props.className}
          >
            <div className={BRICKS}>
              <RichText
                tagName="a"
                onChange={ButtonText =>
                  setAttributes({ ButtonText: ButtonText })
                }
                value={ButtonText}
                allowedFormats={["bold", "italic"]}
                className="wpbricks-button"
              />
            </div>
            <InspectorControls>
              <div className="bricks-clear-none">
                <PanelBody title="Button Setting" initialOpen={true}>
                  <PanelRow>
                    <TextControl
                      label={__("Button Link")}
                      type="text"
                      min="1"
                      placeholder="https:"
                      value={Link}
                      onChange={Link => setAttributes({ Link: Link })}
                    />
                  </PanelRow>
                  <PanelRow>
                    <ToggleControl
                      label={__("Open in New Window")}
                      checked={newWindow}
                      onChange={() => setAttributes({ newWindow: !newWindow })}
                    />
                  </PanelRow>
                  <PanelRow>
                    <SelectControl
                      label={__("Button Width")}
                      value={ButtonWidth}
                      options={[
                        { label: __("Default"), value: "default" },
                        { label: __("Full"), value: "full" },
                        { label: __("Custom"), value: "custom" }
                      ]}
                      onChange={value => setAttributes({ ButtonWidth: value })}
                    />
                  </PanelRow>
                  {"custom" === ButtonWidth && (
                    <div className="wpdb_custom_width">
                      <label className="mt10">Button Custom Width</label>
                      <PanelRow>
                        <TextControl
                          type="number"
                          min="1"
                          value={ButtonCustomWidth}
                          placeholder="px"
                          onChange={value =>
                            setAttributes({ ButtonCustomWidth: value })
                          }
                        />
                      </PanelRow>
                    </div>
                  )}
                  {("default" === ButtonWidth || "custom" === ButtonWidth) && (
                    <PanelRow>
                      <label>Alignment</label>
                      <AlignmentToolbar
                        value={ButtonAlignment}
                        onChange={newAlignment =>
                          setAttributes({
                            ButtonAlignment:
                              newAlignment === undefined ? "none" : newAlignment
                          })
                        }
                      />
                    </PanelRow>
                  )}
                </PanelBody>
                <PanelBody title="Button Border Setting" initialOpen={false}>
                  <PanelRow>
                    <div className="col-main-2">
                      <div className="col-main-inner">
                        <label>Border Type</label>
                        <SelectControl
                          value={BorderType}
                          options={[
                            { label: __("None"), value: "none" },
                            { label: __("Dotted"), value: "dotted" },
                            { label: __("Dashed"), value: "dashed" },
                            { label: __("Solid"), value: "solid" },
                            { label: __("Double"), value: "double" },
                            { label: __("Groove"), value: "groove" },
                            { label: __("Ridge"), value: "ridge" },
                            { label: __("Inset"), value: "inset" },
                            { label: __("Outset"), value: "outset" }
                          ]}
                          onChange={value =>
                            setAttributes({ BorderType: value })
                          }
                        />
                      </div>
                      <div className="col-main-inner">
                        <label>Border Width</label>
                        <TextControl
                          type="number"
                          min="1"
                          value={BorderWidth}
                          onChange={BorderWidth =>
                            setAttributes({ BorderWidth: BorderWidth })
                          }
                        />
                      </div>
                    </div>
                  </PanelRow>
                  <PanelRow>
                    <div className="Border-setting full-width">
                      <div className="border-style" data-tooltip="Padding Top">
                        <label>Border radius</label>
                        <TextControl
                          type="number"
                          min="1"
                          value={BorderRadius}
                          onChange={value =>
                            setAttributes({ BorderRadius: value })
                          }
                        />
                      </div>
                    </div>
                  </PanelRow>
                </PanelBody>
                <PanelBody title="Color Setting" initialOpen={false}>
                  <label className="mt10">Button Color</label>
                  <ColorPalette
                    value={ButtonBackground}
                    onChange={value =>
                      setAttributes({
                        ButtonBackground: value
                      })
                    }
                  />
                  {"none" !== BorderType && (
                    <Fragment>
                      <label className="mt10">Button Border Color</label>
                      <ColorPalette
                        value={BorderColor}
                        onChange={value =>
                          setAttributes({
                            BorderColor: value
                          })
                        }
                      />
                    </Fragment>
                  )}
                  <label className="mt10">Button Hover Color</label>
                  <ColorPalette
                    value={HoverButtonBackground}
                    onChange={value =>
                      setAttributes({
                        HoverButtonBackground: value
                      })
                    }
                  />
                  <label className="mt10">Button Text Hover Color</label>
                  <ColorPalette
                    value={HoverButtonTextColor}
                    onChange={value =>
                      setAttributes({
                        HoverButtonTextColor: value
                      })
                    }
                  />
                  {"none" !== BorderType && (
                    <Fragment>
                      <label className="mt10">Border Hover Color</label>
                      <ColorPalette
                        value={HoverBorderColor}
                        onChange={value =>
                          setAttributes({
                            HoverBorderColor: value
                          })
                        }
                      />
                    </Fragment>
                  )}
                </PanelBody>
                <PanelBody title="Typography" initialOpen={false}>
                  <WPBricksFonts {...props} />
                </PanelBody>
                <PanelBody title="Spacing" initialOpen={false}>
                  <WPBricksSpacing {...props} />
                </PanelBody>
              </div>
            </InspectorControls>
            <WPBricksAdvanceCss {...props} />
          </div>
        </Fragment>
      );
    },
    save(props) {
      const {
        attributes: { Link, blockID, ButtonText, newWindow, BRICKS },
        className
      } = props;

      return (
        <div className={"wpbricks wpbricks-wrap-button" + " " + className}>
          <div className={BRICKS}>
            <div className="Button-Main" id={blockID}>
              <RichText.Content
                tagName="a"
                href={Link}
                rel="noopener noreferrer"
                value={ButtonText}
                className="wpbricks-button"
                target={newWindow ? "_blank" : "_self"}
              />
            </div>
          </div>
        </div>
      );
    }
  });
})(wp.i18n, wp.blocks, wp.blockEditor, wp.components);
