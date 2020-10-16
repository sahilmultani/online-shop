import {BarCounter, NumberCounter, CircleCounter} from '../icons';



import {
    TypoAttr,
    WPBricksFonts
  } from "../common-components/bricks-typography";

  import {
    AdvancedAttr,
    WPBricksAdvanceCss
  } from "../common-components/bricks-advancecss";


  const Attr = {
    progressCounter: {
        type: 'number',
        default: 10
    },
    CounterType: {
        type: 'string',
        default: 'bar_counter'
    },
    svgSize: {
        type: 'number',
        default: 20
    },
    bgColor: {
        type: 'string',
        default: '#f0f0f0'
    },
    frColor: {
        type: 'string',
        default: '#97d631'
    },
    radiusSize: {
        type: 'number',
        default: 20
    },
    CustomCounterText: {
        type: 'string',
        default: '{number}%'
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
  attrObj = Object.assign(attrObj, AdvancedAttr);

(function () {
    const {__} = wp.i18n;
    const {Fragment} = wp.element;
    const {registerBlockType} = wp.blocks;
    const {InspectorControls, ColorPalette} = wp.blockEditor;
    const {
        PanelBody,
        PanelRow,
        Button,
        RangeControl,
        TextControl,
        TextareaControl,
    } = wp.components;

    registerBlockType('bricks/bricks-counter', {
        title: __('Bricks Counter'),
        icon: BarCounter,
        description: __('Bricks Counter is a gutenberg block that animates a number from zero and counting up towards it.'),
        category: 'bricksblocks',
        keywords: [__('counter'), __('gutenberg'), __('Bricks')],
        attributes: attrObj,

        edit: (props) => {
            const {
                clientId,
                attributes: {
                    progressCounter,
                    CounterType,
                    FontColor,
                    bgColor,
                    frColor,
                    svgSize,
                    TextAlign,
                    radiusSize,
                    FontSize,
                    FontWeight,
                    LineHeight,
                    customCssText,
                    fontFamily,
                    CustomCounterText,
                    LetterSpacing,
                    TextUppercase,
                    BRICKS,
                    deviceMobileManager,
                    deviceTabletManager,
                },
                setAttributes,
                className,
            } = props;


            const NumberProgressIcon = NumberCounter;
            const BarProgressIcon = BarCounter;
            const BarProgressIconsss = CircleCounter;

            const radius = 35;
            const circumference = 2 * Math.PI * radius;
            const strokeDashOffset =
                circumference - (progressCounter * circumference) / 100;




            /* Unique ID generate */

            setAttributes({
                BRICKS:
                "bricks-blocks-" + clientId.split("-")[clientId.split("-").length - 1]
            });
            /* Style var generate */

            let FontSizeStyle = FontSize ? "font-size :" + FontSize + "px;" : "";
            let FontColorStyle = FontColor ? "color :" + FontColor + ";" : "";
            let FontWeightStyle = FontWeight
                ? "font-weight :" + FontWeight + ";"
                : "";
            let LineHeightStyle = LineHeight
                ? "line-height :" + LineHeight + "px;"
                : "";

            let LetterSpacingStyle = LetterSpacing
                ? "letter-spacing :" + LetterSpacing + "px;"
                : "";

            let TextUppercaseStyle = TextUppercase
                ? "text-transform :" + TextUppercase + ";"
                : "";

            let TextAlignStyle = TextAlign ? "text-align:" + TextAlign + ";" : "";

            let fontFamilyStyle = fontFamily ? "font-family:" + fontFamily + ";" : "";

            let fillcolorStyle = FontColor ? "fill:" + FontColor + ";" : "";

            let mobileHide = deviceMobileManager
            ? "@media only screen and (max-width: 767px){.wpbricks-wrap-conter ." +
              BRICKS +
              "{display:none !important}}"
            : "";

            let tabHide = deviceTabletManager
            ? "@media only screen and ( min-width: 768px) and ( max-width: 1024px){.wpbricks-wrap-conter ." +
              BRICKS +
              "{display:none !important}}"
            : "";

            let bgColorStyle = bgColor ? "background-color:" + bgColor + ";" : "";

            let radiusSizeStyle = radiusSize ? "border-radius:" + radiusSize + "px;" : "";

            let frColorStyle =  frColor ? "background:" + frColor + ";" : "";

            let progressCounterStyle = progressCounter ? "width:" + progressCounter + "%;" : "";

            let transitionStyle = "transition:width 3s ease;";

            let counter_fonts;
            if ("inherit" !== fontFamily && "" !== fontFamily && undefined !== fontFamily) {
                counter_fonts =
                '@import url("https://fonts.googleapis.com/css?family=' +
                fontFamily +
                '");';
            }

            let counter_css = ".wpbricks-wrap-counter ." + BRICKS + " .number_counter span.counter_common_class,.wpbricks-wrap-counter ." + BRICKS + " .number_counter span.bricks_count.start{" + fontFamilyStyle + FontColorStyle + FontSizeStyle + LineHeightStyle + FontWeightStyle + LetterSpacingStyle + TextUppercaseStyle + "}.wpbricks-wrap-counter ." + BRICKS + " .number_counter{" + TextAlignStyle + "}" +
+ ".wpbricks-wrap-counter ."+BRICKS+" .circle_outer{ " + TextAlignStyle + "}" + ".wpbricks-wrap-counter ."+BRICKS+" .circle_outer .countervalue{"+ fillcolorStyle +  fontFamilyStyle + FontColorStyle + FontSizeStyle + LineHeightStyle + FontWeightStyle + LetterSpacingStyle + TextUppercaseStyle +"}" +
".wpbricks-wrap-counter ."+BRICKS+" .Bricks_progressbar{ " + bgColorStyle + radiusSizeStyle + " }" + ".wpbricks-wrap-counter ."+BRICKS+" .Bricks_progressbar .Bricks_progress{ " + frColorStyle + progressCounterStyle + transitionStyle + fontFamilyStyle + FontColorStyle + radiusSizeStyle + FontSizeStyle + LineHeightStyle + FontWeightStyle + LetterSpacingStyle + TextUppercaseStyle +" }" + mobileHide +
tabHide + customCssText.replace("{BRICKS}", "." + BRICKS);

//console.log(props.attributes);

            /* Set Font and Style in attributes */

            setAttributes({ bricks_fonts: counter_fonts });
            setAttributes({ bricks_style: counter_css });

            return [
                <Fragment key={`icb-${clientId}`}>
                    <InspectorControls key={`icb-insp-${clientId}`}>
                        <div className="bricks-clear-none bricks-counter-settings" key={`icb-insp-div-${clientId}`}>
                            <PanelBody title={__('Counter Type')} initialOpen={true}>
                                <PanelRow>
                                    <Button className = {'number_counter' === CounterType ? 'selected' : '' }
                                            onClick={() => setAttributes({CounterType: 'number_counter'})}
                                    >
                                        {NumberProgressIcon}
                                    </Button>
                                    <Button className = {'bar_counter' === CounterType ? 'selected' : '' }
                                            onClick={() => setAttributes({CounterType: 'bar_counter'})}
                                    >
                                        {BarProgressIcon}
                                    </Button>
                                    <Button className = {'circle_counter' === CounterType ? 'selected' : '' }
                                            onClick={() => setAttributes({CounterType: 'circle_counter'})}
                                    >
                                        {BarProgressIconsss}
                                    </Button>
                                </PanelRow>
                            </PanelBody>
                            
                            <PanelBody title={__('Counter Settings')} initialOpen={false}>
                                <PanelRow>
                                    <TextControl
                                        type="number"
                                        label='Add Numbers'
                                        value={progressCounter}
                                        onChange={value =>
                                            setAttributes({progressCounter: parseInt(value)})
                                        }
                                    />
                                </PanelRow>
                                <PanelRow>
                                    <TextareaControl
                                        label="Counter Custom Text"
                                        help="Add content Like (ie. +{number}$ )"
                                        value={CustomCounterText}
                                        onChange={value => setAttributes({CustomCounterText: value})}
                                    />
                                </PanelRow>
                            </PanelBody>
                            {'circle_counter' === CounterType ? (
                                <PanelBody title={__('Circle Counter Color Settings')} initialOpen={false}>

                                    <RangeControl
                                        label={__('Circle Size')}
                                        min={1}
                                        max={100}
                                        value={svgSize}
                                        onChange={value => setAttributes({svgSize: parseInt(value)})}
                                    />

                                    <label>Background Border color</label>
                                    <PanelRow>
                                        <ColorPalette
                                            onChange={value => setAttributes({bgColor: value})}
                                            disableAlpha
                                        />
                                    </PanelRow>
                                    <label>Fill Border color</label>
                                    <PanelRow>
                                        <ColorPalette
                                            onChange={value => setAttributes({frColor: value})}
                                            disableAlpha
                                        />
                                    </PanelRow>
                                </PanelBody>
                            ) : 'bar_counter' === CounterType ? (
                                <PanelBody title={__('Bar Counter Color Settings')} initialOpen={false}>
                                    <label>Background color</label>
                                    <PanelRow>
                                        <ColorPalette
                                            onChange={value => setAttributes({bgColor: value})}
                                            disableAlpha
                                        />
                                    </PanelRow>
                                    <label>Forground color</label>
                                    <PanelRow>
                                        <ColorPalette
                                            onChange={value => setAttributes({frColor: value})}
                                            disableAlpha
                                        />
                                    </PanelRow>
                                    <label>Radius</label>
                                    <RangeControl
                                        min={1}
                                        max={30}
                                        value={radiusSize}
                                        onChange={value => setAttributes({radiusSize: parseInt(value)})}
                                    />
                                </PanelBody>
                            ): ''}
                            <PanelBody title="Typography" initialOpen={false}>
                                <WPBricksFonts {...props} />
                            </PanelBody>
                        </div>
                    </InspectorControls>
                    <WPBricksAdvanceCss {...props}/>
                    <style> {counter_fonts} {counter_css}</style>
                    <div className={'progress_bar_wrap wpbricks wpbricks-wrap-counter ' + className}  key={`div-${clientId}`}>
                        {'number_counter' === CounterType ? (
                            <div className={'wpbricks wpbricks-counter ' + BRICKS}>
                                <div
                                    className="number_counter"
                                >
                                    <span className="bricks_count start">
                                        {CustomCounterText.replace('{number}', progressCounter)}
                                    </span>
                                </div>
                            </div>
                        ) : 'circle_counter' === CounterType ? (
                            <div className={'wpbricks wpbricks-counter ' + BRICKS} style={{paddingTop: '20px'}}>
                                <div className="circle_outer">
                                    <svg
                                        className="prog-radial"
                                        data-countervalue={progressCounter}
                                        viewBox="0 0 80 80"
                                        width={`${svgSize}%`}
                                    >
                                        <circle
                                            className="background-border"
                                            stroke={bgColor}
                                            cx="40"
                                            cy="40"
                                            r="35"
                                        />
                                        <circle
                                            className="progress-border"
                                            stroke={frColor}
                                            cx="40"
                                            cy="40"
                                            r="35"
                                            style={{strokeDashoffset: strokeDashOffset}}
                                        />
                                        <text
                                            className="countervalue start"
                                            x="50%"
                                            y="57%"
                                            transform="matrix(0, 1, -1, 0, 80, 0)"
                                        >
                                            {CustomCounterText.replace('{number}', progressCounter)}
                                        </text>
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            <div className={'wpbricks wpbricks-counter ' + BRICKS} style={{paddingTop: '20px'}}>
                                <div
                                    className={'Bricks_progressbar' + ' ' + className}
                                >
                                    <div
                                        className="Bricks_progress"
                                        data-value={progressCounter}
                                    >
                                        <div className="texts">
                                            <span className="bricks_count start"> {CustomCounterText.replace('{number}', progressCounter)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Fragment>
            ];
        },
        save: (props) => {
            const {
                clientId,
                attributes: {
                    progressCounter,
                    CounterType,
                    FontColor,
                    bgColor,
                    frColor,
                    svgSize,
                    TextAlign,
                    radiusSize,
                    FontSize,
                    FontWeight,
                    LineHeight,
                    customCssText,
                    fontFamily,
                    CustomCounterText,
                    LetterSpacing,
                    TextUppercase,
                    BRICKS,
                    deviceMobileManager,
                    deviceTabletManager,
                },
                className,
            } = props;

          const NumberProgressIcon = NumberCounter;
          const BarProgressIcon = BarCounter;
          const BarProgressIconsss = CircleCounter;

          const radius = 35;
          const circumference = 2 * Math.PI * radius;
          const strokeDashOffset =
            circumference - (progressCounter * circumference) / 100;

          var counter_arr = CustomCounterText.replace('{number}', progressCounter).split(progressCounter);

          return (
            <div className={'progress_bar_wrap wpbricks wpbricks-wrap-counter ' + className}  key={`div-${clientId}`}>
            {'number_counter' === CounterType ? (
                <div className={'wpbricks wpbricks-counter ' + BRICKS}>
                    <div
                        className="number_counter"
                    >
                      <span className="before_counter counter_common_class">{ counter_arr[0] }</span><span className="bricks_count start counter_common_class">{progressCounter}</span><span className="before_counter counter_common_class">{counter_arr[1]}</span>
                    </div>
                </div>
            ) : 'circle_counter' === CounterType ? (
                <div className={'wpbricks wpbricks-counter ' + BRICKS} style={{paddingTop: '20px'}}>
                    <div className="circle_outer">
                        <svg
                            className="prog-radial"
                            data-countervalue={progressCounter}
                            viewBox="0 0 80 80"
                            width={`${svgSize}%`}
                        >
                            <circle
                                className="background-border"
                                stroke={bgColor}
                                cx="40"
                                cy="40"
                                r="35"
                            />
                            <circle
                                className="progress-border"
                                stroke={frColor}
                                cx="40"
                                cy="40"
                                r="35"
                                style={{strokeDashoffset: strokeDashOffset}}
                            />
                            <text
                                className="countervalue start"
                                x="50%"
                                y="57%"
                                transform="matrix(0, 1, -1, 0, 80, 0)"
                                data-before= {counter_arr[0]}
                                data-after= {counter_arr[1]}
                            >
                              {progressCounter}
                            </text>
                        </svg>
                    </div>
                </div>
            ) : (
                <div className={'wpbricks wpbricks-counter ' + BRICKS} style={{paddingTop: '20px'}}>
                    <div
                        className={'Bricks_progressbar' + ' ' + className}
                    >
                        <div
                            className="Bricks_progress"
                            data-value={progressCounter}
                        >
                            <div className="texts">
                              <span className="before_counter">{ counter_arr[0] }</span><span className="bricks_count start">{progressCounter}</span><span className="before_counter">{counter_arr[1]}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        )
        }
    });
})(wp.i18n, wp.blocks, wp.blockEditor, wp.components);
