async function executarRequisicoes() {
  try {
    // GET todos os usuários
    const resUsers = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await resUsers.json();
    console.log(users);

    // GET usuário específico
    const resUser2 = await fetch('https://jsonplaceholder.typicode.com/users/2');
    const user2 = await resUser2.json();
    console.log(user2);

    // POST criar usuário
    const resPost = await fetch("https://jsonplaceholder.typicode.com/users", {
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
    });
    const postResult = await resPost.json();
    console.log(postResult);

    // PUT atualizar usuário
    const resPut = await fetch("https://jsonplaceholder.typicode.com/users/2", {
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
    });
    const putResult = await resPut.json();
    console.log(putResult);

    // PATCH atualizar parcialmente
    const resPatch = await fetch('https://jsonplaceholder.typicode.com/posts/3', {
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
    });
    const patchResult = await resPatch.json();
    console.log(patchResult);

    // DELETE
    const resDelete = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE'
    });
    console.log('Status:', resDelete.status);

  } catch (error) {
    console.error('Erro:', error);
  }
}

executarRequisicoes();