accounts = Array(100000); //maximum number of accounts

class account{

	constructor(name, bday, desc, email, pass){
		this.index = 0;
		this.name = name;
		this.bday = bday;
		this.desc = desc;
		this.email = email;
		this.pass = pass;
	}
}

function Hash(account){
	let sumOfAscii = 0;
	for (let i = 0; i < account.email.length; i++){
		sumOfAscii += account.email.charCodeAt(i);
	}
	account.index = sumOfAscii % accounts.length;
}

function StoreAccount(account){
	if(accounts[account.index] == null){
        accounts[account.index] = account;
	}else{
		alert("Register account failed, try changing your email");
	}
}

function HashText(text){
	let sumOfAscii = 0;
	for (let i = 0; i < text.length; i++){
		sumOfAscii += text.charCodeAt(i);
	}
	return sumOfAscii % accounts.length;
}

var databaseAccountsRef = firebase.database().ref().child("Accounts");

function Login(){
	let email = document.getElementById("login-email").value;
	let pass = document.getElementById("login-pass").value;
	let emailIndex = HashText(email);

	var ref = firebase.database().ref("Accounts/" + emailIndex);
		ref.once("value").then(function(snapshot) {
			
			if(email == "" || pass == ""){
				alert("Please complete the form, thank you");
				return;
			}else{

				// Check if the account exist
				if(snapshot.child("email").val() == null){
					alert("Account not found");
					return;
				}

				// if the account exists, check if the password matched
				if(snapshot.child("password").val() == pass){
					localStorage.setItem("currAccName", snapshot.child("name").val());
					localStorage.setItem("currAccDesc", snapshot.child("description").val());
					localStorage.setItem("currAccBday", snapshot.child("birthday").val());
					localStorage.setItem("currAccEmail", snapshot.child("email").val());
					window.location.href = "./profile.html";
				}else{
					alert("Incorrect password");
				}

			}


			//var email = snapshot.child("birthday").val();
			});

}


function Register(){
	window.location.href = "profile.html";
	let name = document.getElementById("name").value;
	let bday = document.getElementById("bday").value;
	let desc = document.getElementById("desc").value;
	let email = document.getElementById("email").value;
	let pass = document.getElementById("pass").value;

	if(name == "" || desc == "" || email == "" || pass == "" || bday == ""){
		alert("Please complete the form, thank you!");
		return;
	}

	let acc = new account(name, bday, desc, email, pass);
	
	localStorage.setItem("currAccName", acc.name);
	localStorage.setItem("currAccDesc", acc.desc);
	localStorage.setItem("currAccBday", acc.bday);
	localStorage.setItem("currAccEmail", acc.email);

	Hash(acc);
	StoreAccount(acc);

	// Store acc on the firebase database
	databaseAccountsRef.child(acc.index).child("name").set(acc.name);
	databaseAccountsRef.child(acc.index).child("birthday").set(acc.bday);
	databaseAccountsRef.child(acc.index).child("description").set(acc.desc);
	databaseAccountsRef.child(acc.index).child("email").set(acc.email);
	databaseAccountsRef.child(acc.index).child("password").set(acc.pass);

	window.location.href = "./profile.html"
}

function Logout(){
	localStorage.setItem("currAccName", "");
	localStorage.setItem("currAccDesc", "");
	localStorage.setItem("currAccBday", "");
	localStorage.setItem("currAccEmail", "");
	window.location.href = "./index.html"
}
