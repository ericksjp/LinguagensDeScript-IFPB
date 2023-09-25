const numerosInput = document.forms.formulario.numeros;
const separadorInput = document.forms.formulario.separador;
const spanElements = document.querySelectorAll("span");
const btn = document.querySelector("button");

btn.addEventListener('click', handleBtnClick);

function handleBtnClick(e){
    e.preventDefault();
    const arrayNums = parsear(numerosInput.value, separadorInput.value)
    if (verificarArray(arrayNums)){
        arrayNums.sort((x1,x2) => x2 - x1)
        const maiorNum =  arrayNums[0];
        const menorNum = arrayNums[arrayNums.length - 1];

        insertNums(maiorNum,menorNum);
    } else {
        spanElements[0].textContent = `Maior número: -`;
        spanElements[1].textContent = `Menor número: -`;
    }
}

function insertNums(num1,num2){
    spanElements[0].textContent = `Maior número: ${num1}`;
    spanElements[1].textContent = `Menor número: ${num2}`;
}

function parsear(str, separador){
    let numerosArray = str.split(separador);
    numerosArray = numerosArray.map((x) => Number(x));
    return numerosArray;
}

function verificarArray(array){
    if (array.length > 0 && array.every((x) => !isNaN(x)))
        return true;
    return false
}