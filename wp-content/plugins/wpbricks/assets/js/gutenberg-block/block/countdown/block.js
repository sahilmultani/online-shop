import { CountDown } from "../icons";

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

const Attr = {
  content: {
    type: "string"
  },
  Activetype: {
    type: "string",
    default: "Numbers_only"
  },
  NumFontSize: {
    type: "number",
    default: 25
  },
  NumTextColor: {
    type: "string",
    default: "#333"
  },
  BackgroundColor: {
    type: "string"
  },
  WRBackgroundColor: {
    type: "string"
  },
  RadiusAll: {
    type: "number",
    default: 0
  },
  WRpaddingLF: {
    type: "number",
    default: 0
  },
  WRpaddingTB: {
    type: "number",
    default: 0
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

(function(wpI18n, wpBlocks, wpEditor, wpComponents, wpElement) {
  const { __ } = wp.i18n;
  const { registerBlockType } = wp.blocks;
  const { InspectorControls, ColorPalette } = wp.blockEditor;
  const { Fragment } = wp.element;
  const { PanelBody, PanelRow, DateTimePicker, RangeControl } = wp.components;

  registerBlockType("bricks/bricks-countdown", {
    title: __("Bricks Countdown"),
    icon: CountDown,
    description: __(
      "Bricks Countdown is a gutenberg block used to display the count down to any special event."
    ),
    category: "bricksblocks",
    keywords: [__("Countdown"), __("gutenberg"), __("Bricks")],
    attributes: attrObj,

    edit: props => {
      const {
        clientId,
        attributes: {
          content,
          FontSize,
          NumFontSize,
          NumTextColor,
          FontColor,
          BackgroundColor,
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          RadiusAll,
          WRBackgroundColor,
          WRpaddingLF,
          WRpaddingTB,
          fontFamily,
          customCssText,
          deviceMobileManager,
          deviceTabletManager,
          FontWeight,
          LetterSpacing,
          TextAlign,
          LineHeight,
          TextUppercase,
          BRICKS,
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
      let fontFamilyStyle = fontFamily
        ? "font-family :" + fontFamily + ";"
        : "";
      let FontWeightStyle = FontWeight
        ? "font-weight :" + FontWeight + "px;"
        : "";
      let LetterSpacingStyle = LetterSpacing
        ? "letter-spacing :" + LetterSpacing + "px;"
        : "";
      let TextAlignStyle = TextAlign ? "text-align :" + TextAlign + ";" : "";
      let LineHeightStyle = LineHeight
        ? "line-height :" + LineHeight + "px;"
        : "";

      let TextUppercaseStyle = TextUppercase
        ? "text-transform :" + TextUppercase + ";"
        : "";

      let NumFontSizeStyle = NumFontSize
        ? "font-size:" + NumFontSize + "px;"
        : "";

      let NumTextColorStyle = NumTextColor
        ? "color :" + NumTextColor + ";"
        : "";

      let BackgroundColorStyle = BackgroundColor
        ? "background-color :" + BackgroundColor + ";"
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

      let RadiusAllStyle = RadiusAll
        ? "border-radius:" + RadiusAll + "px;"
        : "";

      let WRBackgroundColorStyle = WRBackgroundColor
        ? "background-color:" + WRBackgroundColor + ";"
        : "";

      let WRpaddingLStyle = WRpaddingLF
        ? "padding-left:" + WRpaddingLF + "px;"
        : "";

      let WRpaddingRStyle = WRpaddingLF
        ? "padding-right:" + WRpaddingLF + "px;"
        : "";

      let WRpaddingTStyle = WRpaddingTB
        ? "padding-top:" + WRpaddingTB + "px;"
        : "";

      let WRpaddingBStyle = WRpaddingTB
        ? "padding-bottom:" + WRpaddingTB + "px;"
        : "";

      let mobileHide = deviceMobileManager
        ? "@media only screen and (max-width: 767px){.wpbricks-wrap-countdown ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      let tabHide = deviceTabletManager
        ? "@media only screen and ( min-width: 768px) and ( max-width: 1024px){.wpbricks-wrap-countdown ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      const textstylesString =
        FontSizeStyle +
        FontColorStyle +
        fontFamilyStyle +
        FontWeightStyle +
        LetterSpacingStyle +
        TextAlignStyle +
        LineHeightStyle +
        TextUppercaseStyle;

      let numberstyleString =
        LineHeightStyle +
        NumFontSizeStyle +
        NumTextColorStyle +
        fontFamilyStyle;

      let wrapstylesString =
        TextAlignStyle +
        BackgroundColorStyle +
        marginTopStyle +
        marginBottomStyle +
        marginLeftStyle +
        marginRightStyle +
        paddingTopStyle +
        paddingBottomStyle +
        paddingLeftStyle +
        paddingRightStyle +
        RadiusAllStyle;

      let wraperstylesString =
        WRBackgroundColorStyle +
        WRpaddingLStyle +
        WRpaddingRStyle +
        WRpaddingTStyle +
        WRpaddingBStyle;

      /* Style generate */

      let countdowncss =
        "." +
        BRICKS +
        "{" +
        wraperstylesString +
        "}" +
        "." +
        BRICKS +
        " .tick_wrap{" +
        wrapstylesString +
        "}" +
        "." +
        BRICKS +
        " .tick_wrap .countdown_number{" +
        numberstyleString +
        "}" +
        "." +
        BRICKS +
        " .tick_wrap .countdown_text{" +
        textstylesString +
        "}" +
        mobileHide +
        tabHide +
        customCssText.replace("{BRICKS}", "." + BRICKS);

      /* Font import css countdown*/

      let countdown_fonts;
      if (fontFamily) {
        countdown_fonts =
          '@import url("https://fonts.googleapis.com/css?family=' +
          fontFamily +
          '");';
      }

      /* Set Font and Style in attributes */

      setAttributes({ bricks_fonts: countdown_fonts });
      setAttributes({ bricks_style: countdowncss });

      function countDown(value) {
        setAttributes({ content: value });
        let currentHtml = $('#brick_timer[data-enddate="' + value + '"]');
        let brickTimers = currentHtml.brickTimers;
        let currentSelector = currentHtml.selector;

        window.clearInterval(brickTimers);
        let endDate = new Date(value);

        brickTimers = setInterval(function() {
          timeBetweenDates(endDate);
        }, 1000);

        function timeBetweenDates(toDate) {
          let dateEntered = toDate;
          let now = new Date();
          let difference = dateEntered.getTime() - now.getTime();
          if (0 >= difference) {
            clearInterval(brickTimers);
          } else {
            let seconds = Math.floor(difference / 1000);
            let minutes = Math.floor(seconds / 60);
            let hours = Math.floor(minutes / 60);
            let days = Math.floor(hours / 24);

            hours %= 24;
            minutes %= 60;
            seconds %= 60;

            $(currentSelector)
              .find("#days")
              .text(days);
            $(currentSelector)
              .find("#hours")
              .text(hours);
            $(currentSelector)
              .find("#minutes")
              .text(minutes);
            $(currentSelector)
              .find("#seconds")
              .text(seconds);
          }
        }
      }

      return [
        <Fragment key={`ct-${clientId}`}>
          <InspectorControls key={`ct-insp-${clientId}`}>
            <div className="bricks-clear-none">
              <PanelBody title={__("Select Date")} initialOpen={true}>
                <PanelRow>
                  <DateTimePicker currentDate={content} onChange={countDown} />
                </PanelRow>
              </PanelBody>
              <PanelBody title={__("Countdown Settings")} initialOpen={false}>
                <RangeControl
                  label={__("Number Font Size")}
                  title={__("Select Number Size")}
                  value={NumFontSize}
                  min="14"
                  max="150"
                  onChange={value => setAttributes({ NumFontSize: value })}
                />
                <div>Number color</div>
                <br />
                <ColorPalette
                  label={__("Number color")}
                  onChange={value => setAttributes({ NumTextColor: value })}
                  disableAlpha
                />
                <div>Background color</div>
                <br />
                <ColorPalette
                  label={__("Background color")}
                  onChange={value => setAttributes({ BackgroundColor: value })}
                  disableAlpha
                />
                <RangeControl
                  label={__("Radius")}
                  title={__("Radius")}
                  value={RadiusAll}
                  min="5"
                  max="50"
                  onChange={value => setAttributes({ RadiusAll: value })}
                />
              </PanelBody>
              <PanelBody title={__("Wrapper Settings")} initialOpen={false}>
                <div>Wrapper Background color</div>
                <br />
                <ColorPalette
                  label={__("Wrapper Background color")}
                  onChange={value =>
                    setAttributes({ WRBackgroundColor: value })
                  }
                  disableAlpha
                />
                <RangeControl
                  label={__("Padding Left & Right")}
                  title={__("Padding")}
                  value={WRpaddingLF}
                  min="5"
                  max="150"
                  onChange={value => setAttributes({ WRpaddingLF: value })}
                />
                <RangeControl
                  label={__("Padding Top & Bottom")}
                  title={__("Padding")}
                  value={WRpaddingTB}
                  min="5"
                  max="150"
                  onChange={value => setAttributes({ WRpaddingTB: value })}
                />
              </PanelBody>
              <PanelBody title="Typography" initialOpen={false}>
                <WPBricksFonts {...props} />
              </PanelBody>
              <PanelBody title="Spacing" initialOpen={false}>
                <WPBricksSpacing {...props} />
              </PanelBody>
            </div>
          </InspectorControls>
          <WPBricksAdvanceCss {...props} key={`ct-wbac-${clientId}`}/>
          <style>
            {countdown_fonts}
            {countdowncss}
          </style>
          <div className="wpbricks wpbricks-wrap-countdown" key={`ct-div-ct-${clientId}`}>
            <div
              id="brick_timer"
              className={"wpbricks-counter-loop " + BRICKS + " " + className}
              data-enddate={content}
            >
              <div className="tick_wrap wpbricks-countdown-days">
                <span className="countdown_number" id="days">
                  0
                </span>
                <span className="countdown_text">Days</span>
              </div>
              <div className="tick_wrap wpbricks-countdown-hours">
                <span className="countdown_number" id="hours">
                  00
                </span>
                <span className="countdown_text">Hours</span>
              </div>
              <div className="tick_wrap wpbricks-countdown-minutes">
                <span className="countdown_number" id="minutes">
                  00
                </span>
                <span className="countdown_text">Minutes</span>
              </div>
              <div className="tick_wrap wpbricks-countdown-seconds">
                <span className="countdown_number" id="seconds">
                  00
                </span>
                <span className="countdown_text">Seconds</span>
              </div>
            </div>
          </div>
        </Fragment>
      ];
    },

    save: props => {
      const {
        attributes: { content, BRICKS },
        className
      } = props;

      return (
        <div className="wpbricks wpbricks-wrap-countdown">
          <div
            id="brick_timer"
            className={"wpbricks-counter-loop " + BRICKS + " " + className}
            data-enddate={content}
          >
            <div className="tick_wrap wpbricks-countdown-days">
              <span className="countdown_number" id="days">
                0
              </span>
              <span className="countdown_text">Days</span>
            </div>
            <div className="tick_wrap wpbricks-countdown-hours">
              <span className="countdown_number" id="hours">
                00
              </span>
              <span className="countdown_text">Hours</span>
            </div>
            <div className="tick_wrap wpbricks-countdown-minutes">
              <span className="countdown_number" id="minutes">
                00
              </span>
              <span className="countdown_text">Minutes</span>
            </div>
            <div className="tick_wrap wpbricks-countdown-seconds">
              <span className="countdown_number" id="seconds">
                00
              </span>
              <span className="countdown_text">Seconds</span>
            </div>
          </div>
        </div>
      );
    }
  });
})(wp.i18n, wp.blocks, wp.blockEditor, wp.components);
