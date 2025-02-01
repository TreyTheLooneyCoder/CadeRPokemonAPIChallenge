import { saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage } from "./localstorage.js";
let RandomBtn = document.getElementById('RandomBtn');


RandomBtn.addEventListener('click', function() {
    PokeImg.src = null;
    PokeId.innerText = null;
    PokeName.innerText = null;
    PokeType.innerText = null;
    AbilitiesText.innerText = null;
    MovesText.innerText = null;
    EvoText.innerText = null;
    LocationText.innerText = null;

    let randomId = Math.round(Math.random() * (649 + 1));
    
    console.log(randomId);
    RandomCall(randomId);
});

async function RandomCall(random) {

    const promise = await fetch('https://pokeapi.co/api/v2/pokemon/' + random);
    const data = await promise.json();
    console.log(data);

    
    PokeImg.src = data.sprites.front_default;
    ShinyMode.addEventListener('click', function() {
        if(PokeImg.src == data.sprites.front_default){
            PokeImg.src = data.sprites.front_shiny;
        }else if(PokeImg.src == data.sprites.front_shiny){
            PokeImg.src = data.sprites.front_default; 
        }
    });

    PokeId.innerText = `#${data.id}`;
    PokeName.innerText = data.name;
    
    for(let i = 0; i < data.types.length; i++){
        PokeType.innerText = data.types[i].type.name;

        if(i == 1){
            PokeType.innerText +=`, ${data.types[i].type.name}`;
        }
        if(PokeType.innerText.startsWith(' ')){
            PokeType.innerText = PokeType.innerText.slice(1);
        }
    }

    for(let j = 0; j < data.abilities.length; j++){
        AbilitiesText.innerText +=`, ${data.abilities[j].ability.name}`;

        if(AbilitiesText.innerText.startsWith(',')){
            AbilitiesText.innerText = AbilitiesText.innerText.slice(1);
        }
        
        if(AbilitiesText.innerText.endsWith(',')){
            AbilitiesText.innerText = AbilitiesText.innerText.slice(0, -1);
        }
    }
    
    for(let k = 0; k < data.moves.length; k++){
        MovesText.innerText +=`, ${data.moves[k].move.name}`;

        if(MovesText.innerText.startsWith(',')){
            MovesText.innerText = MovesText.innerText.slice(1);
        }
        
        if(MovesText.innerText.endsWith(',')){
            MovesText.innerText = MovesText.innerText.slice(0, -1);
        }
    }
    const promise3 = await fetch(data.species.url);
    const data3 = await promise3.json();
    const data3Next = data3.evolution_chain.url;

    const evoPromise = await fetch(data3Next);
    const evoData = await evoPromise.json();
    let evoData2 = evoData.chain;
    let dataChain = [evoData2.species.name];
    
    for (let i = 0; i < evoData2.evolves_to.length; i++) {
        dataChain.push(evoData2.evolves_to[i].species.name);
        for (let j = 0; j < evoData2.evolves_to[i].evolves_to.length; j++) {
            dataChain.push(evoData2.evolves_to[i].evolves_to[j].species.name);
        }
    }

    EvoText.innerText = `, ${evoData.chain.species.name}`; 
    
    const promise2 = await fetch(data.location_area_encounters);
    const data2 = await promise2.json();
    console.log(data2);
    
    if(data2[0].location_area.name !== null){
        LocationText.innerText = data2[0].location_area.name;
    }else{
        LocationText.innerText = "N/A";
    }

    FavBtn.addEventListener('click', function() {
        let favPokeName = PokeName.innerText;
        saveToLocalStorageByName(favPokeName);

        console.log(localStorage);

        FavsText.innerText = `, ${localStorage.favPokeName}`;

        if(FavsText.innerText.startsWith(',')){
            FavsText.innerText = FavsText.innerText.slice(1);
        } 
        
        if(FavsText.innerText.endsWith(',')){
            FavsText.innerText = FavsText.innerText.slice(0, -1);
        }
    }); 
}