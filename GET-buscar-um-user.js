fetch('https://jsonplaceholder.typicode.com/users/2')
.then(response => response.json())
.then(json => console.log(json))