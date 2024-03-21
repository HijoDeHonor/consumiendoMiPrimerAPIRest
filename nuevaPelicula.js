async function nuevaPelicula() {
    let newtitle = document.getElementById("title").value;
    let newdirector = document.getElementById("director").value;
    let newyear = parseInt(document.getElementById("year").value);
    let newrating = parseInt(document.getElementById("rating").value);
    let newimgURL = document.getElementById("imgURL").value;
    let newMovie = {
        Title: newtitle,
        Director: newdirector,
        Year: newyear,
        Rating: newrating,
        ImgURL: newimgURL
    };
    const updatedMovies = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie)
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