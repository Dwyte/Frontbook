var frontbook = JSON.parse(localStorage.getItem("frontbook"));
var currAccount = frontbook.accounts[frontbook.currentAccount.index]

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
			document.getElementById("requests").innerHTML += currAccount.requests[i].fullName + " <button onclick=AcceptFriendRequest("+i+") > Accept </button>";
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
	frontbook.accounts[currAccount.requests[requestIndex].index].friends.push(currAccount);
	currAccount.requests.splice(requestIndex, 1);
	UpdateFriendRequestList();
	UpdateFriendsList();
	SaveToDatabase();
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
			document.getElementById("friends").innerHTML += currAccount.friends[i].fullName + "<br>";
		}
	}
}

function UpdateUsersList(){
	for(i = 0; i < frontbook.accounts.length; i++){
		if(frontbook.accounts[i] != null){
			document.getElementById("users").innerHTML += frontbook.accounts[i].fullName + " <button onclick=ViewProfile("+i+")>View Profile</button> <br>"
		}
	}
}

function ViewProfile(accountIndexToView){
	frontbook.viewedAccount = frontbook.accounts[accountIndexToView];
	SaveToDatabase();
	window.location = "./profileviewer.html";
}


function Logout(){
	currAccount = null;
	SaveToDatabase();
    window.location = "./index.html"
}


function SaveToDatabase(){
	localStorage.setItem("frontbook", JSON.stringify(frontbook));
    frontbook = JSON.parse(localStorage.getItem("frontbook"));
}