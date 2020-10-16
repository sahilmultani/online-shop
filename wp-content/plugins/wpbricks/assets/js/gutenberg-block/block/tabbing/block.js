import { default as edit } from "./edit";
import { Tabs } from "../icons";
import { AdvancedAttr } from "../common-components/bricks-advancecss";

(function(wpI18n, wpBlocks, wpEditor, wpComponents, wpElement) {
  const { __ } = wpI18n;
  const { registerBlockType } = wpBlocks;
  const { RichText, InnerBlocks } = wpEditor;

  const Attr = {
    tabItems: {
      type: "array",
      default: [
        {
          header: __("Tab 1"),
          body: __(
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          )
        },
        {
          header: __("Tab 2"),
          body: __(
            "This has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
          )
        }
      ]
    },
    blockID: {
      type: "string"
    },
    activeTab: {
      type: "number",
      default: 1
    },
    titleBgColor: {
      type: "string",
      default: "#fff"
    },
    titleTextColor: {
      type: "string",
      default: "#345F90"
    },
    contentBgColor: {
      type: "string"
    },
    contentTextColor: {
      type: "string"
    },
    borderStyle: {
      type: "string",
      default: "solid"
    },
    borderWidth: {
      type: "number",
      default: 1
    },
    borderColor: {
      type: "string"
    },
    borderRadius: {
      type: "number",
      default: 1
    },
    activeBgColor: {
      type: "string",
      default: "#345F90"
    },
    activeTextColor: {
      type: "string",
      default: "#fff"
    },
    titleTopGap: {
      type: "string",
      default: "10"
    },
    titleRightGap: {
      type: "string",
      default: "10"
    },
    titleBottomGap: {
      type: "string",
      default: "10"
    },
    titleLeftGap: {
      type: "string",
      default: "10"
    },
    contentTopGap: {
      type: "string",
      default: "10"
    },
    contentRightGap: {
      type: "string",
      default: "10"
    },
    contentBottomGap: {
      type: "string",
      default: "10"
    },
    contentLeftGap: {
      type: "string",
      default: "10"
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

  /* Parent Tab Block */
  registerBlockType("bricks/bricks-tabs", {
    title: __("Bricks Tab"),
    icon: Tabs,
    description: __(
      "Bricks Tab is a gutenberg block where you can add content in tabbing."
    ),
    category: "bricksblocks",
    keywords: [__("Tab"), __("gutenberg"), __("Bricks")],
    attributes: attrObj,

    edit,

    save: function({ attributes, className }) {
      const { blockID, tabItems, BRICKS } = attributes;

      return (
        <div className={"wpbricks wpbricks-wrap-tab " + className}>
          <div
            id={`bricks-tabs-${blockID}`}
            className={"bricks-tabs " + BRICKS}
            style={{ border: "none" }}
          >
            <ul className={"bricks-tab-lists"}>
              {tabItems.map((item, index) => (
                <li key={index} className="bricks-tab">
                  <a href={`#bricks-tab-${blockID}-${index}`}>
                    <RichText.Content value={item.header} />
                  </a>
                </li>
              ))}
            </ul>
            {tabItems.map((item, index) => (
              <div
                key={index}
                id={`bricks-tab-${blockID}-${index}`}
                className="bricks-tab-body"
              >
                <RichText.Content tagName="p" value={item.body} />
              </div>
            ))}
          </div>
        </div>
      );
    }
  });
})(wp.i18n, wp.blocks, wp.blockEditor, wp.components);
