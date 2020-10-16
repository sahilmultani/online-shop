const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;

import map from 'lodash/map';
const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;
const { registerPlugin } = wp.plugins;
const {
    Button,
    ButtonGroup,
} = wp.components;

const icon = <svg width="20" height="20" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414">
    <path d="M38.289,3.002l0.045,0.001l0.044,0.003l0.044,0.004l0.043,0.005l0.044,0.006l0.043,0.007l0.042,0.008l0.042,0.01l0.042,0.01l0.041,0.011l0.041,0.012l0.041,0.013l0.04,0.014l0.039,0.015l0.04,0.016l0.038,0.017l0.038,0.018l0.038,0.019l0.037,0.02l0.037,0.02l0.036,0.021l0.035,0.022l0.035,0.023l0.034,0.024l0.034,0.025l0.033,0.025l0.033,0.026l0.031,0.027l0.032,0.028l0.03,0.028l0.03,0.029l0.029,0.03l0.028,0.031l0.028,0.031l0.027,0.031l0.026,0.033l0.025,0.033l0.025,0.034l0.024,0.034l0.023,0.035l0.022,0.035l0.021,0.036l0.021,0.037l0.019,0.037l0.019,0.038l0.018,0.038l0.017,0.039l0.016,0.039l0.015,0.039l0.014,0.04l0.013,0.041l0.012,0.041l0.011,0.041l0.011,0.042l0.009,0.042l0.008,0.043l0.007,0.042l0.006,0.044l0.005,0.043l0.004,0.044l0.003,0.044l0.002,0.045l0,0.044l0,30.53l0,0.044l-0.002,0.045l-0.003,0.044l-0.004,0.044l-0.005,0.043l-0.006,0.044l-0.007,0.042l-0.008,0.043l-0.009,0.042l-0.011,0.042l-0.011,0.041l-0.012,0.041l-0.013,0.041l-0.014,0.04l-0.015,0.039l-0.016,0.039l-0.017,0.039l-0.018,0.038l-0.019,0.038l-0.019,0.037l-0.021,0.037l-0.021,0.036l-0.022,0.035l-0.023,0.035l-0.024,0.034l-0.025,0.034l-0.025,0.033l-0.026,0.033l-0.027,0.031l-0.028,0.031l-0.028,0.031l-0.029,0.03l-0.03,0.029l-0.03,0.028l-0.032,0.028l-0.031,0.027l-0.033,0.026l-0.033,0.025l-0.034,0.025l-0.034,0.024l-0.035,0.023l-0.035,0.022l-0.036,0.021l-0.037,0.02l-0.037,0.02l-0.038,0.019l-0.038,0.018l-0.038,0.017l-0.04,0.016l-0.039,0.015l-0.04,0.014l-0.041,0.013l-0.041,0.012l-0.041,0.011l-0.042,0.01l-0.042,0.01l-0.042,0.008l-0.043,0.007l-0.044,0.006l-0.043,0.005l-0.044,0.004l-0.044,0.003l-0.045,0.001l-0.044,0.001l-36.49,0l-0.044,-0.001l-0.045,-0.001l-0.044,-0.003l-0.044,-0.004l-0.043,-0.005l-0.044,-0.006l-0.043,-0.007l-0.042,-0.008l-0.042,-0.01l-0.042,-0.01l-0.041,-0.011l-0.041,-0.012l-0.041,-0.013l-0.04,-0.014l-0.039,-0.015l-0.04,-0.016l-0.038,-0.017l-0.038,-0.018l-0.038,-0.019l-0.037,-0.02l-0.037,-0.02l-0.036,-0.021l-0.035,-0.022l-0.035,-0.023l-0.034,-0.024l-0.034,-0.025l-0.033,-0.025l-0.033,-0.026l-0.031,-0.027l-0.032,-0.028l-0.03,-0.028l-0.03,-0.029l-0.029,-0.03l-0.028,-0.031l-0.028,-0.031l-0.027,-0.031l-0.026,-0.033l-0.025,-0.033l-0.025,-0.034l-0.024,-0.034l-0.023,-0.035l-0.022,-0.035l-0.021,-0.036l-0.021,-0.037l-0.019,-0.037l-0.019,-0.038l-0.018,-0.038l-0.017,-0.039l-0.016,-0.039l-0.015,-0.039l-0.014,-0.04l-0.013,-0.041l-0.012,-0.041l-0.011,-0.041l-0.011,-0.042l-0.009,-0.042l-0.008,-0.043l-0.007,-0.042l-0.006,-0.044l-0.005,-0.043l-0.004,-0.044l-0.003,-0.044l-0.002,-0.045l0,-0.044l0,-30.53l0,-0.044l0.002,-0.045l0.003,-0.044l0.004,-0.044l0.005,-0.043l0.006,-0.044l0.007,-0.042l0.008,-0.043l0.009,-0.042l0.011,-0.042l0.011,-0.041l0.012,-0.041l0.013,-0.041l0.014,-0.04l0.015,-0.039l0.016,-0.039l0.017,-0.039l0.018,-0.038l0.019,-0.038l0.019,-0.037l0.021,-0.037l0.021,-0.036l0.022,-0.035l0.023,-0.035l0.024,-0.034l0.025,-0.034l0.025,-0.033l0.026,-0.033l0.027,-0.031l0.028,-0.031l0.028,-0.031l0.029,-0.03l0.03,-0.029l0.03,-0.028l0.032,-0.028l0.031,-0.027l0.033,-0.026l0.033,-0.025l0.034,-0.025l0.034,-0.024l0.035,-0.023l0.035,-0.022l0.036,-0.021l0.037,-0.02l0.037,-0.02l0.038,-0.019l0.038,-0.018l0.038,-0.017l0.04,-0.016l0.039,-0.015l0.04,-0.014l0.041,-0.013l0.041,-0.012l0.041,-0.011l0.042,-0.01l0.042,-0.01l0.042,-0.008l0.043,-0.007l0.044,-0.006l0.043,-0.005l0.044,-0.004l0.044,-0.003l0.045,-0.001l0.044,-0.001l36.49,0l0.044,0.001Zm-36.524,1.499l-0.016,0l-0.007,0.001l-0.006,0l-0.006,0l-0.006,0.001l-0.006,0.001l-0.005,0.001l-0.006,0.001l-0.005,0.001l-0.006,0.001l-0.005,0.002l-0.005,0.001l-0.006,0.002l-0.005,0.002l-0.005,0.002l-0.005,0.002l-0.005,0.002l-0.005,0.002l-0.005,0.003l-0.005,0.003l-0.005,0.002l-0.005,0.003l-0.004,0.003l-0.005,0.003l-0.005,0.004l-0.005,0.003l-0.004,0.004l-0.005,0.003l-0.004,0.004l-0.005,0.004l-0.004,0.004l-0.004,0.004l-0.004,0.004l-0.004,0.005l-0.004,0.004l-0.004,0.004l-0.004,0.005l-0.003,0.005l-0.004,0.004l-0.003,0.005l-0.003,0.005l-0.003,0.005l-0.003,0.004l-0.003,0.005l-0.002,0.005l-0.003,0.005l-0.002,0.005l-0.002,0.005l-0.002,0.005l-0.002,0.006l-0.002,0.005l-0.002,0.005l-0.001,0.005l-0.002,0.005l-0.001,0.006l-0.001,0.005l-0.001,0.006l-0.001,0.005l-0.001,0.006l-0.001,0.006l0,0.006l-0.001,0.006l0,0.007l0,0.016l0,30.51l0,0.016l0.001,0.013l0.001,0.012l0.002,0.011l0.002,0.011l0.003,0.011l0.003,0.01l0.004,0.011l0.004,0.01l0.005,0.01l0.005,0.01l0.006,0.009l0.006,0.01l0.007,0.009l0.008,0.009l0.008,0.009l0.008,0.008l0.009,0.008l0.009,0.007l0.009,0.007l0.01,0.007l0.009,0.006l0.01,0.005l0.01,0.005l0.01,0.004l0.01,0.004l0.011,0.003l0.011,0.003l0.011,0.002l0.011,0.002l0.012,0.001l0.013,0.001l0.016,0l36.47,0l0.016,0l0.007,-0.001l0.006,0l0.006,0l0.006,-0.001l0.006,-0.001l0.005,-0.001l0.006,-0.001l0.005,-0.001l0.006,-0.001l0.005,-0.002l0.005,-0.001l0.006,-0.002l0.005,-0.002l0.005,-0.002l0.005,-0.002l0.005,-0.002l0.005,-0.002l0.005,-0.003l0.005,-0.003l0.005,-0.002l0.005,-0.003l0.004,-0.003l0.005,-0.003l0.005,-0.004l0.005,-0.003l0.004,-0.004l0.005,-0.003l0.004,-0.004l0.005,-0.004l0.004,-0.004l0.004,-0.004l0.004,-0.004l0.004,-0.005l0.004,-0.004l0.004,-0.004l0.004,-0.005l0.003,-0.005l0.004,-0.004l0.003,-0.005l0.003,-0.005l0.003,-0.005l0.003,-0.004l0.003,-0.005l0.002,-0.005l0.003,-0.005l0.002,-0.005l0.002,-0.005l0.002,-0.005l0.002,-0.005l0.002,-0.006l0.002,-0.005l0.001,-0.005l0.002,-0.005l0.001,-0.006l0.001,-0.005l0.001,-0.006l0.001,-0.005l0.001,-0.006l0.001,-0.006l0,-0.006l0.001,-0.006l0,-0.007l0,-0.016l0,-30.51l0,-0.016l0,-0.007l-0.001,-0.006l0,-0.006l-0.001,-0.006l-0.001,-0.006l-0.001,-0.005l-0.001,-0.006l-0.001,-0.005l-0.001,-0.006l-0.002,-0.005l-0.001,-0.005l-0.002,-0.005l-0.002,-0.005l-0.002,-0.006l-0.002,-0.005l-0.002,-0.005l-0.002,-0.005l-0.003,-0.005l-0.002,-0.005l-0.003,-0.004l-0.003,-0.005l-0.003,-0.005l-0.003,-0.005l-0.003,-0.005l-0.004,-0.004l-0.003,-0.005l-0.004,-0.005l-0.004,-0.004l-0.004,-0.004l-0.004,-0.005l-0.004,-0.004l-0.004,-0.004l-0.004,-0.004l-0.005,-0.004l-0.004,-0.004l-0.005,-0.003l-0.004,-0.004l-0.005,-0.003l-0.005,-0.004l-0.005,-0.003l-0.004,-0.003l-0.005,-0.003l-0.005,-0.002l-0.005,-0.003l-0.005,-0.003l-0.005,-0.002l-0.005,-0.002l-0.005,-0.002l-0.005,-0.002l-0.005,-0.002l-0.006,-0.002l-0.005,-0.001l-0.005,-0.002l-0.006,-0.001l-0.005,-0.001l-0.006,-0.001l-0.005,-0.001l-0.006,-0.001l-0.006,-0.001l-0.006,0l-0.006,0l-0.007,-0.001l-0.016,0l-36.47,0Z" fill="#555d66" />
    <rect x="0.806" y="8.15" width="38.094" height="1.512" fill="#555d66" />
    <circle cx="3.97" cy="6.353" r="0.497" fill="#555d66" />
    <circle cx="7.267" cy="6.353" r="0.497" fill="#555d66" />
    <circle cx="10.624" cy="6.353" r="0.497" fill="#555d66" />
    <path d="M8.974,22.895l0,2.592l-3.988,-3.988l3.988,-3.987l0,2.592l22.052,0l0,-2.592l3.988,3.987l-3.988,3.988l0,-2.592l-22.052,0Z" fill="#555d66" />
