var frontbook = JSON.parse(localStorage.getItem("frontbook"));
var currAccount = frontbook.currentAccount;

window.onload = function(){
	document.getElementById("name").innerHTML = currAccount.fullName;
	document.getElementById("email").innerHTML = currAccount.email;
	document.getElementById("bday").innerHTML = currAccount.birthday;
	document.getElementById("gender").innerHTML = currAccount.gender;
	UpdateFriendRequestList();
	UpdateFriendsList();
	UpdateUsersList();
}

function UpdateFriendRequestList(){
	var numberOfRequests = 0;
	document.getElementById("requests").innerHTML = "";

	for(i = 0; i < currAccount.requests.length; i++){
		if(currAccount.requests[i] != null){
			numberOfRequests++;
		}
	}
	if (numberOfRequests == 0){
		document.getElementById("requests").innerHTML = "No friend requests.. :(";
		return;
	}
	for(i = 0; i < currAccount.requests.length; i++){
		if(currAccount.requests[i] != null){
			document.getElementById("requests").innerHTML += currAccount.requests[i] + " <button onclick=AcceptFriendRequest("+i+") > Accept </button>";
		}
	}

}

function Hash(string, length){
	let sumOfAscii = 0;
	for (let i = 0; i < string.length; i++){
		sumOfAscii += string.charCodeAt(i);
    }
	return sumOfAscii % length;
}


function AcceptFriendRequest(requestIndex){
	currAccount.friends.push(currAccount.requests[requestIndex]);
	currAccount.requests.splice(requestIndex, 1);
	UpdateFriendRequestList();
	UpdateFriendsList();
	localStorage.setItem("frontbook", JSON.stringify(frontbook));
    frontbook = JSON.parse(localStorage.getItem("frontbook"));
}


function UpdateFriendsList(){
	var numberOfFriends = 0;
	document.getElementById("friends").innerHTML = "";

	for(i = 0; i < currAccount.friends.length; i++){
		if(currAccount.friends[i] != null){
			numberOfFriends++;
		}
	}

	if(numberOfFriends == 0){
		document.getElementById("friends").innerHTML = "You have no friends.. :(";
		return;
	}

	for(i = 0; i < currAccount.friends.length; i++){
		if(currAccount.friends[i] != null){
			document.getElementById("friends").innerHTML += currAccount.friends[i];
			alert(currAccount.friends[i].fullName);
		}
	}
}

function UpdateUsersList(){
	for(i = 0; i < frontbook.accounts.length; i++){
		if(frontbook.accounts[i] != null){
			document.getElementById("users").innerHTML += frontbook.accounts[i].fullName + " <button>View Profile</button> <br>"
		}
	}
}


function Logout(){
	currAccount = null;
	localStorage.setItem("frontbook", JSON.stringify(frontbook));
    frontbook = JSON.parse(localStorage.getItem("frontbook"));
    window.location = "./index.html"
}