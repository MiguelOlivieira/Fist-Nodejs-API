export async function json(request, response) {
    const buffers = []

    for await (const chunk of request) { //percorre cada chunk do request (stream)
        buffers.push(chunk)
    }

    try {
        request.body = JSON.parse(Buffer.concat(buffers).toString()) //Conversão para json
    } catch {
        request.body = null
    }

    response.setHeader('Content-type', 'application/json') //devolve os dados em json
}