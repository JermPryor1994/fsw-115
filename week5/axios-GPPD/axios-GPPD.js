const populateList = () => {
    axios.get("http://api.bryanuniversity.edu/jeremypryor/list")
    .then(resp => {
        console.log(resp.data)
        printToDo(resp.data)
    })
    .catch(err => console.log(err))
}
populateList();

const printToDo = (toDo) => {

    const toDoList = document.getElementById('todolist');
    toDoList.innerHTML = '';
    toDo.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('listitem');

        let title = document.createElement('p');
        title.textContent = item.name;
        listItem.appendChild(title);

        let price = document.createElement('p');
        price.textContent = "Total Price: $" + item.price;
        listItem.appendChild(price);

        let description = document.createElement('p');
        description.textContent = "Description: " + item.description;
        listItem.appendChild(description);

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'DELETE';
        deleteButton.id = item._id;
        deleteButton.addEventListener('click', deleteToDo);
        listItem.appendChild(deleteButton)

        let updateButton = document.createElement('button');
        let buttonText = '';
        buttonText.textContent = 
        item.isComplete === true ? buttonText = 'Mark Incomplete' : buttonText = 'Mark Complete';
        updateButton.textContent = buttonText;
        updateButton.id = item._id;
        updateButton.value = item.isComplete;
        updateButton.addEventListener('click', updateToDo);
        listItem.appendChild(updateButton);

        toDoList.appendChild(listItem);

        if (item.isComplete === true){
            listItem.style.textDecoration = "line-through";
        }
        
    })
}
const postToDo = (e) => {
    e.preventDefault();

    let nameData = document.getElementById('title').value;
    let priceData = document.getElementById('price').value;
    let descriptionData = document.getElementById('description').value;
    let completedData = document.getElementById('completed').checked;

    let toDo = {
        name: nameData,
        price: priceData,
        description: descriptionData,
        isComplete: completedData
    }
    axios.post("http://api.bryanuniversity.edu/jeremypryor/list", toDo)
    .then(() => populateList())
    .catch(err => console.log(err))
}
let form = document.getElementById('inputfield');
form.addEventListener('submit', postToDo);

const deleteToDo = (e) => {
    //console.log('ran delete')
    let id = e.target.id
    console.log(id)
    axios.delete(`http://api.bryanuniversity.edu/jeremypryor/list/` + id)
    .then(() => populateList())
    .catch(err => console.log(err))
}

const updateToDo = (e) => {
    let id = e.target.id;
    let value = e.target.value;
    let completedData = null
    if(value === 'true'){
        completedData = false;
    } else {
        completedData = true;
    }

    let newToDo = {
        isComplete: completedData
    }

    axios.put(`http://api.bryanuniversity.edu/jeremypryor/list/${id}`, newToDo)
    .then(() => populateList())
    .catch(err => console.log(err))
}