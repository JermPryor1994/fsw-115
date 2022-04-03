
const aquireData = async () => { 
    try{
        classList = await axios.get('https://www.dnd5eapi.co/api/classes/')
        classAlignments = await axios.get('https://www.dnd5eapi.co/api/alignments')
        equipmentList = await axios.get('https://www.dnd5eapi.co/api/equipment')
        
        printClasses(classList.data.results)
        printAlignments(classAlignments.data.results)
        printEquipment(equipmentList.data.results)
    }   
    catch(err){
        console.log(err)
    }
}
aquireData()

const printClasses = (data) =>{
    let classList = document.getElementById('classList')
    data.forEach(i=>{
        let classDiv = document.createElement('div')
        classDiv.classList.add('dataBox')
        let className = document.createElement('h4')
        className.innerText = i.name
        classDiv.appendChild(className)
        classList.appendChild(classDiv)
    })
}

const printAlignments = (data) =>{
    let alignList = document.getElementById('alignmentList')
    data.forEach(i=>{
        let alignDiv = document.createElement('div')
        alignDiv.classList.add('dataBox')
        let alignName = document.createElement('h4')
        alignName.innerText = i.name
        alignDiv.appendChild(alignName)
        alignList.appendChild(alignDiv)
    })
}

const printEquipment = (data) =>{
    let equipmentList = document.getElementById('equipmentList')
    data.forEach(i=>{
        let equipmentDiv = document.createElement('div')
        equipmentDiv.classList.add('dataBox')
        let equipmentName = document.createElement('h4')
        equipmentName.innerText = i.name
        equipmentDiv.appendChild(equipmentName)
        equipmentList.appendChild(equipmentDiv)
    })
}