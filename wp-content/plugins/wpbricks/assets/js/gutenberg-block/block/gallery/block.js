import { Gallery } from "../icons";
import {
  AdvancedAttr,
  WPBricksAdvanceCss
} from "../common-components/bricks-advancecss";
(function(wpI18n, wpBlocks, wpEditor, wpComponents, wpElement) {
  const { __ } = wpI18n;
  const { Component, Fragment } = wpElement;
  const { registerBlockType } = wpBlocks;
  const {
    InspectorControls,
    MediaUpload,
    MediaPlaceholder,
    mediaUpload,
    BlockControls
  } = wpEditor;
  const {
    PanelBody,
    RangeControl,
    RadioControl,
    FormFileUpload,
    Toolbar,
    Button
  } = wpComponents;
  const $ = jQuery;

  const galleryAttributes = {
    images: {
      type: "array",
      default: [] // [ { id: int, url, title, text, link: string } ]
    },
    actionOnClick: {
      type: "string",
      default: "masonry"
    },
    colCount: {
      type: "number",
      default: 3
    },
    customCssText: {
      type: "string",
      default: ""
    },
    deviceMobileManager: {
      type: "boolean",
      default: false
    },
    deviceTabletManager: {
      type: "boolean",
      default: false
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
  let attrObj = Object.assign(galleryAttributes, AdvancedAttr);

  // eslint-disable-next-line no-undef
  const { pick, get, map } = lodash;

  const ALLOWED_MEDIA_TYPES = ["image"];

  const pickRelevantMediaFiles = image => {
    const imageProps = pick(image, ["alt", "id", "link", "caption"]);
    imageProps.url =
      get(image, ["sizes", "large", "url"]) ||
      get(image, ["media_details", "sizes", "large", "source_url"]) ||
      image.url;
    return imageProps;
  };

  class GalleryBlock extends Component {
    constructor() {
      super(...arguments);
      this.state = {
        currentSelected: 0,
        inited: false,
        open: true
      };

      this.uploadFromFiles = this.uploadFromFiles.bind(this);
      this.setAttributes = this.setAttributes.bind(this);
      this.onSelectImages = this.onSelectImages.bind(this);
    }

    setAttributes(attributes) {
      if (attributes.ids) {
        throw new Error(
          'The "ids" attribute should not be changed directly. It is managed automatically when "images" attribute changes'
        );
      }

      if (attributes.images) {
        attributes = Object.assign({}, attributes, {
          ids: map(attributes.images, "id")
        });
      }

      this.props.setAttributes(attributes);
    }

    uploadFromFiles(event) {
      this.addFiles(event.target.files);
    }

    addFiles(files) {
      const currentImages = this.props.attributes.images || [];
      const { noticeOperations } = this.props;
      const { setAttributes } = this;

      mediaUpload({
        allowedTypes: ALLOWED_MEDIA_TYPES,
        filesList: files,
        onFileChange: images => {
          const imagesNormalized = images.map(image =>
            pickRelevantMediaFiles(image)
          );
          setAttributes({
            images: currentImages.concat(imagesNormalized)
          });
        }

        // onError: noticeOperations.createErrorNotice
      });
    }

    componentDidUpdate() {
      $(".popup-gallery").magnificPopup({
        delegate: "div",
        type: "image",
        tLoading: "Loading image #%curr%...",
        mainClass: "mfp-img-mobile",
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
      });
    }

    onSelectImages(images) {
      this.props.setAttributes({
        images: images.map(image => pickRelevantMediaFiles(image))
      });
    }

    render() {
      const {
        attributes,
        setAttributes,
        isSelected,
        className,
        noticeOperations,
        noticeUI,
        clientId
      } = this.props;
      const {
        images,
        actionOnClick,
        colCount,
        customCssText,
        deviceMobileManager,
        deviceTabletManager,
        BRICKS,
        bricks_style
      } = attributes;

      /* Unique ID generate */

      setAttributes({
        BRICKS:
          "bricks-blocks-" + clientId.split("-")[clientId.split("-").length - 1]
      });

      /* Style var generate */

      let gallery_custom_css = customCssText ? customCssText : "";

      let mobileHide = deviceMobileManager
        ? "@media only screen and (max-width: 767px){.wpbricks-wrap-gallery ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      let tabHide = deviceTabletManager
        ? "@media only screen and ( min-width: 768px) and ( max-width: 1024px){.wpbricks-wrap-gallery ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      /* Style generate */

      let gallery_gencss =
        gallery_custom_css.replace("{BRICKS}", "." + BRICKS) +
        mobileHide +
        tabHide;

      /* Set Font and Style in attributes */

      setAttributes({ bricks_style: gallery_gencss });

      // eslint-disable-next-line vars-on-top
      var $carousel;

      const controls = (
        <BlockControls>
          {!!images.length && (
            <Toolbar>
              <MediaUpload
                onSelect={this.onSelectImages}
                allowedTypes={ALLOWED_MEDIA_TYPES}
                multiple
                gallery
                value={images.map(img => img.id)}
                render={({ open }) => (
                  <Button
                    className="components-toolbar__control"
                    label={__("Edit Gallery", "gutenberg-Gallery")}
                    icon="edit"
                    onClick={open}
                  />
                )}
              />
            </Toolbar>
          )}
        </BlockControls>
      );

      if (0 === images.length) {
        return (
          <Fragment>
            {controls}
            <MediaPlaceholder
              icon="format-gallery"
              className="gallery-upload-placeholder"
              labels={{
                title: __("Gallery", "gutenberg-gallery"),
                instructions: __(
                  "No images selected. Adding images to start using this block.",
                  "gutenberg-gallery"
                )
              }}
              onSelect={image => {
                const imgInsert = image.map(img => ({
                  url: img.url,
                  id: img.id
                }));

                setAttributes({
                  images: [...images, ...imgInsert]
                });
              }}
              accept="image/*"
              allowedTypes={ALLOWED_MEDIA_TYPES}
              multiple
              notices={noticeUI}

              // onError={noticeOperations.createErrorNotice}
            />
          </Fragment>
        );
      }

      const blockStyle = {};
      const innerItemStyle = {};

      if ("masonry" === actionOnClick) {
        $("." + BRICKS + " .gallery-item-list").addClass("popup-gallery");
        colCount && (blockStyle.columnCount = colCount);
        innerItemStyle.width = 100 + "%";
        if (
          $("." + BRICKS + " .gallery-item-list").hasClass("slick-initialized")
        ) {
          $("." + BRICKS + " .gallery-item-list").slick("unslick");
        }
      } else if ("square" === actionOnClick) {
        $("." + BRICKS + " .gallery-item-list").addClass("popup-gallery");
        if (colCount) {
          innerItemStyle.width = 100 / colCount + "%";
          innerItemStyle.paddingBottom = 100 / colCount + "%";
        }
        if (
          $("." + BRICKS + " .gallery-item-list").hasClass("slick-initialized")
        ) {
          $("." + BRICKS + " .gallery-item-list").slick("unslick");
        }
      } else if ("slider" === actionOnClick) {
        $("." + BRICKS + " .gallery-item-list").removeClass("popup-gallery");
        $(window).trigger("resize");
        if (colCount) {
          innerItemStyle.paddingBottom = 0;
          $carousel = $("." + BRICKS + " .gallery-item-list").not(
            ".slick-initialized"
          );
          $carousel
            .slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: true,
              fade: true,
              infinite: true,
              adaptiveHeight: true
            })
            .magnificPopup({
              delegate: "div.bricks-gallery-item:not(.slick-cloned)",
              type: "image",
              tLoading: "Loading image number: #%curr%...",
              mainClass: "mfp-img-mobile",
              gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
              },
              image: {
                tError:
                  '<a href="%url%">The image #%curr%</a> could not be loaded.'
              }
            });
        }
      }

      return (
        <Fragment>
          {controls}
          <InspectorControls>
            <PanelBody title={__("Image Settings")} initialOpen={true}>
              <RadioControl
                selected={actionOnClick}
                options={[
                  { label: __("Masonry"), value: "masonry" },
                  { label: __("Square"), value: "square" },
                  { label: __("Slider"), value: "slider" }
                ]}
                onChange={actionOnClick => {
                  setAttributes({ actionOnClick });
                }}
              />
            </PanelBody>
            <PanelBody title={__("Column Settings")} initialOpen={false}>
              <RangeControl
                label="Columns"
                value={colCount}
                onChange={columns => setAttributes({ colCount: columns })}
                min={2}
                max={5}
              />
            </PanelBody>
          </InspectorControls>
          <WPBricksAdvanceCss {...this.props} />
          {noticeUI}
          <style>{gallery_gencss}</style>
          <div
            className={
              "wpbricks wpbricks-wrap-gallery gallery-block" + " " + className
            }
          >
            <div className={BRICKS}>
              <div
                className={`gallery-images ${actionOnClick}`}
                style={blockStyle}
              >
                <div className="gallery-item-list popup-gallery">
                  {images.map((image, index) => (
                    <div
                      className="bricks-gallery-item"
                      key={index}
                      style={innerItemStyle}
                      href={image.url}
                    >
                      <img
                        key={index}
                        src={image.url}
                        className="wpbricks-gallery bricks-gallery-img"
                        alt={__("Slider image")}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {isSelected && (
              <div className="blocks-gallery-item has-add-item-button">
                <FormFileUpload
                  multiple
                  isLarge
                  className="block-library-gallery-add-item-button"
                  onChange={this.uploadFromFiles}
                  accept="image/*"
                  icon="insert"
                >
                  {__("Upload an image")}
                </FormFileUpload>
              </div>
            )}
          </div>
        </Fragment>
      );
    }
  }

  registerBlockType("bricks/bricks-gallery", {
    title: __("Bricks Gallery"),
    icon: Gallery,
    description: __(
      "Bricks Gallery is a gutenberg block that can present photos, art and different visual materials."
    ),
    category: "bricksblocks",
    keywords: [__("Gallery"), __("images"), __("Bricks")],
    attributes: attrObj,

    edit: GalleryBlock,

    save: ({ attributes }) => {
      const {
        images,
        actionOnClick,
        colCount,
        customCssText,
        deviceMobileManager,
        deviceTabletManager,
        BRICKS
      } = attributes;
      var $carousel;

      const blockStyle = {};
      const innerItemStyle = {};
      if ("masonry" === actionOnClick) {
        $("." + BRICKS + " .gallery-item-list").addClass("popup-gallery");
        colCount && (blockStyle.columnCount = colCount);
        innerItemStyle.width = 100 + "%";
        if (
          $("." + BRICKS + " .gallery-item-list").hasClass("slick-initialized")
        ) {
          $("." + BRICKS + " .gallery-item-list").slick("unslick");
        }
      } else if ("square" === actionOnClick) {
        $("." + BRICKS + " .gallery-item-list").addClass("popup-gallery");
        if (colCount) {
          innerItemStyle.width = 100 / colCount + "%";
          innerItemStyle.paddingBottom = 100 / colCount + "%";
        }
        if (
          $("." + BRICKS + " .gallery-item-list").hasClass("slick-initialized")
        ) {
          $("." + BRICKS + " .gallery-item-list").slick("unslick");
        }
      } else if ("slider" === actionOnClick) {
        $("." + BRICKS + " .gallery-item-list").removeClass("popup-gallery");
        $(window).trigger("resize");
        if (colCount) {
          innerItemStyle.paddingBottom = 0;
          $carousel = $("." + BRICKS + " .gallery-item-list").not(
            ".slick-initialized"
          );
          $carousel
            .slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: true,
              fade: true,
              infinite: true,
              adaptiveHeight: true
            })
            .magnificPopup({
              delegate: "div.bricks-gallery-item:not(.slick-cloned)",
              type: "image",
              tLoading: "Loading image number: #%curr%...",
              mainClass: "mfp-img-mobile",
              gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
              },
              image: {
                tError:
                  '<a href="%url%">The image #%curr%</a> could not be loaded.'
              }
            });
        }
      }

      return (
        <Fragment>
          <div className="wpbricks wpbricks-wrap-gallery gallery-block">
            <div className={BRICKS}>
              <div
                className={`gallery-images ${actionOnClick}`}
                style={blockStyle}
              >
                <div className="gallery-item-list popup-gallery">
                  {images.map((image, index) => (
                    <div
                      className="bricks-gallery-item"
                      key={index}
                      style={innerItemStyle}
                      href={image.url}
                    >
                      <img
                        key={index}
                        src={image.url}
                        className="wpbricks-gallery bricks-gallery-img"
                        alt={__("Slider image")}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
  });
})(wp.i18n, wp.blocks, wp.blockEditor, wp.components, wp.element);
