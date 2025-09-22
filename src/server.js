import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './middlewares/routes.js';
import { extractQueryParams } from '../utils/extract-query-params.js';


const server = http.createServer(async (request, response) => { 


      
   const {method, url} = request;

   console.log(method, url);
   console.log(request.headers);

   await json(request, response)


    console.log(request.body);


   const route = routes.find(route =>{
      return route.method == method && route.path.test(url) //validando se o regex na url é valido
   })

   if (route){
      const routeParams = request.url.match(route.path)

      //console.log(extractQueryParams(routeParams.groups.query)) // { search = 'Miguel' }

      const { query, ...params} = routeParams.groups

      request.params = params //recebe apenas os groups, que no caso é o id, além disso estamos passando para o request, permitindo acessar
                                              //pelos requests no routes.

      request.query = query ? extractQueryParams(query) : {} //caso  o query esteja vazio, retorna um objeto vazio
      

      return route.handler(request, response)
   }

    response.writeHead(404).end('NOT FOUND'); //Caso o endpoint não exista, cai diretamente no status 404

})

server.listen(3333)

