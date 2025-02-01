function saveToLocalStorageByName(favPokeName) {
    
    let pkmnArr = JSON.parse(localStorage.getItem("favPokeName")) || [];
    pkmnArr.push(favPokeName);
    let secondArr = [];
    for(let i = 0; i < pkmnArr.length; i++){
        if (!secondArr.includes(pkmnArr[i])) {
            secondArr.push(pkmnArr[i]);
            
        }
    }
    localStorage.setItem('favPokeName', JSON.stringify(secondArr));

    console.log(secondArr);
}

function getLocalStorage(){
    let localStorageData = localStorage.getItem('favPokeName');
    return JSON.parse(localStorageData) || [];
}

function removeFromLocalStorage(favPokeName){
    let pkmnArr = getLocalStorage();

    

    let pkmnIndex = pkmnArr.indexOf(favPokeName);

    //remove the name from the array using the splice method.
    //Start at the index of name and remove 1 item
    pkmnArr.splice(pkmnIndex, 1);

    // save updated array to local storage
    localStorage.setItem('favPokeName', JSON.stringify(pkmnArr));
}

export{ saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage }