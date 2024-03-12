const URL = "http://localhost:3000/api/movies"

fetch(URL, {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
        
    }
})
    .then(responce => responce.json())   //con el resolve de esta promesa consigo el arreglo con los objetos dentro del json
    .then(data => {

     console.log(data)
        const moviesArr= data;
        moviesArr.map((element) => {
            const title = element.title
            const image = element.imgURL
            const dir   = element.director
            
            const poster = 
            `
                <div>
                    <img src="${image}">
                    <h2>${title}</h2>
                    <small>${dir}</small>
                </div>
            `
            document.getElementById('container').innerHTML+= poster
        })
    })
        
.catch(err => {
    console.log(err)
});
