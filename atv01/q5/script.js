const btn = document.querySelector("button");
const simulacoes = document.querySelector(".simulacoes");

const quantidade = 1000000;
let contador = 0;

btn.addEventListener("click", handleBtnClick);

function handleBtnClick(e) {
  contador++;
  e.preventDefault();
  const numsObj = simular(quantidade);
  insertElements(numsObj);
}

function simular(quantidade) {
  const numsObj = [
    ["1", 0],
    ["2", 0],
    ["3", 0],
    ["4", 0],
    ["5", 0],
    ["6", 0],
  ];

  for (let i = 0; i < quantidade; i++) {
    const sortedNum = Math.floor(Math.random() * 6) + 1;
    switch (sortedNum) {
      case 1:
        numsObj[0][1]++;
        break;
      case 2:
        numsObj[1][1]++;
        break;
      case 3:
        numsObj[2][1]++;
        break;
      case 4:
        numsObj[3][1]++;
        break;
      case 5:
        numsObj[4][1]++;
        break;
      case 6:
        numsObj[5][1]++;
        break;
    }
  }
  return numsObj.sort((a, b) => b[1] - a[1]);
}

function insertElements(numsObj) {
  const divElement = document.createElement("div");
  divElement.classList.add("simulacao");

  const h3Elment = document.createElement ("h3");
  h3Elment.textContent = `${contador}ᵃ simulação.`

  const ulElement = document.createElement("ul");

  numsObj.forEach((x) => {
    const element = document.createElement("li");
    const porcentagem = (x[1] / quantidade) * 100;
    element.textContent = `O número ${x[0]} caiu ${porcentagem.toFixed(
      2
    )}% das vezes (${x[1]})`;
    ulElement.appendChild(element);
  });

  divElement.appendChild(h3Elment);
  divElement.appendChild(ulElement);

  simulacoes.prepend(divElement);
}
