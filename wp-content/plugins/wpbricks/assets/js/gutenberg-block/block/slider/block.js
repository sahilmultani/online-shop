import { Slider } from "../icons";
// eslint-disable-next-line no-undef
const { filter, every, map, some } = lodash;
import { default as edit, pickRelevantMediaFiles } from "./edit";
import { AdvancedAttr } from "../common-components/bricks-advancecss";

(function(wpI18n, wpBlocks, wpEditor, wpBlob, wpComponents) {
  /**
   * WordPress dependencies
   */
  const { __, setLocaleData } = wpI18n;
  const { createBlock, registerBlockType } = wpBlocks;
  const { RichText, mediaUpload } = wpEditor;
  const { createBlobURL } = wpBlob;
  const { G, Path, SVG } = wpComponents;
  const Attr = {
    images: {
      type: "array",
      default: [],
      source: "query",
      selector: ".blocks-gallery-item",
      query: {
        url: {
          source: "attribute",
          selector: "img",
          attribute: "src"
        },
        link: {
          source: "attribute",
          selector: "img",
          attribute: "data-link"
        },
        alt: {
          source: "attribute",
          selector: "img",
          attribute: "alt",
          default: ""
        },
        id: {
          source: "attribute",
          selector: "img",
          attribute: "data-id"
        },
        caption: {
          type: "string",
          source: "html",
          selector: "figcaption"
        }
      }
    },
    ids: {
      type: "array",
      default: []
    },

    imageCrop: {
      type: "boolean",
      default: true
    },
    autoplay: {
      type: "boolean",
      default: true
    },
    speed: {
      type: "string",
      default: "300"
    },
    effect: {
      type: "string",
      default: "scroll"
    },
    linkTo: {
      type: "string",
      default: "none"
    },
    arrows: {
      type: "boolean",
      default: true
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
   * Internal dependencies
   */

  //setLocaleData( window.gutenberg_slider.localeData, 'gutenberg-slider' );

  const parseShortcodeIds = ids => {
    if (!ids) {
      return [];
    }

    return ids.split(",").map(id => parseInt(id, 10));
  };

  registerBlockType("bricks/slider", {
    title: __("Bricks Slider"),
    icon: Slider,
    description: __(
      "Bricks Separator is a gutenberg block which display multiple images in a slider."
    ),
    category: "bricksblocks",
    keywords: [__("images"), __("photos"), __("Bricks")],
    attributes: attrObj,

    transforms: {
      from: [
        {
          type: "block",
          isMultiBlock: true,
          blocks: ["core/image"],
          transform: attributes => {
            const validImages = filter(attributes, ({ id, url }) => id && url);
            if (0 < validImages.length) {
              return createBlock("bricks/slider", {
                images: validImages.map(({ id, url, alt, caption }) => ({
                  id,
                  url,
                  alt,
                  caption
                })),
                ids: validImages.map(({ id }) => id)
              });
            }
            return createBlock("bricks/slider");
          }
        },
        {
          type: "shortcode",
          tag: "gallery",
          attributes: {
            images: {
              type: "array",
              shortcode: ({ named: { ids } }) => {
                return parseShortcodeIds(ids).map(id => ({
                  id
                }));
              }
            },
            ids: {
              type: "array",
              shortcode: ({ named: { ids } }) => {
                return parseShortcodeIds(ids);
              }
            },
            linkTo: {
              type: "string",
              shortcode: ({ named: { link = "attachment" } }) => {
                return "file" === link ? "media" : link;
              }
            }
          }
        },
        {
          // When created by drag and dropping multiple files on an insertion point
          type: "files",
          isMatch(files) {
            return (
              1 !== files.length &&
              every(files, file => 0 === file.type.indexOf("image/"))
            );
          },
          transform(files, onChange) {
            const block = createBlock("bricks/slider", {
              images: files.map(file =>
                pickRelevantMediaFiles({
                  url: createBlobURL(file)
                })
              )
            });
            mediaUpload({
              filesList: files,
              onFileChange: images => {
                const imagesAttr = images.map(pickRelevantMediaFiles);
                onChange(block.clientId, {
                  ids: map(imagesAttr, "id"),
                  images: imagesAttr
                });
              },
              allowedTypes: ["image"]
            });
            return block;
          }
        }
      ],
      to: [
        {
          type: "block",
          blocks: ["core/image"],
          transform: ({ images }) => {
            if (0 < images.length) {
              return images.map(({ id, url, alt, caption }) =>
                createBlock("core/image", { id, url, alt, caption })
              );
            }
            return createBlock("core/image");
          }
        }
      ]
    },

    edit,

    save({ attributes }) {
      const {
        images,
        imageCrop,
        autoplay,
        speed,
        effect,
        linkTo,
        arrows,
        BRICKS
      } = attributes;

      return (
        <ul
          className={`${
            imageCrop ? "is-cropped" : ""
          } wpbricks-slider ${BRICKS}`}
          data-autoplay={autoplay}
          data-speed={speed}
          data-effect={effect}
          data-arrows={arrows}
        >
          {images.map(image => {
            let href;

            switch (linkTo) {
              case "media":
                href = image.url;
                break;
              case "attachment":
                href = image.link;
                break;
            }

            const img = (
              <img
                src={image.url}
                alt={image.alt}
                data-id={image.id}
                data-link={image.link}
                className={image.id ? `wp-image-${image.id}` : null}
              />
            );

            return (
              <li key={image.id || image.url} className="blocks-gallery-item">
                <figure>
                  {href ? <a href={href}>{img}</a> : img}
                  {image.caption && 0 < image.caption.length && (
                    <RichText.Content
                      tagName="figcaption"
                      value={image.caption}
                    />
                  )}
                </figure>
              </li>
            );
          })}
        </ul>
      );
    }
  });
})(wp.i18n, wp.blocks, wp.blockEditor, wp.blob, wp.components);
