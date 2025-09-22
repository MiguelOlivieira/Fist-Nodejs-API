import { randomUUID } from 'node:crypto';
import { Database } from './database.js';

const database = new Database()  

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (request, response) => {
             const users = database.select('users')

         return response
         .setHeader('Content-type', 'application/json') //Envia meta dados para o front (aplicacao ao lado do cliente)
         .end(JSON.stringify(users)) //conversão do array para json, e depois string. a API não consegue ler se mandarmos um array puro
   
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: (request, response) => {
            
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
    }
]