import { MediaWithText } from "../icons";
import { Fragment } from "react";

import {
  AdvancedAttr,
  WPBricksAdvanceCss
} from "../common-components/bricks-advancecss";

(function(wpI18n, wpBlocks, wpEditor, wpComponents) {
  const { __ } = wpI18n;
  const { registerBlockType } = wpBlocks;
  const {
    InspectorControls,
    ColorPalette,
    InnerBlocks,
    RichText,
    MediaUpload,
    BlockControls
  } = wpEditor;
  const {
    TextControl,
    PanelBody,
    PanelRow,
    SelectControl,
    Button,
    ToggleControl,
    RangeControl
  } = wpComponents;
  const Attr = {
    LeftWidth: {
      type: "number",
      default: 50
    },
    imageAlt: {
      attribute: "alt"
    },
    imageUrl: {
      attribute: "src"
    },
    ColumnAlignment: {
      type: "string",
      default: "center"
    },
    Imagelignment: {
      type: "string",
      default: "center"
    },
    paddingTop: {
      type: "string",
      default: "20"
    },
    paddingRight: {
      type: "string",
      default: "20"
    },
    paddingBottom: {
      type: "string",
      default: "20"
    },
    paddingLeft: {
      type: "string",
      default: "20"
    },
    FullImage: {
      type: "boolean",
      default: true
    },
    BoxAlign: {
      type: "string"
    },
    BackgroundColor: { type: "string" },
    InsertUrl: {
      type: "string",
      default: ""
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

  registerBlockType("bricks/media-with-text", {
    title: __("Bricks Media & Text"),
    icon: MediaWithText,
    description: __(
      "Bricks Media & Text is a gutenberg block where you can add media along with text."
    ),
    category: "bricksblocks",
    keywords: [__("Media"), __("Text"), __("Bricks")],
    attributes: attrObj,

    edit(props) {
      const {
        className,
        clientId,
        attributes: {
          LeftWidth,
          imageAlt,
          imageUrl,
          ColumnAlignment,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          Imagelignment,
          FullImage,
          BoxAlign,
          BackgroundColor,
          InsertUrl,
          deviceMobileManager,
          deviceTabletManager,
          customCssText,
          bricks_style,
          bricks_fonts,
          BRICKS
        },
        setAttributes
      } = props;

      /* Unique ID generate */

      setAttributes({
        BRICKS:
          "bricks-blocks-" + clientId.split("-")[clientId.split("-").length - 1]
      });

      /* Style var generate */

      let media_text_columnalignment = ColumnAlignment
        ? "align-items:" + ColumnAlignment + ";"
        : "";
      let media_text_backgroundcolor = BackgroundColor
        ? "background:" + BackgroundColor + ";"
        : "";
      let media_text_leftwidth = LeftWidth ? "width:" + LeftWidth + "%;" : "";
      let media_text_imagelignment = Imagelignment
        ? "text-align:" + Imagelignment + ";"
        : "";
      let media_text_boxalign = BoxAlign ? "order:" + BoxAlign + ";" : "";
      //let media_text_rightwidth          = ( 100 - LeftWidth ) ;
      let media_text_rightwidth = LeftWidth
        ? "width:" + (100 - parseInt(LeftWidth)) + "%;"
        : "";

      let media_text_paddingtop = paddingTop
        ? "padding-top:" + paddingTop + "px;"
        : "";

      let media_text_paddingbottom = paddingBottom
        ? "padding-bottom:" + paddingBottom + "px;"
        : "";
      let media_text_paddingleft = paddingLeft
        ? "padding-left:" + paddingLeft + "px;"
        : "";
      let media_text_paddingright = paddingRight
        ? "padding-right:" + paddingRight + "px;"
        : "";

      let mobileHide = deviceMobileManager
        ? "@media only screen and (max-width: 767px){.wpbricks-wrap-media-text ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      let tabHide = deviceTabletManager
        ? "@media only screen and ( min-width: 768px) and ( max-width: 1024px){.wpbricks-wrap-media-text ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      /* Style generate */

      let media_text_gencss =
        "." +
        BRICKS +
        ".media-with-text-main{" +
        media_text_columnalignment +
        media_text_backgroundcolor +
        "}" +
        "." +
        BRICKS +
        " > .media-with-text-main-column.left-side {" +
        media_text_leftwidth +
        media_text_imagelignment +
        media_text_boxalign +
        "}" +
        "." +
        BRICKS +
        " .media-with-text-main-column.right-side{" +
        media_text_rightwidth +
        media_text_paddingtop +
        media_text_paddingbottom +
        media_text_paddingleft +
        media_text_paddingright +
        "}" +
        tabHide +
        mobileHide +
        customCssText.replace("{BRICKS}", "." + BRICKS);

      /* Set Font and Style in attributes */

      setAttributes({ bricks_style: media_text_gencss });

      const getImageButton = openEvent => {
        if (imageUrl) {
          return <img src={imageUrl} alr={imageAlt} className="image" />;
        } else {
          return (
            <div className="button-container">
              <Button onClick={openEvent} className="button button-large">
                Pick an image
              </Button>
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
        <Fragment>
          <InspectorControls>
            <div className="bricks-clear-none">
              <PanelBody title="Media with Text Setting" initialOpen={false}>
                <PanelRow>
                  <div className="col-main-2 media-with-text-align">
                    <div className="col-main-inner">
                      <span
                        className="dashicons dashicons-align-left"
                        onClick={() => setAttributes({ BoxAlign: "1" })}
                      />
                    </div>
                    <div className="col-main-inner">
                      <span
                        className="dashicons dashicons-align-right"
                        onClick={() => setAttributes({ BoxAlign: "2" })}
                      />
                    </div>
                  </div>
                </PanelRow>

                <label>Column Alignment</label>
                <PanelRow>
                  <SelectControl
                    value={ColumnAlignment}
                    options={[
                      { label: __("Center"), value: "center" },
                      { label: __("Top"), value: "flex-start" },
                      { label: __("Bottom"), value: "flex-end" }
                    ]}
                    onChange={value =>
                      setAttributes({ ColumnAlignment: value })
                    }
                  />
                </PanelRow>
                <label className="mt10">Background Color</label>
                <PanelRow>
                  <ColorPalette
                    value={BackgroundColor}
                    onChange={value =>
                      setAttributes({ BackgroundColor: value })
                    }
                  />
                </PanelRow>
              </PanelBody>
              <PanelBody title="Image Setting" initialOpen={false}>
                <label>Media Box Width</label>
                <PanelRow>
                  <RangeControl
                    value={LeftWidth}
                    min="0"
                    max="100"
                    step="1"
                    onChange={value => setAttributes({ LeftWidth: value })}
                  />
                </PanelRow>
                <PanelRow>
                  <ToggleControl
                    label={
                      <p>
                        <strong>{__("Image Size")}</strong>
                        <br />
                        {__('ON - Set Image Full Size" ')}
                      </p>
                    }
                    checked={FullImage}
                    onChange={() => setAttributes({ FullImage: !FullImage })}
                  />
                </PanelRow>
                <label>Image Align</label>
                <PanelRow>
                  <SelectControl
                    value={Imagelignment}
                    options={[
                      { label: __("Center"), value: "center" },
                      { label: __("Left"), value: "left" },
                      { label: __("Right"), value: "right" }
                    ]}
                    onChange={value => setAttributes({ Imagelignment: value })}
                  />
                </PanelRow>
              </PanelBody>
              <PanelBody title="Content Box Setting" initialOpen={false}>
                <label className="mt20">Padding Setting:</label>
                <PanelRow>
                  <div className="padding-setting">
                    <div className="col-main-2">
                      <div
                        className="padd-top col-main-inner"
                        data-tooltip="padding Top"
                      >
                        <label>Top</label>
                        <TextControl
                          type="number"
                          min="1"
                          placeholder="px"
                          value={paddingTop}
                          onChange={value =>
                            setAttributes({ paddingTop: value })
                          }
                        />
                      </div>
                      <div
                        className="padd-buttom col-main-inner"
                        data-tooltip="padding Bottom"
                      >
                        <label>Bottom</label>
                        <TextControl
                          type="number"
                          min="1"
                          placeholder="px"
                          value={paddingBottom}
                          onChange={value =>
                            setAttributes({ paddingBottom: value })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-main-2">
                      <div
                        className="padd-left col-main-inner"
                        data-tooltip="padding Left"
                      >
                        <label>Left</label>
                        <TextControl
                          type="number"
                          min="1"
                          placeholder="px"
                          value={paddingLeft}
                          onChange={value =>
                            setAttributes({ paddingLeft: value })
                          }
                        />
                      </div>
                      <div
                        className="padd-right col-main-inner"
                        data-tooltip="padding Right"
                      >
                        <label>Right</label>
                        <TextControl
                          type="number"
                          min="1"
                          placeholder="px"
                          value={paddingRight}
                          onChange={value =>
                            setAttributes({ paddingRight: value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </PanelRow>
              </PanelBody>
            </div>
          </InspectorControls>
          <WPBricksAdvanceCss {...props} />
          <style>{media_text_gencss}</style>
          <div className={"wpbricks wpbricks-wrap-media-text " + className}>
            <div className={BRICKS + " media-with-text-main"}>
              <div className="media-with-text-main-column left-side">
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
              </div>
              <div className="media-with-text-main-column right-side">
                <InnerBlocks />
              </div>
            </div>
          </div>
        </Fragment>
      );
    },
    save({ attributes, clientId, className }) {
      const {
        imageAlt,
        imageUrl,
        BRICKS,
        bricks_style,
        bricks_fonts
      } = attributes;

      return (
        <div className={"wpbricks wpbricks-wrap-media-text " + className}>
          <div className={BRICKS + " media-with-text-main"}>
            <div className="media-with-text-main-column left-side">
              <img src={imageUrl} alt={imageAlt} />
            </div>
            <div className="media-with-text-main-column right-side">
              <InnerBlocks.Content />
            </div>
          </div>
        </div>
      );
    }
  });
})(wp.i18n, wp.blocks, wp.blockEditor, wp.components);
