import classnames from "classnames";
import { SocialShare } from "../icons";

import {
  SpaceAttr,
  WPBricksSpacing
} from "../common-components/bricks-spacing";

import {
  AdvancedAttr,
  WPBricksAdvanceCss
} from "../common-components/bricks-advancecss";

(function(wpI18n, wpBlocks, wpEditor, wpComponents, wpElement) {
  const {
    PanelBody,
    TextControl,
    SelectControl,
    RadioControl,
    Placeholder,
    PanelRow,
    RangeControl
  } = wpComponents;
  const { Fragment } = wpElement;
  const { __ } = wpI18n;
  const { registerBlockType } = wpBlocks;
  const { BlockControls, InspectorControls, AlignmentToolbar } = wpEditor;

  const Attr = {
    buttonWidth: {
      type: "string"
    },
    buttonHeight: {
      type: "string"
    },
    SelectShape: {
      type: "number",
      default: 0
    },
    listAligment: {
      type: "string",
      default: "center"
    },
    title: {
      type: "array",
      source: "children",
      selector: "p"
    },
    contentAlign: {
      type: "string",
      default: "center"
    },
    currentPagePermalink: {
      type: "string"
    },
    selectedSociaMedialLinks: {
      type: "array",
      default: []
    },
    selectedButtonStyle: {
      type: "string",
      default: "multibgcolor"
    },
    selectedButtonTextOrIcon: {
      type: "string",
      default: "bothtexticon"
    },
    showButtonIcon: {
      type: "boolean",
      default: true
    },
    showButtonText: {
      type: "boolean",
      default: true
    },
    facebook: {
      type: "boolean",
      default: false
    },
    twitter: {
      type: "boolean",
      default: false
    },
    googleplus: {
      type: "boolean",
      default: false
    },
    linkedin: {
      type: "boolean",
      default: false
    },
    pinterest: {
      type: "boolean",
      default: false
    },
    reddit: {
      type: "boolean",
      default: false
    },
    email: {
      type: "boolean",
      default: false
    },
    gmail: {
      type: "boolean",
      default: false
    },
    yahoo: {
      type: "boolean",
      default: false
    },
    print: {
      type: "boolean",
      default: false
    },
    socialMediaLists: {
      type: "array",
      default: [
        {
          name: "Facebook",
          link: "https://www.facebook.com/sharer.php?u=urlToShare",
          icon: "fab fa-facebook-f"
        },
        {
          name: "Twitter",
          link: "https://twitter.com/intent/tweet?url=urlToShare",
          icon: "fab fa-twitter"
        },
        {
          name: "GooglePlus",
          link: "https://plus.google.com/share?url=urlToShare",
          icon: "fab fa-google-plus-g"
        },
        {
          name: "Linkedin",
          link: "https://www.linkedin.com/shareArticle?url=urlToShare",
          icon: "fab fa-linkedin-in"
        },
        {
          name: "Pinterest",
          link: "http://pinterest.com/pin/create/button/?url=urlToShare",
          icon: "fab fa-pinterest-p"
        },
        {
          name: "Reddit",
          link: "https://reddit.com/submit?url=urlToShare",
          icon: "fab fa-reddit-alien"
        },
        {
          name: "Email",
          link: "mailto:?body=urlToShare",
          icon: "fas fa-envelope"
        },
        {
          name: "Gmail",
          link: "https://mail.google.com/mail/?view=cm&body=urlToShare",
          icon: "fas fa-envelope-square"
        },
        {
          name: "Yahoo",
          link: "http://compose.mail.yahoo.com/?body=urlToShare",
          icon: "fab fa-yahoo"
        },
        {
          name: "Print",
          link: "window.print()",
          icon: "fas fa-print"
        }
      ]
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

  registerBlockType("bricks/bricks-social", {
    title: __("Bricks Social"),
    icon: SocialShare,
    description: __(
      "Bricks Social is a gutenberg block where you can add social media list."
    ),
    category: "bricksblocks",
    keywords: [__("Social"), __("gutenberg"), __("Bricks")],
    attributes: attrObj,

    edit: props => {
      const {
        clientId,
        attributes: {
          contentAlign,
          currentPagePermalink,
          selectedSociaMedialLinks,
          selectedButtonTextOrIcon,
          showButtonIcon,
          showButtonText,
          socialMediaLists,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
          SelectShape,
          buttonWidth,
          buttonHeight,
          selectedButtonStyle,
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

      let social_media_padding_top = paddingTop
        ? "padding-top:" + paddingTop + "px;"
        : "";
      let social_media_padding_bottom = paddingBottom
        ? "padding-bottom:" + paddingBottom + "px;"
        : "";
      let social_media_padding_left = paddingLeft
        ? "padding-left:" + paddingLeft + "px;"
        : "";
      let social_media_padding_right = paddingRight
        ? "padding-right:" + paddingRight + "px;"
        : "";
      let social_media_margin_top = marginTop
        ? "margin-top:" + marginTop + "px;"
        : "";
      let social_media_margin_bottom = marginBottom
        ? "margin-bottom:" + marginBottom + "px;"
        : "";
      let social_media_margin_left = marginLeft
        ? "margin-left:" + marginLeft + "px;"
        : "";
      let social_media_margin_right = marginRight
        ? "margin-right:" + marginRight + "px;"
        : "";
      let social_media_border_radius = SelectShape
        ? "border-radius:" + SelectShape + "px;"
        : "";
      let social_media_button_width = buttonWidth
        ? "width:" + buttonWidth + "px;"
        : "";
      let social_media_button_height = buttonHeight
        ? "height:" + buttonHeight + "px;"
        : "";
      let social_media_content_align = contentAlign
        ? "text-align:" + contentAlign + ";"
        : "";

      let mobileHide = deviceMobileManager
        ? "@media only screen and (max-width: 767px){.wpbricks-wrap-social ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      let tabHide = deviceTabletManager
        ? "@media only screen and ( min-width: 768px) and ( max-width: 1024px){.wpbricks-wrap-social ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      /* Style generate */

      let social_gencss =
        ".wpbricks.wpbricks-wrap-social{" +
        social_media_content_align +
        "}" +
        "." +
        BRICKS +
        " button{" +
        social_media_padding_top +
        social_media_padding_bottom +
        social_media_padding_left +
        social_media_padding_right +
        social_media_margin_top +
        social_media_margin_bottom +
        social_media_margin_left +
        social_media_margin_right +
        social_media_border_radius +
        social_media_button_width +
        social_media_button_height +
        "}" +
        mobileHide +
        tabHide +
        customCssText.replace("{BRICKS}", "." + BRICKS);

      /* Set Font and Style in attributes */

      setAttributes({ bricks_style: social_gencss });

      const getPerPageLink = () =>
        setAttributes({
          currentPagePermalink: wp.data.select("core/editor").getPermalink()
        });
      getPerPageLink();
      const updateContentAlign = nextAlign =>
        setAttributes({ contentAlign: nextAlign });

      const updateSocialURL = selectedsingleSocialMedia => {
        const selectedSocialTitle = selectedsingleSocialMedia[0];

        const insertlMediaLists = selectedSociaMedialLinks.concat(
          selectedSocialTitle
        );

        const displaySocialMedias = {};
        displaySocialMedias[selectedSocialTitle] = true;
        displaySocialMedias.selectedSociaMedialLinks = insertlMediaLists;

        const hideSocialMedias = {};
        hideSocialMedias[selectedSocialTitle] = false;
        hideSocialMedias.selectedSociaMedialLinks = selectedSociaMedialLinks;

        if (selectedSociaMedialLinks.includes(selectedSocialTitle)) {
          selectedSociaMedialLinks.splice(
            selectedSociaMedialLinks.indexOf(selectedSocialTitle),
            1
          );
          setAttributes(hideSocialMedias);
        } else {
          setAttributes(displaySocialMedias);
        }
      };

      const classes = classnames(
        selectedButtonStyle,
        selectedButtonTextOrIcon,
        "bricks-sm"
      );

      const SocialShareButtons = ({ socialMediaLists }) => (
        <Fragment>
          {socialMediaLists.map(singleSocialMedia => (
            <Fragment key={singleSocialMedia.name}>
              {props.attributes[singleSocialMedia.name.toLowerCase()] && (
                <button
                  className={
                    classes +
                    " bricks-share-" +
                    singleSocialMedia.name.toLowerCase()
                  }
                  key={singleSocialMedia.name.toLowerCase()}
                  onClick={() => {
                    "Print" === singleSocialMedia.name
                      ? singleSocialMedia.link
                      : window.open(
                          singleSocialMedia.link.replace(
                            "urlToShare",
                            currentPagePermalink
                          ),
                          "_blank"
                        );
                  }}
                >
                  {showButtonIcon && <i className={singleSocialMedia.icon} />}
                  {showButtonText && <span>{singleSocialMedia.name}</span>}
                </button>
              )}
            </Fragment>
          ))}
        </Fragment>
      );

      const controls = (
        <Fragment>
          <BlockControls>
            <AlignmentToolbar
              value={contentAlign}
              onChange={updateContentAlign}
            />
          </BlockControls>

          <InspectorControls>
            <div className="bricks-clear-none">
              <PanelBody
                title={__("Social Share Channels")}
                className="medialist"
              >
                <SelectControl
                  multiple
                  value={selectedSociaMedialLinks}
                  onChange={updateSocialURL}
                  options={socialMediaLists.map(singleSocialMedia => {
                    const label = __(
                      socialMediaLists.indexOf(singleSocialMedia) +
                        1 +
                        ". " +
                        singleSocialMedia.name
                    );
                    const value = singleSocialMedia.name.toLowerCase();

                    return { label, value };
                  })}
                />
              </PanelBody>
              <PanelBody title="Select Button Style" initialOpen={false}>
                <PanelRow>
                  <RadioControl
                    selected={selectedButtonStyle}
                    options={[
                      {
                        label: "Multi Background Color",
                        value: "multibgcolor"
                      },
                      {
                        label: "Same Background Multi Color",
                        value: "samebgcolor"
                      },
                      { label: "No Color", value: "nobgcolor" }
                    ]}
                    onChange={selectedButtonStyle => {
                      setAttributes({ selectedButtonStyle });
                    }}
                  />
                </PanelRow>
              </PanelBody>
              <PanelBody title="Select Button Content" initialOpen={false}>
                <PanelRow>
                  <RadioControl
                    selected={selectedButtonTextOrIcon}
                    options={[
                      { label: "Both Text & Icon", value: "bothtexticon" },
                      { label: "Only Text", value: "onlytext" },
                      { label: "Only Icon", value: "onlyicon" }
                    ]}
                    onChange={selectedButtonTextOrIcon => {
                      setAttributes({ selectedButtonTextOrIcon });
                    }}
                  />
                </PanelRow>
              </PanelBody>
              <PanelBody title="Select Button Shape" initialOpen={false}>
                <PanelRow className="row-full">
                  <div className="component-full-width">
                    <RangeControl
                      label={__("Select Border Radius")}
                      value={SelectShape}
                      min="0"
                      max="50"
                      onChange={value => setAttributes({ SelectShape: value })}
                    />
                  </div>
                  <div className="padding-setting">
                    <div className="col-main-2">
                      <div
                        className="padd-top col-main-inner"
                        data-tooltip="Width"
                      >
                        <label>Width (If Needed) </label>
                        <TextControl
                          type="number"
                          value={buttonWidth}
                          onChange={value =>
                            setAttributes({ buttonWidth: value })
                          }
                        />
                      </div>
                      <div
                        className="padd-buttom col-main-inner"
                        data-tooltip="Height"
                      >
                        <label>Height (If Needed) </label>
                        <TextControl
                          type="number"
                          value={buttonHeight}
                          onChange={value =>
                            setAttributes({ buttonHeight: value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </PanelRow>
              </PanelBody>
              <PanelBody title="Spacing" initialOpen={false}>
                <WPBricksSpacing {...props} />
              </PanelBody>
            </div>
          </InspectorControls>
          <WPBricksAdvanceCss {...props} />
        </Fragment>
      );

      if (!selectedSociaMedialLinks.length) {
        return (
          <Fragment>
            {controls}
            <Placeholder
              icon="share"
              label="Use the Block Inspector section to Select the Share Buttons you want to add here."
            />
          </Fragment>
        );
      }

      return (
        <Fragment>
          <style>{social_gencss}</style>
          {controls}
          <div
            className={
              "bricksSocialList wpbricks wpbricks-wrap-social " +
              props.className
            }
          >
            <div className={BRICKS}>
              <SocialShareButtons socialMediaLists={socialMediaLists} />
            </div>
          </div>
        </Fragment>
      );
    },

    save: props => {
      const {
        attributes: {
          currentPagePermalink,
          showButtonIcon,
          showButtonText,
          socialMediaLists,
          selectedButtonStyle,
          selectedButtonTextOrIcon,
          BRICKS,
          className
        }
      } = props;

      const classes = classnames(
        selectedButtonStyle,
        selectedButtonTextOrIcon,
        "bricks-sm"
      );

      const SocialShareButtons = ({ socialMediaLists }) => (
        <Fragment>
          {socialMediaLists.map(singleSocialMedia => (
            <Fragment key={singleSocialMedia.name}>
              {props.attributes[singleSocialMedia.name.toLowerCase()] && (
                <button
                  className={
                    classes +
                    " bricks-share-" +
                    singleSocialMedia.name.toLowerCase()
                  }
                  key={singleSocialMedia.name.toLowerCase()}
                  onClick={
                    "Print" === singleSocialMedia.name
                      ? singleSocialMedia.link
                      : "window.open('" +
                        singleSocialMedia.link.replace(
                          "urlToShare",
                          currentPagePermalink
                        ) +
                        "', '_blank')"
                  }
                >
                  {showButtonIcon && <i className={singleSocialMedia.icon} />}
                  {showButtonText && <span>{singleSocialMedia.name}</span>}
                </button>
              )}
            </Fragment>
          ))}
        </Fragment>
      );

      return (
        <div
          className={
            "bricksSocialList wpbricks wpbricks-wrap-social " + className
          }
        >
          <div className={BRICKS}>
            <SocialShareButtons socialMediaLists={socialMediaLists} />
          </div>
        </div>
      );
    }
  });
})(wp.i18n, wp.blocks, wp.blockEditor, wp.components, wp.element);
