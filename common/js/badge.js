var iventFlag_badgeGet = 0;
var character_id, character_class = '';
var ivent_badgeGet;
var get01, get02, get03, get04, get05 = false;
var gratzFlg = true;

jQuery('#mainContent').on('click', '.top_character', function () {
    if (iventFlag_badgeGet == 0) {
        thisIs = this;
        popupCharacter();
        popupBadge();
    }
});

jQuery('#wrapper').on('click', '#badgeGetWrapper', function () {
    if (clickFlg) {
        clickFlg = false;
        jQuery('#badgeGetWrapper').removeClass('_off');
        setTimeout(function () {
            jQuery('#badgeGetWrapper').addClass('_off');
            setTimeout(function () {
                clickFlg = true;
            }, 1000);
        }, 2000);
    }
});

jQuery(document).on('click', window, function () {
    console.log('iventFlag_badgeGet = ' + iventFlag_badgeGet)
    if (iventFlag_badgeGet == 1) {
        if (clickFlg) {
            clickFlg = false;
            badgePopClose();
        } else {
            console.log('clickFlg is false.');
        }
    } else if (iventFlag_badgeGet == 2) {
        if (clickFlg) {
            clickFlg = false;
            popFunc02();
        } else {
            console.log('clickFlg is false.');
        }
    } else {};
});

function popupBadge() {
    var badgePop = new Promise((resolve, reject) => {
        // ポップオーバー生成
        jQuery('#wrapper').append('<div id="" class="popover js-popover _hide"></div>');
        // グラデーション生成
        // バッジ生成
        jQuery('#wrapper').append('<div class="js-badgeAnimWrapper badgeAnimWrapper"><div class="js-lineWrapper lineWrapper _hide"></div><div id="mainBadge" class="js-badgeWrapper badgeWrapper _hide"><div class="clipmask"><img class="get_character" src="./common/img/top_character/top_character01.png" alt=""></div><p class="badgeTitle"><span class="js-changeText changeText">imちゃん&nbsp;みっけ！</span><span class="js-badgeTitleAfterLine badgeTitleAfterLine animate"></span></p></div></div>');
        setTimeout(function () {
            resolve();
        }, 1);
    })

    badgePop.then(() => { // #2
        popupItem();
        let getCharacter = jQuery('.js-badgeAnimWrapper').find('.get_character');
        jQuery(getCharacter).attr({
            'src': './common/img/top_character/top_character' + popup_image_src + '.png',
            'alt': popup_image_name + 'のイメージ'
        });
        let getBadgeBg = jQuery('.js-badgeWrapper');
        jQuery(getBadgeBg).addClass(character_class);

        jQuery('.js-badgeWrapper, .js-lineWrapper, .js-popover').removeClass('_hide');
        jQuery('.js-changeText').text('');
    }).then(() => { // #3
        setTimeout(function () {
            badgeText(popup_image_name);
        }, 1000);
    }).then(() => {

    });
}

function badgeText(name) {
    let i = 0;
    let textType = name + ' みっけ！';
    // 要素の文字列を分割して配列に格納
    // var textType = jQuery('.js-changeText').text().split('');
    textType = textType.split('');
    // console.log('textType.length:' + textType.length);
    textText = '';

    let afterLine = jQuery('.js-badgeTitleAfterLine');

    let textTypeAnim = new Promise((resolve, reject) => { // #1
        afterLine.removeClass('animate');
        resolve('#1');
    })

    textTypeAnim.then(() => { // #2
        var textTypo = setInterval(function () {
            if (i < textType.length) {
                textText = textText + textType[i];
                jQuery('.js-changeText').html(textText);
                // console.log(textText);
                i++;
            } else {
                afterLine.addClass('animate');
                console.log('iventFlag_badgeGet is 1');
                iventFlag_badgeGet = 1;
                clearInterval(textTypo);
            };
        }, 120)
    });
}

