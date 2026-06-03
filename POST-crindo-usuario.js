fetch("https://jsonplaceholder.typicode.com/users", {
method: "POST",
body: JSON.stringify({
name: "Back End II",
username: "backendII",
email: "backendII@ads.edu",
address: {
street: "Rua da Tecnologia",
suite: "Bloco A - Sala 101",
city: "TechVille",
zipcode: "12345-678",
geo: {
lat: "-19.7690",
lng: "-44.0870",
},
},
phone: "(31) 99999-0000",
website: "ads.tecnologia.edu.br",
company: {
name: "Instituto de Tecnologia e Sistemas",
catchPhrase: "Formando desenvolvedores para o futuro digital",
bs: "desenvolvimento de sistemas e soluções digitais",
},
}),
headers: {
"Content-type": "application/json; charset=UTF-8",
},
})
.then((response) => response.json())
.then((json) => console.log(json));
