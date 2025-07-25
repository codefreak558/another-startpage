/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "searxng"
const engineUrls = {
  duckduckgo: "https://duckduckgo.com/?q={query}",
  google: "https://www.google.com/search?q={query}&udm=14",
  youtube: "https://www.youtube.com/results?q={query}",
  searxng: "https://search.darkblue.co.za/search?q={query}"
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

const bookmarks = [{"id":"5OjbusrXZumxHzLR","label":"chill","bookmarks":[{"id":"TFCDiyKfzDarogAU","label":"~/youtube","url":"https://www.youtube.com"},{"id":"oOUJeyuFLnKaWv19","label":"~/reddit","url":"https://www.reddit.com"},{"id":"1d5aU1dojSTgvL2d","label":"~/aniwave","url":"https://aniwave.to"},{"id":"61JLmdetFkm149Iq","label":"~/mangafire","url":"https://mangafire.to"}]},{"id":"qTnT4fq3eQrowCAk","label":"homelab","bookmarks":[{"id":"YO1w2SyxxDr2XMse","label":"~/auth","url":"https://auth.codefreak.dev"},{"id":"LasoMK0paxZXrNKz","label":"~/homepage","url":"https://codefreak.dev"},{"id":"eGBpdt6PsqyxEdO7","label":"~/bitwarden","url":"https://vault.darkblue.co.za"},{"id":"Gq9XjraFhwaCQO7g","label":"~/document.storage","url":"https://docs.darkblue.co.za"}]},{"label":"homelab.2","bookmarks":[{"label":"~/pterodactyl","url":"https://mc-panel.codefreak.dev"},{"label":"~/panel","url":"https://panel.codefreak.dev"},{"label":"~/statistics","url":"https://grafana.codefreak.dev"},{"label":"~/support","url":"https://support.darkblue.co.za"}]},{"label":"banking","bookmarks":[{"label":"~/standard.bank","url":"https://onlinebanking.standardbank.co.za/#/login"},{"label":"~/fnb","url":"https://www.fnb.co.za"},{"label":"~/nedbank","url":"https://secured.nedbank.co.za"},{"label":"~/capitec","url":"https://www.capitecbank.co.za/personal/transact/online-banking/"}]},{"label":"work","bookmarks":[{"label":"~/bobgo","url":"https://my.bobgo.co.za"},{"label":"~/shelving.store","url":"https://shelvingstore.co.za/wp-admin"},{"label":"~/invoicing","url":"https://fettlen.co.za/dev_store_admin"}]}]

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
