document.querySelectorAll(".folder-button").forEach(button => {
    button.addEventListener("click", () => {
        const content = button.nextElementSibling;
        const isOpen = content.classList.contains("show");

        // いったん全て閉じる（同時開閉を防ぐ場合）
        document.querySelectorAll(".content").forEach(c => c.classList.remove("show"));
        document.querySelectorAll(".folder-button").forEach(b => b.classList.remove("active"));

        // 今押したものをトグル
        if (!isOpen) {
        button.classList.add("active");
        content.classList.add("show");
        }
    });
});

const searchInputs = document.querySelectorAll("input");

searchInputs.forEach(input => {input.placeholder = "単語を検索";});

document.querySelectorAll("main").forEach(box => {
    const section = box.querySelectorAll("section");
    if (section.length === 1) {
        box.insertAdjacentHTML("afterbegin",
            `<section>
                <h3>おっと！</h3>
                <p>まだこのページは完成していないようだ。<br>ごめんね。</p>
                </section>`);
    }

});

searchInputs.forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.isComposing) return;
    if (event.key === "Enter") {
      const query = input.value.trim();
      if (query !== "") {
        window.location.href = `https://sencha1104.github.io/logmasnit/vocabulary/search.html?query=${encodeURIComponent(query)}`;
      }
    }
  });
});

// randomWords.js

fetch("http://sencha1104.github.io/logmasnit/assets/json/lexicon.json")
  .then(res => res.json())
  .then(data => {
    const allWords = [];

    // 全カテゴリを一つの配列にまとめる
    for (const [type, words] of Object.entries(data)) {
      for (const item of words) {
        allWords.push({ ...item, type });
      }
    }

    // ランダムに5語取り出す
    const randomWords = pickRandom(allWords, 5);

    // 結果をHTMLに表示
    const container = document.getElementById("randomWords");
    container.innerHTML = randomWords
      .map(
        (r) =>
          `<p><span class="type">${r.type}</span> <span class="word">${r.word}</span> — ${r.meaning}</p>`
      )
      .join("");
  })
  .catch(err => console.error("ランダム単語の読み込みに失敗しました:", err));

// ランダム選択関数
function pickRandom(array, n) {
  const copy = [...array];
  const result = [];
  while (result.length < n && copy.length > 0) {
    const index = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(index, 1)[0]);
  }
  return result;
}

