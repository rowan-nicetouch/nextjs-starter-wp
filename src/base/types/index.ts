export type AcfImage = {
  alt: string,
  height: number,
  id: number,
  src: string,
  width: number
}
export type AcfLink = {
  href: string,
  text: string,
  target: string,
}
export type WpImage = {
  alt: string,
  height: number,
  id: number,
  src: string,
  width: number
}
export type WpMenuItem = {
  id: number,
  src: string,
  linkText: string,
  parentId: number,
  position: number,
  target: string,
  title: string,
  description: string,
  classes: string,
  children: Array<WpMenuItem>
}
export type WpPost = {
  authorId: number,
  author: null,
  categoryIds: Array<number>,
  categories: Array<WpTerm>,
  commentStatus: string,
  content: string,
  dateModified: string,
  dateModifiedUtc: string,
  datePublished: string,
  datePublishedUtc: string,
  excerpt: string,
  featuredMediaId: number,
  featuredImage: null,
  format: string,
  id: number,
  link: string,
  // meta: Array.isArray(aught?.meta) ? aught?.meta : [],
  pingStatus: string,
  slug: string,
  status: string,
  sticky: boolean,
  tagIds: Array<number>,
  tags: Array<WpTerm>,
  template: string,
  terms: Array<WpTerm>,
  title: string,
  type: string,
}

export type WpTerm = {
  id: number,
  link: string,
  name: string,
  slug: string,
  taxonomy: string,
  acf: any,
}

export * from './wp-rest-api'
