async function modifyMovie(Id, Title, Director, Year, Rating, ImgURL) {
    const updatedMovies = await fetch(URL + '/' + Id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Title, Director, Year, Rating, ImgURL })
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