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

searchInputs.forEach(input => {input.placeholder = "検索機能テスト2";});

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

searchInputs.addEventListener("keydown", (event) => {
// 日本語変換中（Composition中）なら無視
if (event.isComposing) return;

// Enterキー押下を検出
if (event.key === "Enter") {
  const query = searchInputs.value.trim();
  if (query !== "") {
    // search.html にクエリ付きで遷移
    window.location.href = `search.html?query=${encodeURIComponent(query)}`;
  }
}
});



