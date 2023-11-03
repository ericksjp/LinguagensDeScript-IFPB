function criarItem(nome, preco){
    const codigoDeBarrasNumerico = geradorCodigoBarrasNumerico(nome)
    
    return {
        id: idController(),
        nome: nome,
        preco: preco,
        comprado: false,
        codidoBarrasNum: codigoDeBarrasNumerico
    }
}

function adicionarItem(item){
    localStorage.setItem(item.id, JSON.stringify(item))
}

function listarItems() {
  return Object.keys(localStorage).filter((chave) => chave != "id-controler").map((chave) => JSON.parse(localStorage.getItem(chave)));
}

function removerItem(item) {
    localStorage.removeItem(item.id);
    if (Object.keys(localStorage).length == 1){
        localStorage.removeItem("id-controler");
    }
}

function marcarItem(item){
    item.comprado = true
    localStorage.setItem(item.id, JSON.stringify(item))
}

function desmarcarItem(item){
    item.comprado = false;
    localStorage.setItem(item.id, JSON.stringify(item))
}

/* Funções auxiliares */  

/* gera um codigo de barras de acordo com o valor passado*/
function geradorCodigoBarrasNumerico(string) {
    if (string.length == 0) 
        return 0;

    let hash = 0;     
    for (let i = 0; i < string.length; i++) {
        let valorChar = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + valorChar;
        hash = hash & hash;
    }
     
    return hash;
}

/* função para controlar o objeto armazenado no local storage responsavel por atribuir os ids e chaves dos items */
/* não excluir */
function idController(){
    const id = localStorage.getItem("id-controler");
    if (!id){
        const seguro = Object.keys(localStorage).length; // caso o objeto seja exluido, isso vai garantir o funcionamento do programa
        localStorage.setItem("id-controler", seguro);
        return seguro;
    } else {
        localStorage.setItem("id-controler", Number(id) + 1)
        return Number(id) + 1;
    }
}


export {criarItem, adicionarItem, removerItem,listarItems, marcarItem, desmarcarItem}