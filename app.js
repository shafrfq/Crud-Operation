var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    user = document.getElementById("user"),
    userName = document.getElementById("name"),
    city = document.getElementById("city"),
    sDate = document.getElementById("sDate"),
    gender = document.getElementById("gender"),
    major = document.getElementById("major"),
    email = document.getElementById("email"),
    address = document.getElementById("address"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Isi Data Berikut"
    isEdit = false
    imgInput.src = "./image/Profile Icon.webp"
    form.reset()
})


file.onchange = function(){
    if(file.files[0].size < 1000000){  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("This file is too large!")
    }
}


function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index+1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.employeeUser}</td>
            <td>${element.employeeName}</td>
            <td>${element.employeeCity}</td>
            <td>${element.startDate}</td>
            <td>${element.employeeGender}</td>
            <td>${element.employeeMajor}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeeAddress}</td>

            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeUser}', '${element.employeeName}', '${element.employeeCity}', '${element.employeestartDate}','${element.employeeGender}', '${element.employeeMajor}', '${element.employeeEmail}','${element.employeeAddress}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeUser}', '${element.employeeName}', '${element.employeeCity}', '${element.employeestartDate}', '${element.employeeGender}', '${element.employeeMajor}', '${element.employeeEmail}', '${element.employeeAddress}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(pic, user, name, city, sDate, gender, major, email, address){
    document.querySelector('.showImg').src = pic,
    document.querySelector('#showUser').value = user,
    document.querySelector('#showName').value = name,
    document.querySelector("#showCity").value = city,
    document.querySelector("#showsDate").value = sDate,
    document.querySelector("#showGender").value = gender,
    document.querySelector("#showMajor").value = major,
    document.querySelector("#showEmail").value = email,
    document.querySelector("#showsAddress").value = address
}


function editInfo(index, pic, User, name, City, Sdate, Major, Email, Address){
    isEdit = true
    editId = index
    imgInput.src = pic
    user.value = User,
    userName.value = name,
    city.value = City,
    sDate.value = Sdate,
    gender.value = Gender,
    major.value = Major,
    email.value = Email,
    address.value = Address

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
    if(confirm("Apakah data ingin dihapus?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        picture: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
        employeeUser: user.value,
        employeeName: userName.value,
        employeeCity: city.value,
        startDate: sDate.value,
        employeeGender: gender.value,
        employeeMajor: major.value,
        employeeEmail: email.value,
        employeeAddress: address.value
    }

    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Isi Data Berikut"

    showInfo()

    form.reset()

    imgInput.src = "./image/Profile Icon.webp"  

    // modal.style.display = "none"
    // document.querySelector(".modal-backdrop").remove()
})