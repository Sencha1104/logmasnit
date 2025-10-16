// URLパラメータからqueryを取得
const params = new URLSearchParams(window.location.search);
const query = params.get("query");

let lexicon = {};

// デモ用辞書（本番では外部JSONをfetchで読み込む）
fetch("https://sencha1104.github.io/logmasnit/assets/json/vocabulary.json")
  .then(res => res.json())
  .then(data => {
    lexicon = data;
    runSearch(); // データ読み込み完了後に検索処理を実行
  })
  .catch(err => {
    console.error("辞書データの読み込みに失敗しました:", err);
  });

// 検索関数
function searchWord(q) {
  q = q.trim().toLowerCase();
  const results = [];
  for (const [type, items] of Object.entries(lexicon)) {
    for (const item of items) {
      if (item.word.toLowerCase().includes(q) || item.meaning.includes(q)) {
        results.push({ ...item, type });
      }
    }
  }
  return results;
}

const resultDiv = document.getElementById("results");

if (!query) {
  resultDiv.innerHTML = "<section><h3>おっと！</h3><h3>検索する単語がないよ！</h3></section>";
} else {
  const results = searchWord(query);
  if (results.length === 0) {
    resultDiv.innerHTML = `<section><h3>結果：なし</h3><p>「${query}」に一致する単語は見つかりませんでした。</p></section>`;
  } else {
    resultDiv.innerHTML = results
      .map(r => `<section class="results"><h3>${r.word}</h3><p>${r.type}─${r.meaning}</p></section>`)
      .join("");
  }
}




