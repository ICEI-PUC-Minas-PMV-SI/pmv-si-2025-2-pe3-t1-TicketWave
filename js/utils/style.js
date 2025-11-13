const select = document.querySelector("#city-select");
const selected = select.querySelector(".select-selected");
const items = select.querySelector(".select-items");
const selectedText = selected.querySelector("span");

selected.addEventListener("click", () => {
  items.classList.toggle("hidden");
});

items.querySelectorAll("div").forEach(option => {
  option.addEventListener("click", () => {
    selectedText.textContent = option.textContent;
    items.classList.add("hidden");

    const value = option.dataset.value;
    console.log("Cidade selecionada:", value);
  });
});

document.addEventListener("click", e => {
  if (!select.contains(e.target)) {
    items.classList.add("hidden");
  }
});
