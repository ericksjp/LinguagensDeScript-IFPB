const btn = document.querySelector("button");
const inputAlcool = document.forms.combustiveis.alcool;
const inputGasosa = document.forms.combustiveis.gasolina;
const resp = document.querySelector("textarea");

console.log(inputAlcool);

inputAlcool.addEventListener("keyup", handleAlcoolKeyUp);
inputGasosa.addEventListener("keyup", handleGasosaKeyUp);
btn.addEventListener("click", handleBtnClick);

function handleAlcoolKeyUp(e) {
  toggleInputError(e.target, validarNum(e.target.value))
  liberateButton();
}

function handleGasosaKeyUp(e) {
  toggleInputError(e.target, validarNum(e.target.value))
  liberateButton();
}

function handleBtnClick(e) {
  e.preventDefault();
  const resp = melhorPreco(inputAlcool.value, inputGasosa.value);
  insertMessage(resp);
}

function validarNum(num) {
    if (Number(num) || num == 0) {
      return true;
    } else {
      return false;
    }
}  

function melhorPreco(valorAlc, valorGas){
    if (Number (valorAlc) > Number (valorGas)){
        return 0;
    } else if (Number (valorGas) > Number (valorAlc)){
        return 1;
    } else {
        return -1;
    }
}

function toggleInputError(inputElement, isValid) {
  if (isValid || inputElement.value == "") {
    inputElement.classList.remove("input-error");
  } else {
    inputElement.classList.add("input-error");
  }
}

function insertMessage(num){
    if (num == 0){
        resp.textContent = "Gasolina";
        resp.style.border = "2px solid orange"
    } else if(num == 1){
        resp.textContent = "Alcool";
        resp.style.border = "2px solid blue"
    } else {
        resp.textContent = "Empate";
        resp.style.border = "2px solid black"
    }
}

function liberateButton(){
    if (validarNum(inputAlcool.value) && validarNum(inputGasosa.value)){
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}