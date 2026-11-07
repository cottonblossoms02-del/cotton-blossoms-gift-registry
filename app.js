// Preview-only registry storage. Data stays in this browser until a shared database is connected.
const STORAGE_KEY = "cottonBlossomsRegistryPreview";
const readRegistries = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; } };
const writeRegistries = (items) => localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
const createForm = document.querySelector("#create-form");
const createMessage = document.querySelector("#create-message");
const results = document.querySelector("#registry-results");
createForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(createForm);
  const registry = {
    id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
    name: String(data.get("name")).trim(),
    title: String(data.get("title")).trim(),
    occasion: String(data.get("occasion")),
    location: String(data.get("location")),
    date: String(data.get("date") || "")
  };
  if (!registry.name || !registry.title) return;
  const all = readRegistries();
  all.unshift(registry);
  writeRegistries(all);
  createForm.reset();
  createMessage.textContent = "Preview registry created on this device. It is not yet published or shareable online.";
  renderResults(all);
});
function renderResults(items) {
  if (!items.length) {
    results.innerHTML = '<p class="empty">No registries found in this browser preview yet.</p>';
    return;
  }
  results.replaceChildren(...items.map((item) => {
    const card = document.createElement("article");
    card.className = "result-card";
    const title = document.createElement("h3"); title.textContent = item.title;
    const owner = document.createElement("p"); owner.textContent = "Created by " + item.name;
    const detail = document.createElement("p"); detail.textContent = item.occasion + " · Pickup: " + item.location + (item.date ? " · " + item.date : "");
    card.append(title, owner, detail);
    return card;
  }));
}
document.querySelector("#search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const term = new FormData(event.currentTarget).get("term").toString().trim().toLowerCase();
  const matches = readRegistries().filter((item) => (item.name + " " + item.title).toLowerCase().includes(term));
  renderResults(matches);
});
renderResults(readRegistries());