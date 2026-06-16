
document
.getElementById("volunteerForm")
.addEventListener("submit",function(e){


e.preventDefault();



let skills=[];


document
.querySelectorAll(".skills input:checked")
.forEach((item)=>{

skills.push(item.value);

});



let volunteer={


name:
document.getElementById("name").value,


email:
document.getElementById("email").value,


phone:
document.getElementById("phone").value,


age:
document.getElementById("age").value,


gender:
document.getElementById("gender").value,


city:
document.getElementById("city").value,


skills:skills,


availability:
document.getElementById("availability").value,


reason:
document.getElementById("reason").value



};



console.log(volunteer);

let button =
document.querySelector("button");


button.innerHTML="Submitting...";

button.disabled=true;

fetch("http://localhost:5000/api/volunteers",{


method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify(volunteer)


})


.then(res=>res.json())


.then(data=>{


alert(
"Thank you for visiting NayePankh Foundation! Your registration has been submitted successfully."
);

button.innerHTML="Register";

button.disabled=false;

document
.getElementById("volunteerForm")
.reset();


})

.catch(err=>{

console.log(err);

});



document
.getElementById("volunteerForm")
.reset();



});