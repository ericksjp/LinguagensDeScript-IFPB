export default class ClienteBanco {
    static #_client_id = 0;
    #client_id;
    #nome;
    #documento;
    #saldo = 0;
    constructor(nome,documento,saldo = 0) {
        ClienteBanco.#_client_id++;
        this.#client_id = ClienteBanco.#_client_id;
        this.nome = nome;
        this.documento = documento;
        this.modificarSaldo(saldo);
    }

    get client_id(){
        return this.#client_id;
    }

    get nome() {
        return this.#nome;
    }

    set nome(nome){
        if (typeof nome !== 'string'){
            throw new TypeError('A variável "nome" precisa ser uma string');
        } else {
            this.#nome = nome;
        }
    }

    get documento() {
        return this.#documento;
    }

    set documento(documento) {
        const value = documento.toString();
        if (value.length != 6 || isNaN(value)){
            throw new TypeError('A variável "documento" precisa ser númerica e ter 6 caracteres');
        } else {
            this.#documento = value;
        }
    }

    get saldo () {
        return this.#saldo;
    }

    modificarSaldo(number){
        if (isNaN(number)){
            throw new TypeError('Aqui, só aceitamos valores númericos');
        } else {
            this.#saldo += Number (number);
        }
    }
}