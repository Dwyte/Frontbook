class Frontbook{
    constructor(){
        this.accounts = Array(10); 
        this.currentAccount = null; 
    }
}

if(localStorage.getItem("frontbook") == null){
    let frontbook = new Frontbook();
    localStorage.setItem("frontbook", JSON.stringify(frontbook));
}

var frontbook = JSON.parse(localStorage.getItem("frontbook"));

class Account{
    constructor(firstName, lastName, email, password, birthday, gender){
        firstName.charAt(0).toUpperCase();
        lastName.charAt(0).toUpperCase();
        
        this.index = Hash(email, frontbook.accounts.length);
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + " " + lastName;
        this.email = email;
        this.password = password;
        this.birthday = birthday;
        this.gender = gender;
        this.requests = [];
        this.friends = [];
    }
}


function Hash(string, length){
	let sumOfAscii = 0;
	for (let i = 0; i < string.length; i++){
		sumOfAscii += string.charCodeAt(i);
    }
	return sumOfAscii % length;
}

function StoreAccount(account){
    if(frontbook.accounts[account.index] == null){
        frontbook.accounts[account.index] = account;
        localStorage.setItem("frontbook", JSON.stringify(frontbook));
        frontbook = JSON.parse(localStorage.getItem("frontbook"));
        alert(account.index);
    }else{
		alert("Register account failed, try changing your email");
	}
}

function Register(){
    let fname = document.getElementById("register-fname").value;
    let lname = document.getElementById("register-lname").value;
    let email = document.getElementById("register-email").value;
    let pass = document.getElementById("register-pass").value;
    let cpass = document.getElementById("register-cpass").value;
    let bday = document.getElementById("register-bday").value;
    

    let gender = "";
    if(document.getElementById("Male").checked){
        gender = "Male";
    }else if(document.getElementById("Female").checked){
        gender = "Female";
    }else{
        alert("Please complete the form");
        return;
    }

    if(fname == "" || lname == "" || email == "" || pass == "" || bday == ""){
        alert("Please complete the form");
        return;
    }
    if(pass != cpass){
        alert("Passwords don't match");
        return;
    }
    
    var acc = new Account(fname, lname, email, pass, bday, gender);
    StoreAccount(acc);
}

function Login(){
    let email = document.getElementById("login-email").value;
    let pass = document.getElementById("login-pass").value;
    let temp = frontbook.accounts[Hash(email, frontbook.accounts.length)];
    if(temp != null){
        if(pass == temp.password){
            alert("Success!");
            window.location = "./profile.html"
            frontbook.currentAccount = temp;
            localStorage.setItem("frontbook", JSON.stringify(frontbook));
            frontbook = JSON.parse(localStorage.getItem("frontbook"));
        }else{
            alert("Incorrect password");
        }
    }else{
        alert("Account doesn't exists");
    }
}