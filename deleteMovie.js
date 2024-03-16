function deleteMovie(id){
    fetch(URL + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error: algo salio mal');
        }
        startWeb()
        return res.json();
    })
    .then(data => {
        console.log('La pelicula fue Eliminada', data);
    })
    .catch(err => {
        console.log(err)
    })
}

