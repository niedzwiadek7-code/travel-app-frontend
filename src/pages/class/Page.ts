import { ReactNode } from 'react'

class Page {
  link: string

  component: ReactNode

  constructor(link: string, component: ReactNode) {
    this.link = link
    this.component = component
  }

  getRedirectLink(params: Record<string, string> = {}) {
    let url = this.link

    Object.entries(params).forEach(([key, value]) => {
      const phrase = `:${key}`
      url = url.replaceAll(phrase, value)
    })

    return url
  }
}

export default Page
