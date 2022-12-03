
showData()
const addBtn = document.querySelector(".add-btn");
const popup = document.querySelector(".popup-wrapper")
const close = document.querySelector(".popup-close")
const submitBtn = document.querySelector("#submit-btn")
const deleteBtn = document.querySelector("#delete-btn");
const editBtn = document.querySelector("#edit-btn");
let saveBtn = document.querySelector(".save-btn")
let saveIdx = document.getElementById("saveindex")
let clearAllBtn = document.querySelector(".clear-all")
let searchBox = document.querySelector("#search-bar")
let mainDataBox = document.querySelector("#main-data")
let sortEl = document.querySelector("#sort")
//data reference

let name = document.querySelector("#name")
let panNum = document.querySelector("#pan")
let age = document.querySelector("#age")
let qualification = document.querySelector("#qualification")

function reset(){
    name.value = ""
    panNum.value = ""
    age.value = ""
    qualification.value = ""
}

function showModal() {
    popup.style.display = "block";
}
function closeModal() {
    popup.style.display = "none"
}
addBtn.addEventListener("click", showModal)

close.addEventListener("click", closeModal)


submitBtn.addEventListener("click", function (e) {
    e.preventDefault()
    nameVal = name.value;
    panNumVal = panNum.value;
    ageVal = age.value;
    qualificationVal = qualification.value;

    if (nameVal.trim() != 0 && panNumVal.trim() != 0 && ageVal.trim() != 0 && qualificationVal.trim() != 0) {
        //checking weather the data is present i local storage already
        let dataPersist = localStorage.getItem("localtask")

        if (dataPersist == null) {
            dataArr = []
        } else {
            dataArr = JSON.parse(dataPersist);
        }
        let obj = {
            "personName": nameVal,
            "personPan": panNumVal,
            "personAge": ageVal,
            "personQualification": qualificationVal
        }
        dataArr.push(obj)
        localStorage.setItem("localtask", JSON.stringify(dataArr))
    }

    if(name.value == ""||panNum.value == ""||age.value == ""||qualification.value==""){
        alert("input fields cannot be empty");
    }else{
        closeModal()
    }

    showData()
    reset()
    
})

