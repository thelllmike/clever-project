import { useEffect } from 'react'

const SITE = 'https://www.cleverproject.lk'

function setMeta(selector, content) {
    const el = document.head.querySelector(selector)
    if (el && content) el.setAttribute('content', content)
}

/**
 * Sets the page title, description and canonical URL for the current route,
 * so each page is indexed as its own page rather than a copy of the home page.
 */
export default function useSeo({ title, description, path = '/', jsonLd }) {
    useEffect(() => {
        const url = SITE + path

        document.title = title
        setMeta('meta[name="description"]', description)
        setMeta('meta[property="og:title"]', title)
        setMeta('meta[property="og:description"]', description)
        setMeta('meta[property="og:url"]', url)
        setMeta('meta[name="twitter:title"]', title)
        setMeta('meta[name="twitter:description"]', description)

        const canonical = document.head.querySelector('link[rel="canonical"]')
        if (canonical) canonical.setAttribute('href', url)

        // Optional page-specific structured data, removed again when leaving the page
        if (!jsonLd) return
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.textContent = JSON.stringify(jsonLd)
        document.head.appendChild(script)
        return () => script.remove()
        // jsonLd is a static object per page, so it is intentionally not a dependency
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, description, path])
}
