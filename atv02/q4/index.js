const addButton = document.forms.addFuncionario.adicionar;
const nameInput = document.forms.addFuncionario.name;
const salarioInput = document.forms.addFuncionario.salario;
const funcionariosConteiner = document.querySelector(".funcionarios");
const maiorSalario = document.querySelector("#maiorSalarioNome");
const somaSalario = document.querySelector("#somaSalario");

addButton.addEventListener("click", handleAddButtonSubmitClick);
nameInput.addEventListener("keyup", handleInputKeyUp);
salarioInput.addEventListener("keyup", handleSalarioInputKeyUp);

function handleInputKeyUp() {
  enableButton(addButton);
}

function handleSalarioInputKeyUp() {
  enableButton(addButton);
}

function handleAddButtonSubmitClick(event) {
  event.preventDefault();
  if (buscarFuncionario(nameInput.value)) {
    alert("Elemento ja inserido na lista de tarefas");
    document.forms.addFuncionario.name.value = "";
    return;
  }
  addFuncionario();
}

function buscarFuncionario(name) {
  const elements = document.querySelectorAll(".funcionario");

  if (elements === null) {
    return false;
  } else {

    for (const element of elements) {
      const funcionario = element.querySelector("ul").querySelector("li").querySelector("strong").textContent;
      if (name.includes(funcionario.toLowerCase())) {
        return true;
      }
    }

  }
  return false;
}

function addFuncionario() {
  if (funcionariosConteiner.querySelector("#no-item"))
    funcionariosConteiner.querySelector("#no-item").remove();

  const divElement = createContainer(nameInput.value, salarioInput.value);
  funcionariosConteiner.appendChild(divElement);

  somaSalario.textContent = `R$ ${salarioTotal().toFixed(2)}`
  maiorSalario.textContent = acharMaiorSalario();

  document.forms.addFuncionario.name.value = "";
  document.forms.addFuncionario.salario.value = "";
  addButton.disabled = true;
}

function createContainer(name, salario) {
  const divElement = document.createElement("div");
  divElement.classList.add("funcionario");

  const ulElement = document.createElement("ul");

  const liElementName = document.createElement("li");
  liElementName.classList.add("nomeFuncionario")
  liElementName.innerHTML = `Funcionario: <strong>${name}</strong>`;

  const liElementSalario = document.createElement("li");
  liElementSalario.classList.add("salarioFuncionario")
  liElementSalario.innerHTML = `Salário: <strong>R$ ${Number(salario).toFixed(2)} </strong>`;

  ulElement.appendChild(liElementName);
  ulElement.appendChild(liElementSalario);

  divElement.appendChild(ulElement);

  return divElement;
}

function salarioTotal(){
    const elements = Array.from(document.querySelectorAll(".salarioFuncionario")).map((x) => Number (x.textContent.substring(11)));
    const somador = elements.reduce((x1,x2) => x1 + x2);

    return somador;
}

function acharMaiorSalario(){
    let elements = Array.from(document.querySelectorAll("ul"));
    elements = elements.sort((x1,x2) => {
        const salario1 = Number(x1.querySelector(".salarioFuncionario").textContent.substring(11));
        const salario2 = Number(x2.querySelector(".salarioFuncionario").textContent.substring(11));
        return salario2 - salario1;
    })
    
    return elements[0].querySelector(".nomeFuncionario").textContent.substring(12);
}


function enableButton(button) {
  if (nameInput.value.length > 3 && Number(salarioInput.value)) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}
