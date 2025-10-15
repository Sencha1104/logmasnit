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

// ▼ ひらがな変換用の関数（基本的なもの）
function toHiragana(text) {
  // 全角カタカナをひらがなに
  return text.replace(/[\u30a1-\u30f6]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
}

function normalize(text) {
  return toHiragana(text).toLowerCase().trim();
}

// ▼ 検索関数
function searchWord(query) {
  const normQuery = normalize(query);
  const results = [];

  for (const [type, words] of Object.entries(lexicon)) {
    for (const item of words) {
      const meaningNorm = normalize(item.meaning);

      // 通常一致 OR ひらがな一致
      if (
        item.word.toLowerCase().includes(normQuery) ||
        meaningNorm.includes(normQuery)
      ) {
        results.push({ ...item, type });
      }
    }
  }
  return results;
}


const resultDiv = document.getElementById("results");

if (!query) {
  resultDiv.textContent = "検索語が指定されていません。";
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


