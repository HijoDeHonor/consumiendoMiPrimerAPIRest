async function deleteMovie(id) {
    const updatedMovies = await fetch(URL + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }

    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Error: algo salio mal');
            }
            return res.json();
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log(err);
        })
    return updatedMovies;
}

