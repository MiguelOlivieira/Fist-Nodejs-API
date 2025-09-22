import fs from 'node:fs/promises' //Import para trabalharmos com arquivos do sistema

const dataBasePath = new URL('../db.json', import.meta.url) //Nome do arquivo e o caminho onde deve ser criado

export class Database{
 #database = {} //objeto

    constructor() {
        fs.readFile(dataBasePath, 'utf8').then(data =>{ //leitura do arquivo do banco
            this.#database = JSON.parse(data) //conversão em json, já que o database é um objeto 
        })
        .catch(() =>{
            this.#persist() //o arquivo vai ser criado mesmo se ele não existir
        }
        )
    }

 #persist() {
    fs.writeFile(dataBasePath, JSON.stringify(this.#database))
 }

    select(table, search) {
        let data = this.#database[table] ?? [] //caso não exista nada com o nome do parametro no objeto, retornará vazio

        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => { //converte para array e depois percorre
                    return row[key].toLowerCase().includes(value.toLowerCase()) //key é o name ou email
                })
            })
        }


        return data
    }


    insert(table, data) {
        if (Array.isArray(this.#database[table])) { //se já houver algo na tabela
            this.#database[table].push(data)  
        } else {
            this.#database[table] = [data] //caso a tabela esteja vazia
        }

        this.#persist();

        return data
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id == id)
        
        if (rowIndex > -1) {
            this.#database[table][rowIndex] = {id, ...data}
            this.#persist()
        }
    
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id == id) //percorre o array de users, e busca se tem algum id semelhante ao dejeado, retornando o indice.
    
        if (rowIndex > -1) { //O rowindex retorna -1 quando não encontra nada
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }


}