if(data.token){

localStorage.setItem(
"token",
data.token
);

alert("Login Successful");

window.location.href="admin.html";

}
async function login(){


let email =
document.getElementById("email").value;


let password =
document.getElementById("password").value;



let response =
await fetch(
"https://nayepankh-backend-fzmz.onrender.com/api/auth/login",
{


method:"POST",


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

email:email,

password:password

})


});



let data =
await response.json();



if(data.token){


localStorage.setItem(
"token",
data.token
);



alert("Login Successful");



window.location.href="admin.html";


}

else{


alert(data.message);


}



}
