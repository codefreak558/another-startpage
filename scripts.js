/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","reddit":"https://reddit.com/","maps":"https://maps.google.com/","youtube":"https://www.youtube.com/results?q={query}"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"5OjbusrXZumxHzLR","label":"chill","bookmarks":[{"id":"TFCDiyKfzDarogAU","label":"~/youtube","url":"https://www.youtube.com"},{"id":"oOUJeyuFLnKaWv19","label":"~/reddit","url":"https://www.reddit.com"},{"id":"1d5aU1dojSTgvL2d","label":"~/aniwave","url":"https://aniwave.to"},{"id":"61JLmdetFkm149Iq","label":"~/mangafire","url":"https://mangafire.to"}]},{"id":"ZPvfuYBZn1wll2yu","label":"design","bookmarks":[{"id":"5KPKp3GyayfvUp50","label":"~/colourhunt","url":"https://colorhunt.co/"},{"id":"hcLNIVtcNP4Pkqj8","label":"~/hues-happy","url":"https://www.happyhues.co/"},{"id":"doDDRZKi4GNgVgoQ","label":"~/backdrop-gen","url":"https://app.haikei.app/"},{"id":"x0CBli4Gau8epxIM","label":"~/terminal.sexy","url":"https://terminal.sexy/"}]},{"id":"1H3SdtyhCwcDfCUy","label":"dev","bookmarks":[{"id":"nThdG17StaiXImAC","label":"~/github","url":"https://github.com/codefreak558"},{"id":"SXtHVqG0z31OUmL8","label":"~/startpage","url":"https://github.com/codefreak558/startpage"},{"id":"BV0sPKYJqR8XBnwD","label":"~/dotfiles","url":"https://github.com/codefreak558/dotfiles"}]},{"id":"qTnT4fq3eQrowCAk","label":"homelab","bookmarks":[{"id":"YO1w2SyxxDr2XMse","label":"~/auth","url":"https://auth.codefreak.dev"},{"id":"LasoMK0paxZXrNKz","label":"~/homepage","url":"https://codefreak.dev"},{"id":"eGBpdt6PsqyxEdO7","label":"~/bitwarden","url":"https://vault.darkblue.co.za"},{"id":"Gq9XjraFhwaCQO7g","label":"~/document.storage","url":"https://paperless.codefreak.dev"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()