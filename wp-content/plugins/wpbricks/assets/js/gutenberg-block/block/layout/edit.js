/**
 * BLOCK: rightSideBar Row / Layout
 */

/**
 * Import External
 */
import times from "lodash/times";
import classnames from "classnames";
import memoize from "memize";

import { WPBricksAdvanceCss } from "../common-components/bricks-advancecss";

const { Component, Fragment } = wp.element;
const { InnerBlocks, InspectorControls } = wp.blockEditor;
const { PanelBody } = wp.components;

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;

const ALLOWED_BLOCKS = ["bricks/right-side-bar-column"];

/**
 * Returns the layouts configuration for a given number of columns.
 *
 * @param {number} columns Number of columns.
 *
 * @return {Object[]} Columns layout configuration.
 */
const rightSideBarGetColumnsTemplate = memoize(columns => {
  return times(columns, n => ["bricks/right-side-bar-column", { id: n + 1 }]);
});

const SidebarLayoutIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 469.333 469.333"
    width="60px"
    height="60px"
  >
    <g>
      <g>
        <path
          d="M458.667,0h-448C4.771,0,0,4.771,0,10.667v448c0,5.896,4.771,10.667,10.667,10.667h448    c5.896,0,10.667-4.771,10.667-10.667v-448C469.333,4.771,464.563,0,458.667,0z M149.333,448h-128V21.333h128V448z M448,448    H170.667V21.333H448V448z"
          fill="#393e45"
        />
      </g>
    </g>
  </svg>
);

/**
 * Build the row edit
 */
class rightSideBarRowLayout extends Component {
  render() {
    const {
      attributes: {
        columns,
        customClass,
        layoutType,
        customCssText,
        deviceMobileManager,
        deviceTabletManager,
        BRICKS,
        bricks_style
      },
      className,
      setAttributes,
      clientId
    } = this.props;
    const classes = classnames(
      className,
      `md-has-${columns}-columns`,
      layoutType && `has-${layoutType}-layout`
    );
    const onSelectLayoutType = event => {
      const selectedLayout = event.currentTarget.id;
      setAttributes({ layoutType: selectedLayout ? selectedLayout : "" });
    };

    /* Unique ID generate */

    setAttributes({
      BRICKS:
        "bricks-blocks-" + clientId.split("-")[clientId.split("-").length - 1]
    });

    /* Style var generate */

    let layout_custom_css = customCssText ? customCssText : "";

    let mobileHide = deviceMobileManager
      ? "@media only screen and (max-width: 767px){.wpbricks-wrap-layout ." +
        BRICKS +
        "{display:none !important}}"
      : "";

    let tabHide = deviceTabletManager
      ? "@media only screen and ( min-width: 768px) and ( max-width: 1024px){.wpbricks-wrap-layout ." +
        BRICKS +
        "{display:none !important}}"
      : "";

    /* Style generate */

    let layout_gencss =
      layout_custom_css.replace("{BRICKS}", "." + BRICKS) +
      mobileHide +
      tabHide;

    /* Set Font and Style in attributes */

    setAttributes({ bricks_style: layout_gencss });

    return [
      <Fragment key={`ics-${clientId}`}>
        <InspectorControls>
          <Fragment>
            <PanelBody
              title={__("Sidebar layout settings ")}
              initialOpen={true}
            >
              <div className="sidebarSelectorWrapper">
                <div
                  className={
                    "left" === layoutType
                      ? "sidebarSelector active"
                      : "sidebarSelector"
                  }
                  onClick={onSelectLayoutType}
                  id="left"
                >
                  {SidebarLayoutIcon}
                  <p>Left sidebar</p>
                </div>
                <div
                  className={
                    "right" === layoutType
                      ? "sidebarSelector active"
                      : "sidebarSelector"
                  }
                  onClick={onSelectLayoutType}
                  id="right"
                >
                  {SidebarLayoutIcon}
                  <p>Right sidebar</p>
                </div>
              </div>
            </PanelBody>
          </Fragment>
        </InspectorControls>
        <WPBricksAdvanceCss {...this.props} />
      </Fragment>,
      <Fragment key={clientId}>
        <style> {layout_gencss} </style>
        <div className={"wpbricks wpbricks-wrap-layout " + classes}>
          <div
            className={"innerblocks-wrap " + BRICKS}
            style={{ minHeight: "0" }}
          >
            <InnerBlocks
              template={rightSideBarGetColumnsTemplate(2)}
              templateLock="all"
              allowedBlocks={ALLOWED_BLOCKS}
            />
            <div style={{ height: "1px" }}></div>
          </div>
        </div>
      </Fragment>
    ];
  }
}
export default rightSideBarRowLayout;
