jQuery(window).on('load', function () {
    //リサイズされたときの処理
    navResize();
});
jQuery(window).resize(function () {
    //リサイズされたときの処理
    navResize();
});

function navResize() {
    wrapperWidth = (wrapper.clientWidth);
    wrapperHeight = (wrapper.clientHeight);
    h = jQuery(window).height();
    jQuery('#navContent').css('border-bottom', h + 'px solid var(--black)');
    jQuery('#navContent').children('div').css('height', h + 'px');
};

//クリックイベント
jQuery('#wrapper').on('click', '.navClick', function () {

    var active = jQuery('.navAction');
    if (jQuery(active).hasClass('active')) {
        jQuery(active).removeClass('active');
        $(".popover").remove();
    } else {
        jQuery(active).addClass('active');
        jQuery('#navWrapper').prepend('<div id="" class="js-close js-popover popover navClick"></div>');
    }

});

//クリックイベント
jQuery('#wrapper').on('click', '.js-btn_debug', function () {

    get01 = get02 = get03 = get04 = get05 = true;

});