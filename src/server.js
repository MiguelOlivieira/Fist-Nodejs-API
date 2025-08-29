import http from 'http';


const users = []; //ARRAY PARA APLICAÇÃO STATEFUL


const server = http.createServer((request, response) => { 

   const {method, url} = request;

   console.log(method, url);


   


   if(method == 'GET' && url == '/users'){
     return response
     .setHeader('Content-type', 'application/json') //Envia meta dados para o front (aplicacao ao lado do cliente)
     .end(JSON.stringify(users)) //conversão do array para json, e depois string. a API não consegue ler se mandarmos um array puro
   
   }
   if(method == 'POST' && url == '/users'){  //APLICAÇÃO STATEFUL.

            users.push({
         id : 1,
         name : 'John',
         email : 'johntravolta24@outlook.com',
         bio : 'I love making movies'
      });

      return response.end('CRIAÇÃO DE USUARIO')
   }

    response.end('Hellddddo World\n');

})

server.listen(3333)

