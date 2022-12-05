window.addEventListener("load", () => {
    showData()
  });


//-----------------------//popup references--------------------
const popup = document.querySelector(".popup-wrapper")
const close = document.querySelector(".popup-close")
let saveBtn = document.querySelector(".save-btn")
const addBtn = document.querySelector(".add-btn");
const submitBtn = document.querySelector("#submit-btn")


//-------------------Button References------------------------------
const deleteBtn = document.querySelector("#delete-btn");
const editBtn = document.querySelector("#edit-btn");
let clearAllBtn = document.querySelector(".clear-all")

//------------------------Index catcher Ref-------------------------
let saveIdx = document.getElementById("saveindex")

//-----------------Main Fn Ref ------------------
let searchBox = document.querySelector("#search-bar")
let mainDataBox = document.querySelector("#main-data")
let sortEl = document.querySelector("#sort")


//---------------------Reference of inputFields---------------------
let name = document.querySelector("#name")
let panNum = document.querySelector("#pan")
let age = document.querySelector("#age")
let qualification = document.querySelector("#qualification")

//--------------------------------------------------------------------------------------------

function reset() {
    name.value = ""
    panNum.value = ""
    age.value = ""
    qualification.value = ""
}



function checkAndGetDataPersistAlready() {
    let dataPersist = localStorage.getItem("localData")

    if (dataPersist == null) {
        dataArr = []
        return dataArr
    } else {
        dataArr = JSON.parse(dataPersist);
        return dataArr
    }
}


function showModal() {
    popup.style.display = "block";
}



function closeModal() {
    popup.style.display = "none"
}


addBtn.addEventListener("click", showModal)

close.addEventListener("click", closeModal)

function htmlTemplate (dataArr) {
    let html =""
    let tableDataEl = document.getElementById("main-data");


    
     dataArr.forEach((item, index) => {
        html += `
        <tr class="main-row">
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
     tableDataEl.innerHTML = html;
     return html
}



//Data Submit through modal

submitBtn.addEventListener("click", function (e) {
    e.preventDefault()

    //getting value from input fields

    let nameVal = name.value;
    let panNumVal = panNum.value;
    let ageVal = age.value;
    let qualificationVal = qualification.value;


    if (nameVal.trim() != "" && panNumVal.trim() != "" && ageVal.trim() != "" && qualificationVal.trim() != "") {

       

        checkAndGetDataPersistAlready()


        let obj = {
            "personName": nameVal,
            "personPan": panNumVal,
            "personAge": ageVal,
            "personQualification": qualificationVal
        }

        dataArr.push(obj)
        localStorage.setItem("localData", JSON.stringify(dataArr))

    } else {
        alert("input fields cannot be empty");

    }


    closeModal()

    showData()
    reset()

})

function showData() {
  

    checkAndGetDataPersistAlready()

   
    htmlTemplate(dataArr)
  
}



function editData(index) {

    saveIdx.value = index
   
    checkAndGetDataPersistAlready()

    showModal()

    //making the value in inputfield as to equals to clicked one

    name.value = dataArr[index].personName;
    panNum.value = dataArr[index].personPan;
    age.value = dataArr[index].personAge;
    qualification.value = dataArr[index].personQualification;

    submitBtn.style.display = "none";
    saveBtn.style.display = "block";

}

saveBtn.addEventListener("click", function () {
 
    checkAndGetDataPersistAlready();
    let idxValue = saveIdx.value

    //editing data in local storage

    dataArr[idxValue].personName = name.value
    dataArr[idxValue].personPan = panNum.value
    dataArr[idxValue].personAge = age.value
    dataArr[idxValue].personQualification = qualification.value

    localStorage.setItem("localData", JSON.stringify(dataArr))
    showData()
})


function deleteData(index) {
  
    checkAndGetDataPersistAlready();
    dataArr.splice(index, 1);
    localStorage.setItem("localData", JSON.stringify(dataArr))
    showData()
}



clearAllBtn.addEventListener("click", function () {
  
    checkAndGetDataPersistAlready()
    dataArr = [];
    localStorage.setItem("localData", JSON.stringify(dataArr))
    showData()
})


const filter = (term) => {
    // console.log(term);
    //console.log(mainDataBox.children)
    //console.log( Array.from(mainDataBox.children)) tr
    Array.from(mainDataBox.children).forEach((item) => {
        //console.log(Array.from(item.children))     td
        Array.from(item.children).filter((data) => {
            //console.log(data.textContent)
            return !data.textContent.includes(term)
        }).forEach((data) => {
            return data.parentElement.classList.add("filtered")
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
    checkAndGetDataPersistAlready()
  
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
    
    htmlTemplate(flag)
    localStorage.setItem("localData", JSON.stringify(dataArr))
    

}


function sortDescending() {
  
    checkAndGetDataPersistAlready()
   
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
 
    htmlTemplate(flag)
    localStorage.setItem("localData", JSON.stringify(dataArr))
  
}

sortEl.addEventListener("change", (e) => {

    if (sortEl.value == "ascending") {
        sortAscending();
    }
    if (sortEl.value == "descending") {
        sortDescending()
    }
})