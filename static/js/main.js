let nomInput = document.getElementById("nomInput");
let prenomInput = document.getElementById("prenomInput");
let ageInput = document.getElementById("ageInput");
let ajouterBtn = document.getElementById("ajouterBtn");
let tbody = document.getElementById("tbody");

const url = "http://localhost:3000/etudiants";

let vider = () => {
    nomInput.value = '';
    prenomInput.value = '';
    ageInput.value = '';
    ajouterBtn.setAttribute("disabled", "");
};

let addDataToTable = (data) => {
    let tr = document.createElement("tr");
    let tdNom = document.createElement("td");
    let tdPrenom = document.createElement("td");
    let tdAge = document.createElement("td");
    let tdOptions = document.createElement("td");
    let btnDelete = document.createElement("button");

    tr.appendChild(tdNom);
    tr.appendChild(tdPrenom);
    tr.appendChild(tdAge);
    tr.appendChild(tdOptions);
    tdOptions.appendChild(btnDelete);

    tdNom.innerText = data.nom;
    tdPrenom.innerText = data.prenom;
    tdAge.innerText = data.age;
    btnDelete.innerText = "X";
    btnDelete.classList.add('delete');
    btnDelete.addEventListener('click', () => {
        const xhr = new XMLHttpRequest();
        xhr.open("delete", url + "/" + data.id, true);
        xhr.addEventListener("load", () => {
            if (xhr.status != 200) return alert("error" + xhr.response);
            tr.remove();
        });
        xhr.addEventListener("error", () => {
            alert("error");
        });
        xhr.send();
    });
    tbody.appendChild(tr);
};

annulerBtn.addEventListener('click', () => {
    vider();
});

let verificationResult = () => {
    let nomValue = nomInput.value.trim();
    let prenomValue = prenomInput.value.trim();
    let ageValue = ageInput.value;

    let nomValid = nomValue.length >= 3;
    let prenomValid = prenomValue.length >= 3;
    let ageValid = ageValue > 0 && ageValue < 120;

    ajouterBtn.disabled = !(nomValid && prenomValid && ageValid);
};

nomInput.addEventListener("input", verificationResult);
prenomInput.addEventListener("input", verificationResult);
ageInput.addEventListener("input", verificationResult);

ajouterBtn.addEventListener('click', () => {
    let nomValue = nomInput.value.trim();
    let prenomValue = prenomInput.value.trim();
    let ageValue = ageInput.value;
    
    let dataToSend = {
        nom: nomValue,
        prenom: prenomValue,
        age: ageValue,
    };
    dataToSend = JSON.stringify(dataToSend);

    const xhr = new XMLHttpRequest();
    xhr.open("post", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", () => {
        if (xhr.status == 201) {
            let dataReceived = JSON.parse(xhr.response);
            addDataToTable(dataReceived);
            vider();
        } else {
            alert(xhr.response);
        }
    });
    xhr.addEventListener("error", () => {
        alert("error");
    });
    xhr.send(dataToSend);
});

const loadData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.addEventListener("load", () => {
        if (xhr.status != 200) return alert("error" + xhr.response);
        let data = JSON.parse(xhr.response);
        data.forEach((ele) => addDataToTable(ele));
    });
    xhr.addEventListener("error", () => {
        alert("error");
    });
    xhr.send();
};

loadData();










































// //1- on ajoute des ids aux differents balises
// //2- on va la recuperer en js
// let nomInput = document.getElementById("nomInput")
// let prenomInput = document.getElementById("prenomInput")
// let ageInput = document.getElementById("ageInput")
// let annulerBtn = document.getElementById("annulerBtn")
// let ajouterBtn = document.getElementById("ajouterBtn")
// let tbody = document.getElementById("tbody")
// const urlApi= "http://localhost:3000/etudiants"
// //3- on creer les fonctions (Traitements)

// let vider = ()=>{
//     nomInput.value=''
//     prenomInput.value=''
//     ageInput.value=''
// }

// let ajouter = (id,nom,prenom,age)=>{

//     // creation dynamique des elements
//     let tr = document.createElement("tr")
//     let tdNom = document.createElement("td")
//     let tdPrenom = document.createElement("td")
//     let tdAge = document.createElement("td")
//     let tdOptions = document.createElement("td")
//     let btnDelete= document.createElement("button")

