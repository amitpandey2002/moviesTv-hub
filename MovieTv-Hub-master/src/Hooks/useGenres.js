const useGenres = (selectedGenres) => {
    if(selectedGenres.length<1)
    {
        return "";
    }
    //custom made hook to generate genres according to its id.
    const genresIds = selectedGenres.map((genre) => {
         return genre.id;
    });
    return genresIds.reduce((acc,val) => {
        return acc+","+val;
    })
}
export default useGenres;