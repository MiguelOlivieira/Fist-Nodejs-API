export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g //regex para parametros
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<id>[a-z0-9\-_]+)')
    
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)//"?" significa que o grupo é opcional
                                                    //novogrupo
    return pathRegex
}