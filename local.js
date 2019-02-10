function store(source) {
    localStorage["playerName"] = source.value;
}
function read(source) {
    source.value = localStorage["playerName"];
}