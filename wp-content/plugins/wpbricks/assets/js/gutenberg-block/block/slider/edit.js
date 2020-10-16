// eslint-disable-next-line no-undef
const { filter, pick, get, map } = lodash;
const { Component, Fragment } = wp.element;
const { __, sprintf } = wp.i18n;
const {
  IconButton,
  DropZone,
  FormFileUpload,
  PanelBody,
  TextControl,
  SelectControl,
  ToggleControl,
  Toolbar,
  Button,
  withNotices
} = wp.components;
const {
  BlockControls,
  MediaUpload,
  MediaPlaceholder,
  InspectorControls,
  mediaUpload
} = wp.blockEditor;

/**
 * Internal dependencies
 */
import SliderImage from "./slider-image";
import Slider from "react-slick";
import { WPBricksAdvanceCss } from "../common-components/bricks-advancecss";

const effectOptions = [
  { value: "fade", label: __("Fade", "gutenberg-slider") },
  { value: "scroll", label: __("Scroll", "gutenberg-slider") }
];

const linkOptions = [
  { value: "attachment", label: __("Attachment Page") },
  { value: "media", label: __("Media File") },
  { value: "none", label: __("None") }
];

const ALLOWED_MEDIA_TYPES = ["image"];

export const pickRelevantMediaFiles = image => {
  const imageProps = pick(image, ["alt", "id", "link", "caption"]);
  imageProps.url =
    get(image, ["sizes", "large", "url"]) ||
    get(image, ["media_details", "sizes", "large", "source_url"]) ||
    image.url;
  return imageProps;
};

