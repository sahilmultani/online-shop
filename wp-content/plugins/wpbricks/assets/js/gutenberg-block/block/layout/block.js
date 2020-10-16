import rightSideBarEdit from "./edit";
import rightSideBarSave from "./save";
import { Layout } from "../icons";
import { AdvancedAttr } from "../common-components/bricks-advancecss";
(function(wpI18n, wpBlocks, wpEditor) {
  const { __ } = wpI18n;
  const { registerBlockType } = wpBlocks;
  const { InnerBlocks } = wpEditor;
  const Attr = {
    customClass: {
      type: "string",
      default: ""
    },
    uniqueID: {
      type: "string",
      default: ""
    },
    columns: {
      type: "number",
      default: 2
    },
    layoutType: {
      type: "string",
      default: "right"
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
  /**
   * Register: Sidebar Layout Block.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/
   * @param  {string}   name     Block name.
   * @param  {Object}   settings Block settings.
   * @return {?WPBlock}          The block, if it has been successfully
   *                             registered; otherwise `undefined`.
   */
  registerBlockType("bricks/right-side-bar-rowlayout", {
    title: __("Bricks Layout"), // Block title.
    icon: Layout,
    description: __(
      "Bricks Layout is a gutenberg block which is used to create a column layout."
    ),
    category: "bricksblocks",
    keywords: [__("layout"), __("gutenberg"), __("Bricks")],
    supports: {
      anchor: true
    },
    attributes: attrObj,

    edit: rightSideBarEdit,

    save: rightSideBarSave
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
  registerBlockType("bricks/right-side-bar-column", {
    title: __("Right sidebar Column"),
    icon: "lock",
    category: "common",
    parent: ["bricks/right-side-bar-rowlayout"],
    attributes: {
      id: {
        type: "number",
        default: 1
      }
    },
    edit: props => {
      const {
        attributes: { id },
        className,
        clientId
      } = props;
      return (
        <div
          className={`col-sm inner-column-${id} col-sm-${
            1 === id ? 9 : 3
          } ${className}`}
          key={clientId}
        >
          <InnerBlocks templateLock={false} />
        </div>
      );
    },

    save({ attributes, clientId }) {
      const { id } = attributes;
      return (
        <div
          className={`col-sm inner-column-${id} col-sm-${1 === id ? 9 : 3}`}
          key={clientId}
        >
          <InnerBlocks.Content />
        </div>
      );
    }
  });
})(wp.i18n, wp.blocks, wp.blockEditor);
