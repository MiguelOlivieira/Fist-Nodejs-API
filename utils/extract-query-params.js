//['search = 'Miguel', 'page=2']
//['search', 'Miguel'] param.split('=')
//['page', '2']


export function extractQueryParams(query){


    //substr remove a '?' do query
    return query.substr(1).split('&').reduce((queryParams, param) => { //reduce permite percorrer o array e transforma-lo em qualquer coisa
        const [key, value] = param.split('=')

        queryParams[key] = value

        return queryParams
    }, {}) //no caso, será um objeto ({})
}