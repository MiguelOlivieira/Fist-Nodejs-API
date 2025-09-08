import {Readable} from 'node:stream'


class OneToHundredStream extends Readable {

    index = 1;
    _read() {

        const i = this.index++


     setTimeout(() => {
           if(i > 5){
            this.push(null)
        } else{
            const buffer = Buffer.from(String(i));
            this.push(buffer);
        }
     }, 1000);
    }
}

 //fetch api permite fazer requisições de uma aplicação para outra, ou de um endereço para outro. Front para back ou vice-versa 
fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(), //Passando a stream como body
    duplex: 'half'
}).then(response => {
    return response.text()
}).then(data => {
    console.log(data)
})
