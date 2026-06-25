const filmes = [
{
    nome:"Aí Que Vida!",
    genero:"Comédia",
    imagem:"images-7.jpeg"
},

{
    nome:"Vingadores Ultimato",
    genero:"Ação",
    imagem:"images-6.jpeg"
},

{
    nome:"Interestelar",
    genero:"Ficção",
    imagem:"images-4.jpeg"
},

{
    nome:"Toy Story",
    genero:"Animação",
    imagem:"images-5.jpeg"
},

{
    nome:"Homem-Aranha",
    genero:"Ação",
    imagem:"images-3.jpeg"
},

{
    nome:"Shrek",
    genero:"Animação",
    imagem:"images-2.jpeg"
}
];

const catalogo = document.getElementById("catalogo");
const pesquisa = document.getElementById("pesquisa");
const filtroGenero = document.getElementById("filtroGenero");

let favoritos =
JSON.parse(localStorage.getItem("favoritos"))
|| [];

function mostrarFilmes(lista){

    catalogo.innerHTML = "";

    lista.forEach(filme => {

        const favoritado =
        favoritos.includes(filme.nome);

        catalogo.innerHTML += `
        <div class="card">

            <img src="${filme.imagem}">

            <div class="info">

                <h2>${filme.nome}</h2>

                <p>${filme.genero}</p>

                <button
                onclick="favoritar('${filme.nome}')">

                ${
                    favoritado
                    ? "❤️ Favoritado"
                    : "🤍 Favoritar"
                }

                </button>

            </div>

        </div>
        `;
    });
}

function favoritar(nome){

    if(favoritos.includes(nome)){

        favoritos =
        favoritos.filter(
            filme => filme !== nome
        );

    }else{

        favoritos.push(nome);

    }

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

    aplicarFiltros();
}

function aplicarFiltros(){

    const texto =
    pesquisa.value.toLowerCase();

    const genero =
    filtroGenero.value;

    const resultado =
    filmes.filter(filme => {

        const nomeValido =
        filme.nome
        .toLowerCase()
        .includes(texto);

        const generoValido =
        genero === "todos" ||
        filme.genero === genero;

        return nomeValido &&
        generoValido;

    });

    mostrarFilmes(resultado);
}

pesquisa.addEventListener(
    "input",
    aplicarFiltros
);

filtroGenero.addEventListener(
    "change",
    aplicarFiltros
);

mostrarFilmes(filmes);