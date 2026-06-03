fetch('https://jsonplaceholder.typicode.com/users/3')
.then(response => response.json())
.then(json => console.log(json))

fetch('https://jsonplaceholder.typicode.com/posts/3', {
  method: 'PATCH',
  body: JSON.stringify({
    name: "Análise e Desenvolvimento de Sistemas",
    email: "ads@tecnologia.edu.br",
    street: "Rua da Tecnologia",
    lat: "-19.7690",
    lng: "-44.0870",
    catchPhrase: "Formando desenvolvedores para o futuro digital"
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));