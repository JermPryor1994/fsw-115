axios.get("http://api.bryanuniversity.edu/jeremypryor/list")
    .then(resp => {
        console.log(resp.data)
        for (i = 0; i < resp.data.length; i++){
            const listItem = document.createElement('li');
            const toDoList = document.getElementById('todolist');
            listItem.id = 'listitem';
            let title = document.createElement('p');
            title.innerText = resp.data[i].name;
            listItem.appendChild(title);
            let price = document.createElement('p');
            price.innerText = "Total Price: $" + resp.data[i].price;
            listItem.appendChild(price);
            let description = document.createElement('p');
            description.innerText = "Description: " + resp.data[i].description;
            listItem.appendChild(description);
            toDoList.appendChild(listItem);

            if (resp.data[i].isComplete === true){
                listItem.style.textDecoration = "line-through";
            }
        }
    })
    .catch(err => console.log(err))


    
            