function badgePopClose() {
    let animWrapper = jQuery('.js-badgeAnimWrapper');
    let badgeAnim = new Promise((resolve, reject) => {
        jQuery(animWrapper).css({
            'opacity': '.0'
        });
        setTimeout(function () {
            resolve();
        }, 300);
    })
    badgeAnim.then(() => {
        console.log('#2');
        jQuery(animWrapper).remove();
        let badgeGetWrapper = jQuery('#badgeGetWrapper');
        jQuery(badgeGetWrapper).removeClass('_off');
        jQuery(badgeGetWrapper).css('z-index', '100');
    }).then(() => {
        console.log(character_class);
        setTimeout(function () {
            jQuery('.badgeGetCharacter.' + character_class).addClass('animate');
            setTimeout(function () {
                jQuery(badgeGetWrapper).css('z-index', '1');
                jQuery('#badgeGetWrapper').addClass('_off');
                jQuery('.js-popover').addClass('js-close');
                generatePopup()
                setTimeout(function () {
                    clickFlg = true;
                    iventFlag_badgeGet = 0;
                }, 3000);
            }, 1000);
        }, 700);
    });
}


function popFunc02() {}

function popupCharacter() {
    character_id = jQuery(thisIs).attr('id');
    console.log(character_id);
    switch (character_id) {
        default:
            break;
        case 'top_character01':
            character_class = '_01';
            get01 = true;
            break;
        case 'top_character02':
            character_class = '_02';
            get02 = true;
            break;
        case 'top_character03':
            character_class = '_03';
            get03 = true;
            break;
        case 'top_character04':
            character_class = '_04';
            get04 = true;
            break;
        case 'top_character05':
            character_class = '_05';
            get05 = true;
            break;
    }
}

function congratulations() {

    let gratz = new Promise((resolve, reject) => {
        // ポップオーバー生成
        jQuery('#wrapper').append('<div id="" class="popover js-popover _hide"></div>');
        // グラデーション生成
        // バッジ生成
        jQuery('#wrapper').append('<div class="js-lineWrapper lineWrapper _gratz _hide"></div><div class="js-badgeAnimWrapper badgeAnimWrapper _gratz"><div id class="gratzContentWrapper"><img class="js-mainImg mainImg _hide" src="./common/img/top_character/top_character_all02.png" alt="top_character_all"><div class="js-gratzPopup _gratz mainPopup _hide"><div class="contentWrap"><h3><img class="textLogo" src="./common/img/logo/logo_text_gratz_line.svg"></h3><p>ＩＭちゃんたちを全員見つけました！<br>遊んでいただきありがとうございます！</p><div class="btnWrapper"><button class="js-btn_roload btn_roload js-btn btn"><span>さいしょからあそぶ</span></button><button class="js-btn_continue btn_continue js-btn btn"><span>つづける</span></button></div></div></div></div></div>');
        setTimeout(function () {
            resolve();
        }, 1);
    })

    gratz.then(() => { // #2
        jQuery('.js-popover').removeClass('_hide');
        jQuery('.js-mainImg').removeClass('_hide');
        jQuery('.js-lineWrapper').removeClass('_hide');
        $('.js-changeText').text('Congratulations!');
    }).then(() => { // #3
        setTimeout(function () {
            jQuery('.js-gratzPopup').removeClass('_hide');
        }, 300);
    }).then(() => {
        clickFlg = true;
        gratzFlg = false;
    });
}



jQuery('#wrapper').on('click', '.btn', function () {
    let btn = $(this);
    $(btn).toggleClass('active');
});

jQuery('#wrapper').on('click', '.btn_continue', function () {
    console.log('btn_continue clicked.');
    let animWrapper = jQuery('.js-badgeAnimWrapper');
    let popover = jQuery('.js-popover');
    let animation = new Promise((resolve, reject) => {
        jQuery(animWrapper).addClass('_hide');
        jQuery('.js-lineWrapper').addClass('_hide');
        jQuery(popover).css({
            'transition': '1.0s'
        });
        setTimeout(function () {
            jQuery(popover).addClass('_hide');
            resolve();
        }, 1000);
    })
    animation.then(() => {
        setTimeout(function () {
            jQuery(animWrapper).add('.js-lineWrapper').add(popover).remove();
        }, 1200);
    }).then(() => {
        setTimeout(function () {}, 700);
    });
});

jQuery('#wrapper').on('click', '.btn_roload', function () {
    console.log('btn_roload clicked.');
    reloadBlowser();
});

function reloadBlowser() {
    jQuery('#wrapper').append('<div class="popover _update"><p>ページを更新します。</p></div>');
    setTimeout(function () {
        console.log('reloadBlowser');
        window.location.reload(false);
    }, 2000);
}