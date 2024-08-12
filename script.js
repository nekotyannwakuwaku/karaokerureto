// ミュート状態を管理する変数
let isMuted = false;

// ミュートボタンがクリックされたときのイベントリスナーを設定
document.querySelector('.muto').addEventListener('click', () => {
    isMuted = !isMuted; // ミュート状態を切り替え
    toggleMute(isMuted); // 音声のミュートを切り替える関数を呼び出す
});

// 音声のミュートを切り替える関数
function toggleMute(mute) {
    const audioElements = document.querySelectorAll('audio'); // すべての音声要素を取得
    audioElements.forEach(audio => {
        audio.muted = mute; // 各音声要素のミュート状態を設定
    });
    
    // ミュートアイコンの表示を切り替える
    const muteIcon = document.querySelector('.muto');
    if (mute) {
        muteIcon.src = 'img/muted.png'; // ミュート状態のアイコン
    } else {
        muteIcon.src = 'img/muto.png'; // ミュート解除状態のアイコン
    }
}

// 現在選択されている難易度（Lv.1, Lv.2, Lv.3）
let selectedIndex = 0;

// 各難易度のIDを保持する
const levels = ["lv1", "lv2", "lv3"];

// 各難易度に対応する三角アイコンのIDを保持する
const triangles = ["triangle-a", "triangle-b", "triangle-c"];

// 各難易度に対応するテーマのリストを定義
const themes = {
    0: ['曲名の１文字目があ行', '曲名の１文字目がか行', '曲名の１文字目がさ行', '曲名の１文字目がさ行',
    '曲名の１文字目がた行','曲名の１文字目がな行','曲名の１文字目がは行','曲名の１文字目がま行','曲名にAが入っている','恋に関する曲',
    '春っぽい曲','夏っぽい曲','秋っぽい曲','冬っぽい曲','可愛い曲','かっこいい曲','病んでる曲','のんびりな曲','お腹が空く曲',
],  // Lv.1
   
1: ['運動会に流れてそう', '卒業ソング', '別れに関する曲','合唱曲','ボカロ','アニソン','アイドルソング','10年前に流行った','みんな知ってる曲','一番有名だと思う曲',
    '笑える曲','泣ける曲','洋楽','曲名が英語と日本語','色に関する曲','雨に関する曲','星に関する曲',],  // Lv.2
    
    2: ['曲名が10文字以上', '曲名が1文字', '曲名がひらがなのみ','曲名がんから始まる','90点以上とって','80点を狙ってとって','アカペラで','土に関する曲','教科書に関する曲','踊れる曲',
    '冬っぽい曲','人生で初めて覚えた曲','親の好きな曲','赤に関する曲','青に関する曲','黄色に関する曲','緑に関する曲','白に関する曲',]   // Lv.3
};

// 音声要素を取得
const botannSound = document.getElementById('botann-sound');
const zyuuSound = document.getElementById('zyuu-sound'); 


// 現在選択されている難易度に対応する三角アイコンを更新する関数
function updateSelection() {
    // すべての三角アイコンを非表示にする
    triangles.forEach(triangleId => {
        document.getElementById(triangleId).style.display = 'none';
    });
    
    // 現在選択されているインデックスに対応する三角アイコンを表示する
    document.getElementById(triangles[selectedIndex]).style.display = 'inline';
}

// 右矢印ボタンをクリックしたときのイベントリスナー
document.getElementById("migi").addEventListener("click", () => {
    botannSound.play();
    // インデックスを1増加し、次の難易度に移動
    selectedIndex = (selectedIndex + 1) % levels.length;
    // 三角アイコンを更新
    updateSelection();
});

// 左矢印ボタンをクリックしたときのイベントリスナー
document.getElementById("hidari").addEventListener("click", () => {
    botannSound.play();
    // インデックスを1減少し、前の難易度に移動
    selectedIndex = (selectedIndex - 1 + levels.length) % levels.length;
    // 三角アイコンを更新
    updateSelection();
});

// ページ読み込み時に初期状態で三角アイコンを表示
updateSelection();


// 「決定」ボタンをクリックしたときに抽選を開始するイベントリスナー
document.getElementById("confirm").addEventListener("click", () => {
    botannSound.play();
    // 現在選択されている難易度で抽選を開始
    selectDifficulty(selectedIndex);
});

// メニュー画面から選択された難易度に基づいて抽選を開始する関数
function selectDifficulty(index) {
    // メニュー画面を非表示にし、抽選画面を表示する
    document.getElementById('menu-screen').classList.remove('active');
    document.getElementById('draw-screen').classList.add('active');
}

// 抽選画面の「抽選」ボタン(真ん中ボタン）をクリックしたときのイベントリスナー
document.getElementById("confirm2").addEventListener("click", () => {
    zyuuSound.play();
    // 抽選を実行
    drawTheme();
});

// テーマをランダムに抽選して表示する関数
function drawTheme() {
    // 現在選択されている難易度に対応するテーマのリストを取得
    const selectedThemes = themes[selectedIndex];
    // リストからランダムに1つのテーマを選択
    const randomTheme = selectedThemes[Math.floor(Math.random() * selectedThemes.length)];

    // 抽選画面を非表示にし、テーマ表示画面を表示する
    document.getElementById('draw-screen').classList.remove('active');
    document.getElementById('theme-screen').classList.add('active');
    // ランダムに選ばれたテーマをテーマ表示画面に表示する
    document.getElementById('theme-display').textContent = randomTheme;
}

// テーマ表示画面で「もう一度抽選」ボタン（画像）をクリックしたときのイベントリスナー
document.getElementById("migi3").addEventListener("click", () => {
    botannSound.play();
    // 再度テーマを抽選して表示する
    redrawTheme();
});

// 上で使うもう一度テーマをランダムに抽選して表示する関数
function redrawTheme() {
    // 現在選択されている難易度に対応するテーマのリストを取得
    const selectedThemes = themes[selectedIndex];
    // リストからランダムに1つのテーマを選択
    const randomTheme = selectedThemes[Math.floor(Math.random() * selectedThemes.length)];
    
    // ランダムに選ばれたテーマをテーマ表示画面に表示する
    document.getElementById('theme-display').textContent = randomTheme;
}

// テーマ表示画面の「ホーム画面に戻る」ボタン（画像）をクリックしたときのイベントリスナー
document.getElementById("hidari3").addEventListener("click", () => {
    botannSound.play();
    // メニュー画面に戻る処理を実行
    goToMenu();
});

// メニュー画面に戻る関数
function goToMenu() {
    // 抽選画面とテーマ表示画面を非表示にし、メニュー画面を表示する
    document.getElementById('draw-screen').classList.remove('active');
    document.getElementById('theme-screen').classList.remove('active');
    document.getElementById('menu-screen').classList.add('active');
    
    // 初期状態として選択インデックスをLv.1に戻し、三角アイコンを更新
    selectedIndex = 0;
    updateSelection();
}
