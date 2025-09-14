import http from 'node:http';
import { json } from './middlewares/json.js';
import { randomUUID } from 'node:crypto';
import { Database } from './middlewares/database.js';

const database = new Database()


const server = http.createServer(async (request, response) => { 


    console.log(request.body);
      
   const {method, url} = request;

   console.log(method, url);
   console.log(request.headers);

   await json(request, response)

   if(method == 'GET' && url == '/users'){
      const users = database.select('users')

     return response
     .setHeader('Content-type', 'application/json') //Envia meta dados para o front (aplicacao ao lado do cliente)
     .end(JSON.stringify(users)) //conversão do array para json, e depois string. a API não consegue ler se mandarmos um array puro
   
   }

   if(method == 'POST' && url == '/users'){  //APLICAÇÃO STATEFUL.
      const { name, email } = request.body


          const user = {
         id : randomUUID(),
         name,
         email,
         bio : 'I love making movies'
      };

      database.insert('users', user)
      return response.writeHead(201).end();
   }

    response.writeHead(404).end('NOT FOUND'); //Caso o endpoint não exista, cai diretamente no status 404

})

server.listen(3333)

