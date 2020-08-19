var thisIs;
var item_id;
var popup, popup_title, popup_p, popup_text, popup_image_src, popup_image_name;
var nowClick;
var textType;
var clickFlg = true;

/*====================================

    道具クリックイベント
    ポップアップ生成、アニメーション

====================================*/
const popup_item = document.getElementsByClassName('js-popup_item');
// document.getElementsByClassName('js-popup_item').addEventListener('click', function () {}, false);

for (let i = 0; i < popup_item.length; i++) {
    popup_item[i].addEventListener("click", function () {
        thisIs = this;
        console.log(thisIs);
        if (clickFlg) {
            // イベント処理中はフラグをoffにします。
            clickFlg = false;
            topItemShake();
            jQuery('#wrapper').append('<div id="" class="js-close popover js-popover _hide"></div>');
            generatePopup();
        } else {
            // イベント処理中は処理しない
            console.log('clickFlg is false.');
        }
    }, false);
}



/*====================================

    ポップアップ内容変更関数

====================================*/

function popupItem(e) {

    item_id = thisIs.getAttribute('id');
    console.log(item_id);

    switch (item_id) {

        case 'top_character01':
            popup_text = '4体のキャラの素となるキャラクターです。<br>見た目の通りついつい触ってしまいたくなるようなIMちゃん（素体くん）を可愛がってあげてください。<br>泣き声は「ンニィー」。';
            popup_image_name = 'ＩＭちゃん';
            popup_image_src = '01';
            break;

        case 'top_character02':
            popup_text = '主な生息地はプロジェクターの上。立体物を愛し、立体物に愛された３ＤＣＧくん。堅苦しく頑固だけど他の人を思いやる気持ちが強いため頼られる存在になっている。<br>空間把握能力が高く、世界をすべて３Ｄ化して考えている。<br>立体物に囲まれると幸せな気持ちになる。';
            popup_image_name = '３ＤＣＧくん';
            popup_image_src = '02';
            break;

        case 'top_character03':
            popup_text = '主な生息地は浅野先生の足元。人の手の温もりが大好きで、自分と対話できない物は苦手みたい。<br>足元をうろちょろしていることが多いので何回も踏まれそうになり命の危機を経験したことがあるようです。<br>触れると頭のライトが光り出すけど、気を許した人にしか触らせてくれないので仲良くなることから始めよう！';
            popup_image_name = 'インタラクティブアートくん';
            popup_image_src = '03';
            break;

        case 'top_character04':
            popup_text = '主な生息地はレコーディングスタジオ。高音と美声が大好き。逆に騒音とノイズが大嫌い。<br>昔あった音楽祭では、サウンドくんが音楽祭を仕切りたくて率先して指揮者に立候補した経験がある！<br>音楽が大好きなだけあって絶対音感の持ち主。手は隠れているだけでピアノも弾ける。';
            popup_image_name = 'サウンドくん';
            popup_image_src = '04';
            break;

        case 'top_character05':
            popup_text = '主な生息地はPC演習室または情報処理センター。コーディングとデータの整理整頓が得意で好き。<br>クリックされ過ぎて常にクリックされていないと落ち着かなくなったため自分でポインターをつけてしまったとのこと。<br>突くと喜び、突き過ぎはフリーズの原因になるので注意が必要となります。';
            popup_image_name = 'ＷＥＢくん';
            popup_image_src = '05';
            break;


        default:
            popup_text = 'defaultの説明です！<br>なんか面白いです！imchanです！元気ですか？みんな色々やってます、楽しいです！<br>なんか面白いです！imchanです！元気ですか？みんな色々やってます、楽しいです！なんか面白いです！imchanです！元気ですか？みんな色々やってます、楽しいです！';
            popup_image_name = 'default';
            popup_image_src = 'arduino01';
            break;

        case 'top_items_arduino01':
            popup_text = 'Arduinoとは、ハードウェアの「Arduinoボード」、および（ソフトウェアの）「Arduino IDE」から構成されるシステムです。<br>また「Arduino」という名称は広義には、それらの開発・改良を行う一連のプロジェクトや、その結果生まれた会社、またその多くの開発者らによるコミュニティまでも指すことがあるそうです。';
            popup_image_name = 'アルディーノ';
            popup_image_src = 'arduino01';
            break;

        case 'top_items_arduino02':
            popup_text = 'ブレッドボードは電子回路の実験、試作、評価などに用います。<br>ブレッドボードの中でも特に、各種電子部品やジャンパ線を差し込むだけで電子回路を組むことの出来る。<br>アマチュア工作の世界では、漠然と「ブレッドボード」と言うと、穴に素子やワイヤーを差し込むタイプを指していることが多いです。';
            popup_image_name = 'ブレッドボード';
            popup_image_src = 'arduino02';
            break;

        case 'top_items_speaker':
            popup_text = 'スピーカーまたはラウドスピーカーとは、電気信号を音に変える装置のことを言います。<br>語尾を伸ばさずに「スピーカ」とも、 漢字表現では「拡声器」とも呼ばれることもあります。<br>カラオケにある大きな音を出すデバイスがスピーカーです。';
            popup_image_name = 'スピーカー';
            popup_image_src = 'speaker';
            break;

        case 'top_items_cable':
            popup_text = 'ケーブルは、ロープ、絶縁体と保護被覆で覆われた電線、および光ファイバーのことを言います。<br>金属棒に比べて柔軟で簡単に曲げることができます。<br>吊り橋のケーブルも同じケーブルです。';
            popup_image_name = 'ケーブル';
            popup_image_src = 'cable';
            break;

        case 'top_items_headphone':
            popup_text = 'ヘッドフォンまたはヘッドホンは、再生装置や受信機から出力された電気信号を、耳に近接した発音体を用いて音波に変換する装置を組み合わせた機器です。<br>一般的にはヘッドフォンとイヤホンに全世界共通の明確な分類があるわけではないが、技術上の基準では区分が設けられています。';
            popup_image_name = 'ヘッドフォン';
            popup_image_src = 'headphone';
            break;

        case 'top_items_keyboard':
            popup_text = 'キーボードは、コンピュータへの入力機器の一つであり、手指でキーを押すことでコンピュータへ文字信号などを送信するものです。鍵盤と呼ばれることもあります。<br>様々なソフトウェア上で文字入力を基本とした機器であるが、コンピュータの操作全般にも用いられることもあります。';
            popup_image_name = 'MIDIキーボード';
            popup_image_src = 'keyboard';
            break;

        case 'top_items_speaker':
            popup_text = 'スピーカーまたはラウドスピーカーとは、電気信号を音に変える装置のことを言います。<br>語尾を伸ばさずに「スピーカ」とも、 漢字表現では「拡声器」とも呼ばれることもあります。<br>カラオケにある大きな音を出すデバイスがスピーカーです。';
            popup_image_name = 'スピーカー';
            popup_image_src = 'speaker';
            break;

        case 'top_items_light':
            popup_text = '電球とは、ガラスの球殻内のフィラメントに電流を流して発光させる、電気による光源です。<br>ガラスの球殻内には不活性ガスが封入されたり、あるいは真空状態にしてあります。<br>1990年代に、より効率の良い「LED電球」が発明されてから、古くから使われてきた白熱電球は、LED電球に置き換えられつつあります。';
            popup_image_name = '電球';
            popup_image_src = 'light';
            break;

        case 'top_items_major':
            popup_text = 'デジタルノギスは、長さを100分の5ミリメートル単位まで精密に測定する電子測定器です。<br>昔は機械的に測定するノギスが使用されていたが、現在ではデジタルノギスがその利便性によって普及しています。<br>一眼でサイズ感を確認することができるため工作には必要となってくる道具でしょう。';
            popup_image_name = 'デジタルノギス';
            popup_image_src = 'major';
            break;

        case 'top_items_serohan':
            popup_text = 'セロハンテープ は、基材となるセロファンの片面に接着剤を塗り、帯状にしたものです。通常の製品は、これを巻き取った巻物状にして供給されています。<br>無色透明の製品のほか色付きのものも販売され、テープ両面に接着剤を塗ったものは両面テープと呼ばれます。';
            popup_image_name = 'セロハンテープ';
            popup_image_src = 'serohan';
            break;

        case 'top_items_mac_hide':
            popup_text = 'personal computer(パーソナルコンピュータ)の略称。大組織しか所有できないようなものではなく個人用コンピュータ全般を指す呼称です。<br>上述の概念に因んで各社が「PC」という表現を含んだ名称をつけた製品となっています。';
            popup_image_name = 'PC';
            popup_image_src = 'mac_hide';
            break;

        case 'top_items_smartphone':
            popup_text = 'スマートフォンは、モバイル向けオペレーティングシステムを備えた携帯電話の総称です。<br>現在では一般に、折り畳み式を含む従来型の携帯電話等と区別されて使用されることが多くなっています。<br>2010年代以降に一般的に使われるようになり、インターネット接続機能や電子決済機能などを持つスマートなデバイスのことを「スマートデバイス」といいます！';
            popup_image_name = 'スマートフォン';
            popup_image_src = 'smartphone';
            break;

        case 'top_items_hand':
            popup_text = 'これはあなたにもついているもので、ご飯を食べる時、勉強をする時、ゲームをする時などに使われます。<br>この手はこれからあなたを将来を作っていくものです。<br>たくさん手を使ってあなたの夢に向かって頑張ってください！';
            popup_image_name = '手';
            popup_image_src = 'hand';
            break;
    }
};



