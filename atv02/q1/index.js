const addButton = document.forms.addTarefa.adicionar;
const input = document.querySelector("input");
const tarefas = document.querySelector(".tarefas");

addButton.addEventListener('click', handleAddButtonSubmitClick);
input.addEventListener('keyup', handleInputKeyUp);

function handleInputKeyUp(e){
    addButton.disabled = !(e.target.value.length > 2);
}

function handleRmvButtonSubmitClick(event){
    event.preventDefault();
    const div = event.target.closest(".tarefa");
    div.remove();
    if (!tarefas.firstChild){
        const message = document.createElement("h3");
        message.id = "no-item";
        message.textContent = "Lista de tarefas vazia";
        tarefas.appendChild(message);
    }
}

function handleAddButtonSubmitClick(event){
    event.preventDefault();
    if (buscarTarefa()){
        alert("Elemento ja inserido na lista de tarefas");
        document.forms.addTarefa.name.value = "";
        return;
    }
    addTarefa();
}

function buscarTarefa(){
    const elements = document.querySelectorAll(".tarefa");

    for (const element of elements) {
        const nomeTarefa = element.querySelector("h3").textContent.toLowerCase();
        if (nomeTarefa.includes(input.value.toLowerCase())){
            return true;
        }
    }
    return false;
}

function addTarefa(){
    if (tarefas.querySelector("#no-item")){
        tarefas.querySelector("#no-item").remove();
    };    

    const tarefasConteiner = document.querySelector(".tarefas");
    const divElement = createContainer(input.value);
    tarefasConteiner.appendChild(divElement);
    document.forms.addTarefa.name.value = "";
    // addButton.disabled = true;
}

function createContainer (inputValue){
    const divElement = document.createElement("div");
    divElement.classList.add("tarefa");

    const buttonElement = document.createElement("button");
    buttonElement.classList.add("remover");
    buttonElement.textContent = "X";
    buttonElement.addEventListener('click', handleRmvButtonSubmitClick);

    const taskElement = document.createElement("h3");
    taskElement.textContent = inputValue;

    divElement.appendChild(taskElement);
    divElement.appendChild(buttonElement);

    return divElement;
}

