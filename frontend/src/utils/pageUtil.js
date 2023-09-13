export function setPageTitle(title = "") {
  document.title = `PokeFight ${title && "- " + title}`;
}

export function setBackgroundClass(className = "") {
  const defaultClass = "h-[100svh]";
  document.body.className = defaultClass;
  document.body.classList.add(className);
}
