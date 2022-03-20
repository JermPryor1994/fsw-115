const dadButton = document.getElementById('populatedad');
dadButton.addEventListener('click', function(){
    axios.get("https://www.dnd5eapi.co/api/classes/")
        .then(dadResp => {
            //console.log(dadResp.data.results);
            for(i=0; i<dadResp.data.results.length; i++){
                let characterList = document.getElementById('dadclasses')
                let characterClass = document.createElement('div');
                characterClass.className = 'classes';
                let name = document.createElement('h2');
                name.innerText = dadResp.data.results[i].name;
                characterClass.appendChild(name);
                characterList.appendChild(characterClass)
                
            }
        })
        .catch(dadErr => {
            console.log(dadErr)
        })
})