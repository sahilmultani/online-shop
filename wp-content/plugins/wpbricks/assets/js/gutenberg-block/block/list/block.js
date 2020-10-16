import { Listing } from "../icons";

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

import React from "react";

(function(wpI18n, wpBlocks, wpEditor, wpComponents) {
  const { __ } = wp.i18n;
  const { registerBlockType } = wp.blocks;
  const { Fragment, Component } = wp.element;
  const { RangeControl, Button, PanelBody, PanelRow } = wp.components;
  const { RichText, MediaUpload, InspectorControls, ColorPalette } = wp.blockEditor;
  const Attr = {
    content: {
      type: "string"
    },
    imageAlt: {
      type: "string",
      attribute: "alt"
    },
    imageUrl: {
      type: "string",
      attribute: "src"
    },
    IconColor: {
      type: "string",
      default: "black"
    },
    icnActive: {
      type: "boolean",
      default: false
    },
    setIcon: {
      type: "string"
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

  registerBlockType("bricks/bricks-list", {
    title: __("Bricks List"),
    icon: Listing,
    description: __(
      "Bricks List is a gutenberg block which is used to create a list."
    ),
    category: "bricksblocks",
    keywords: [__("List"), __("gutenberg"), __("Bricks")],
    attributes: attrObj,

    edit: props => {
      const {
        clientId,
        attributes: {
          content,
          imageAlt,
          imageUrl,
          IconColor,
          FontColor,
          icnActive,
          setIcon,
          FontSize,
          fontFamily,
          customCssText,
          deviceMobileManager,
          deviceTabletManager,
          blockAttributes,
          FontWeight,
          LineHeight,
          LetterSpacing,
          TextUppercase,
          TextAlign,
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          BRICKS
        },
        setAttributes,
        className
      } = props;

      /* Unique ID generate */

      setAttributes({
        BRICKS:
          "bricks-blocks-" + clientId.split("-")[clientId.split("-").length - 1]
      });

      
      const isImgActive = imageUrl ? "list_with_img" : "";

      const isIcnActive = icnActive ? "list_with_icn" : "";

      /* Style var generate */

      let list_content_color = FontColor ? "color :" + FontColor + ";" : "";
      let list_icon_color = IconColor ? IconColor : "";
      let list_font_size = FontSize ? "font-size :" + FontSize + "px;" : "";
      let list_font_weight = FontWeight
        ? "font-weight:" + FontWeight + ";"
        : "";
      let list_line_height = LineHeight
        ? "line-height:" + LineHeight + "px;"
        : "";
      let list_text_uppercase = TextUppercase
        ? "text-transform:" + TextUppercase + ";"
        : "";
      let list_letter_spacing = LetterSpacing
        ? "letter-spacing:" + LetterSpacing + "px;"
        : "";
      let list_text_align = TextAlign ? "text-align:" + TextAlign + ";" : "";
      let list_icon = setIcon ? setIcon : "";
      let list_image_url = imageUrl ? "url(" + imageUrl + ")" : "none";
      let list_font_family = fontFamily
        ? "font-family:" + fontFamily + ";"
        : "";
      let list_image_active = imageUrl ? "list_with_img" : "";
      let list_icon_active = icnActive ? "list_with_icn" : "";
      let list_margin_top = marginTop ? "margin-top:" + marginTop + "px;" : "";
      let list_margin_bottom = marginBottom
        ? "margin-bottom:" + marginBottom + "px;"
        : "";
      let list_margin_left = marginLeft
        ? "margin-left:" + marginLeft + "px;"
        : "";
      let list_margin_right = marginRight
        ? "margin-right:" + marginRight + "px;"
        : "";
      let list_padding_top = paddingTop
        ? "padding-top:" + paddingTop + "px;"
        : "";
      let list_padding_bottom = paddingBottom
        ? "padding-bottom:" + paddingBottom + "px;"
        : "";
      const paddingleftCal =
        (!isIcnActive || !isImgActive) && 0 == paddingLeft
          ? 5 + parseInt(FontSize)
          : parseInt(paddingLeft);

      let list_padding_left = paddingleftCal
        ? "padding-left:" + paddingleftCal + "px !important;"
        : "";

      let list_padding_right = paddingRight
        ? "padding-right:" + paddingRight + "px;"
        : "";

      let mobileHide = deviceMobileManager
        ? "@media only screen and (max-width: 767px){.wpbricks-wrap-list ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      let tabHide = deviceTabletManager
        ? "@media only screen and ( min-width: 768px) and ( max-width: 1024px){.wpbricks-wrap-list ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      /* Style generate */

      let list_gencss =
        "." +
        BRICKS +
        ' .wpbricks-list.list_with_img li:before{content:"";background:' +
        list_image_url +
        " no-repeat;vertical-align: top;background-size: contain;width:20px;height:20px;display:inline-block;position: absolute;left: 0;top: 5px;}" +
        "." +
        BRICKS +
        " .wpbricks-list.list_with_img, ." +
        BRICKS +
        " .wpbricks-list.list_with_icn{margin-left: 0;}" +
        "." +
        BRICKS +
        " .wpbricks-list.list_with_img li, ." +
        BRICKS +
        " .wpbricks-list.list_with_icn li{list-style:none;position:relative;}" +
        "." +
        BRICKS +
        " .wpbricks-list li{" +
        list_font_family +
        list_font_size +
        list_content_color +
        list_font_weight +
        list_line_height +
        list_text_uppercase +
        list_letter_spacing +
        list_text_align +
        list_margin_top +
        list_margin_bottom +
        list_margin_left +
        list_margin_right +
        list_padding_top +
        list_padding_bottom +
        list_padding_left +
        list_padding_right +
        "}" +
        "." +
        BRICKS +
        " .wpbricks-list{padding-left:0;margin-left: 30px;}" +
        ".dashicon-wrap .dashicons {width: 20%;margin: 10px 0;cursor: pointer}.button-container{text-align: right;}" +
        mobileHide +
        tabHide +
        customCssText.replace("{BRICKS}", "." + BRICKS);

      let list_fonts;
      if ("inherit" !== fontFamily && "" !== fontFamily && undefined !== fontFamily) {
        list_fonts =
          '@import url("https://fonts.googleapis.com/css?family=' +
          fontFamily +
          '");';
      }

      /* Set Font and Style in attributes */

      setAttributes({ bricks_fonts: list_fonts });
      setAttributes({ bricks_style: list_gencss });

      const getImageButton = openEvent => {
        if (props.attributes.imageUrl) {
          setAttributes({ setIcon: "" });
          setAttributes({ icnActive: false });
          return [
            <img
              src={props.attributes.imageUrl}
              onClick={openEvent}
              alr={imageAlt}
              className="image"
              style={{ maxWidth: "35px", maxHeight: "35px", cursor: "pointer" }}
            />,
            <div className="button-container">
              <Button onClick={ClearImage} className="button button-small">
                Clear
              </Button>
            </div>
          ];
        } else {
          return (
            <div className="button-container" style={{ textAlign: "center" }}>
              <Button onClick={openEvent} className="button button-small">
                Pick an Icon Image
              </Button>
            </div>
          );
        }
      };


      function selectIcn(e) {
        const selectedIcn = e.target.getAttribute("data");
        setAttributes({ imageUrl: "" });
        setAttributes({ setIcon: selectedIcn });
        setAttributes({ icnActive: true });
      }

      function ClearImage(e) {
        setAttributes({ imageUrl: "" });
      }

      function ClearIcn(e) {
        setAttributes({ icnActive: "" });
      }

      return [
        <Fragment>
          <InspectorControls key={`ics-${BRICKS}`}>
            <div className="bricks-clear-none">
              <PanelBody title={__("Icon Setting")}>
                <PanelRow>
                  <div className="dashicon-wrap">
                    <span
                      className="dashicons dashicons-yes"
                      data="\f147"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-no"
                      data="\f158"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-admin-post"
                      data="\f109"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-star-filled"
                      data="\f155"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-admin-links"
                      data="\f103"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-admin-generic"
                      data="\f111"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-visibility"
                      data="\f177"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-arrow-right-alt"
                      data="\f344"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-admin-home"
                      data="\f102"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-arrow-right-alt2"
                      data="\f345"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-calendar-alt"
                      data="\f508"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-info"
                      data="\f348"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-no"
                      data="\f158"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-minus"
                      data="\f460"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-marker"
                      data="\f159"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-flag"
                      data="\f227"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-star-empty"
                      data="\f154"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-star-filled"
                      data="\f155"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-lightbulb"
                      data="\f339"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-shield"
                      data="\f332"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-paperclip"
                      data="\f546"
                      onClick={selectIcn}
                    />
                    <span
                      className="dashicons dashicons-businessman"
                      data="\f338"
                      onClick={selectIcn}
                    />
                    <div className="button-container">
                      <Button
                        onClick={ClearIcn}
                        className="button button-small"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </PanelRow>
                <label className="mt10">Icon Color</label>
                <ColorPalette
                  value={IconColor}
                  onChange={value =>
                    setAttributes({
                      IconColor: value
                    })
                  }
                />
                <label className="mt30">
                  <b>Upload Icon Image</b>
                </label>
                <PanelRow>
                  <MediaUpload
                    onSelect={media =>
                      setAttributes({
                        imageAlt: media.alt,
                        imageUrl: media.url
                      })
                    }
                    type="image"
                    value={props.attributes.imageID}
                    render={({ open }) => getImageButton(open)}
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
          <div className={"wpbricks wpbricks-wrap-list " + props.className}>
            <style>
              {list_fonts}
              {list_gencss}
              {"." +
                BRICKS +
                ' .wpbricks-list.list_with_icn li:before{content:"' +
                list_icon +
                '";font-family:dashicons;display:inline-block;color:' +
                list_icon_color +
                ";position: absolute;left: 0;top: 0px;}" +
                "."}
            </style>
            <div className={BRICKS} key={`ics-div-${BRICKS}`}>
              <RichText
                className={`wpbricks-list ${isImgActive} ${isIcnActive} `}
                tagName="ul"
                multiline="li"
                placeholder={__("Write ...", "custom-block")}
                onChange={value => setAttributes({ content: value })}
                value={content}
              />
            </div>
          </div>
        </Fragment>
      ];
    },
    save: props => {
      const {
        attributes: {
          icnActive,
          imageUrl,
          BRICKS,
          content,
          blockID,
          IconColor,
          setIcon
        },
        className
      } = props;

      const isImgActive = imageUrl ? "list_with_img" : "";

      const isIcnActive = icnActive ? "list_with_icn" : "";
      let list_icon_color = IconColor ? IconColor : "";
      let list_icon = setIcon ? setIcon : "";
      return (
        <Fragment>
          <style>
            {"." +
              BRICKS +
              ' .wpbricks-list.list_with_icn li:before{content:"' +
              list_icon +
              '";font-family:dashicons;display:inline-block;color:' +
              list_icon_color +
              ";position: absolute;left: 0;top: 0px;}" +
              "."}
          </style>
          <div className={"wpbricks wpbricks-wrap-list " + className}>
            <div className={BRICKS}>
              <RichText.Content
                value={content}
                tagName="ul"
                multiline="li"
                className={`wpbricks-list ${isImgActive} ${isIcnActive} ${blockID}`}
              />
            </div>
          </div>
        </Fragment>
      );
    }
  });
})(wp.i18n, wp.blocks, wp.blockEditor, wp.components);
