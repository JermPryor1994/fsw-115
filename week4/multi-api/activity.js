const activityButton = document.getElementById('generateActivity');
activityButton.addEventListener('click', function(){
    axios.get("https://www.boredapi.com/api/activity")
        .then(activityResp => {
            //console.log(activityResp.data);
            let activityList = document.getElementById('activities');
            let newActivity = document.createElement('div');
            
            newActivity.className = 'activity';
            let name = document.createElement('h2');
            name.innerText = "Activity: " + activityResp.data.activity;
            newActivity.appendChild(name);
            let type = document.createElement('p');
            type.innerText = "Type: " + activityResp.data.type;
            newActivity.appendChild(type);
            let participants = document.createElement('p');
            if(activityResp.data.participants === 1){
                var people = "yourself";
            } else{
                people = activityResp.data.participants + " people";
            }
            participants.innerText = "You'll need " + people; 
            newActivity.appendChild(participants);
            activityList.appendChild(newActivity);
            


        })
        .catch(activityErr => {
            console.log(activityErr)


        })
})