//     // liaison et contenu ( parent.appendChild(fils) + innerText + classList.add)
//     tr.appendChild(tdNom)
//     tr.appendChild(tdPrenom)
//     tr.appendChild(tdAge)
//     tr.appendChild(tdOptions)
//     tdOptions.appendChild(btnDelete)
    
//     tdNom.innerText=nom
//     tdPrenom.innerText=prenom
//     tdAge.innerText=age
//     btnDelete.innerText="X"
//     btnDelete.classList.add('delete')
//     btnDelete.addEventListener('click',()=>{
//         deleteFromServer(id,()=>{
//             tr.remove() 
//         },
//         ()=>{
//             alert("error deleting the 'etudiant'")
//         })
       
//     })

//     tbody.appendChild(tr);
// }

// annulerBtn.addEventListener('click',()=>{
//     vider()
// })
// ajouterBtn.addEventListener('click',()=>{
//     let nom = nomInput.value.trim()
//     let prenom = prenomInput.value.trim()
//     let age = ageInput.value
//     const ajax = new XMLHttpRequest()
//     ajax.open("post",urlApi,true)
//     ajax.addEventListener('load',()=>{
//         if(ajax.status==201)
//         {
//             let {id} = JSON.parse(ajax.response)
//             // let id = JSON.parse(ajax.response).id
//             return ajouter(id,nom,prenom,age)
//         }
           
//         alert("error inserting etudiant")
//     })
//     let dataToSend = {
//         nom,
//         prenom,
//         age
//     }
//     ajax.setRequestHeader("Content-Type","application/json")
//     ajax.send(JSON.stringify(dataToSend))
   
// })
// nomInput.addEventListener('input',()=>{
//     verifyInput(nomInput)
//     verifyForm()
// })
// prenomInput.addEventListener('input',()=>{
//     verifyInput(prenomInput)
//     verifyForm()
// })
// ageInput.addEventListener('input',()=>{
//     let age = ageInput.value
//     if(age<0 || age >120)
//     {
//         ageInput.classList.add('invalid')
//         ageInput.classList.remove('valid')
//         // span => error : obligatoire
//         ageInput.nextElementSibling.innerText="error : must be between 0 and 120"
//     }
//     else{
//         ageInput.classList.add('valid')
//         ageInput.classList.remove('invalid')
//         ageInput.nextElementSibling.innerText=""
//     }
//     verifyForm()
// })
// let verifyInput = (element)=>{
//     let value = element.value.trim()
//     if(value==""){
//         element.classList.add('invalid')
//         element.classList.remove('valid')
//         // span => error : obligatoire
//         element.nextElementSibling.innerText="error : obligatoire"
//     }
//     else if(!/^[a-zA-Z]{3,}$/.test(value))
//     {
//         element.classList.add('invalid')
//         element.classList.remove('valid')
//         // span => error : obligatoire
//         element.nextElementSibling.innerText="only alphabet et minimum 3"
//     }
//     else{
//         element.classList.add('valid')
//         element.classList.remove('invalid')
//         element.nextElementSibling.innerText=""
//     }
// }
// let verifyForm = ()=>{
//     // tout le formualire 
//     if(document.querySelectorAll('.formSection input[class="valid"]').length==3)
//         return ajouterBtn.removeAttribute("disabled")
//     ajouterBtn.setAttribute("disabled","")
//     // valid => button enable

//     //invalid => button disable
// }

// // ajax

// const load = ()=>{
//     const ajax = new XMLHttpRequest()
//     ajax.open("get",urlApi,true)
//     ajax.addEventListener("load",()=>{
//         if(ajax.status!=200)
//             return alert("error loading students")
//         let etudiants = JSON.parse(ajax.response)
//         etudiants.forEach(etudiant=>{
//             let {id,nom,prenom,age} = etudiant
//             ajouter(id,nom,prenom,age)
//         })
//     })
//     ajax.send()
// }
// load();
// const deleteFromServer = (id,reussiFn,echecFn)=>{
//     const ajax = new XMLHttpRequest()
//     ajax.open("delete",urlApi+"/"+id,true)
//     ajax.addEventListener('load',()=>{
//         if(ajax.status==200)
//             return reussiFn()
//         echecFn()
//     })
//     ajax.send()

// }