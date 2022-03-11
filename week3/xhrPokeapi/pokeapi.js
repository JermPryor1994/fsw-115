
const xhr = new XMLHttpRequest()
xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon', true);
xhr.send();

xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
        let data = JSON.parse(xhr.responseText);
        console.log(xhr.responseText);
        console.log(data);
        dataDisplay(data.results);
    }else if(xhr.readyState === 4 && xhr.status !== 200){
        console.log(xhr.responseText);
        alert('Something went wrong...');
    }
}

function dataDisplay(data){
    for(i=0; i<data.length; i++){
        let pokeData = document.createElement('div');
        pokeData.className = 'pokemon';
        pokeData.innerText = `Name: ${data[i].name.toUpperCase()} \n URL: ${data[i].url}`;
        document.body.appendChild(pokeData);
    }
}