function showData() {
    // nameVal = name.value;
    // panNumVal = panNum.value;
    // ageVal = age.value;
    // qualificationVal = qualification.value;

    let dataPersist = localStorage.getItem("localtask")

    if (dataPersist == null) {
        dataArr = []
    } else {
        dataArr = JSON.parse(dataPersist);
    }
    let html = ""
    //let table = document.getElementById("table");
    let tableDataEl = document.getElementById("main-data");
    dataArr.forEach((item, index) => {
        html += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.personName}</td>
          <td>${item.personPan}</td>
          <td>${item.personAge}</td>
          <td>${item.personQualification}</td>
          <td>
             <button onclick = "editData(${index})">Edit</button>
             <button onclick = "deleteData(${index})">Delete</button>
          
          </td>
        
        
        </tr>
       
        
       
       `
    })

    tableDataEl.innerHTML = html
}



function editData(index) {

    saveIdx.value = index
    let dataPersist = localStorage.getItem("localtask");
    let dataArr = JSON.parse(dataPersist);
    showModal()
    name.value = dataArr[index].personName
    panNum.value = dataArr[index].personPan
    age.value = dataArr[index].personAge
    qualification.value = dataArr[index].personQualification
    submitBtn.style.display = "none";
    saveBtn.style.display = "block";

}

saveBtn.addEventListener("click", function () {
    let dataPersist = localStorage.getItem("localtask");
    let dataArr = JSON.parse(dataPersist);
    let idxValue = saveIdx.value
    dataArr[idxValue].personName = name.value
    dataArr[idxValue].personPan = panNum.value
    dataArr[idxValue].personAge = age.value
    dataArr[idxValue].personQualification = qualification.value
    localStorage.setItem("localtask", JSON.stringify(dataArr))
    showData()
})


function deleteData(index) {
    let dataPersist = localStorage.getItem("localtask");
    let dataArr = JSON.parse(dataPersist);
    dataArr.splice(index, 1)
    localStorage.setItem("localtask", JSON.stringify(dataArr))
    showData()
}

clearAllBtn.addEventListener("click", function () {
    let dataPersist = localStorage.getItem("localtask");
    let dataArr = JSON.parse(dataPersist);
    if (dataPersist == null) {
        dataArr = []
    } else {
        dataArr = JSON.parse(dataPersist);
        dataArr = []
    }
    localStorage.setItem("localtask", JSON.stringify(dataArr))
    showData()
})


const filter = (term) => {
    // console.log(term);
    //console.log(mainDataBox.children)
    //console.log( Array.from(mainDataBox.children))
    Array.from(mainDataBox.children).forEach((item) => {
        //console.log(Array.from(item.children))
        Array.from(item.children).filter((todo) => {
            //console.log(todo.textContent)
            return !todo.textContent.includes(term)
        }).forEach((todo) => {
            return todo.parentElement.classList.add("filtered")
        })

        Array.from(item.children).filter((todo) => {
            // console.log(todo.textContent)
            return todo.textContent.includes(term)
        }).forEach((todo) => {
            return todo.parentElement.classList.remove("filtered")

        })
    })
}

searchBox.addEventListener("keyup", () => {
    let term = searchBox.value.trim();
    filter(term);
})

function sortAscending() {
    console.log(Array.from(mainDataBox.children))
    let dataPersist = localStorage.getItem("localtask");
    let dataArr = JSON.parse(dataPersist);
    // Array.from(mainDataBox.children).forEach((item)=>{
    //      console.log(Array.from(item.children)[1].innerText.toUpperCase())
    // })
    let tableDataEl = document.getElementById("main-data");
    tableDataEl.innerHTML = ""
    let flag;
    flag = dataArr.sort((a, b) => {
        if (a.personName.toLowerCase() < b.personName.toLowerCase()) {
            return -1
        }
        if (a.personName.toLowerCase() > b.personName.toLowerCase()) {
            return 1
        }
        return 0
    })
    console.log(flag);
    let html =""
    flag.forEach((item, index) => {
        html += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.personName}</td>
          <td>${item.personPan}</td>
          <td>${item.personAge}</td>
          <td>${item.personQualification}</td>
          <td>
             <button onclick = "editData(${index})">Edit</button>
             <button onclick = "deleteData(${index})">Delete</button>
          
          </td>
        
        
        </tr>
       
        
       
       `
    })

    tableDataEl.innerHTML = html

}


function sortDescending(){
    console.log(Array.from(mainDataBox.children))
    let dataPersist = localStorage.getItem("localtask");
    let dataArr = JSON.parse(dataPersist);
    // Array.from(mainDataBox.children).forEach((item)=>{
    //      console.log(Array.from(item.children)[1].innerText.toUpperCase())
    // })
    let tableDataEl = document.getElementById("main-data");
    tableDataEl.innerHTML = ""
    let flag;
    flag = dataArr.sort((a, b) => {
        if (a.personName.toLowerCase() < b.personName.toLowerCase()) {
            return 1
        }
        if (a.personName.toLowerCase() > b.personName.toLowerCase()) {
            return -1
        }
        return 0
    })
    console.log(flag);
    let html =""
    flag.forEach((item, index) => {
        html += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.personName}</td>
          <td>${item.personPan}</td>
          <td>${item.personAge}</td>
          <td>${item.personQualification}</td>
          <td>
             <button onclick = "editData(${index})">Edit</button>
             <button onclick = "deleteData(${index})">Delete</button>
          
          </td>
        
        
        </tr>
       
        
       
       `
    })

    tableDataEl.innerHTML = html
}

sortEl.addEventListener("change", (e) => {
    console.log(sortEl.value);
    if (sortEl.value == "ascending") {
        sortAscending();
    }
    if (sortEl.value == "descending") {
        sortDescending()
    }
})