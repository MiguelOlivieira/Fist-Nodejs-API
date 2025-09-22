import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './middlewares/routes.js';


const server = http.createServer(async (request, response) => { 


      
   const {method, url} = request;

   console.log(method, url);
   console.log(request.headers);

   await json(request, response)


    console.log(request.body);


   const route = routes.find(route =>{
      return route.method == method && route.path == url
   })

   if (route){
      return route.handler(request, response)
   }

    response.writeHead(404).end('NOT FOUND'); //Caso o endpoint não exista, cai diretamente no status 404

})

server.listen(3333)