/*====================================

    ポップアップクローズイベント

====================================*/

jQuery(document).on('click', '.js-close', function () {
    if (clickFlg) {
        // イベント処理中はフラグをoffにします。
        clickFlg = false;

        // nowClick = jQuery(this).parent('.mainPopup');
        nowClick = jQuery('.mainPopup');
        jQuery(nowClick).css('transition', '1.0s');
        var yPos = jQuery(nowClick).css('top');
        jQuery(nowClick).css({
            'top': 'calc( ' + yPos + ' + 80%)',
            'opacity': '.0'
        });

        if (get01 && get02 && get03 && get04 && get05 && gratzFlg) {
            console.log('Congratulations!');
            setTimeout(function () {
                congratulations();
            }, 1000);
        } else {
            jQuery('.js-popover').css('opacity', '.0');
            setTimeout(function () {
                console.log('click closeBtn.');
                jQuery('.js-popover').remove();
            }, 500);
        }

        setTimeout(function () {
            nowClick.remove();
            clickFlg = true;
        }, 1000);

    } else {
        // イベント処理中は処理しない
        console.log('clickFlg is false.');
    }
});

/*====================================

    ポップアップ生成イベント

====================================*/

function generatePopup() {

    let popupIvent = new Promise((resolve, reject) => {
        jQuery('<div class="js-mainPopup mainPopup nowGenerate _hide"><div class="js-close popupCloseBtn"><div class="navBtnBar _01"></div><div class="navBtnBar _02"></div></div><div class="contentWrap"><h3>arduino</h3><img src="./common/img/top_items/top_items_arduino01.png" alt="arduino01"><p>サンプルテキストです。</p></div></div>').appendTo('#wrapper');
        // ポップアップ要素格納
        popup = jQuery('.js-mainPopup.nowGenerate');
        popup_title = jQuery(popup).find("h3");
        popup_image = jQuery(popup).find("img");
        popup_p = jQuery(popup).find("p");

        setTimeout(function () {
            resolve();
        }, 1);
    })

    popupIvent.then(() => {
        // クリックした要素に書き換え
        popupItem();
        popup_title.html(popup_image_name);
        popup_p.html(popup_text);

        if ($(thisIs).hasClass("js-popup_item")) {
            jQuery(popup_image).attr({
                'src': './common/img/top_items_view/top_items_' + popup_image_src + '.png',
                'alt': popup_image_name + 'のイメージ'
            });
        } else if ($(thisIs).hasClass("js-top_character")) {
            jQuery(popup_image).attr({
                'src': './common/img/top_character_view/top_character_real' + popup_image_src + '.png',
                'alt': popup_image_name + 'のイメージ'
            });
        }
        jQuery('.nowGenerate').removeClass('nowGenerate');
    }).then(() => {
        setTimeout(function () {
            var w = popup.outerWidth();
            var h = popup.outerHeight();
            console.log('popup_size ' + w + ':' + h);
            var sw = window.innerWidth;
            var sh = window.innerHeight;
            console.log('screen_size ' + sw + ':' + sh);
            var popupLeft = (sw / 2) - (w / 2);
            var popupTop = (sh / 2) - (h / 2);
            popup.css({
                'left': popupLeft + 'px',
                'top': sh + 'px'
            });

            setTimeout(function () {
                setTimeout(function () {
                    jQuery(popup).removeClass('_hide');
                    jQuery('.popover').removeClass('_hide');
                    jQuery(popup).css({
                        'opacity': '1.0',
                        'top': popupTop + 'px'
                    });
                    setTimeout(function () {
                        dragPopup();
                        jQuery(popup).css('transition', '.0s');
                        clickFlg = true;
                    }, 1000);
                }, 1000);
            }, 10);
        }, 300);
    });

}

/*====================================

    アイテム揺れるイベント

====================================*/

function topItemShake() {
    //アニメーションclassを追加
    thisIs.classList.add('shake');
    //アニメーション終了時にclassを削除
    thisIs.addEventListener('animationend', () => {
        thisIs.classList.remove('shake');
    }, false);
};