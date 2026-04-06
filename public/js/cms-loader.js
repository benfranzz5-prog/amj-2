(async function () {
  // Determine page-specific data file from <meta name="cms-page" content="hero">
  const pageMeta = document.querySelector('meta[name="cms-page"]')
  const pageSection = pageMeta ? pageMeta.getAttribute('content') : null

  const fetches = [
    fetch('/_data/contact.json').then(r => r.ok ? r.json() : {}),
    fetch('/_data/images.json').then(r => r.ok ? r.json() : {}),
    pageSection ? fetch(`/_data/${pageSection}.json`).then(r => r.ok ? r.json() : {}) : Promise.resolve({}),
  ]

  const [contact, images, pageData] = await Promise.all(fetches)
  const data = Object.assign({}, contact, pageData)

  // data-cms="key" → textContent
  document.querySelectorAll('[data-cms]').forEach(el => {
    const key = el.getAttribute('data-cms')
    if (key in data) el.textContent = data[key]
  })

  // data-cms-html="key" → innerHTML (address fields only — safe subset)
  document.querySelectorAll('[data-cms-html]').forEach(el => {
    const key = el.getAttribute('data-cms-html')
    if (key in data) el.innerHTML = data[key]
  })

  // data-cms-href="key" → href (tel: and mailto: only)
  document.querySelectorAll('[data-cms-href]').forEach(el => {
    const key = el.getAttribute('data-cms-href')
    const val = data[key]
    if (val && /^(tel:|mailto:)/.test(val)) el.href = val
  })

  // data-cms-bg="key" → backgroundImage (from images.json)
  document.querySelectorAll('[data-cms-bg]').forEach(el => {
    const key = el.getAttribute('data-cms-bg')
    const slot = images[key]
    if (slot && slot.src) el.style.backgroundImage = `url('/${slot.src}')`
  })

  // data-cms-src="key" → src (from images.json)
  document.querySelectorAll('[data-cms-src]').forEach(el => {
    const key = el.getAttribute('data-cms-src')
    const slot = images[key]
    if (slot && slot.src) el.src = '/' + slot.src
  })
})()
