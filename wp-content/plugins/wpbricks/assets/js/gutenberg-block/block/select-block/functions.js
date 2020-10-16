export function displayBlock(blockName, data) {
  document.body.classList.remove('select-modal-open');
  const { className, clientId } = data;
  const block = wp.blocks.createBlock(blockName, { content: '' });

  wp.data.dispatch('core/editor').insertBlocks(block);

  if ('wp-block-md-custom-block-select-block' === className) {
    wp.data.dispatch('core/editor').removeBlock(clientId);
  }
  event.preventDefault();
}

export function fetchBlock(fetchBlock, data) {
  document.body.classList.remove('select-modal-open');
  const clientId = data.clientId;
  setTimeout(function(){
        wp.apiFetch({ path: 'client/block-import/?theme-token=' + fetchBlock.blockid, method: 'POST' }).then(apiData => {
          if (apiData.template_html) {
            const block = wp.blocks.createBlock('core/freeform', {
              content: apiData.template_html
            });
            setTimeout(function(){
              wp.data
                .dispatch('core/block-editor')
                .replaceBlocks(
                  clientId,
                  wp.blocks.rawHandler({ HTML: wp.blocks.getBlockContent(block) })
              );
            });
        }
      });
  });

  // document.body.classList.remove('select-modal-open');
  // const clientId = data.clientId;
  // const block = wp.blocks.createBlock('core/freeform', {
  //   content: fetchBlock.blockhtml
  // });
  // setTimeout(function(){
  //   wp.data
  //     .dispatch('core/editor')
  //     .replaceBlocks(
  //       clientId,
  //       wp.blocks.rawHandler({ HTML: wp.blocks.getBlockContent(block) })
  //   );
  // });
}
