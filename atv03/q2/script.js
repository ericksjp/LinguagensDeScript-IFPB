import ClienteBanco from './ClienteBanco.js';

const button = document.querySelector("#form-button");
const nomeCliente = document.querySelector("#nome-cliente");
const documentoCliente = document.querySelector("#documento-cliente");
const saldoCliente = document.querySelector("#saldo-cliente");

let key1 = false;
let key2 = false;
let key3 = false;

let documentos = []

window.addEventListener('load', () => {
    resetarForm();
})

nomeCliente.addEventListener('input', () =>{
    if (nomeCliente.value.length >= 5){
        key1 = true;
    } else {
        key1 = false;
    }

    controlarTamanho(nomeCliente, 200, 500);
    liberarButao();
})

documentoCliente.addEventListener('input', () =>{
    if (documentoCliente.value.length == 6 && !isNaN(documentoCliente.value)){
        key2 = true;
    } else {
        key2 = false;
    }
    liberarButao();
})

saldoCliente.addEventListener('input', () =>{
    if (saldoCliente.value.length != 0 && !isNaN(saldoCliente.value)){
        key3 = true;
    } else {
        key3 = false;
    }
    liberarButao();
})


button.addEventListener('click', (e) => {
    e.preventDefault();

    if (documentos.includes(documentoCliente.value)){
        window.alert("Documento " + documentoCliente.value + " já cadastrado no sistema! Tente novamente...");
        resetarForm();
    } else {
        documentos.push(documentoCliente.value);

        const cliente = new ClienteBanco(nomeCliente.value,documentoCliente.value,saldoCliente.value);
        const element = clienteToElement(cliente);

        document.querySelector(".clientes-cadastrados").appendChild(element);
        turnRedGreen(element);
        resetarForm();
    }
})

function clienteToElement(cliente) {
    const { cliente_id, nome, documento, saldo } = cliente;

    const div = document.createElement("div");
    div.id = cliente_id;
    div.classList.add("cliente");

    /* ---------------------------------------------------------------------------- */

    const data = document.createElement("div");
    data.classList.add('data');
    const nomeElement = document.createElement("p");
    nomeElement.classList.add("nome");
    nomeElement.textContent = "Nome: " + nome;
    data.appendChild(nomeElement);
    
    data.appendChild(document.createElement("hr"));
    
    const documentoElement = document.createElement("p");
    documentoElement.classList.add("documento");
    documentoElement.textContent = "Documento: " + documento;
    data.appendChild(documentoElement);
    
    data.appendChild(document.createElement("hr"));
    
    const saldoElement = document.createElement("p");
    saldoElement.classList.add("saldo");
    saldoElement.textContent = "Saldo: " + formatoMoeda.format(saldo);
    data.appendChild(saldoElement);

    /* ---------------------------------------------------------------------------- */
    
    const caixa = document.createElement("div");
    caixa.classList.add("caixa");
    
    const sacarButton = document.createElement("button");
    sacarButton.classList.add("saque");
    sacarButton.textContent = "Sacar";
    caixa.appendChild(sacarButton);
    
    const deposButton = document.createElement("button");
    deposButton.classList.add("deposito");
    deposButton.textContent = "Depositar";
    caixa.appendChild(deposButton);

    /* ---------------------------------------------------------------------------- */

    div.appendChild(data);
    div.appendChild(caixa);

    /* ---------------------------------------------------------------------------- */

    div.querySelector(".saque").addEventListener('click', () => {
        cliente.modificarSaldo(-100);
        div.querySelector(".saldo").textContent = "Saldo: " + formatoMoeda.format(cliente.saldo);
        turnRedGreen(div);
    })
    div.querySelector(".deposito").addEventListener('click', () => {
        cliente.modificarSaldo(100);
        div.querySelector(".saldo").textContent = "Saldo: " + formatoMoeda.format(cliente.saldo);
        turnRedGreen(div);
    })

    return div;
}

function controlarTamanho(input, min = 300, max = 500){
    input.style.width = Math.min(Math.max(min,input.value.length * 12), max) + "px";
}

function turnRedGreen(element) {
    const saldoElement = element.querySelector(".saldo");

    let saldo = element.querySelector(".saldo").textContent;
    const negative = saldo.includes('-') ? -1:1;
    saldo = saldo.slice(10).replaceAll(".", "").replace(',','.')

    const saldoNum = Number (saldo) * negative;
    if (saldoNum >= 1000){
        saldoElement.style.color = 'green';
    } else if (saldoNum < 0){
        saldoElement.style.color = 'red';
    } else {
        saldoElement.style.color = 'black';
    }
}

const formatoMoeda = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

function liberarButao() {
    if (key1 && key2 && key3){
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

function resetarForm(){
    document.querySelector("form").reset();
    key1 = false;
    key2 = false;
    key3 = false;
    button.disabled = true;
}