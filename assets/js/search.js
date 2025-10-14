// URLパラメータからqueryを取得
const params = new URLSearchParams(window.location.search);
const query = params.get("query");

// デモ用辞書（本番では外部JSONをfetchで読み込む）
const lexicon = {
  "名詞": [{"word":"pag","meaning":"私"},{"word":"bag","meaning":"あなた"}],
  "動詞": [{"word":"wag","meaning":"食べる"},{"word":"log","meaning":"持つ"}]
};

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
  resultDiv.textContent = "検索語が指定されていません。";
} else {
  alert(query+"を検索します");
  const results = searchWord(query);
  if (results.length === 0) {
    resultDiv.textContent = `「${query}」に一致する単語は見つかりませんでした。`;
  } else {
    resultDiv.innerHTML = results
      .map(r => `<p><span class="type">${r.type}</span><span class="word">${r.word}</span> — ${r.meaning}</p>`)
      .join("");
  }
}
</script>
</body>
</html>

