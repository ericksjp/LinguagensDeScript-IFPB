class Transacao {
    constructor(descricao, valor){
        this.descricao = descricao;
        this.valor =  valor;
    }
}

const tbody = document.querySelector("tbody");
const butao = document.querySelector("#butao");
const descricaoInput = document.querySelector("#descricao");
const footer = document.querySelector("tfoot")
const valorInput = document.querySelector("#valor");

let key1 = false;
let key2 = false;
const transacoes = [];

window.addEventListener('load', () => {
    resetarForm();
})

descricaoInput.addEventListener('input', () => {
    controlarTamanho(descricaoInput);
    if (descricaoInput.value.length >= 3)
        key1 = true;
    else 
        key1 = false;

    butao.disabled = liberarButao(key1,key2);
})

valorInput.addEventListener('input', () => {
    controlarTamanho(valorInput);
    if (valorInput.value.length > 0 && !isNaN(valorInput.value))
        key2 = true;
    else 
        key2 = false

    console.log(liberarButao(key1,key2));
    
    butao.disabled = liberarButao(key1,key2);
})

butao.addEventListener('click', (e) => {
    e.preventDefault();

    const transacao = new Transacao(descricaoInput.value, Number(valorInput.value));
    transacoes.push(transacao);
    const total = transacoes.map((x) => x.valor).reduce((total, x) => total + x);  

    const footValue = footer.querySelector(".valor");
    footValue.setAttribute("valor-transacao", total);
    footValue.textContent = formatador.format(total);
    turnRedGreen(footValue);

    const element = transacaoToElement(transacao);
    tbody.appendChild(element);

    resetarForm();
})

function controlarTamanho(input, min = 300, max = 500){
    input.style.width = Math.min(Math.max(min,input.value.length * 12), max) + "px";
}

function liberarButao(...keys){
    return keys.some((key) => typeof key === 'boolean' && key === false);
}

function transacaoToElement(transacao) {
    const tr = document.createElement("tr");

    const tdDesc = document.createElement("td");
    tdDesc.classList.add("descricao");
    tdDesc.textContent = transacao.descricao;

    const tdValor = document.createElement("td");
    tdValor.classList.add("valor");
    tdValor.setAttribute("valor-transacao", transacao.valor);
    tdValor.textContent = formatador.format(transacao.valor);
    turnRedGreen(tdValor);

    tr.appendChild(tdDesc);
    tr.appendChild(tdValor);

    return tr;
}

function turnRedGreen(element){
    const valor = Number(element.getAttribute('valor-transacao'));
    if (valor > 0){
        element.style.color = 'green';
    } else if (valor < 0){
        element.style.color = 'red';
    }
}

const formatador = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

function resetarForm(){
    document.querySelector("form").reset();
    key1 == false;
    key2 == false;
    butao.disabled = true;
}