import _times from "lodash/times";
import memoize from "memize";

import { Accordion } from "../icons";
import { Fragment } from "react";
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

const Attr = {
  noOfAccordion: {
    type: "number",
    default: 1
  },
  bricks_style: {
    type: "string",
    default: ""
  },
  BRICKS: {
    type: "string",
    default: ""
  }
};
let attrObj = Object.assign(Attr, AdvancedAttr);

(function(wpI18n, wpBlocks, wpEditor, wpComponents, wpElement) {
  const { __ } = wpI18n;
  const { registerBlockType } = wpBlocks;
  const {
    RichText,
    AlignmentToolbar,
    InspectorControls,
    ColorPalette,
    InnerBlocks
  } = wpEditor;
  const {
    TextControl,
    PanelBody,
    PanelRow,
    RangeControl,
    SelectControl,
    ToggleControl,
    Button,
    Popover
  } = wpComponents;

  /* Parent Accordion Block */
  registerBlockType("bricks/accordion", {
    title: __("Bricks Accordion"),
    description: __(
      "Bricks Accordion is a gutenberg block used to show & hide content."
    ),
    icon: Accordion,
    category: "bricksblocks",
    keywords: [__("accordion"), __("gutenberg"), __("Bricks")],
    attributes: attrObj,
    edit: props => {
      const {
        clientId,
        attributes: {
          noOfAccordion,
          customCssText,
          BRICKS,
          deviceMobileManager,
          deviceTabletManager,
          bricks_style
        },
        className,
        setAttributes
      } = props;

      /* Accordian Style variables */

      let mobileHide = deviceMobileManager
        ? "@media only screen and (max-width: 767px){.wpbricks-wrap-heading ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      let tabHide = deviceTabletManager
        ? "@media only screen and ( min-width: 768px) and ( max-width: 1024px){.wpbricks-wrap-heading ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      /* Accordian set style */
      let acc_style_gen =
        customCssText.replace("{BRICKS}", "." + BRICKS) + mobileHide + tabHide;
      setAttributes({ bricks_style: acc_style_gen });

      setAttributes({
        BRICKS:
          "bricks-blocks-" + clientId.split("-")[clientId.split("-").length - 1]
      });

      const ALLOWBLOCKS = ["bricks/accordion-item"];

      const getChildAccordionBlock = memoize(accordion => {
        return _times(accordion, n => ["bricks/accordion-item", { id: n + 1 }]);
      });
      const removeButton = 1 === noOfAccordion ? "hideButton" : "";
      return (
        <Fragment>
          <style>{acc_style_gen}</style>
          <div
            className={
              "accordionParentWrapper wpbricks wpbricks-wrap-accordion " +
              className
            }
          >
            <div className={BRICKS}>
              <InnerBlocks
                template={getChildAccordionBlock(noOfAccordion)}
                templateLock="all"
                allowedBlocks={ALLOWBLOCKS}
              />
              <div className="add-remove-btn">
                <Button
                  className="add"
                  onClick={() =>
                    setAttributes({ noOfAccordion: noOfAccordion + 1 })
                  }
                >
                  <span className="dashicons dashicons-plus" />
                  Add New Accordion Item
                </Button>
                <Button
                  className={"remove" + " " + removeButton}
                  onClick={() =>
                    setAttributes({
                      noOfAccordion: 1 === noOfAccordion ? 1 : noOfAccordion - 1
                    })
                  }
                >
                  <span className="dashicons dashicons-minus" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
          <WPBricksAdvanceCss {...props} />
        </Fragment>
      );
    },
    save: props => {
      const {
        attributes: { BRICKS },
        className
      } = props;

      return (
        <div
          className={
            "accordionParentWrapper wpbricks wpbricks-wrap-accordion " +
            className
          }
        >
          <div className={BRICKS}>
            <InnerBlocks.Content />
          </div>
        </div>
      );
    }
  });

  const ChildAttr = {
    title: {
      type: "string",
      selector: "h4"
    },
    open: {
      type: "boolean",
      default: false
    },
    titleBackgroundColor: {
      type: "string",
      default: "#26466d"
    },
    BodyPaddingTop: {
      type: "string",
      default: "15"
    },
    BodyPaddingRight: {
      type: "string",
      default: "15"
    },
    BodyPaddingBottom: {
      type: "string",
      default: "15"
    },
    BodyPaddingLeft: {
      type: "string",
      default: "15"
    },
    bodyBgColor: {
      type: "string",
      default: "#fbfbfb"
    },
    borderWidth: {
      type: "number",
      default: 0
    },
    borderType: {
      type: "string",
      default: "none"
    },
    borderColor: {
      type: "string",
      default: "#000"
    },
    borderRadius: {
      type: "number",
      default: 0
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

  let ChildattrObj = Object.assign(ChildAttr, TypoAttr);
  ChildattrObj = Object.assign(ChildattrObj, SpaceAttr);

  /* Accordion Block */
  registerBlockType("bricks/accordion-item", {
    title: __("Bricks - Accordion Items"),
    description: __("This is Bricks accordion block with multiple setting."),
    icon: Accordion,
    category: "formatting",
    parent: ["bricks/accordion"],
    attributes: ChildattrObj,

    edit: props => {
      const { attributes, setAttributes, className, clientId } = props;
      const {
        title,
        open,
        headerTextColor,
        titleBackgroundColor,
        FontSize,
        FontWeight,
        LineHeight,
        LetterSpacing,
        FontColor,
        TextUppercase,
        TextAlign,
        fontFamily,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        BodyPaddingTop,
        BodyPaddingRight,
        BodyPaddingBottom,
        BodyPaddingLeft,
        bodyBgColor,
        borderWidth,
        borderType,
        borderColor,
        borderRadius,
        bricks_style,
        bricks_fonts,
        BRICKS
      } = attributes;

      setAttributes({
        BRICKS:
          "bricks-blocks-" + clientId.split("-")[clientId.split("-").length - 1]
      });

      let FontSizeStyle = FontSize ? "font-size :" + FontSize + "px;" : "";
      let FontColorStyle = FontColor ? "color :" + FontColor + ";" : "";
      let FontWeightStyle = FontWeight
        ? "font-weight :" + FontWeight + ";"
        : "";
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

      let fontFamilyStyle = fontFamily ? "font-family:" + fontFamily + ";" : "";

      let borderWidthStyle = borderWidth
        ? "border-width :" + borderWidth + "px;"
        : "";
      let borderTypeStyle = borderType
        ? "border-style :" + borderType + ";"
        : "";
      let borderColorStyle = borderColor
        ? "border-color :" + borderColor + ";"
        : "";
      let borderRadiusStyle = borderRadius
        ? "border-radius :" + borderRadius + "px;"
        : "";
      let titleBackgroundColorStyle =
        "" != titleBackgroundColor
          ? "background-color :" + titleBackgroundColor + ";"
          : "";
      let PaddingTopStyle = paddingTop
        ? "padding-top :" + paddingTop + "px;"
        : "";
      let PaddingRightStyle = paddingRight
        ? "padding-right :" + paddingRight + "px;"
        : "";
      let PaddingBottomStyle = paddingBottom
        ? "padding-bottom :" + paddingBottom + "px;"
        : "";
      let PaddingLeftStyle = paddingLeft
        ? "padding-left :" + paddingLeft + "px;"
        : "";

      let MarginTopStyle = marginTop ? "margin-top :" + marginTop + "px;" : "";
      let MarginRightStyle = marginRight
        ? "margin-right :" + marginRight + "px;"
        : "";
      let MarginBottomStyle = marginBottom
        ? "margin-bottom :" + marginBottom + "px;"
        : "";
      let MarginLeftStyle = marginLeft
        ? "margin-left :" + marginLeft + "px;"
        : "";

      let positionStyle = "position:relative;";
      let HeadingMargin = "margin:0;";

      let BodyBgColorStyle = bodyBgColor
        ? "background-color :" + bodyBgColor + ";"
        : "";
      let BodyPaddingTopStyle =
        "" != BodyPaddingTop ? "padding-top :" + BodyPaddingTop + "px;" : "";
      let BodyPaddingRightStyle = BodyPaddingRight
        ? "padding-right :" + BodyPaddingRight + "px;"
        : "";
      let BodyPaddingBottomStyle = BodyPaddingBottom
        ? "padding-bottom :" + BodyPaddingBottom + "px;"
        : "";
      let BodyPaddingLeftStyle = BodyPaddingLeft
        ? "padding-left :" + BodyPaddingLeft + "px;"
        : "";

      let acc_item_gencss =
        "." +
        BRICKS +
        "{" +
        borderWidthStyle +
        borderTypeStyle +
        borderColorStyle +
        borderRadiusStyle +
        "}" +
        "." +
        BRICKS +
        " .accordionHeader{" +
        titleBackgroundColorStyle +
        PaddingTopStyle +
        PaddingRightStyle +
        PaddingBottomStyle +
        PaddingLeftStyle +
        MarginTopStyle +
        MarginRightStyle +
        MarginBottomStyle +
        MarginLeftStyle +
        positionStyle +
        "}" +
        "." +
        BRICKS +
        " .accordionHeader .acccordian_title{" +
        HeadingMargin +
        fontFamilyStyle +
        TextAlignStyle +
        FontSizeStyle +
        FontWeightStyle +
        LineHeightStyle +
        LetterSpacingStyle +
        TextUppercaseStyle +
        FontColorStyle +
        "}" +
        "." +
        BRICKS +
        " .accordionBody{" +
        BodyBgColorStyle +
        BodyPaddingTopStyle +
        BodyPaddingRightStyle +
        BodyPaddingBottomStyle +
        BodyPaddingLeftStyle +
        "}";

      let acc_fonts;
      if ("inherit" !== fontFamily && "" !== fontFamily && undefined !== fontFamily) {
        acc_fonts =
          '@import url("https://fonts.googleapis.com/css?family=' +
          fontFamily +
          '");';
      }

      setAttributes({ bricks_fonts: acc_fonts });
      setAttributes({ bricks_style: acc_item_gencss });

      return (
        <Fragment>
          <style>
            {acc_fonts}
            {acc_item_gencss}
          </style>
          <div className={"wpbricks wpbricks-wrap-accordion-item " + className}>
           <div className={"accordionWrapper tabOpen " + BRICKS}>
              <div className="accordionHeader">
                <RichText
                  tagName="h3"
                  value={title}
                  allowedFormats={["bold", "italic"]}
                  onChange={value => setAttributes({ title: value })}
                  placeholder={__("Heading...")}
                  className="acccordian_title"
                />
                <span className="dashicons dashicons-plus" />
              </div>
              <div className="accordionBody">
                <InnerBlocks templateLock={false} />
              </div>
            </div>
            <InspectorControls>
              <div className="bricks-clear-none">
                <PanelBody title="General Setting">
                  <PanelRow>
                    <ToggleControl
                      label={__("This Accordion Open")}
                      checked={!!open}
                      onChange={() => setAttributes({ open: !open })}
                    />
                  </PanelRow>
                  <PanelRow>
                    <RangeControl
                      label={__("Border Width")}
                      value={borderWidth}
                      min="0"
                      max="100"
                      step="1"
                      onChange={value => setAttributes({ borderWidth: value })}
                    />
                  </PanelRow>
                  <PanelRow>
                    <SelectControl
                      label={__("Border Type")}
                      value={borderType}
                      options={[
                        { label: __("None"), value: "none" },
                        { label: __("Solid"), value: "solid" },
                        { label: __("Dashed"), value: "dashed" },
                        { label: __("Dotted"), value: "dotted" }
                      ]}
                      onChange={value => setAttributes({ borderType: value })}
                    />
                  </PanelRow>
                  <PanelRow>
                    <RangeControl
                      label={__("Border Radius")}
                      value={borderRadius}
                      min="0"
                      max="100"
                      step="1"
                      onChange={value => setAttributes({ borderRadius: value })}
                    />
                  </PanelRow>
                  <label className="mt10">Border Color</label>
                  <ColorPalette
                    value={borderColor}
                    onChange={value =>
                      setAttributes({
                        borderColor: value
                      })
                    }
                  />
                </PanelBody>
                <PanelBody title={__("Heading Setting")} initialOpen={false}>
                  <PanelBody title="Heading Typography" initialOpen={false}>
                    <div className="inner_panel">
                      <WPBricksFonts {...props} />
                    </div>
                  </PanelBody>
                  <PanelBody title="Heading Spacing" initialOpen={false}>
                    <div className="inner_panel">
                      <WPBricksSpacing {...props} />
                    </div>
                  </PanelBody>
                  <label className="mt10">Background Color</label>
                  <ColorPalette
                    value={titleBackgroundColor}
                    onChange={value =>
                      setAttributes({
                        titleBackgroundColor: value ? value : "#26466d"
                      })
                    }
                  />
                </PanelBody>
                <PanelBody title={__("Body Setting")} initialOpen={false}>
                  <PanelRow>
                    <div>
                      <div className="col-main-2">
                        <div className="col-main-inner">
                          <TextControl
                            type="number"
                            label="Top"
                            value={BodyPaddingTop}
                            onChange={value =>
                              setAttributes({ BodyPaddingTop: value })
                            }
                          />
                        </div>
                        <div className="col-main-inner">
                          <TextControl
                            type="number"
                            label="Right"
                            value={BodyPaddingRight}
                            onChange={value =>
                              setAttributes({ BodyPaddingRight: value })
                            }
                          />
                        </div>
                      </div>

                      <div className="col-main-2">
                        <div className="col-main-inner">
                          <TextControl
                            type="number"
                            label="Bottom"
                            value={BodyPaddingBottom}
                            onChange={value =>
                              setAttributes({ BodyPaddingBottom: value })
                            }
                          />
                        </div>
                        <div className="col-main-inner">
                          <TextControl
                            type="number"
                            label="Left"
                            value={BodyPaddingLeft}
                            onChange={value =>
                              setAttributes({ BodyPaddingLeft: value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </PanelRow>
                  <label className="mt10">Background color</label>
                  <ColorPalette
                    value={bodyBgColor}
                    onChange={value =>
                      setAttributes({
                        bodyBgColor: value ? value : "#fbfbfb"
                      })
                    }
                  />
                </PanelBody>
              </div>
            </InspectorControls>
          </div>
        </Fragment>
      );
    },
    save: props => {
      const { attributes, className, clientId } = props;
      const { title, open, BRICKS } = attributes;
      const tabOpen = open ? "tabOpen" : "tabClose";

      return (
        <div className={"wpbricks wpbricks-wrap-accordion-item " + className}>
          <div className={"accordionWrapper" + " " + tabOpen + " " + BRICKS}>
            <div className="accordionHeader">
              <RichText.Content
                tagName="h3"
                value={title}
                className="acccordian_title"
              />
              <span className="dashicons dashicons-plus" />
            </div>
            <div className="accordionBody">
              <InnerBlocks.Content />
            </div>
          </div>
        </div>
      );
    }
  });
})(wp.i18n, wp.blocks, wp.blockEditor, wp.components, wp.element);
