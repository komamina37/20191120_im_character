jQuery(function () {
    var left, top;
    // ドラッグ
    var dragItem = jQuery('.drag-and-drop');
    var drag = jQuery('#mainContent');

    var wrapper = document.getElementById('mainWrapper');
    var wrapperWidth = (wrapper.clientWidth);
    var wrapperHeight = (wrapper.clientHeight);

    var content = document.getElementById('mainContent');
    var contentWidth = (content.clientWidth) * -1;
    console.log('content.width = ' + contentWidth);
    var contentHeight = (content.clientHeight) * -1;
    console.log('content.height = ' + contentHeight);

    var pattern = Math.floor(Math.random() * 2);
    console.log('pettern ' + pattern);
    if (!(pattern == 0)) {
        $('#mainContent').addClass('_0' + pattern);
    };

    jQuery(dragItem).draggable({
        // containment: "#frame" //ドラッグの範囲を制限
    });

    // ドロップ
    jQuery('#frame').droppable({
        accept: '.drag-and-drop',
        drop: function () {

        },
        out: function (event, ui) {

        }
    });

    jQuery('#wrapper').on('click', '.dragMoveBtn', function () {
        jQuery('#mainContent').css('transition', '1.0s');
        let clicked = $(this);
        updateAxis();

        let moveBtnOffClick = new Promise((resolve, reject) => {
            console.log('move_btn clicked.');
            if ($(clicked).hasClass('_top')) {
                console.log('top_btn clicked.');
                t = t + wrapperHeight;
                if (t >= 0) t = 0;
                console.log('t is ' + t);
                drag.css('top', t);
            } else if ($(clicked).hasClass('_right')) {
                console.log('right_btn clicked.');
                l = l - wrapperWidth;
                if (l <= r) l = r;
                console.log('l is ' + l);
                drag.css('left', l);
            } else if ($(clicked).hasClass('_bottom')) {
                console.log('bottom_btn clicked.');
                t = t - wrapperHeight;
                if (t <= b) t = b;
                console.log('t is ' + t);
                drag.css('top', t);
            } else if ($(clicked).hasClass('_left')) {
                console.log('left_btn clicked.');
                l = l + wrapperWidth;
                if (l >= 0) l = 0;
                console.log('l is ' + l);
                drag.css('left', l);
            }
            setTimeout(function () {
                resolve();
            }, 1000);
        })
        moveBtnOffClick.then(() => {
            moveBtnOff();
        });
    });

    jQuery(drag).on('mouseup', function () {
        jQuery('#mainContent').css('transition', '1.0s');
    });
    jQuery(drag).on('mouseup mousemove', function () {
        moveLimit();
    });
    jQuery(drag).on('mousemove', function () {
        jQuery('#mainContent').css('transition', '0.0s');
        moveBtnOff();
    });


    function moveLimit() {
        updateAxis();
        // console.log('r = ' + r);
        if (l >= 0) {
            drag.css('left', '0');
        }
        if ((l <= r)) {
            drag.css('left', r);
        }

        // console.log('b = ' + b);
        if ((t >= 0)) {
            drag.css('top', '0');
        }
        if ((t <= b)) {
            drag.css('top', b);
        }
    }

    function moveBtnOff() {
        if (t >= 0) {
            $('.dragMoveBtn._top').addClass('_off');
        } else {
            $('.dragMoveBtn._top').removeClass('_off');
        }
        if (l <= r) {
            $('.dragMoveBtn._right').addClass('_off');
        } else {
            $('.dragMoveBtn._right').removeClass('_off');
        }
        if (t <= b) {
            $('.dragMoveBtn._bottom').addClass('_off');
        } else {
            $('.dragMoveBtn._bottom').removeClass('_off');
        }
        if (l >= 0) {
            $('.dragMoveBtn._left').addClass('_off');
        } else {
            $('.dragMoveBtn._left').removeClass('_off');
        }
    }


    function updateAxis() {
        left = drag.css('left');
        r = contentWidth + wrapperWidth;
        l = parseInt(left);
        top = drag.css('top');
        t = parseInt(top);
        b = contentHeight + wrapperHeight;
    };

});

var dragFlag = false;
jQuery(document).on('click', '.btn_drag', function () {
    dragFlag = true;
});

function dragPopup() {
    if (dragFlag) {
        var dragItem = jQuery('.mainPopup');
        jQuery(dragItem).draggable({
            // containment: "#frame" //ドラッグの範囲を制限
        });
    }
};

// var TARGET = document.getElementById('bg_audio');
// audioPlay();
// function audioPlay() {
//     TARGET.play();
// }