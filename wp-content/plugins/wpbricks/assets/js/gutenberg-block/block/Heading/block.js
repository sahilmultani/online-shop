import { Heading } from "../icons";

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

(function(wpI18n, wpBlocks, wpEditor, wpComponents, wpElement) {
  const { __ } = wpI18n;
  const { registerBlockType } = wpBlocks;
  const { Fragment } = wpElement;
  const { RichText, InspectorControls } = wpEditor;
  const { PanelBody, PanelRow, SelectControl } = wpComponents;
  const Attr = {
    HeadingText: {
      type: "string",
      default: "Heading"
    },
    HeadingLevel: {
      type: "string",
      default: "h2"
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

  registerBlockType("bricks/custom-heading", {
    title: __("Bricks Heading"),
    icon: Heading,
    description: __(
      "Bricks Heading is a gutenberg block which defines six levels of headings."
    ),
    category: "bricksblocks",
    keywords: [__("Heading"), __("gutenberg"), __("Bricks")],
    attributes: attrObj,

    edit(props) {
      const {
        clientId,
        attributes: {
          HeadingText,
          HeadingLevel,
          FontSize,
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          FontWeight,
          LineHeight,
          LetterSpacing,
          FontColor,
          TextUppercase,
          TextAlign,
          fontFamily,
          customCssText,
          BRICKS,
          deviceMobileManager,
          deviceTabletManager,
          bricks_style,
          bricks_fonts
        },
        className,
        setAttributes
      } = props;

      /* Unique ID generate */

      setAttributes({
        BRICKS:
          "bricks-blocks-" + clientId.split("-")[clientId.split("-").length - 1]
      });

      /* Style var generate */

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

      let TextAlignStyle = TextAlign ? "text-align:" + TextAlign + ";" : "";

      let fontFamilyStyle = fontFamily ? "font-family:" + fontFamily + ";" : "";

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

      /* Style generate */

      let heading_gencss =
        ".wpbricks.wpbricks-wrap-heading ." +
        BRICKS +
        " .wpbricks-heading{" +
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
        "}" +
        mobileHide +
        tabHide +
        customCssText.replace("{BRICKS}", "." + BRICKS);

      let heading_fonts;
      if ("inherit" !== fontFamily && "" !== fontFamily && undefined !== fontFamily) {
        heading_fonts =
          '@import url("https://fonts.googleapis.com/css?family=' +
          fontFamily +
          '");';
      }

      /* Set Font and Style in attributes */
      props.setAttributes({ bricks_fonts: heading_fonts });
      props.setAttributes({ bricks_style: heading_gencss });

      return (
        <Fragment>
          <InspectorControls>
            <div className="bricks-clear-none">
              <PanelBody title="Heading Level">
                <PanelRow>
                  <SelectControl
                    value={HeadingLevel}
                    options={[
                      { label: __("H1"), value: "h1" },
                      { label: __("H2"), value: "h2" },
                      { label: __("H3"), value: "h3" },
                      { label: __("H4"), value: "h4" },
                      { label: __("H5"), value: "h5" },
                      { label: __("H6"), value: "h6" }
                    ]}
                    onChange={value => setAttributes({ HeadingLevel: value })}
                  />
                </PanelRow>
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
          <style>
            {heading_fonts} {heading_gencss}
          </style>
          <div className={"wpbricks wpbricks-wrap-heading " + className}>
            <div className={BRICKS}>
              <RichText
                tagName={HeadingLevel}
                onChange={HeadingText =>
                  setAttributes({ HeadingText: HeadingText })
                }
                value={HeadingText}
                className={"wpbricks-heading"}
              />
            </div>
          </div>
        </Fragment>
      );
    },

    save(props) {
      const {
        attributes: { HeadingText, HeadingLevel, BRICKS },
        className
      } = props;

      return (
        <div>
           <style>
            {props.attributes.heading_fonts} {props.attributes.heading_gencss}
          </style>
        <div className={"wpbricks wpbricks-wrap-heading " + className}>
          <div className={BRICKS}>
            <RichText.Content
              tagName={HeadingLevel}
              value={HeadingText}
              className={"wpbricks-heading"}
            />
          </div>
        </div>
        </div>
      );
    }
  });
})(wp.i18n, wp.blocks, wp.blockEditor, wp.components, wp.element);
