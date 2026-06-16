if(!localStorage.getItem("token")){

window.location.href="login.html";

}
window.onload = function(){

    getVolunteers();

};

if(!localStorage.getItem("token")){

window.location.href="login.html";

}

async function getVolunteers(){


let response = await fetch(
"https://nayepankh-backend-fzmz.onrender.com/api/volunteers"
);


let data = await response.json();



// Total volunteers

document.getElementById(
"totalVolunteers"
).innerHTML = data.length;




// Cities

let cities=[];


data.forEach(v=>{

if(!cities.includes(v.city)){

cities.push(v.city);

}

});


document.getElementById(
"totalCities"
).innerHTML = cities.length;




// Skills

let skills=[];


data.forEach(v=>{


v.skills.forEach(skill=>{


if(!skills.includes(skill)){

skills.push(skill);

}


});


});


document.getElementById(
"totalSkills"
).innerHTML = skills.length;



let rows="";


data.forEach(v=>{


rows += `

<tr>

<td>${v.name}</td>

<td>${v.email}</td>

<td>${v.phone}</td>

<td>${v.city}</td>

<td>${v.skills.join(", ")}</td>


<td>

<button onclick="deleteVolunteer('${v._id}')">

Delete

</button>


</td>


</tr>


`;


});


document.getElementById(
"tableData"
).innerHTML=rows;



}

getVolunteers();

/*async function deleteVolunteer(id){


let confirmDelete =
confirm("Are you sure?");


if(confirmDelete){


await fetch(
`https://nayepankh-backend-fzmz.onrender.com/api/volunteers/${id}`,
{

method:"DELETE"

});


alert("Deleted");


getVolunteers();


}


}*/

async function deleteVolunteer(id){


let confirmDelete =
confirm("Are you sure?");


if(confirmDelete){


await fetch(
`https://nayepankh-backend-fzmz.onrender.com/api/volunteers/${id}`,
{

method:"DELETE",

headers:{

Authorization:
localStorage.getItem("token")

}

});


alert("Deleted");


getVolunteers();


}

}


function downloadCSV(){


fetch(
"https://nayepankh-backend-fzmz.onrender.com/api/reports/csv",
{

headers:{

Authorization:
localStorage.getItem("token")

}

}

)

.then(res=>res.blob())

.then(blob=>{


let url =
window.URL.createObjectURL(blob);


let a =
document.createElement("a");


a.href=url;


a.download="volunteer_report.csv";


a.click();


});


}




function downloadPDF(){


fetch(
"https://nayepankh-backend-fzmz.onrender.com/api/reports/pdf",
{

headers:{

Authorization:
localStorage.getItem("token")

}

}

)

.then(res=>res.blob())

.then(blob=>{


let url =
window.URL.createObjectURL(blob);


let a =
document.createElement("a");


a.href=url;


a.download="volunteer_report.pdf";


a.click();


});


}

function logout(){

localStorage.removeItem("token");

window.location.href="login.html";

}   