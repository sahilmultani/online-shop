import { Icons } from "../icons";
import { iconList } from "../../../iconsList";
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
  const {
    InspectorControls,
    BlockControls,
    AlignmentToolbar,
    ColorPalette
  } = wpEditor;
  const { TextControl, PanelBody, PanelRow, RangeControl } = wpComponents;

  const Attr = {
    FontClass: {
      type: "string",
      default: "fab fa-wordpress"
    },
    FontSize: {
      type: "number",
      default: 60
    },
    Color: {
      type: "string",
      default: "#000"
    },
    BGColor: {
      type: "string",
      default: "none"
    },
    BorderSize: {
      type: "number",
      default: 0
    },
    BorderColor: {
      type: "string",
      default: "#000"
    },
    BorderRadius: {
      type: "number",
      default: 50
    },
    AlignMent: {
      type: "string",
      default: "center"
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

  registerBlockType("bricks/bricks-icons", {
    title: __("Bricks Icons"),
    description: __(
      "Bricks Icons is a gutenberg block where you can insert Font Awesome class names to add icons."
    ),
    icon: Icons,
    category: "bricksblocks",
    keywords: [__("icon"), __("gutenberg"), __("Bricks")],
    attributes: attrObj,

    edit: function(props) {
      const {
        clientId,
        attributes: {
          FontClass,
          FontSize,
          Color,
          BGColor,
          BorderSize,
          BorderColor,
          BorderRadius,
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          AlignMent,
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

      let icons_alignment = AlignMent ? "text-align:" + AlignMent + ";" : "";
      let icons_font_size = FontSize ? "font-size:" + FontSize + "px;" : "";
      let icons_color = Color ? "color:" + Color + ";" : "";
      let icons_background_color = BGColor ? "background:" + BGColor + ";" : "";

      let icons_border_color = BorderColor ? BorderColor : "";

      let icons_border = BorderSize
        ? "border:" + BorderSize + "px solid" + icons_border_color + ";"
        : "";

      let icons_border_radius = BorderRadius
        ? "border-radius:" + BorderRadius + "%;"
        : "";
      let icons_padding_top = paddingTop
        ? "padding-top:" + paddingTop + "px;"
        : "";
      let icons_padding_bottom = paddingBottom
        ? "padding-bottom:" + paddingBottom + "px;"
        : "";
      let icons_padding_left = paddingLeft
        ? "padding-left:" + paddingLeft + "px;"
        : "";
      let icons_padding_right = paddingRight
        ? "padding-right:" + paddingRight + "px;"
        : "";

      let icons_margin_top = marginTop ? "margin-top:" + marginTop + "px;" : "";
      let icons_margin_bottom = marginBottom
        ? "margin-bottom:" + marginBottom + "px;"
        : "";
      let icons_margin_left = marginLeft
        ? "margin-left:" + marginLeft + "px;"
        : "";
      let icons_margin_right = marginRight
        ? "margin-right:" + marginRight + "px;"
        : "";

      let mobileHide = deviceMobileManager
        ? "@media only screen and (max-width: 767px){.wpbricks-wrap-icons ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      let tabHide = deviceTabletManager
        ? "@media only screen and ( min-width: 768px) and ( max-width: 1024px){.wpbricks-wrap-icons ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      let icon_gencss =
        ".wpbricks-wrap-icons ." +
        BRICKS +
        "{" +
        icons_alignment +
        "}" +
        ".wpbricks-wrap-icons ." +
        BRICKS +
        " .wpbricks-icons{" +
        icons_font_size +
        icons_color +
        icons_background_color +
        icons_border +
        icons_border_radius +
        icons_padding_top +
        icons_padding_bottom +
        icons_padding_left +
        icons_padding_right +
        icons_margin_top +
        icons_margin_bottom +
        icons_margin_left +
        icons_margin_right +
        "}" +
        mobileHide +
        tabHide +
        customCssText.replace("{BRICKS}", "." + BRICKS);

      /* Set Font and Style in attributes */

      setAttributes({ bricks_style: icon_gencss });

      function selectIcn(e) {
        const selectedIcn = e.target.getAttribute("data");
        setAttributes({ FontClass: selectedIcn });
      }

      let spanList;
      spanList = iconList.map((icon, index) => {
        return FontClass === icon.value ? (
          <span
            className={icon.value + " active"}
            data={icon.value}
            onClick={selectIcn}
            key={index}/>
        ) : (
          <span className={icon.value} data={icon.value} onClick={selectIcn} key={index}/>
        );
      });

      return (
        <Fragment key={`icon-${clientId}`}>
          <BlockControls key={`icon-bc-${clientId}`}>
            <AlignmentToolbar
              value={AlignMent}
              onChange={value => setAttributes({ AlignMent: value })}
            />
          </BlockControls>
          <InspectorControls key={`icon-insp-${clientId}`}>
            <div className="bricks-clear-none" key={`icon-insp-div-${clientId}`}>
              <PanelBody title="Select Icon">
                <div className="bricks-icons-ins">
                  <i className={FontClass} />
                </div>
                <label>Insert Font Awesome Class Name</label>
                <PanelRow>
                  <div className="bricks-icon-wrap">{spanList}</div>
                </PanelRow>
              </PanelBody>
              <PanelBody title="Icon Setting" initialOpen={false}>
                <PanelRow>
                  <RangeControl
                    label={__("Icon Size")}
                    value={FontSize}
                    min="8"
                    step="1"
                    onChange={value => setAttributes({ FontSize: value })}
                  />
                </PanelRow>
                <label className="mt10">Icon Color</label>
                <PanelRow>
                  <ColorPalette
                    value={Color}
                    onChange={value => setAttributes({ Color: value })}
                  />
                </PanelRow>
                <label className="mt10">Background Color</label>
                <PanelRow>
                  <ColorPalette
                    value={BGColor}
                    onChange={value => setAttributes({ BGColor: value })}
                  />
                </PanelRow>
                <PanelRow>
                  <RangeControl
                    label={__("Border")}
                    value={BorderSize}
                    min="0"
                    max="100"
                    step="1"
                    onChange={value => setAttributes({ BorderSize: value })}
                  />
                </PanelRow>
                <PanelRow>
                  <RangeControl
                    label={__("Border radius")}
                    value={BorderRadius}
                    min="0"
                    max="50"
                    step="1"
                    onChange={value => setAttributes({ BorderRadius: value })}
                  />
                </PanelRow>
                <label className="mt10">Border Color</label>
                <PanelRow>
                  <ColorPalette
                    value={BorderColor}
                    onChange={value => setAttributes({ BorderColor: value })}
                  />
                </PanelRow>
              </PanelBody>
              <PanelBody title="Spacing" initialOpen={false}>
                <WPBricksSpacing {...props} />
              </PanelBody>
            </div>
          </InspectorControls>
          <WPBricksAdvanceCss {...props}  key={`icon-wpba-${clientId}`}/>
          <style>{icon_gencss}</style>
          <div
            className={
              "bricks-icons wpbricks wpbricks-wrap-icons " + props.className
            }
            key={`icon-div-${clientId}`}>
            <div className={BRICKS}>
              <i className={FontClass + " wpbricks-icons"} />
            </div>
          </div>
        </Fragment>
      );
    },

    save: function(props) {
      const {
        attributes: { FontClass, BRICKS }
      } = props;

      return (
        <div
          className={
            "bricks-icons wpbricks wpbricks-wrap-icons " + props.className
          }
        >
          <div className={BRICKS}>
            <i className={FontClass + " wpbricks-icons"} />
          </div>
        </div>
      );
    }
  });
})(wp.i18n, wp.blocks, wp.blockEditor, wp.components, wp.element);
