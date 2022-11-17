const form = document.getElementById("novoItem");
const lista = document.querySelector("#lista");
const apagar = document.querySelector("#apagar");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach(elemento => {
    criaElemento(elemento);
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    
    const nome = evento.target.elements["nome"];
    const quantidade = evento.target.elements["quantidade"];
    
    const existe = itens.find(elemento => elemento.nome.toLowerCase() === nome.value.toLowerCase());
    
    let itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    
    if (existe) {
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
        criaElemento(itemAtual);
        itens.push(itemAtual);
    }
    
    localStorage.setItem("itens", JSON.stringify(itens).toLowerCase());
    form.reset();
    evento.target.elements["nome"].focus();
});

function criaElemento(item) {
    if(nome == "" || quantidade == "") {
        alert("Não deixe os campos em branco.");
        return false;
    } else {
        const novoItem = document.createElement("li");
        novoItem.classList.add("item");
        
        const numeroItem = document.createElement("strong");
        numeroItem.innerHTML = item.quantidade;
        numeroItem.dataset.id = item.id
        
        novoItem.appendChild(numeroItem);
        novoItem.innerHTML += item.nome.charAt(0).toUpperCase() + item.nome.slice(1);

        novoItem.appendChild(botaoApaga(item.id));
        
        lista.appendChild(novoItem);
    }
}

function atualizaElemento(item) {
    if(item.id != null) {
        document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
    } else {
        return false;
    }
}

function botaoApaga(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerHTML = "";
    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    })
    return elementoBotao;
}

function deletaElemento(tag, id) {
    tag.remove();
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
    console.log(itens);
    localStorage.setItem("itens", JSON.stringify(itens));
}