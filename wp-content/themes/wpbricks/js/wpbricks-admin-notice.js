/**
 * Customizer controls toggles
 *
 * @package WPBricks
 */

(function ($) {
    WPBricks = {
        init: function () {
            this._start();
        },
        _start: function () {
            $(document).on('click', '.wpbricks-message-cls .notice-dismiss', WPBricks._dismissNotice);
            $(document).on('click', '.wpbricks-install-recommended-plugin', WPBricks._installPlugin);
            $(document).on('click', '.wpbricks-activate-recommended-plugin', WPBricks._activePlugin);
            $(document).on('wp-plugin-install-success', WPBricks._activePlugin);
            $(document).on('wp-plugin-install-error', WPBricks._installError);
            $(document).on('wp-plugin-installing', WPBricks._pluginInstalling);
            $( document ).on('wpbricks-active-after-plugin', WPBricks._redirectToPlugin );
        },
        _redirectToPlugin: function( event, WpBricksLink, activatedSlug )
        {
            event.preventDefault();

            if ( activatedSlug.indexOf( 'wpbricks' ) >= 0 ) {
                window.location.href = WpBricksLink;
            }

        },
        _dismissNotice: function (event) {
            event.preventDefault();
            WPBricks._ajax();
        },
        _installError: function (event, response) {
            var $card = jQuery('.wpbricks-install-recommended-plugin');
            $card
                .removeClass('updating-message button-primary')
                .addClass('disabled')
                .html(wp.updates.l10n.installFailedShort);
        },
        _pluginInstalling: function (event, args) {
            event.preventDefault();
            var slug = args.slug;
            var $card = jQuery('.wpbricks-install-recommended-plugin');
            var activatingText = WPBricksNotices.recommendedPluiginInstallingText;
            $card.each(function (index, element) {
                element = jQuery(element);
                if (element.data('slug') === slug) {
                    element.addClass('updating-message');
                    element.html(activatingText);
                }
            });
        },
        _installPlugin: function (event) {
            event.preventDefault();

            var $button = jQuery(event.target),
                $document = jQuery(document);

            if ($button.hasClass('updating-message') || $button.hasClass('button-disabled')) {
                return;
            }

            if (wp.updates.shouldRequestFilesystemCredentials && !wp.updates.ajaxLocked) {
                wp.updates.requestFilesystemCredentials(event);

                $document.on('credential-modal-cancel', function () {
                    var $message = $('.wpbricks-install-recommended-plugin.updating-message');

                    $message
                        .addClass('wpbricks-activate-recommended-plugin')
                        .removeClass('updating-message wpbricks-install-recommended-plugin')
                        .text(wp.updates.l10n.installNow);

                    wp.a11y.speak(wp.updates.l10n.updateCancel, 'polite');
                });
            }

            wp.updates.installPlugin({
                slug: $button.data('slug')
            });
        },
        _activePlugin: function (event, response) {
            event.preventDefault();
            var $message = jQuery(event.target);
            var $init = $message.data('init');
            var activatedSlug;

            if (typeof $init === 'undefined') {
                var $message = jQuery('.wpbricks-install-recommended-plugin[data-slug=' + response.slug + ']');
                activatedSlug = response.slug;
            } else {
                activatedSlug = $init;
            }

            var $init = $message.data('init');
            var activatingText = WPBricksNotices.recommendedPluiginActivatingText;
            var WPBricksSitesLink = WPBricksNotices.WPBricksSitesLink;
            var SitesLinkTitle = WPBricksNotices.WPBricksSitesLinkTitle;
            var SitesLinkTitleRecommandation = WPBricksNotices.WPBricksSitesLinkTitleRecommandation;

            $message.removeClass('install-now installed button-disabled updated-message')
                .addClass('updating-message')
                .html(activatingText);

            setTimeout(function () {
                $.ajax({
                    url: WPBricksNotices.ajaxUrl,
                    type: 'POST',
                    data: {
                        'action': 'wpbricks-recommedade-plugin',
                        'init': $init,
                    },
                    success: function (result) {
                        if (result.success) {
                            $('.wpbricks-review-notice-container a').attr('href', WPBricksSitesLink);
                            $('.wpbricks-review-notice-container a').html(SitesLinkTitle);
                            $('.br_sub_content a.wpbricks-install-btn').attr('href', WPBricksSitesLink);
                            $('.br_sub_content a.wpbricks-install-btn').html(SitesLinkTitleRecommandation);
                            $message.removeClass('wpbricks-install-recommended-plugin updating-message');
                            WPBricks._ajax();
                            jQuery(document).trigger( 'wpbricks-active-after-plugin', [WPBricksSitesLink, activatedSlug] );
                        } else {
                            $message.removeClass('updating-message');
                        }
                    }
                })
            }, 1200);
        },
        _ajax: function () {
            $.ajax({
                url: WPBricksNotices.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'wpbricks-notice-dismiss',
                    nonce: WPBricksNotices.wpbricks_notice_nonce,
                },
                success: function (result) {
                    //console.log(result);
                }
            });
        },
    }
    $(function () {
        WPBricks.init();
    })
})(jQuery);