const textInput = document.querySelector("#nome-evento");
const dataInput = document.querySelector("#data-evento");
const sendButton = document.querySelector("#botao-enviar");
const divElement = document.querySelector(".events-div");

let key1 = false; 
let key2 = false;
const objetos = [];

window.addEventListener('load', () => {
    resetarForm();
})

/* controladores de input para evitar que o usuario de um input hue */

textInput.addEventListener("input", () => {
    key1 = textInput.value.length >= 3;
    controlarTamanho(textInput);
    sendButton.disabled = liberarButao(key1,key2);
    console.log(liberarButao(key1, key2))
});

dataInput.addEventListener('input', () => {
    const date = new Date(dataInput.value);
    key2 = !isNaN(date.getTime());
    sendButton.disabled = liberarButao(key1,key2);
});

/* evento que vai encapsular os inputs em um objeto, e adicionalos a lista, e remapear os elementos */

sendButton.addEventListener('click', (e) => {
    e.preventDefault();

    // 
    objetos.push({
        data: dataInput.value,
        nome: textInput.value,
    });

    objetos.sort((x1,x2) => new Date(x1.data) < new Date(x2.data)); 
    
    const elementos = objetos.map((obj) => criarElemento(obj.nome,obj.data));

    divElement.replaceChildren(...elementos);

    resetarForm();
})

/* função que transforma um objeto num elemento HTMl que será inserido na página */

function criarElemento (nome, data) {
    const elemento = document.createElement('div');
    elemento.classList.add("event");

    const spanName = document.createElement('span');
    spanName.classList.add('name-camp');
    spanName.textContent = nome;

    const spanData = document.createElement('span');
    spanData.classList.add('data-camp');
    spanData.setAttribute("data-value", data);
    spanData.textContent = converterParaDataBonita(data);

    const elementoNomeTexto = document.createElement('p');
    elementoNomeTexto.textContent = "Nome: ";
    elementoNomeTexto.appendChild(spanName);

    const elementoDataTexto = document.createElement('p');
    elementoDataTexto.textContent =  "Data: ";
    elementoDataTexto.appendChild(spanData);

    elemento.appendChild(elementoNomeTexto);
    elemento.appendChild(document.createElement("hr"));
    elemento.appendChild(elementoDataTexto);

    return elemento;
}

/* ------------------------------ funções auxiliares ------------------------------ */

function controlarTamanho(input, min = 300, max = 500){
    input.style.width = Math.min(Math.max(min,input.value.length * 12), max) + "px";
}

function liberarButao(...keys){
    return keys.some((key) => typeof key === 'boolean' && key === false);
}

function resetarForm(){
    document.querySelector("form").reset();
    key1 = false;
    key2 = false;
    sendButton.disabled = true;
}

function converterParaDataBonita (data) {
    const semCriatividadeParaNomeDeVariavel = {day:'numeric', month:'numeric', year:'numeric', hour:'2-digit', minute:'2-digit'};
    return new Date(data).toLocaleDateString(undefined,semCriatividadeParaNomeDeVariavel);
}