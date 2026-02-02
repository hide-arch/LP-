// --- ローディング処理（ページを開いた時の演出） ---
window.addEventListener('load', () => {
    // ページ全体の読み込みが完了した時に実行する
    const loader = document.getElementById('loader');

    setTimeout(() => {
        // 1.5秒待ってから、ローディング画面を上にスライドさせて消す
        loader.style.transform = 'translateY(-100%)';

        // ローディングが消えた0.5秒後に、打ち消し線（strike）のアニメーションを開始する
        setTimeout(() => {
            document.querySelectorAll('.strike').forEach(el => {
                el.classList.add('active'); // 「active」クラスをつけてアニメーションを発火
            });
        }, 500);
    }, 1500);
});

// --- インタラクション: カスタムカーソル ---
const cursor = document.getElementById('cursor');

// マウスが動くたびに、カスタムカーソルの位置をマウスの座標(clientX, clientY)に合わせる
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// リンクやボタンにマウスが乗った時、カーソルを大きくする演出
document.querySelectorAll('.cursor-hover-target, a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered')); // 乗った時
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered')); // 離れた時
});

// --- インタラクション: スクロール連動表示（フワッと出る演出） ---
const observer = new IntersectionObserver((entries) => {
    // 画面内に要素が入ってきたかどうかを監視する
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 画面に入ったら「active」クラスを追加して表示させる
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 }); // 15%くらい見えたら反応する設定

// 監視したい要素（reveal-up, reveal-rotate）をすべて登録する
document.querySelectorAll('.reveal-up, .reveal-rotate').forEach(el => observer.observe(el));

// --- More Read (アコーディオン) 機能：クリックで詳細を開閉 ---
function toggleVoice(id) {
    const card = document.getElementById(id);
    const btnText = card.querySelector('.btn-text');
    
    // 「open」というクラスがなければ追加し、あれば削除する（切り替え）
    card.classList.toggle('open');
    
    // 開いているかどうかに応じて、ボタンのテキストを書き換える
    if (card.classList.contains('open')) {
        btnText.textContent = 'CLOSE';
    } else {
        btnText.textContent = 'READ MORE';
    }
}