class SliderEdit extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      selectedImage: null
    };

    this.getAvailableSizes = this.getAvailableSizes.bind(this);

    this.onSelectImage = this.onSelectImage.bind(this);
    this.onSelectImages = this.onSelectImages.bind(this);
    this.setLinkTo = this.setLinkTo.bind(this);
    this.setArrows = this.setArrows.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
    this.setEffect = this.setEffect.bind(this);
    this.toggleAutoplay = this.toggleAutoplay.bind(this);

    // this.toggleImageCrop = this.toggleImageCrop.bind(this);
    // this.toggleSlider = this.toggleSlider.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);
    this.setImageAttributes = this.setImageAttributes.bind(this);
    this.addFiles = this.addFiles.bind(this);
    this.uploadFromFiles = this.uploadFromFiles.bind(this);
    this.setAttributes = this.setAttributes.bind(this);
  }

  getAvailableSizes() {
    return get(this.props.image, ["media_details", "sizes"], {});
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

  onSelectImage(index) {
    return () => {
      if (this.state.selectedImage !== index) {
        this.setState({
          selectedImage: index
        });
      }
    };
  }

  onRemoveImage(index) {
    return () => {
      const images = filter(
        this.props.attributes.images,
        (img, i) => index !== i
      );
      this.setState({ selectedImage: null });
      this.setAttributes({
        images
      });
    };
  }

  onSelectImages(images) {
    this.props.setAttributes({
      images: images.map(image => pickRelevantMediaFiles(image))
    });
  }

  setLinkTo(value) {
    this.setAttributes({ linkTo: value });
  }

  setSpeed(value) {
    this.setAttributes({ speed: value });
  }

  setEffect(value) {
    this.setAttributes({ effect: value });
  }

  toggleAutoplay() {
    this.setAttributes({ autoplay: !this.props.attributes.autoplay });
  }

  // toggleImageCrop() {
  // 	this.setAttributes({ imageCrop: !this.props.attributes.imageCrop });
  // }

  // toggleSlider() {
  // 	this.setAttributes({ imageSlide: !this.props.attributes.imageSlide });
  // }

  setArrows() {
    this.setAttributes({ arrows: !this.props.attributes.arrows });
  }

  getImageCropHelp(checked) {
    return checked
      ? __("Thumbnails are cropped to align.")
      : __("Thumbnails are not cropped.");
  }

  setImageAttributes(index, attributes) {
    const {
      attributes: { images }
    } = this.props;
    const { setAttributes } = this;
    if (!images[index]) {
      return;
    }
    setAttributes({
      images: [].concat(
        images.slice(0, index),
        [Object.assign({}, images[index], attributes)],
        images.slice(index + 1)
      )
    });
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
      },
      onError: noticeOperations.createErrorNotice
    });
  }

  componentDidUpdate(prevProps) {
    // Deselect images when deselecting the block
    if (!this.props.isSelected && prevProps.isSelected) {
      this.setState({
        selectedImage: null,
        captionSelected: false
      });
    }
  }

  render() {
    const {
      attributes,
      isSelected,
      className,
      noticeOperations,
      noticeUI,
      setAttributes,
      clientId
    } = this.props;
    const {
      images,
      imageCrop,
      autoplay,
      speed,
      effect,
      linkTo,
      arrows,
      customCssText,
      BRICKS,
      deviceMobileManager,
      deviceTabletManager,
      bricks_style
    } = attributes;
    const settings = {
      dots: true,
      infinite: true,
      speed: attributes.speed,
      autoplay: attributes.autoplay,
      arrows: attributes.arrows,
      pauseOnFocus: true,
      fade: "fade" == attributes.effect
    };

    const dropZone = <DropZone onFilesDrop={this.addFiles} />;
    /* Unique ID generate */

    setAttributes({
      BRICKS:
        "bricks-blocks-" + clientId.split("-")[clientId.split("-").length - 1]
    });

    /* Style var generate */

    let slider_custom_css = customCssText ? customCssText : "";

    let mobileHide = deviceMobileManager
      ? "@media only screen and (max-width: 767px){.wpbricks-slider." +
        BRICKS +
        "{display:none !important}}"
      : "";

    let tabHide = deviceTabletManager
      ? "@media only screen and ( min-width: 768px) and ( max-width: 1024px){.wpbricks-slider." +
        BRICKS +
        "{display:none !important}}"
      : "";

    /* Style generate */

    let slider_gencss =
      slider_custom_css.replace("{BRICKS}", "." + BRICKS) +
      mobileHide +
      tabHide;

    /* Set Font and Style in attributes */

    setAttributes({ bricks_style: slider_gencss });

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
                  label={__("Edit Slider", "gutenberg-slider")}
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
            className={className}
            labels={{
              title: __("Slider", "gutenberg-slider"),
              instructions: __(
                "Drag images, upload new ones or select files from your library.",
                "gutenberg-slider"
              )
            }}
            onSelect={this.onSelectImages}
            accept="image/*"
            allowedTypes={ALLOWED_MEDIA_TYPES}
            multiple
            notices={noticeUI}
            onError={noticeOperations.createErrorNotice}
          />
        </Fragment>
      );
    }

    return (
      <Fragment>
        {controls}
        <InspectorControls>
          <PanelBody title={__("Slider Settings", "gutenberg-slider")}>
            <div className="toggle-slider-settings">
              <ToggleControl
                label={__("Autoplay", "gutenberg-slider")}
                checked={!!autoplay}
                onChange={this.toggleAutoplay}
              />
              <TextControl
                label={__("Speed", "gutenberg-slider")}
                type="number"
                min="100"
                max="500"
                value={speed}
                onChange={this.setSpeed}
              />
              <SelectControl
                label={__("Effect", "gutenberg-slider")}
                value={effect}
                onChange={this.setEffect}
                options={effectOptions}
              />
              <SelectControl
                label={__("Link To")}
                value={linkTo}
                onChange={this.setLinkTo}
                options={linkOptions}
              />
              <ToggleControl
                label={__("Show/Hide Slider Arrows")}
                checked={!!arrows}
                onChange={this.setArrows}
              />
            </div>
          </PanelBody>
        </InspectorControls>
        <WPBricksAdvanceCss {...this.props} />
        {noticeUI}

        {dropZone}
        <ul
          className={`${className} ${
            imageCrop ? "is-cropped" : ""
          } edit-slider wpbricks-slider ${BRICKS}`}
        >
          <Slider {...settings}>
            {images.map((img, index) => {
              /* translators: %1$d is the order number of the image, %2$d is the total number of images. */
              const ariaLabel = __(
                sprintf(
                  "image %1$d of %2$d in slider",
                  index + 1,
                  images.length
                )
              );

              return (
                <li className="blocks-gallery-item" key={img.id || img.url}>
                  <SliderImage
                    url={img.url}
                    alt={img.alt}
                    id={img.id}
                    isSelected={
                      isSelected && this.state.selectedImage === index
                    }
                    onRemove={this.onRemoveImage(index)}
                    onSelect={this.onSelectImage(index)}
                    setAttributes={attrs =>
                      this.setImageAttributes(index, attrs)
                    }
                    caption={img.caption}
                    aria-label={ariaLabel}
                    onLoad={() => window.dispatchEvent(new Event("resize"))}
                  />
                </li>
              );
            })}
          </Slider>
          <style>{slider_gencss}</style>
        </ul>
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
      </Fragment>
    );
  }
}

export default withNotices(SliderEdit);
