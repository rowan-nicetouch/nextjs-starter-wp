type StringList = Array<string> | string
type NumberList = Array<number> | string | number

/**
 * Global Parameters
 * https://developer.wordpress.org/rest-api/using-the-rest-api/global-parameters/
 */
export type GlobalParameters = {
  _embed?: StringList | true,
  _envelope?: true,
  _fields?: StringList,
  _jsonp?: string,
  _method?: string,
}

type SharedPostListArguments = GlobalParameters & {
  context?: string,
  page?: string | number,
  per_page?: string | number,
  search?: string,
  after?: string,
  modified_after?: string,
  author?: NumberList,
  author_exclude?: NumberList,
  before?: string,
  modified_before?: string,
  exclude?: NumberList,
  include?: NumberList,
  offset?: string | number,
  order?: `asc` | `desc`,
  orderby?: string,
  search_columns?: string,
  slug?: string,
  status?: string,
}

/**
 * List Post Arguments
 * https://developer.wordpress.org/rest-api/reference/posts/#arguments
 */
export type ListPostsArguments = SharedPostListArguments & {
  tax_relation?: string,
  categories?: string, // @todo
  categories_exclude?: string, // @todo
  tags?: string, // @todo
  tags_exclude?: string, // @todo
  sticky?: string,
}
export type ListPagesArguments = SharedPostListArguments & {
  menu_order?: number,
  parent?: NumberList,
  parent_exclude?: NumberList,
}

export type WpFetchParams = ListPagesArguments | ListPostsArguments | undefined


// New to Pages
