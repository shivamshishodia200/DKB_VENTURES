import { useEffect } from 'react'

/**
 * Custom Hook for Dynamic Page Title & Meta Description SEO
 * @param {string} title - Page title suffix
 * @param {string} description - Optional custom meta description
 */
export function useSEO(title, description = '') {
  useEffect(() => {
    const baseTitle = 'DKB VENTURES — Beauty, Personal Care & Wellness'
    document.title = title ? `${title} | DKB VENTURES` : baseTitle

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.name = 'description'
        document.head.appendChild(metaDesc)
      }
      metaDesc.content = description
    }
  }, [title, description])
}

