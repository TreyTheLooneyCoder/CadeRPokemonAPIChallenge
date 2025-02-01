import { saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage } from "./localstorage.js";

// grabbing my html elements by id
let PokeImg = document.getElementById('PokeImg');
let PokeId = document.getElementById('PokeId');
let PokeName = document.getElementById('PokeName');
let PokeType = document.getElementById('PokeType');
let AbilitiesText = document.getElementById('AbilitiesText');
let MovesText = document.getElementById('MovesText');
let EvoText = document.getElementById('EvoText');
let LocationText = document.getElementById('LocationText');
let searchBar = document.getElementById('searchBar');
let userInput;  
let FavBtn = document.getElementById('FavBtn');
let FavsText = document.getElementById('FavsText');
let ShinyMode = document.getElementById('ShinyMode');

searchBar.addEventListener('keydown', function(event){
    userInput = searchBar.value;
    if(event.key === 'Enter'){
        PokeImg.src = null;
        PokeId.innerText = null;
        PokeName.innerText = null;
        PokeType.innerText = null;
        AbilitiesText.innerText = null;
        MovesText.innerText = null;
        EvoText.innerText = null;
        LocationText.innerText = null;

        userInput = userInput.trim();
        PkmnCall(userInput);
    }
});


async function PkmnCall(input) {
    
    const promise = await fetch('https://pokeapi.co/api/v2/pokemon/' + input);
    const data = await promise.json();
    console.log(data);

    
    PokeImg.src = data.sprites.front_default;
    ShinyMode.addEventListener('click', function() {
        if(PokeImg.src == data.sprites.front_default){
            PokeImg.src = data.sprites.front_shiny;
        }else{
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
    
    //EvoText.innerText = data.forms.url[] 
    
    const promise2 = await fetch(data.location_area_encounters);
    const data2 = await promise2.json();
    console.log(data2);
    
    if(data2[0].location_area.name == []){
        LocationText.innerText = "N/A";
    }else{
        LocationText.innerText = data2[0].location_area.name;
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

