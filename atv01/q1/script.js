const btn = document.querySelector("button");

btn.addEventListener('click', handleBtnClick);

function handleBtnClick(){
    gerarNum();
}

function gerarNum(){
    const num = (Math.random() * 100).toFixed(0);
    const liElement = document.createElement("li");
    liElement.textContent = num;

    if (!document.querySelector("ul")){
        const ulElement = document.createElement("ul");
        ulElement.appendChild(liElement);

        document.body.appendChild(ulElement);
    } else {
        const ulElement = document.querySelector("ul");
        ulElement.appendChild(liElement);
    }
}