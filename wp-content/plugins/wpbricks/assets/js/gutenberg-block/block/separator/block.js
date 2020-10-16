import { Divider } from "../icons";

import {
  SpaceAttr,
  WPBricksSpacing
} from "../common-components/bricks-spacing";

import {
  AdvancedAttr,
  WPBricksAdvanceCss
} from "../common-components/bricks-advancecss";

(function(wpI18n, wpBlocks, wpEditor, wpComponents) {
  const { __ } = wpI18n;
  const { registerBlockType } = wpBlocks;
  const { InspectorControls, ColorPalette } = wpEditor;
  const { TextControl, PanelBody, PanelRow, SelectControl } = wpComponents;
  const Attr = {
    SeparatorWidth: {
      type: "string",
      default: "100"
    },
    SeparatorHeight: {
      type: "string",
      default: "2"
    },
    SeparatorColor: {
      type: "string",
      default: "#eee"
    },
    SeparatorAlignment: {
      type: "string",
      default: "left"
    },
    SeparatorStyle: {
      type: "string",
      default: "solid"
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

  let attrObj = Object.assign(Attr, SpaceAttr);
  attrObj = Object.assign(attrObj, AdvancedAttr);

  registerBlockType("bricks/custom-separator", {
    title: __("Bricks Separator"),
    icon: Divider,
    description: __(
      "Bricks Separator is a gutenberg block that is used to add seperator."
    ),
    category: "bricksblocks",
    keywords: [__("Separator"), __("gutenberg"), __("Bricks")],
    attributes: attrObj,

    edit(props) {
      const {
        clientId,
        attributes: {
          SeparatorWidth,
          SeparatorHeight,
          SeparatorColor,
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          paddingTop,
          paddingBottom,
          paddingLeft,
          paddingRight,
          SeparatorAlignment,
          SeparatorStyle,
          customCssText,
          BRICKS,
          deviceMobileManager,
          deviceTabletManager,
          bricks_style
        },
        setAttributes
      } = props;

      /* Unique ID generate */

      setAttributes({
        BRICKS:
          "bricks-blocks-" + clientId.split("-")[clientId.split("-").length - 1]
      });

      /* Style var generate */

      let sep_width = SeparatorWidth ? "width:" + SeparatorWidth + "%;" : "";
      let sep_height = SeparatorHeight ? SeparatorHeight + "px" : "";
      let sep_align = SeparatorAlignment
        ? "text-align:" + SeparatorAlignment + ";"
        : "";
      let sep_margin_top = marginTop ? "margin-top:" + marginTop + "px;" : "";
      let sep_margin_bottom = marginBottom
        ? "margin-bottom:" + marginBottom + "px;"
        : "";
      let sep_margin_left = marginLeft
        ? "margin-left:" + marginLeft + "px;"
        : "";
      let sep_margin_right = marginRight
        ? "margin-right:" + marginRight + "px;"
        : "";
      let sep_padding_top = paddingTop
        ? "padding-top:" + paddingTop + "px;"
        : "";
      let sep_padding_bottom = paddingBottom
        ? "padding-bottom:" + paddingBottom + "px;"
        : "";
      let sep_padding_left = paddingLeft
        ? "padding-left:" + paddingLeft + "px;"
        : "";
      let sep_padding_right = paddingRight
        ? "padding-right:" + paddingRight + "px;"
        : "";

      let mobileHide = deviceMobileManager
        ? "@media only screen and (max-width: 767px){.wpbricks-wrap-separator ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      let tabHide = deviceTabletManager
        ? "@media only screen and ( min-width: 768px) and ( max-width: 1024px){.wpbricks-wrap-separator ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      /* Style generate */

      let sep_gencss =
        "." +
        BRICKS +
        " .wpbricks-separator{" +
        sep_width +
        "border-top:" +
        sep_height +
        " " +
        SeparatorStyle +
        " " +
        SeparatorColor +
        ";" +
        sep_margin_top +
        sep_margin_bottom +
        sep_margin_left +
        sep_margin_right +
        sep_padding_top +
        sep_padding_bottom +
        sep_padding_left +
        sep_padding_right +
        "display:inline-block}" +
        "." +
        BRICKS +
        "{" +
        sep_align +
        "}" +
        mobileHide +
        tabHide +
        customCssText.replace("{BRICKS}", "." + BRICKS);

      /* Set Font and Style in attributes */

      setAttributes({ bricks_style: sep_gencss });

      return (
        <div>
          <style>{sep_gencss}</style>
          <div
            className={"wpbricks wpbricks-wrap-separator " + props.className}
          >
            <div className={BRICKS}>
              <span className={"wpbricks-separator"} />
            </div>
          </div>
          <InspectorControls>
            <div className="bricks-clear-none">
              <PanelBody title="Separator Setting" initialOpen={true}>
                <label>Separator Width</label>
                <PanelRow>
                  <TextControl
                    type="number"
                    min="1"
                    max="100"
                    value={SeparatorWidth}
                    onChange={value => setAttributes({ SeparatorWidth: value })}
                  />
                </PanelRow>
                <label>Separator Height</label>
                <PanelRow>
                  <TextControl
                    type="number"
                    min="1"
                    value={SeparatorHeight}
                    onChange={value =>
                      setAttributes({ SeparatorHeight: value })
                    }
                  />
                </PanelRow>
                <PanelRow>
                  <SelectControl
                    label={__("Separator Style")}
                    value={SeparatorStyle}
                    options={[
                      { label: __("Solid"), value: "solid" },
                      { label: __("Dotted"), value: "dotted" },
                      { label: __("Dashed"), value: "dashed" },
                      { label: __("Double"), value: "double" },
                      { label: __("None"), value: "none" }
                    ]}
                    onChange={value => setAttributes({ SeparatorStyle: value })}
                  />
                </PanelRow>
                <PanelRow>
                  <SelectControl
                    label={__("Separator Align")}
                    value={SeparatorAlignment}
                    options={[
                      { label: __("Left"), value: "left" },
                      { label: __("Center"), value: "center" },
                      { label: __("Right"), value: "right" }
                    ]}
                    onChange={value =>
                      setAttributes({ SeparatorAlignment: value })
                    }
                  />
                </PanelRow>
                <label className="mt10">Separator Color</label>
                <ColorPalette
                  value={SeparatorColor}
                  onChange={value =>
                    setAttributes({
                      SeparatorColor: value
                    })
                  }
                />
              </PanelBody>
              <WPBricksSpacing {...props} />
            </div>
          </InspectorControls>
          <WPBricksAdvanceCss {...props} />
        </div>
      );
    },
    save(props) {
      const {
        attributes: { BRICKS },
        className
      } = props;

      return (
        <div className={"wpbricks wpbricks-wrap-separator " + className}>
          <div className={BRICKS}>
            <span className={"wpbricks-separator"} />
          </div>
        </div>
      );
    }
  });
})(wp.i18n, wp.blocks, wp.blockEditor, wp.components);
