const fs = require('fs');
let chirps = { nextid: 0 };

// check to see if this file exists and then if yes, read that file in and set chirps equal to the file
if(fs.existsSync('chirps.json')) {
    chirps = JSON.parse(fs.readFileSync('chirps.json'));
}

let getChirps = () => {
    return Object.assign({}, chirps); //create a copy and return it so that whoever gets the file cannot manipulate the file
}

let getChirp = id => {
    return Object.assign({}, chirps[id]); //create a copy and return it
}

let createChirp = (chirp) => {
    chirps[chirps.nextid++] = chirp; //saves the nextid number to chirps to continually creat a unique id for each user
    writeChirps();
};

let updateChirp = (id, chirp) => {
    chirps[id] = chirp; //updates chirps for this particular id
    writeChirps();
}

let deleteChirp = id => {
    delete chirps[id];
    writeChirps();
}

let writeChirps = () => {
    fs.writeFileSync('chirps.json', JSON.stringify(chirps));
};

module.exports = {
    CreateChirp: createChirp,
    DeleteChirp: deleteChirp,
    GetChirps: getChirps,
    GetChirp: getChirp,
    UpdateChirp: updateChirp
}