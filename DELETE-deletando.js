fetch('https://jsonplaceholder.typicode.com/posts/1', {
method: 'DELETE'
})
.then(response => {
console.log('Status:', response.status)
})