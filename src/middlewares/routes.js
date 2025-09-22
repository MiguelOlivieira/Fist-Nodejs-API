import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from '../../utils/build-route-path.js';

const database = new Database()  

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (request, response) => {
           const { search } = request.query

             const users = database.select('users', search ? {
                name: search, //se o name ou email estiver no parametro search, 
                email: search
             }  : null ) // se não houver nada no parametro search, retorna null

         return response
         .setHeader('Content-type', 'application/json') //Envia meta dados para o front (aplicacao ao lado do cliente)
         .end(JSON.stringify(users)) //conversão do array para json, e depois string. a API não consegue ler se mandarmos um array puro
   
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
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

        },

    },
     {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (request, response) => {

         const { id } = request.params
         const {name, email} = request.body

         database.update('users', id, {
            name,
            email,
         })

         return response.writeHead(204).end()

        }
    },
    {
       method: 'DELETE',
       path: buildRoutePath('/users/:id'),
       handler: (request, response) => {

        const { id } = request.params  //recebe o route parameter
        
        database.delete('users', id)

        return response.writeHead(204).end()
       }
    }

]