const containerPokemon = document.querySelector("#container-pokemon")
const spinner = document.querySelector("#spinner")

let offset = 1;
let limit = 150;

const morePokemons = () => {
    offset += 151
    fetchPokemons(offset, limit);
  };

function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            createPokemon(data)
            spinner.style.display = "none";
        })
        .catch(error => alert(error));
}

function fetchPokemons(offset, limit) {
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++) {
        if (i > 906){
            alert("Ha llegado al tope de Pokemons")
            break
        }
        else if (i <= 898){
            fetchPokemon(i);
        }
    }
}


function createPokemon(data){
    let pokemon = data
    let elemento = document.createElement("div")
    elemento.innerHTML = `
        <div class="col">
            <div class="card">
                <h6 class="text-end text-bg-warning ms-auto mt-2 me-2 p-1 rounded">
                    #${pokemon.id}
                </h6>
                <img src="${pokemon.sprites.front_default}" alt="" class="img-fluid">
                <h4 class="card-title text-center text-capitalize">
                    ${pokemon.name}
                </h4>
                <button type="button" class="btn btn-dark col-8 text-warning mx-auto my-2" data-bs-toggle="modal" data-bs-target="#flush-${pokemon.id}">Ver mas</button>
            </div>
            <div class="modal fade" id="flush-${pokemon.id}" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-capitalize">
                                ${pokemon.name}
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <div class="text-capitalize">
                                        <b>
                                            Type:
                                        </b>
                                        ${pokemon.types[0].type.name}
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <b>
                                        Base Experience:
                                    </b>
                                    ${pokemon.base_experience}
                                </li>
                                <li class="list-group-item">
                                    <b>
                                        Height:
                                    </b>
                                    ${pokemon.height} cm
                                </li>
                                <li class="list-group-item">
                                    <b>
                                        Weight:
                                    </b>
                                    ${pokemon.weight} kg
                                </li>
                                <li class="list-group-item">
                                    <b>
                                        Statistics:
                                    </b>
                                    <div class="text-start text-capitalize">
                                        <i class="bi bi-caret-right-fill"></i>
                                        ${pokemon.stats[0].stat.name}:
                                        ${pokemon.stats[0].base_stat}
                                        <br>
                                        <i class="bi bi-caret-right-fill"></i>
                                        ${pokemon.stats[1].stat.name}:
                                        ${pokemon.stats[1].base_stat}
                                        <br>
                                        <i class="bi bi-caret-right-fill"></i>
                                        ${pokemon.stats[2].stat.name}:
                                        ${pokemon.stats[2].base_stat}
                                        <br>
                                        <i class="bi bi-caret-right-fill"></i>
                                        ${pokemon.stats[3].stat.name}:
                                        ${pokemon.stats[3].base_stat}
                                        <br>
                                        <i class="bi bi-caret-right-fill"></i>
                                        ${pokemon.stats[4].stat.name}:
                                        ${pokemon.stats[4].base_stat}
                                        <br>
                                        <i class="bi bi-caret-right-fill"></i>
                                        ${pokemon.stats[5].stat.name}:
                                        ${pokemon.stats[5].base_stat}
                                        <br>
                                 <li class="list-group-item">
                                    <b>
                                        Garcia Cabral Alejo
                                    </b>
                                </li>
                                    </div> 
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    containerPokemon.appendChild(elemento)
}

fetchPokemons(offset,limit);
