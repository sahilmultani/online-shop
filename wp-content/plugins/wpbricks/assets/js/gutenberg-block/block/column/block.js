import classnames from "classnames";
import times from "lodash/times";
import memoize from "memize";
import { Column } from "../icons";

import {
  AdvancedAttr,
  WPBricksAdvanceCss
} from "../common-components/bricks-advancecss";

(function(i18n, blocks, element, editor, components) {
  const { __ } = i18n;
  const { registerBlockType } = blocks;
  const { Fragment } = element;
  const { InspectorControls, InnerBlocks } = editor;
  const { PanelBody, TextControl, SelectControl } = components;

  /**
   * Register: Variable Columns Block.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/
   * @param  {string}   name     Block name.
   * @param  {Object}   settings Block settings.
   * @return {?WPBlock}          The block, if it has been successfully
   *                             registered; otherwise `undefined`.
   */

  const Attr = {
    columns: {
      type: "number",
      default: 2
    },
    width: {
      type: "string",
      default: 50
    },
    marginRight: {
      type: "string",
      default: 10
    },
    alignColumns: {
      type: "string",
      default: ""
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
  let attrObj = Object.assign(Attr, AdvancedAttr);

  registerBlockType("bricks/bricks-columns", {
    title: __("Bricks Columns"),
    icon: Column,
    description: __(
      "Bricks Columns is a gutenberg block used to create a column grid layout."
    ),
    category: "bricksblocks",
    keywords: [__("column"), __("gutenberg"), __("Bricks")],
    supports: {
      anchor: true
    },
    attributes: attrObj,

    edit(props) {
      const {
        attributes: {
          columns,
          width,
          marginRight,
          BRICKS,
          alignColumns,
          customCssText,
          deviceMobileManager,
          deviceTabletManager,
          bricks_style
        },
        className,
        setAttributes,
        clientId
      } = props;

      setAttributes({
        BRICKS:
          "bricks-blocks-" + clientId.split("-")[clientId.split("-").length - 1]
      });

      const classes = classnames(className, `md-has-${columns}-columns`);

      const ALLOWED_BLOCKS = ["bricks/columns-inner"];

      const rightSideBarGetColumnsTemplate = memoize(columns => {
        return times(columns, n => ["bricks/columns-inner", { id: n + 1 }]);
      });

      let widthStyle = width ? "flex-basis:" + width + "%;" : "";
      let marginRightStyle = marginRight
        ? "margin-right:" + marginRight + "px;"
        : "";

      let alignColumnsStyle = alignColumns ? "align-items:" + alignColumns : "";

      let mobileHide = deviceMobileManager
        ? "@media only screen and (max-width: 767px){.wpbricks-wrap-column ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      let tabHide = deviceTabletManager
        ? "@media only screen and ( min-width: 768px) and ( max-width: 1024px){.wpbricks-wrap-column ." +
          BRICKS +
          "{display:none !important}}"
        : "";

      let widhtcss =
        width &&
        "." +
          BRICKS +
          ".md-has-" +
          columns +
          "-columns.innerblocks-wrap > div.md-column-inner-child:first-child{ " +
          widthStyle +
          marginRightStyle +
          "-webkit-flex-grow: 0; -webkit-flex-shrink: 0; flex-grow: 0; flex-shrink: 0;}" +
          "." +
          BRICKS +
          ".md-has-" +
          columns +
          "-columns.innerblocks-wrap > .editor-inner-blocks > .editor-block-list__layout > div:first-child{ " +
          widthStyle +
          marginRightStyle +
          "-webkit-flex-grow: 0; -webkit-flex-shrink: 0; flex-grow: 0; flex-shrink: 0;}";

      let columnscss =
        columns &&
        "." +
          BRICKS +
          ".md-has-" +
          columns +
          "-columns .md-columns { margin: 0 -15px; width: auto;}";

      let alignColumnscss =
        alignColumns &&
        "." +
          BRICKS +
          ".md-has-" +
          columns +
          "-columns.innerblocks-wrap{ " +
          alignColumnsStyle +
          "}";

      let customCss = customCssText ? customCssText : "";

      let column_gencss =
        ".wpbricks-inner-wrap.innerblocks-wrap{min-height: 0}" +
        widhtcss +
        columnscss +
        alignColumnscss +
        mobileHide +
        tabHide +
        customCss.replace("{BRICKS}", "." + BRICKS);

      setAttributes({ bricks_style: column_gencss });

      return [
        <InspectorControls key={"ic-col-" + clientId}>
          <div className="bricks-clear-none" key={"ic-col-" + clientId}>
            <Fragment key={"ic-col-" + clientId}>
              <PanelBody title={__("Column Settings ")} initialOpen={true}>
                <div className="md-column-setting">
                  <TextControl
                    label="First Column Width(%)"
                    type="number"
                    placeholder="Width (%)"
                    value={width}
                    min="5"
                    max="95"
                    step="1"
                    onChange={value => setAttributes({ width: value })}
                  />
                  <TextControl
                    label="Space between Columns(px)"
                    type="number"
                    placeholder="Column Space(px)"
                    value={marginRight}
                    min="1"
                    max="500"
                    step="1"
                    onChange={value => setAttributes({ marginRight: value })}
                  />
                  <SelectControl
                    label={__("Select Column Alignment")}
                    value={alignColumns}
                    options={[
                      { label: __("Stretch"), value: "stretch" },
                      { label: __("Center"), value: "center" },
                      { label: __("Flex-Start"), value: "flex-start" },
                      { label: __("Flex-End"), value: "flex-end" },
                      { label: __("Baseline"), value: "baseline" },
                      { label: __("Initial"), value: "initial" },
                      { label: __("Inherit"), value: "inherit" }
                    ]}
                    onChange={value => setAttributes({ alignColumns: value })}
                  />
                </div>
              </PanelBody>
            </Fragment>
          </div>
        </InspectorControls>,
        <WPBricksAdvanceCss {...props}  key={"ic-wac-" + clientId}/>,
        <Fragment key={clientId}>
          <style>{column_gencss}</style>
          <div className="wpbricks wpbricks-wrap-column">
            <div
              className={
                BRICKS + " " + classes + " wpbricks-inner-wrap innerblocks-wrap"
              }
              key={clientId}
            >
              <InnerBlocks
                template={rightSideBarGetColumnsTemplate(2)}
                templateLock="all"
                allowedBlocks={ALLOWED_BLOCKS}
                key={clientId}
              />
            </div>
          </div>
        </Fragment>
      ];
    },
    save(props) {
      const {
        attributes: { columns, BRICKS },
        className,
        clientId
      } = props;
      const classes = classnames(className, `md-has-${columns}-columns`);
      return (
        <div className="wpbricks wpbricks-wrap-column" key={clientId}>
          <div
            className={
              BRICKS + " " + classes + " wpbricks-inner-wrap innerblocks-wrap"
            }
            key={clientId}
          >
            <InnerBlocks.Content />
          </div>
        </div>
      );
    }
  });

  /**
   * Register: a Right sidebar Column Block.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/
   * @param  {string}   name     Block name.
   * @param  {Object}   settings Block settings.
   * @return {?WPBlock}          The block, if it has been successfully
   *                             registered; otherwise `undefined`.
   */

  registerBlockType("bricks/columns-inner", {
    title: __("Bricks - Column"),
    icon: "megaphone",
    category: "common",
    parent: ["bricks/columns"],
    attributes: {
      id: {
        type: "number",
        default: 1
      }
    },
    edit(props) {
      const {
        attributes: { id },
        clientId,
        className
      } = props;

      return [
        <div
          key={clientId}
          className={`md-column-inner-child col-sm inner-column-${id} col-sm-${
            1 === id ? 9 : 3
          } ${className}`}
        >
          <InnerBlocks templateLock={false} key={clientId} />
        </div>
      ];
    },

    save(props) {
      const {
        attributes: { id },
        clientId
      } = props;
      return (
        <div
          className={`md-column-inner-child col-sm inner-column-${id} col-sm-${
            1 === id ? 9 : 3
          }`}
          key={clientId}
        >
          <InnerBlocks.Content key={clientId} />
        </div>
      );
    }
  });
})(
  window.wp.i18n,
  window.wp.blocks,
  window.wp.element,
  window.wp.blockEditor,
  window.wp.components
);
