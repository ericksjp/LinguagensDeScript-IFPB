const filmData = document.querySelector(".dataFilms");
const procurarCamp = document.querySelector("input");
const filmes = [{
    "titulo": "Dawn of the Planet of the Apes",
    "lancamento": 2014,
},
{
    "titulo": "District 9",
    "lancamento": 2009,
},
{
    "titulo": "Transformers: Age of Extinction",
    "lancamento": 2014,
},
{
    "titulo": "X-Men: Days of Future Past",
    "lancamento": 2014,
},
{
    "titulo": "The Machinist",
    "lancamento": 2004,
},
{
    "titulo": "The Last Samurai",
    "lancamento": 2003,
},
{
    "titulo": "The Amazing Spider-Man 2",
    "lancamento": 2014,
},
{
    "titulo": "Tangled",
    "lancamento": 2010,
},
{
    "titulo": "Rush",
    "lancamento": 2013,
},
{
    "titulo": "Drag Me to Hell",
    "lancamento": 2009,
},
{
    "titulo": "Despicable Me 2",
    "lancamento": 2013,
},
{
    "titulo": "Kill Bill: Vol. 1",
    "lancamento": 2003,
},
{
    "titulo": "A Bug's Life",
    "lancamento": 1998,
},
{
    "titulo": "Life of Brian",
    "lancamento": 1972,
},
{
    "titulo": "How to Train Your Dragon",
    "lancamento": 2010,
}];

//inserindo os filmes
filmes.forEach((film) => {
    ulElement = document.createElement("ul");
    ulElement.innerHTML = `
    <li>Título: ${film.titulo}</li>
    <li>Lançamento: ${film.lancamento}</li>
    `;
    filmData.appendChild(ulElement);
})

procurarCamp.addEventListener("keyup", procurarCampInputHandler);

function procurarCampInputHandler(){
    procurarFilme();
}

function procurarFilme() {
    const elements = document.querySelector(".dataFilms").querySelectorAll("ul");
    const procurarPor = procurarCamp.value.toLowerCase().trim();
  
    for (const ulElement of elements) {
      const name = ulElement.querySelectorAll("li")[0].textContent.toLowerCase().trim().substring(8);
      const dataLancamento = ulElement.querySelectorAll("li")[1].textContent.trim().substring(12);
      
      if (name.includes(procurarPor) || dataLancamento.includes(procurarPor))
        ulElement.style.display = "";
       else 
        ulElement.style.display = "none";
    }
}
