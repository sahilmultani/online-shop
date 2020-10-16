import { Image } from "../icons";
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
  const {
    InspectorControls,
    ColorPalette,
    RichText,
    MediaUpload,
    BlockControls
  } = wpEditor;
  const {
    TextControl,
    PanelBody,
    PanelRow,
    Button,
    SelectControl,
    ToggleControl
  } = wpComponents;

  const Attr = {
    imageAlt: {
      type: "string",
      default: ""
    },
    imageUrl: {
      type: "string",
      attribute: "src"
    },
    ImageWidth: {
      type: "string",
      default: ""
    },
    ImageHeight: {
      type: "string",
      default: ""
    },
    ImageCaption: {
      type: "string",
      default: ""
    },
    CaptionControl: {
      type: "boolean",
      default: false
    },
    BorderSize: {
      type: "string",
      default: "0"
    },
    BorderType: {
      type: "string",
      default: "none"
    },
    BorderRadius: {
      type: "string",
      default: "0"
    },
    BorderColor: {
      type: "string",
      default: ""
    },
    InsertUrl: {
      type: "string",
      default: ""
    },
    ImageLinkTo: {
      type: "boolean",
      default: false
    },
    ImageCustomURL: {
      type: "string",
      default: "#"
    },
    ImageLinkWindow: {
      type: "boolean",
      default: false
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

  const IMAGE_TEMPLATE = [["core/image", {}]];
  registerBlockType("bricks/custom-image", {
    title: __("Brick Image"),
    icon: Image,
    description: __(
      "Bricks Image is a gutenberg block which used to insert image."
    ),
    category: "bricksblocks",
    keywords: [__("Image"), __("gutenberg"), __("Bricks")],
    attributes: attrObj,
    edit(props) {
      const {
        clientId,
        attributes: {
          imageAlt,
          ImageWidth,
          ImageHeight,
          ImageCaption,
          CaptionControl,
          TextAlign,
          FontSize,
          FontWeight,
          LineHeight,
          LetterSpacing,
          TextUppercase,
          FontColor,
          fontFamily,
          BorderSize,
          BorderType,
          BorderRadius,
          BorderColor,
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          InsertUrl,
          customCssText,
          ImageLinkTo,
          ImageCustomURL,
          ImageLinkWindow,
          BRICKS,
          deviceMobileManager,
          deviceTabletManager,
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

      let image_width = ImageWidth ? "width:" + ImageWidth + "px;" : "";
      let image_height = ImageHeight ? "height:" + ImageHeight + "px;" : "";
      let image_margin_top = marginTop ? "margin-top:" + marginTop + "px;" : "";
      let image_margin_bottom = marginBottom
        ? "margin-bottom:" + marginBottom + "px;"
        : "";
      let image_margin_left = marginLeft
        ? "margin-left:" + marginLeft + "px;"
        : "";
      let image_margin_right = marginRight
        ? "margin-right:" + marginRight + "px;"
        : "";
      let image_padding_top = paddingTop
        ? "padding-top:" + paddingTop + "px;"
        : "";
      let image_padding_bottom = paddingBottom
        ? "padding-bottom:" + paddingBottom + "px;"
        : "";
      let image_padding_left = paddingLeft
        ? "padding-left:" + paddingLeft + "px;"
        : "";
      let image_padding_right = paddingRight
        ? "padding-right:" + paddingRight + "px;"
        : "";
      let image_bordersize = BorderSize ? BorderSize + "px" : "";
      let image_border_type = BorderType ? BorderType + "" : "";
      let image_border_color = BorderColor ? BorderColor : "";

      let image_border =
        image_bordersize +
        " " +
        image_border_type +
        " " +
        image_border_color +
        ";";

      let image_border_radius = BorderRadius
        ? "border-radius:" + BorderRadius + "px;"
        : "";
      let image_caption_font_size = FontSize
        ? "font-size:" + FontSize + "px;"
        : "";
      let image_caption_font_weight = FontWeight
        ? "font-weight:" + FontWeight + ";"
        : "";
      let image_caption_line_height = LineHeight
        ? "line-height:" + LineHeight + "px;"
        : "";
      let image_caption_letter_space = LetterSpacing
        ? "letter-spacing:" + LetterSpacing + "px;"
        : "";
      let image_caption_text_trans = TextUppercase
        ? "text-transform:" + TextUppercase + ";"
        : "";
      let image_caption_font_color = FontColor
        ? "color:" + FontColor + ";"
        : "";
      let image_caption_font_align = TextAlign
        ? "text-align:" + TextAlign + ";"
        : "";
      let image_caption_font_family = fontFamily
        ? "font-family:" + fontFamily + ";"
        : "";

      let ImageLinkNewWindow = ImageLinkWindow ? "_blank" : "_self";

      let mobileHide = deviceMobileManager
        ? "@media only screen and (max-width: 767px){.wpbricks-wrap-image ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      let tabHide = deviceTabletManager
        ? "@media only screen and ( min-width: 768px) and ( max-width: 1024px){.wpbricks-wrap-image ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      let image_fonts;
      if ("inherit" !== fontFamily && undefined !== fontFamily) {
        image_fonts =
          '@import url("https://fonts.googleapis.com/css?family=' +
          fontFamily +
          '");';
      }

      let image_gencss =
        "." +
        BRICKS +
        " .wpbricks-image{" +
        image_width +
        image_height +
        image_margin_top +
        image_margin_bottom +
        image_margin_left +
        image_margin_right +
        image_padding_top +
        image_padding_bottom +
        image_padding_left +
        image_padding_right +
        "border:" +
        image_border +
        image_border_radius +
        "}" +
        "." +
        BRICKS +
        " span{" +
        image_caption_font_size +
        image_caption_font_weight +
        image_caption_text_trans +
        image_caption_line_height +
        image_caption_letter_space +
        image_caption_font_color +
        image_caption_font_family +
        "}" +
        "." +
        BRICKS +
        " .wpbricks-add-caption{" +
        image_caption_font_align +
        "}" +
        mobileHide +
        tabHide +
        customCssText.replace("{BRICKS}", "." + BRICKS);

      /* Set Font and Style in attributes */

      setAttributes({ bricks_fonts: image_fonts });
      setAttributes({ bricks_style: image_gencss });

      const getImageButton = openEvent => {
        if (props.attributes.imageUrl) {
          return (
            <img
              src={props.attributes.imageUrl}
              alt={imageAlt}
              className={"wpbricks-image"}
            />
          );
        } else {
          return (
            <div className="button-container">
              <div className="bricks-pick-image">
                <label>Bricks Image</label>
                <Button onClick={openEvent} className="button button-large">
                  Pick an image
                </Button>
              </div>
              <div className="bricks-insert-url">
                <form>
                  <TextControl
                    type="text"
                    value={InsertUrl}
                    placeholder="https://"
                    onChange={value => setAttributes({ InsertUrl: value })}
                  />
                  <Button
                    onClick={InsertUrlFunc}
                    className="button button-large"
                  >
                    Insert URL
                  </Button>
                </form>
              </div>
            </div>
          );
        }
      };

      const InsertUrlFunc = () => {
        return setAttributes({ imageUrl: InsertUrl });
      };
      return (
        <div>
          <InspectorControls>
            <div className="bricks-clear-none">
              <PanelBody title="Image Settings" initialopen="true">
                <label>Alter Text</label>
                <PanelRow>
                  <TextControl
                    type="text"
                    value={imageAlt}
                    initialopen="false"
                    onChange={value => setAttributes({ imageAlt: value })}
                  />
                </PanelRow>
                <PanelRow>
                  <div className="col-main-2">
                    <div className="col-main-inner">
                      <label>Width</label>
                      <TextControl
                        type="number"
                        min="1"
                        placeholder="px"
                        value={ImageWidth}
                        onChange={ImageWidth =>
                          setAttributes({ ImageWidth: ImageWidth })
                        }
                      />
                    </div>
                    <div className="col-main-inner">
                      <label>Height</label>
                      <TextControl
                        type="number"
                        min="1"
                        placeholder="px"
                        value={ImageHeight}
                        onChange={ImageHeight =>
                          setAttributes({ ImageHeight: ImageHeight })
                        }
                      />
                    </div>
                  </div>
                </PanelRow>

                <PanelRow>
                  <ToggleControl
                    label={__("Enable Caption")}
                    checked={CaptionControl}
                    onChange={() =>
                      setAttributes({ CaptionControl: !CaptionControl })
                    }
                    className="toggle-setting-class"
                  />
                </PanelRow>
                <PanelRow>
                  <ToggleControl
                    label={__("Eable Link To")}
                    checked={ImageLinkTo}
                    onChange={() =>
                      setAttributes({ ImageLinkTo: !ImageLinkTo })
                    }
                    className="toggle-setting-class"
                  />
                </PanelRow>
                {false != ImageLinkTo && (
                  <div className={"image-link-to"}>
                    <PanelRow>
                      <TextControl
                        type="text"
                        min="1"
                        placeholder="https:"
                        value={ImageCustomURL}
                        onChange={ImageCustomURL =>
                          setAttributes({ ImageCustomURL: ImageCustomURL })
                        }
                      />
                    </PanelRow>
                    <PanelRow>
                      <ToggleControl
                        label={__("Open in New Window")}
                        checked={ImageLinkWindow}
                        onChange={() =>
                          setAttributes({ ImageLinkWindow: !ImageLinkWindow })
                        }
                      />
                    </PanelRow>
                  </div>
                )}
              </PanelBody>
              <PanelBody title="Image Border Setting" initialopen="false">
                <label>Border Width</label>
                <PanelRow>
                  <TextControl
                    type="number"
                    min="1"
                    value={BorderSize}
                    placeholder="px"
                    onChange={BorderSize =>
                      setAttributes({ BorderSize: BorderSize })
                    }
                  />
                </PanelRow>
                <label>Border Style</label>
                <PanelRow>
                  <SelectControl
                    value={BorderType}
                    options={[
                      { label: __("None"), value: "none" },
                      { label: __("Solid"), value: "solid" },
                      { label: __("Dotted"), value: "dotted" },
                      { label: __("Dashed"), value: "dashed" },
                      { label: __("Double"), value: "double" },
                      { label: __("none"), value: "none" }
                    ]}
                    onChange={value => setAttributes({ BorderType: value })}
                  />
                </PanelRow>
                <label>Border radius</label>
                <PanelRow>
                  <TextControl
                    type="number"
                    min="1"
                    placeholder="%"
                    value={BorderRadius}
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
              <PanelBody title="Spacing" initialopen="false">
                <WPBricksSpacing {...props} />
              </PanelBody>
            </div>
            {false != CaptionControl && (
              <div className={"wprbricks-caption-controls"}>
                <PanelBody title="Typography" initialopen="false">
                  <WPBricksFonts {...props} />
                </PanelBody>
              </div>
            )}
          </InspectorControls>
          <WPBricksAdvanceCss {...props} />
          <style>
            {image_fonts}
            {image_gencss}
          </style>
          <div className={"wpbricks wpbricks-wrap-image " + props.className}>
            <div className={BRICKS}>
              <BlockControls>
                <div className="delete-brick-img">
                  <span
                    onClick={value =>
                      setAttributes({
                        imageUrl: "",
                        imageAlt: "",
                        InsertUrl: ""
                      })
                    }
                    className="dashicons dashicons-trash"
                  />
                </div>
              </BlockControls>
              <MediaUpload
                onSelect={media => {
                  setAttributes({ imageAlt: media.alt, imageUrl: media.url });
                }}
                type="image"
                value={props.attributes.imageID}
                render={({ open }) => getImageButton(open)}
              />
              {false != CaptionControl && (
                <div className={"wpbricks-add-caption"}>
                  <RichText
                    tagName={"span"}
                    onChange={ImageCaption =>
                      setAttributes({ ImageCaption: ImageCaption })
                    }
                    value={ImageCaption}
                    className={"wpbricks-image-caption"}
                    placeholder={"Add Caption Here..."}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    },
    save(props) {
      const {
        attributes: {
          imageAlt,
          ImageCaption,
          ImageCustomURL,
          imageUrl,
          ImageLinkWindow,
          BRICKS
        },
        className
      } = props;

      let ImageLinkNewWindow = ImageLinkWindow ? "_blank" : "_self";

      return (
        <div className={"wpbricks wpbricks-wrap-image " + className}>
          <div className={BRICKS}>
            <a
              href={ImageCustomURL}
              className="wpbricks-image-link"
              target={ImageLinkNewWindow}
              rel="noopener noreferrer"
            >
              <img src={imageUrl} alt={imageAlt} className="wpbricks-image" />
              <span className="wpbricks-image-caption">{ImageCaption}</span>
            </a>
          </div>
        </div>
      );
    }
  });
})(wp.i18n, wp.blocks, wp.blockEditor, wp.components, wp.element);
