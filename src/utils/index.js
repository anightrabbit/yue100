import queryString from 'query-string'

export const getUrlQuery = (search = location.search) => {
    return queryString.parse(search)
}
