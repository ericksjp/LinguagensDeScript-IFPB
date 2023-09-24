const btn = document.querySelector("button");
const baseInput = document.forms.calculo.base;
const expoenteInput = document.forms.calculo.expoente;

btn.addEventListener('click', handleBtnClick);
baseInput.addEventListener("keyup", handleBaseInputKeyUp);
expoenteInput.addEventListener("keyup", handleExpoenteInputKeyUp);

function handleBtnClick(e){
    e.preventDefault();
    const result = calcularPotencia(Number (baseInput.value), Number (expoenteInput.value));
    const element = document.querySelector("textarea");
    element.textContent = `${result}`
}

function handleBaseInputKeyUp() {
  toggleInputError(baseInput, validateNum(baseInput.value));
  liberateButton();
}

function handleExpoenteInputKeyUp() {
    toggleInputError(expoenteInput, validateNum(expoenteInput.value));
    liberateButton();
}

function toggleInputError(inputElement, isValid) {
  if (isValid || inputElement.value == "") {
    inputElement.classList.remove("input-error");
  } else {
    inputElement.classList.add("input-error");
  }
}

function validateNum(num) {
  if (Number(num)) 
    return true;
  return false;
}

function liberateButton(){
    if (validateNum(baseInput.value) && validateNum(expoenteInput.value)){
        btn.disabled = false
    } else {
        btn.disabled = true;
    }
}

const calcularPotencia = (base,expoente) => Math.pow(base, expoente);