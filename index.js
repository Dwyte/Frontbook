accounts = Array(10);

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

function Register(){
	let name = document.getElementById("name").value;
	let bday = document.getElementById("bday").value;
	let desc = document.getElementById("desc").value;
	let email = document.getElementById("email").value;
	let pass = document.getElementById("pass").value;

	let acc = new account(name, bday, desc, email, pass);

	Hash(acc);
	StoreAccount(acc);
}