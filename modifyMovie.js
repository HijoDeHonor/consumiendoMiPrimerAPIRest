async function modifyMovie(id, title, director, year, rating, imgURL) {
    const updatedMovies = await fetch(URL + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, director, year, rating, imgURL })
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
};