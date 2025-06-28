var loginEmail = document.getElementById("loginEmail");
var loginPass = document.getElementById("loginPass");
var signUpName = document.getElementById("signUpName");
var signUpEmail = document.getElementById("signUpEmail");
var signUpPass = document.getElementById("signUpPass");
var logInBtn = document.getElementById("logInBtn");
var signUpBtn = document.getElementById("signUpBtn");
var logOutBtn = document.getElementById("logOutBtn");


// array of users 

var usersArray = []

if(localStorage.getItem("users")){
    usersArray = JSON.parse(localStorage.getItem("users"))
}

// email regex 

var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ ; 

// validation

function validate() {

    if (emailRegex.test(signUpEmail.value)) {

    document.getElementById("signUpEmail").classList.add("is-valid");
    document.getElementById("signUpEmail").classList.remove("is-invalid");

    document.getElementById("emailAlert").classList.add("d-none");
    document.getElementById("emailAlert").classList.remove("d-block");

    return true

}

else {
    
    document.getElementById("signUpEmail").classList.add("is-invalid");
    document.getElementById("signUpEmail").classList.remove("is-valid");

    document.getElementById("emailAlert").classList.add("d-block");
    document.getElementById("emailAlert").classList.remove("d-none");

    return false
}


}


    // check if email exist
function isExist(){
    
    for(i=0; i< usersArray.length ; i++){

        if(signUpEmail.value.toLowerCase()==usersArray[i].Email.toLowerCase()){

                return false

        }

}

}



// sign up function

function signUp(){

    if(isExist()==false){

                document.getElementById("EmailExist").classList.remove("d-none");
                document.getElementById("EmailExist").classList.add("d-block");


    }
   else if (validate() == true && signUpName.value != "" && signUpPass.value != "") {


    var users = {
        Email : signUpEmail.value ,
        Name : signUpName.value ,
        pass : signUpPass.value, 
    }



    // add info to array

    usersArray.push(users);

    // local storage 

    localStorage.setItem("users" , JSON.stringify(usersArray)) ;

    // validation messages 

    document.getElementById("success").classList.remove("d-none");
    document.getElementById("signupReq").classList.add("d-none");
    document.getElementById("signupReq").classList.remove("d-block");
    document.getElementById("EmailExist").classList.add("d-none");
    document.getElementById("EmailExist").classList.remove("d-block");


    // move to login page 

    open('http://127.0.0.1:5500/login.html', target="_self");


}


else if(signUpEmail.value == "" || signUpName.value == "" || signUpPass.value == "") {

    document.getElementById("signupReq").classList.remove("d-none");
    document.getElementById("signupReq").classList.add("d-block");

}



}


// sign in function 

function login(){

            for(i=0 ; i < usersArray.length ; i++){

            if (loginEmail.value.toLowerCase() == usersArray[i].Email.toLowerCase() && loginPass.value.toLowerCase() == usersArray[i].pass.toLowerCase()){

                localStorage.setItem("userName" , usersArray[i].Name)

                open("http://127.0.0.1:5500/home.html" , target="_self")

                



                

                document.getElementById("loginSuccess").classList.remove("d-none");
                document.getElementById("loginReq").classList.add("d-none");
                document.getElementById("loginReq").classList.remove("d-block");
                document.getElementById("dataCorrection").classList.add("d-none");
            }

            else if (loginEmail.value=="" || loginPass.value=="" ){



                document.getElementById("loginReq").classList.remove("d-none");
                document.getElementById("loginReq").classList.add("d-block");

            }

            else if (loginEmail.value.toLowerCase() != usersArray[i].Email.toLowerCase() || loginPass.value.toLowerCase() != usersArray[i].pass.toLowerCase() ) {
                document.getElementById("dataCorrection").classList.remove("d-none");
                document.getElementById("dataCorrection").classList.add("d-block");

                document.getElementById("loginReq").classList.add("d-none");
                document.getElementById("loginReq").classList.remove("d-block");
            }

        }


}

// say welcome to user

var userName = localStorage.getItem("userName")
if(userName){
    document.getElementById("welcomeUser").innerHTML = "Welcome " + userName
}

// logout function 

logOutBtn.addEventListener("click" , function(){
open('http://127.0.0.1:5500/login.html', target="_self");

})
