import * as listaF from './lista.js';

const nomeInput = document.querySelector("#nome-input");
const precoInput = document.querySelector("#preco-input");
const cadastroButao =  document.querySelector("#cadastroBTN");
const tbody = document.querySelector("tbody");


window.addEventListener('load', () => {
    resetarForm();
    renderizarValores();
})

window.addEventListener("storage", () => {
    renderizarValores();
});

nomeInput.addEventListener('input', () => {
    validarEntrada(nomeInput.value, precoInput.value, cadastroButao);
    controlarTamanho(nomeInput, 216, 420);
})

precoInput.addEventListener('input', () => {
    validarEntrada(nomeInput.value, precoInput.value, cadastroButao);
})

cadastroButao.addEventListener('click', (e) => {
    e.preventDefault();
    const item = listaF.criarItem(nomeInput.value,precoInput.value);
    listaF.adicionarItem(item);
    renderizarValores();
    resetarForm();
})

function renderizarValores(){
    tbody.replaceChildren(...listaF.listarItems().map(item => converterItemParaElemento(item)))
}

function converterItemParaElemento(item){
    const tr = document.createElement("tr");

    const tdNome = document.createElement("td");
    tdNome.textContent = item.nome;

    const tdPreco = document.createElement("td");
    tdPreco.setAttribute("preco-valor", item.preco);
    tdPreco.textContent = formatador.format(item.preco);
    
    const tdInputCheckBox = document.createElement("td");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    tdInputCheckBox.appendChild(checkBox);

    const tdRemoveButton =  document.createElement("td");
    const button =  document.createElement("button");
    button.textContent = "remover";
    tdRemoveButton.appendChild(button)

    eventos(checkBox, button, item);

    tr.appendChild(tdNome);
    tr.appendChild(tdPreco);
    tr.appendChild(tdInputCheckBox);
    tr.appendChild(tdRemoveButton);

    return tr;
}

/* função para adicionar os eventos ao elemento */
function eventos(checkBox, removeBTN, item){
    checkBox.addEventListener("click", () => {
        if (item.comprado == true){
            listaF.desmarcarItem(item);
        } else {
            listaF.marcarItem(item);
        }
    })

    removeBTN.addEventListener("click", (e) => {
        e.preventDefault();
        listaF.removerItem(item);
        renderizarValores();
    })
}

const formatador = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

function validarEntrada(nome, preco, button){
    if (nome.length > 3 && !isNaN(preco) && preco.length > 0){
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

function resetarForm(){
    document.querySelector("form").reset();
    controlarTamanho(nomeInput, 216, 420);
    cadastroButao.disabled = true;
}

function controlarTamanho(input, min = 300, max = 500){
    input.style.width = Math.min(Math.max(min,input.value.length * 12), max) + "px";
}