fetch("https://jsonplaceholder.typicode.com/users/2", {
method: "PUT",
body: JSON.stringify({
id: 2,
name: "Back End II",
username: "backendII",
email: "backendII@ads.edu",
}),
headers: {
"Content-type": "application/json; charset=UTF-8",
},
})
.then((response) => response.json())
.then((json) => console.log(json));
