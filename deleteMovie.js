function deleteMovie(id,){
    fetch(URL + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error: algo salio mal');
        }
        return res.json();
    })
    .then(data => {
        console.log('La pelicula fue Eliminada', data);
    })
    .catch(err => {
        console.log(err)
    })
}

