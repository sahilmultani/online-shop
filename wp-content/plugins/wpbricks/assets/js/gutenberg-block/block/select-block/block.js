import Popup from './components/popup';
import { SelectBlock } from '../icons';

/****   For Select Block***/
// (function (wpI18n, wpBlocks) {
	const { __ } = wp.i18n;
	const { registerBlockType } = wp.blocks;
	
	registerBlockType('bricks/select-block', {
		title: __('Bricks Ready Blocks'),
		icon: SelectBlock,
		description: __('Provides 100+ easy to use non-registered blocks and templates.'),
		category: 'bricksblocks',
		keywords: [__('Select Block'), __('gutenberg'), __('Bricks')],
		attributes: {
			content: {
				type: 'string',
				default: ''
			}
		},
		edit(props) {
			const { attributes: { content }, setAttributes } = props;
			return (
				<div className="select_block">
					<Popup data={props} />
					<div className="result">{content}</div>
				</div>
			);
		},
		save() {
			return null;
		}
	});
// })(wp.i18n, wp.blocks);
