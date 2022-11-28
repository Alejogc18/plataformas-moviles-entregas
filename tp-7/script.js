function dibuCard(pokemones){
  const container = document.querySelector(".row");
  const cardContainer= document.createElement("div");
  cardContainer.classList.add("card-container");

  const col = document.createElement("div");
  col.classList.add("col-12", "col-md-6", "col-lg-4");

  const card = document.createElement("div");
  card.classList.add("card", "m-2");

  container.appendChild(col);
  col.appendChild(cardContainer);
  cardContainer.appendChild(card);


  card.addEventListener("click", ()=>{
    const modal = new bootstrap.Modal(document.querySelector("#Modal"));
    const img = document.querySelector("#shiny");
    document.querySelector(".modal-title").innerText=`${pokemones.name.toUpperCase()}`;
    document.querySelector("#pokeInfo1").innerText=`Tiene un peso de: ${pokemones.weight} kg.`;
    document.querySelector("#pokeInfo2").innerText=`Tiene una altura de: ${pokemones.height/10} metro/s.`;
    document.querySelector("#pokeInfo3").innerText=`Su forma shiny es:`;

    img.src = pokemones.sprites.front_shiny;

    modal.show()

  })

  const imagenPokemon = document.createElement("div");
  imagenPokemon.classList.add("img-container", "mx-auto", "mt-2");

  const imagen = document.createElement("img");
  imagen.src = pokemones.sprites.front_default;

  
  imagenPokemon.appendChild(imagen);

  const number = document.createElement("p");
  number.textContent = `${pokemones.id.toString().padStart(3, 0)}`;

  const name = document.createElement("p");
  name.classList.add("titulo", "text-center");
  number.classList.add("id", "text-center");
  name.textContent = pokemones.name.toUpperCase();

  card.appendChild(imagenPokemon);
  card.appendChild(number);
  card.appendChild(name);


}

async function fetchData(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data = await res.json();

  if (data) {
    let spinner = document.querySelector(".spinner-border");
    spinner.classList.add("d-none");
    dibuCard(data);
  }
}

let distancia = 1;
let limite = 9;

async function fetchPokemons(limite, distancia) {
  for (let i = distancia; i < limite + distancia; i++) {
    await fetchData(i);
  }
  distancia += limite;
}

function siguiente() {
  fetchPokemons(limite, (distancia += limite));
}

fetchPokemons(limite, distancia);
