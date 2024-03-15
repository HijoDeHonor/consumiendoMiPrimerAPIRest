function modifyMovie(id,title, director, year, rating, imgURL){
    fetch(URL + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, director: director, year: year, rating: rating, imgURL:imgURL, id: id })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error: algo salio mal');
        }
        return res.json();
    })
    .then(data => {
        console.log('La pelicula fue modificadacon exito', data);
    })
    .catch(err => {
        console.log(err)
    })
};