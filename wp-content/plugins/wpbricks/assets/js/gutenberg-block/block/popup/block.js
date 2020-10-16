import { Popup } from "../icons";
import {
  AdvancedAttr,
  WPBricksAdvanceCss
} from "../common-components/bricks-advancecss";

(function(wpI18n, wpBlocks, wpEditor, wpComponents, wpElement) {
  const { __ } = wp.i18n;
  const { registerBlockType } = wp.blocks;
  const { InspectorControls, InnerBlocks, ColorPalette } = wp.blockEditor;
  const {
    PanelBody,
    TextControl,
    PanelRow,
    Button,
    RangeControl,
    SelectControl,
    RadioControl
  } = wp.components;

  const Attr = {
    content: {
      type: "string",
      default: "Click here"
    },
    modelClass: {
      type: "string"
    },
    popwidth: {
      type: "number",
      default: 35
    },
    outerpad: {
      type: "number",
      default: 20
    },
    FontSize: {
      type: "number",
      default: 14
    },
    ButtonBackground: {
      type: "string",
      default: "#f43e56"
    },
    onlyTextColor: {
      type: "string"
    },
    textColor: {
      type: "string",
      default: "#fff"
    },
    ActiveClass: {
      type: "string",
      default: "button_selected"
    },
    BorderRadius: {
      type: "number",
      default: 5
    },
    Buttonpadding: {
      type: "number",
      default: 0
    },
    FontWeight: {
      type: "string",
      default: 500
    },
    paddingTop: {
      type: "number",
      default: 10
    },
    paddingRight: {
      type: "number",
      default: 20
    },
    paddingBottom: {
      type: "number",
      default: 10
    },
    paddingLeft: {
      type: "number",
      default: 20
    },
    ButtonAlignment: {
      type: "string",
      default: "Left"
    },
    BorderColor: {
      type: "string"
    },
    BorderWidth: {
      type: "number",
      default: 1
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
  let attrObj = Object.assign(Attr, AdvancedAttr);

  registerBlockType("bricks/bricks-popup", {
    title: __("Bricks Popup"),
    icon: Popup,
    description: __(
      "Bricks Popup is a gutenberg block that comes with a modal popup."
    ),
    category: "bricksblocks",
    keywords: [__("Popup"), __("gutenberg"), __("Bricks")],
    attributes: attrObj,

    edit: props => {
      const {
        clientId,
        attributes: {
          content,
          popwidth,
          modelClass,
          outerpad,
          FontSize,
          ButtonBackground,
          textColor,
          BorderRadius,
          onlyTextColor,
          Buttonpadding,
          ActiveClass,
          FontWeight,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          ButtonAlignment,
          BorderColor,
          BorderWidth,
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

      let popup_button_align = ButtonAlignment
        ? "text-align:" + ButtonAlignment + ";"
        : "";
      let popup_button_text_size = FontSize
        ? "font-size:" + FontSize + "px;"
        : "";
      let popup_button_text_color = onlyTextColor
        ? "color:" + onlyTextColor + ";"
        : "";
      let popup_button_text_weight = FontWeight
        ? "font-weight:" + FontWeight + ";"
        : "";
      let popup_button_pop_width = popwidth ? "width:" + popwidth + "px;" : "";
      let popup_button_pop_padding = outerpad
        ? "padding:" + outerpad + "px;"
        : "";
      let popup_button_fill_background = ButtonBackground
        ? ButtonBackground + ";"
        : "";
      let popup_button_fill_text_color = textColor
        ? "color:" + textColor + ";"
        : "";
      let popup_button_fill_border_radius = BorderRadius
        ? "border-radius:" + BorderRadius + "px;"
        : "";
      let popup_button_fill_button_padding = Buttonpadding
        ? "padding:" + Buttonpadding + ";"
        : "";
      let popup_button_fill_padding_top = paddingTop
        ? "padding-top:" + paddingTop + "px;"
        : "";
      let popup_button_fill_padding_bottom = paddingBottom
        ? "padding-bottom:" + paddingBottom + "px;"
        : "";
      let popup_button_fill_padding_left = paddingLeft
        ? "padding-left:" + paddingLeft + "px;"
        : "";
      let popup_button_fill_padding_right = paddingRight
        ? "padding-right:" + paddingRight + "px;"
        : "";
      let popup_button_fill_border_color = BorderColor
        ? BorderColor + ";"
        : popup_button_fill_background;
      let popup_button_fill_border_width = BorderWidth
        ? "border:" + BorderWidth + "px"
        : "";

      let mobileHide = deviceMobileManager
        ? "@media only screen and (max-width: 767px){.wpbricks-wrap-popup ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      let tabHide = deviceTabletManager
        ? "@media only screen and ( min-width: 768px) and ( max-width: 1024px){.wpbricks-wrap-popup ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      /* Style generate */

      let popup_gencss =
        ".wpbricks-wrap-popup{" +
        popup_button_align +
        "}" +
        "." +
        BRICKS +
        " .wpbricks-pop-button.only_text_select{" +
        popup_button_text_size +
        popup_button_text_color +
        popup_button_text_weight +
        "}.brick_model_head .only_text_select{border: 0;padding: 0;background: no-repeat;outline: 0;color:#333}.brick_model_head .only_text_select:focus, .brick_model_head .only_text_select:hover{background: none;outline:0}.brick_model_head .button_selected{" +
        popup_button_fill_text_color +
        popup_button_text_size +
        "background:" +
        popup_button_fill_background +
        popup_button_fill_border_radius +
        popup_button_fill_button_padding +
        popup_button_text_weight +
        popup_button_fill_padding_top +
        popup_button_fill_padding_bottom +
        popup_button_fill_padding_left +
        popup_button_fill_padding_right +
        popup_button_fill_border_width +
        " solid " +
        popup_button_fill_border_color +
        '}.brick_popup_btn{cursor: pointer}.brick_model_main{text-align:center;overflow:hidden;position:fixed;top:0;right:0;bottom:0;left:0;-webkit-overflow-scrolling:touch;outline:0;opacity:0;-webkit-transition:opacity .15s linear,z-index .15;-o-transition:opacity .15s linear,z-index .15;transition:opacity .15s linear,z-index .15;z-index:-1;overflow-x:hidden;overflow-y:auto}.brick_model_main:before{content:"";display:inline-block;height:auto;vertical-align:middle;margin-right:0;height:100%}.brick_model_inner{' +
        popup_button_pop_width +
        "-webkit-transform:translate(0,-25%);-ms-transform:translate(0,-25%);transform:translate(0,-25%);-webkit-transition:-webkit-transform .3s ease-out;-o-transition:-o-transform .3s ease-out;transition:-webkit-transform .3s ease-out;-o-transition:transform .3s ease-out;transition:transform .3s ease-out;transition:transform .3s ease-out,-webkit-transform .3s ease-out;display:inline-block;vertical-align:middle;width:600px;margin:30px auto}.brick_close_btn{position:absolute;right:0;top:-36px;cursor:pointer;z-index:99;font-size:30px;color:#fff}.brick_model_wrap{" +
        popup_button_pop_padding +
        "display:block;max-width:97%;overflow-y: auto;max-height: 87vh;margin: 0 auto;position:relative;background-color:#fff;border:1px solid #999;border:1px solid rgba(0,0,0,.2);border-radius:6px;-webkit-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5);background-clip:padding-box;outline:0;text-align:left;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.brick_model_open{z-index:99999;opacity:1;overflow:hidden;display: flex;align-items: center;}.brick_model_open .brick_model_inner{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0);position:relative;z-index:999}.brick_model_open .brick_bg_overlay{background:rgba(0,0,0,.6);z-index:99}.brick_bg_overlay{background:rgba(0,0,0,0);height:100vh;width:100%;position:fixed;left:0;top:0;right:0;bottom:0;z-index:0;-webkit-transition:background .15s linear;-o-transition:background .15s linear;transition:background .15s linear}" +
        mobileHide +
        tabHide +
        customCssText.replace("{BRICKS}", "." + BRICKS);

      /* Set Font and Style in attributes */

      setAttributes({ bricks_style: popup_gencss });

      const ButtonMain = {};
      ButtonAlignment && (ButtonMain.textAlign = ButtonAlignment);

      if (
        document
          .getElementById("wpwrap")
          .classList.contains("brick_body_model_open")
      ) {
        setAttributes({ modelClass: "brick_model_open" });
      } else {
        setAttributes({ modelClass: "" });
      }

      function modelopen() {
        var ele = document.getElementById("wpwrap");
        ele.classList.add("brick_body_model_open");
        setAttributes({ modelClass: "brick_model_open" });
      }

      function modelclose() {
        var ele = document.getElementById("wpwrap");
        ele.classList.remove("brick_body_model_open");
        setAttributes({ modelClass: "" });
      }

      return [
        <div
          className={
            "brick_model_head wpbricks wpbricks-wrap-popup " + props.className
          }
          key={clientId}
        >
          <div className={BRICKS}>
            <input
              type="button"
              onClick={modelopen}
              className={`wpbricks-pop-button brick_popup_btn ${ActiveClass}`}
              value={content}
            />
            <style>{popup_gencss}</style>
            <InspectorControls>
              <div className="bricks-clear-none">
                <PanelBody title={__("Select Button type")} initialOpen={true}>
                  <RadioControl
                    label={__("Button Type")}
                    selected={ActiveClass}
                    options={[
                      { label: __("Text"), value: "only_text_select" },
                      { label: __("Button"), value: "button_selected" }
                    ]}
                    onChange={ActiveClass => {
                      setAttributes({ ActiveClass });
                    }}
                  />
                </PanelBody>
                <PanelBody
                  title={__("Button Text Settings")}
                  initialOpen={false}
                >
                  <TextControl
                    label={__("Change Text")}
                    value={content}
                    onChange={value => setAttributes({ content: value })}
                  />
                  <RangeControl
                    label={__("Font Size")}
                    title={__("Select Text Size")}
                    value={FontSize}
                    min="14"
                    max="50"
                    onChange={value => setAttributes({ FontSize: value })}
                  />
                  <label className="flex-container">Font color</label>
                  <br />
                  {"button_selected" === ActiveClass ? (
                    <ColorPalette
                      label={__("Text color")}
                      onChange={value => setAttributes({ textColor: value })}
                      disableAlpha
                    />
                  ) : (
                    <ColorPalette
                      label={__("Button Text color")}
                      onChange={value =>
                        setAttributes({ onlyTextColor: value })
                      }
                      disableAlpha
                    />
                  )}
                  <SelectControl
                    label={__("Font Weight")}
                    value={FontWeight}
                    options={[
                      { label: __("300"), value: "300" },
                      { label: __("500"), value: "500" },
                      { label: __("600"), value: "600" },
                      { label: __("700"), value: "700" },
                      { label: __("800"), value: "800" }
                    ]}
                    onChange={value => setAttributes({ FontWeight: value })}
                  />
                </PanelBody>
                {"button_selected" === ActiveClass ? (
                  <PanelBody title={__("Button Settings")} initialOpen={false}>
                    <PanelRow>
                      <SelectControl
                        label={__("Button AlignMent")}
                        value={ButtonAlignment}
                        options={[
                          { label: __("Left"), value: "Left" },
                          { label: __("Center"), value: "center" },
                          { label: __("Right"), value: "Right" }
                        ]}
                        onChange={value =>
                          setAttributes({ ButtonAlignment: value })
                        }
                      />
                    </PanelRow>
                    <label className="flex-container">
                      Button background color
                    </label>
                    <br />
                    <ColorPalette
                      label={__("Button background color")}
                      onChange={value =>
                        setAttributes({ ButtonBackground: value })
                      }
                      disableAlpha
                    />
                    <label>
                      <b>Button Padding</b>
                    </label>
                    <PanelRow>
                      <div className="col-main-2">
                        <div
                          className="padd-top col-main-inner"
                          data-tooltip="Padding Top"
                        >
                          <label>Top</label>
                          <TextControl
                            type="number"
                            min="1"
                            value={paddingTop}
                            onChange={value =>
                              setAttributes({ paddingTop: value })
                            }
                          />
                        </div>
                        <div
                          className="padd-right col-main-inner"
                          data-tooltip="Padding Right"
                        >
                          <label>Right</label>
                          <TextControl
                            type="number"
                            min="1"
                            value={paddingRight}
                            onChange={value =>
                              setAttributes({ paddingRight: value })
                            }
                          />
                        </div>
                      </div>
                    </PanelRow>
                    <PanelRow>
                      <div className="col-main-2">
                        <div
                          className="padd-buttom col-main-inner"
                          data-tooltip="Padding Bottom"
                        >
                          <label>Bottom</label>
                          <TextControl
                            type="number"
                            min="1"
                            value={paddingBottom}
                            onChange={value =>
                              setAttributes({ paddingBottom: value })
                            }
                          />
                        </div>
                        <div
                          className="padd-left col-main-inner"
                          data-tooltip="Padding Left"
                        >
                          <label>Left</label>
                          <TextControl
                            type="number"
                            min="1"
                            value={paddingLeft}
                            onChange={value =>
                              setAttributes({ paddingLeft: value })
                            }
                          />
                        </div>
                      </div>
                    </PanelRow>
                    <RangeControl
                      label={__("Radius")}
                      min={0}
                      max={70}
                      value={BorderRadius}
                      onChange={value => setAttributes({ BorderRadius: value })}
                    />
                    <RangeControl
                      label={__("Border Size")}
                      min={0}
                      max={20}
                      value={BorderWidth}
                      onChange={value => setAttributes({ BorderWidth: value })}
                    />
                    <label className="flex-container">Border color</label>
                    <br />
                    <ColorPalette
                      label={__("Border Color")}
                      onChange={value => setAttributes({ BorderColor: value })}
                      disableAlpha
                    />
                  </PanelBody>
                ) : (
                  false
                )}
                {"brick_model_open" === modelClass ? (
                  <PanelBody title={__("Popup Settings")} initialOpen={false}>
                    <div className="control-value">
                      <RangeControl
                        label={__("Popup width")}
                        min={20}
                        max={70}
                        value={popwidth}
                        onChange={value => setAttributes({ popwidth: value })}
                      />
                    </div>
                    <div className="control-value">
                      <RangeControl
                        label={__("Outer Padding")}
                        min={0}
                        max={70}
                        value={outerpad}
                        onChange={value => setAttributes({ outerpad: value })}
                      />
                    </div>
                  </PanelBody>
                ) : (
                  false
                )}
              </div>
            </InspectorControls>
            <WPBricksAdvanceCss {...props} />
            <div className={`wpbricks-popup brick_model_main ${modelClass}`}>
              <div
                className="brick_model_inner"
                style={{ width: `${popwidth}%` }}
              >
                <div className="brick_close_btn" onClick={modelclose}>
                  ×
                </div>
                <div
                  className="brick_model_wrap"
                  style={{ padding: `${outerpad}px` }}
                >
                  <div className="brick_pop_up_content_wrap">
                    <InnerBlocks />
                  </div>
                </div>
              </div>
              <div className="brick_bg_overlay" onClick={modelclose} />
            </div>
          </div>
        </div>
      ];
    },

    save: props => {
      const {
        clientId,
        attributes: { content, ActiveClass, BRICKS },
        className
      } = props;

      return (
        <div
          className={
            "brick_model_head wpbricks wpbricks-wrap-popup " + className
          }
        >
          <div className="brick_model_head" key={clientId}>
            <div className={BRICKS}>
              <input
                type="button"
                className={`wpbricks-pop-button brick_popup_btn ${ActiveClass}`}
                value={content}
              />

              <div className="brick_model_main">
                <div className="brick_model_inner">
                  <div className="brick_close_btn">×</div>
                  <div className="brick_model_wrap">
                    <div className="brick_pop_up_content_wrap">
                      <InnerBlocks.Content />
                    </div>
                  </div>
                </div>
                <div className="brick_bg_overlay" />
              </div>
            </div>
          </div>
        </div>
      );
    }
  });
})(wp.i18n, wp.blocks, wp.blockEditor, wp.components);
