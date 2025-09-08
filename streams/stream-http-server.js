import http from 'node:http'
import { Transform } from 'node:stream'


class ConvertToNegativeNumberStream extends Transform {
    
    _transform(chunk, encoding, callback){
     const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

     callback(null, Buffer.from(String(transformed)))
    }
}



const server = http.createServer(async (request, response) => {
    const buffers = []

    for await (const chunk of request){ //percorre cada chunk do request (stream)
      buffers.push(chunk)
    }

    //Após todos os chuks do request serem percorridos, o for irá encerrar.

    const fullStreamContent = Buffer.concat(buffers).toString() 

    console.log(fullStreamContent)

    return response.end(fullStreamContent)

   
})


server.listen(3334)