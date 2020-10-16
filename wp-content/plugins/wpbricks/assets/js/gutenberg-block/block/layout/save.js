/**
 * BLOCK: rightSideBar Row / Layout
 */

import classnames from "classnames";
const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;

class rightSideBarRowRowLayoutSave extends Component {
  render() {
    const {
      attributes: { columns, customClass, layoutType, BRICKS }
    } = this.props;
    const innerColumnClasses = classnames(
      `row md-has-${columns}-columns`,
      layoutType && `has-${layoutType}-layout`
    );
    const classes = classnames(`${customClass}`);
    return (
      <div className={"wpbricks wpbricks-wrap-layout " + classes}>
        <div className={BRICKS + " " + innerColumnClasses}>
          <InnerBlocks.Content />
        </div>
      </div>
    );
  }
}
export default rightSideBarRowRowLayoutSave;
