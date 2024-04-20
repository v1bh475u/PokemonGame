let battlebacks = ['cave1', 'cave2', 'cave3', 'champion1', 'champion2', 'city', 'city_eve', 'distortion', 'forest', 'forest_eve', 'forest_night', 'field', 'field', 'field_eve', 'field_night', 'water'];
let playerteam = {};
window.onload = async function () {
    let music = document.createElement('audio');
    let sr = document.createElement("source");
    sr.setAttribute("src", "./assets/Music/fireleafbattle.ogg");
    sr.setAttribute("type", "audio/ogg");
    music.appendChild(sr);
    music.autoplay = true;
    document.body.appendChild(music);
    let x = Math.floor(Math.random() * 50) % 16;
    document.getElementById('battle-frame').style.backgroundImage = "url(./assets/Graphics/BattleBG/" + battlebacks[x] + "_bg.png)";
    document.getElementById('battle-frame').style.backgroundSize = "cover";
    document.getElementById('battle-frame').style.backgroundRepeat = "no-repeat";
    if (battlebacks[x].startsWith('forest')) {
        document.getElementById('base0').src = "./assets/Graphics/Battlebacks/grass" + battlebacks[x].substring(6, battlebacks[x].length) + "_base1.png";
        document.getElementById('base1').src = "./assets/Graphics/Battlebacks/grass" + battlebacks[x].substring(6, battlebacks[x].length) + "_base1.png";
    } else if (battlebacks[x].startsWith('city')) {
        document.getElementById('base0').src = "./assets/Graphics/Battlebacks/city_base1.png";
        document.getElementById('base1').src = "./assets/Graphics/Battlebacks/city_base1.png";

    } else {
        document.getElementById('base0').src = "./assets/Graphics/Battlebacks/" + battlebacks[x] + "_base1.png";
        document.getElementById('base1').src = "./assets/Graphics/Battlebacks/" + battlebacks[x] + "_base1.png";
    }
    x = Math.floor(Math.random() * 500) % 500;
    let y = Math.floor(Math.random() * 500) % 500;
    front = await getPokemon(x);
    back = await getPokemon(y);
    console.log(front);
    console.log(back);
    let img = document.createElement('img');
    img.src = front['sprites']['other']['showdown']['front_default'];
    img.setAttribute('id', 'front');
    img.style.position = 'absolute';
    // if (front['height'] >= 11 && front['height'] < 19) {
    //     img.style.top = '13rem';
    // } else if (front['height'] >= 19) {
    //     img.style.top = '12rem';
    // } else {
    //     img.style.top = '14rem';
    // }
    // if (typeChecker(front['types'])) {
    //     img.style.top = '12rem';
    // }
    img.style.right = '17%';
    img.style.bottom = '43%';
    // img.style.width = '15rem';
    // img.style.height = '15rem';
    document.getElementById('battler1').appendChild(img);
    img = document.createElement('img');
    img.src = back['sprites']['other']['showdown']['back_default'];
    img.setAttribute('id', 'back');
    img.style.position = 'absolute';
    document.getElementById('battler0').appendChild(img);
    document.getElementById('back').style.left = (75 - document.getElementById('back').width / 2) + "%";
    img.style.bottom = '60%';
}
async function getPokemon(id) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id.toString());
    let data = await response.json();
    return data;
}
function typeChecker(types) {
    for (let i = 0; i < types.length; i++) {
        let type = types[i]['type']['name'];
        if (type === 'ghost' || type === 'psychic' || type === 'flying') {
            return true;
        }
    }
    return false;
}