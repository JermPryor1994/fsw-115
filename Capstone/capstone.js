
const classSelector = document.getElementById('classSelection')
const profSelector = document.getElementById('proficienciesSelection')
const equipmentSelector = document.getElementById('equipmentSelection')

const getDDData = () =>{
    axios.get('https://www.dnd5eapi.co/api/classes/')
    .then(resp => {
        classData = resp.data.results;
        // console.log(classData)
        populateSelect(classData, classSelector)
    })
    .catch(err => console.log(err))
}
getDDData()

classSelector.addEventListener('change', () =>{
    axios.get(`https://www.dnd5eapi.co/api/classes/${classSelector.value.toLowerCase()}`)
    .then(resp => {
        let proficiencies = resp.data.proficiencies
        populateSelect(proficiencies, profSelector)
    })
    .catch(err => console.log(err))
})

profSelector.addEventListener('change', () =>{
    axios.get(`https://www.dnd5eapi.co/api/equipment-categories/${profSelector.value.toLowerCase()}`)
    .then(resp => {
        let equipmentData = resp.data.equipment
        populateSelect(equipmentData, equipmentSelector)
    })
})

function populateSelect(array, domElement) {

    let option = document.createElement('option');
    option.textContent = 'Select an Item'
    domElement.appendChild(option)

    for (let i =0; i < array.length; i++) {
        let nextOption = document.createElement('option')
        let txt = document.createTextNode(array[i].index)
        nextOption.appendChild(txt)
        domElement.appendChild(nextOption) 
    }
}

document.getElementById('characterBuilder').addEventListener('submit', (e) =>{
    e.preventDefault()

    let nameData = document.getElementById('characterName').value
    let descripData = classSelector.value + ' / ' + profSelector.value + ' / ' + equipmentSelector.value

    let dataCard = {
        name: nameData,
        description: descripData
    }
    // console.log(dataCard)
    postCharacter(dataCard)

})

const postCharacter = (data) =>{
    axios.post(`http://api.bryanuniversity.edu/jeremypryor/list/`, data)
    .then(() => getStoredCharacters())
    .catch(err => console.log(err))
}

const getStoredCharacters = () =>{
    axios.get('http://api.bryanuniversity.edu/jeremypryor/list/')
    .then(resp => {
        console.log(resp.data)
        createCard(resp.data)
    })
    .catch(err => console.log(err))
}

getStoredCharacters();

const createCard = (data) =>{
    let cardDiv = document.getElementById('characterCards')
    cardDiv.innerHTML = ''
    data.forEach(i =>{
        let characterCard = document.createElement('div')
        characterCard.classList.add('charCard')

        let characterName = document.createElement('h4')
        characterName.innerText = 'Name: '+ i.name
        characterCard.appendChild(characterName)

        let classDetails = document.createElement('p')
        classDetails.innerText = 'Class Details: ' + i.description
        characterCard.appendChild(classDetails)

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'DELETE';
        deleteButton.id = i._id;
        deleteButton.addEventListener('click', deleteToDo);
        characterCard.appendChild(deleteButton)

        cardDiv.appendChild(characterCard)

    })
}

const deleteToDo = (e) => {
    let id = e.target.id
    console.log(id)
    axios.delete(`http://api.bryanuniversity.edu/jeremypryor/list/` + id)
    .then(() => getStoredCharacters())
    .catch(err => console.log(err))
}