</svg>;
const reviseData = ( oldData, newData ) => Object
    .keys( newData )
    .reduce( ( prev, key ) => {
        if ( oldData[ key ] === newData[ key ] ) {
            return prev;
        }

        return {
            prev,
            [ key ]: newData[ key ],
        };
    }, {} );
const changeBodyClass = ( key ) => {
    document.body.classList.remove( 'md-editor-width-default' );
    document.body.classList.remove( 'md-editor-width-nosidebar' );
    document.body.classList.remove( 'md-editor-width-sidebar' );
    document.body.classList.remove( 'md-editor-width-fullwidth' );
    document.body.classList.add( 'md-editor-width-' + key );
};
function CustomComponent( { meta, oldMeta, onUpdateWidth } ) {
    const editorWidthOptions = [
        { key: 'default', name: __( 'Default' ) },
        { key: 'nosidebar', name: __( 'No Sidebar' ) },
        { key: 'sidebar', name: __( 'With Sidebar' ) },
        { key: 'fullwidth', name: __( 'Full Screen Width' ) },
    ];
    return (
        <Fragment>
            <PluginSidebarMoreMenuItem
                target="gutenberg-editor-width"
            >
                Editor Max Width
            </PluginSidebarMoreMenuItem>
            <PluginSidebar
                name="gutenberg-editor-width"
                title="Editor Max Width"
            >
                <div className="md-blocks-width-control">
                    <h2 className="md-blocks-width-heading">{ __( 'Editor Max Width' ) }</h2>
                    <ButtonGroup aria-label={ __( 'Editor Max Width' ) }>
                        { map( editorWidthOptions, ( { name, key } ) => (
                            <Button
                                key={ key }
                                className="md-editor-width-btn"
                                isSmall
                                isPrimary={ meta.MdBlocksEditorWidth === key || ( '' === meta.MdBlocksEditorWidth && 'default' === key ) }
                                aria-pressed={ meta.MdBlocksEditorWidth === key || ( '' === meta.MdBlocksEditorWidth && 'default' === key ) }
                                onClick={ () => {
                                    changeBodyClass( key );
                                    onUpdateWidth( key, meta, oldMeta );
                                } }
                            >
                                { name }
                            </Button>
                        ) ) }
                    </ButtonGroup>
                    <p>{ __( '*note: You can define these widths in your multidots Blocks settings.' ) }</p>
                </div>
            </PluginSidebar>
        </Fragment>
    );
}
const plugin = compose( [
    withSelect( ( select ) => {
        const postMeta = select( 'core/editor' ).getEditedPostAttribute( 'meta' );
        const oldPostMeta = select( 'core/editor' ).getCurrentPostAttribute( 'meta' );
        return {
            meta: { oldPostMeta, postMeta },
            oldMeta: oldPostMeta,
        };
    } ),
    withDispatch( ( dispatch ) => ( {
        onUpdateWidth( value, newMeta, oldMeta ) {
            const meta = {
                reviseData: reviseData( oldMeta, newMeta ),
                MdBlocksEditorWidth: value
            };
            if ( 'default' === value ) {
                dispatch( 'core/editor' ).updateEditorSettings( { maxWidth: meta.MdBlocksDefaultSize } );
            } else if ( 'sidebar' === value ) {
                dispatch( 'core/editor' ).updateEditorSettings( { maxWidth: meta.MdBlocksSidebarSize } );
            } else if ( 'nosidebar' === value ) {
                dispatch( 'core/editor' ).updateEditorSettings( { maxWidth: meta.MdBlocksNosidebarSize } );
            } else if ( 'fullwidth' === value ) {
                dispatch( 'core/editor' ).updateEditorSettings( { maxWidth: 2000 } );
            }
            dispatch( 'core/editor' ).editPost( { meta } );
        },
    } ) ),
] )( CustomComponent );

registerPlugin( 'gutenberg-editor-width', {
    icon: icon,
    render: plugin,
} );
