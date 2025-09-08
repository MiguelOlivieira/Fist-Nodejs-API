import http from 'node:http';


const users = []; //ARRAY PARA APLICAÇÃO STATEFUL


const server = http.createServer(async (request, response) => { 
 const buffers = []

    for await (const chunk of request){ //percorre cada chunk do request (stream)
      buffers.push(chunk)
    }

    try{
      request.body = JSON.parse(Buffer.concat(buffers).toString()) //Conversão para json
    } catch {
      request.body = null
    }
    console.log(request.body.name);

   const {method, url} = request;

   console.log(method, url);


   console.log(request.headers);



   if(method == 'GET' && url == '/users'){
     return response
     .setHeader('Content-type', 'application/json') //Envia meta dados para o front (aplicacao ao lado do cliente)
     .end(JSON.stringify(users)) //conversão do array para json, e depois string. a API não consegue ler se mandarmos um array puro
   
   }

   if(method == 'POST' && url == '/users'){  //APLICAÇÃO STATEFUL.
      const { name, email } = request.body


            users.push({
         id : 1,
         name,
         email,
         bio : 'I love making movies'
      });

      return response.writeHead(201).end();
   }

    response.writeHead(404).end('NOT FOUND'); //Caso o endpoint não exista, cai diretamente no status 404

})

server.listen(3333)

