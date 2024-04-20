const pokecount = 151;
const start = 1;
let id = 1;
let regions = { 'Kanto': { start: 1, end: 151, text: 9 }, 'Johto': { start: 152, end: 251, text: 9 }, 'Hoenn': { start: 252, end: 386, text: 9 }, 'Sinnoh': { start: 387, end: 493, text: 9 }, 'Unova': { start: 494, end: 649, text: 5 }, 'Kalos': { start: 650, end: 721, text: 30 }, 'Alola': { start: 722, end: 809, text: 17 }, 'Galar': { start: 810, end: 898, text: 17 } };
const pokedex = {};
let statsmap = { 'hp': 'HP', 'attack': 'Atk', 'defense': 'Def', 'special-attack': 'SpA', 'special-defense': 'SpD', 'speed': 'Spe' }
async function ChangeRegion(region) {
    let start = regions[region]['start'];
    let end = regions[region]['end'];
    let pokeList = document.getElementById("poke-list");
    while (pokeList.firstChild) {
        pokeList.firstChild.remove();
    }
    await getPokemon(start, region);
    let pokemon = document.createElement("div");
    pokemon.id = start;
    pokemon.innerText = start.toString() + ". " + pokedex[start]["name"].toUpperCase();
    pokemon.classList.add("poke-name");
    pokemon.addEventListener("click", UpdatePokemon);
    document.getElementById("poke-list").appendChild(pokemon);
    document.getElementById('poke-description').innerHTML = pokedex[start]['des'];
    document.getElementById("poke-img").src = pokedex[start]["img"];
    let TypeDiv = document.getElementById("poke-types");
    while (TypeDiv.firstChild) {
        TypeDiv.firstChild.remove();
    }
    let types = pokedex[start]["type"];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]);
        TypeDiv.append(type);
    }
    document.getElementById("poke-description").innerText = pokedex[start]["des"];
    id = start;
    let abDiv = document.getElementById('abilities');
    while (abDiv.firstChild) {
        abDiv.firstChild.remove();
    }
    abilities = pokedex[start]["abilities"];
    for (let i = 0; i < abilities.length; i++) {
        let ability = document.createElement("span");
        ability.innerText = FirstCap(abilities[i]["ability"]["name"]);
        ability.classList.add("ability");
        abDiv.append(ability);
    }
    for (let i = 0; i < pokedex[start]["base_stats"].length; i++) {
        let stat = document.getElementById(statsmap[pokedex[start]['base_stats'][i]['stat']['name']]);
        stat.querySelector('.stat-value').innerText = pokedex[start]['base_stats'][i]['base_stat'];
        StatsChecker(pokedex[start]['base_stats'][i]);
    }
    for (let i = start + 1; i <= end; i++) {
        await getPokemon(i, region);
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("poke-name");
        pokemon.addEventListener("click", UpdatePokemon);
        document.getElementById("poke-list").appendChild(pokemon);
    }
}
window.onload = async function () {
    await getPokemon(1, 'Kanto');
    let pokemon = document.createElement("div");
    pokemon.id = 1;
    pokemon.innerText = String(1) + ". " + pokedex[1]["name"].toUpperCase();
    pokemon.classList.add("poke-name");
    pokemon.addEventListener("click", UpdatePokemon);
    document.getElementById("poke-list").appendChild(pokemon);
    document.getElementById('poke-description').innerHTML = pokedex[1]['des'];
    for (let i = 0; i < pokedex[1]["base_stats"].length; i++) {
        let stat = document.getElementById(statsmap[pokedex[1]['base_stats'][i]['stat']['name']]);
        stat.querySelector('.stat-value').innerText = pokedex[1]['base_stats'][i]['base_stat'];
        StatsChecker(pokedex[1]['base_stats'][i]);
    }
    document.getElementById('poke-stats');
    for (let i = 2; i <= pokecount; i++) {
        await getPokemon(i, 'Kanto');
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("poke-name");
        pokemon.addEventListener("click", UpdatePokemon);
        document.getElementById("poke-list").appendChild(pokemon);
    }
}
async function getPokemon(num, region) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
    let res = await fetch(url);
    let pokemon = await res.json();
    // console.log(pokemon);
    let PokeName = pokemon["name"];
    let PokeType = pokemon["types"];
    let PokeImg = pokemon["sprites"]["front_default"];
    let PokeAbilities = pokemon['abilities'];
    let PokeStats = pokemon['stats'];
    res = await fetch(pokemon["species"]["url"]);
    let PokeDes = await res.json();
    // console.log(PokeDes);
    PokeDes = PokeDes["flavor_text_entries"][regions[region]['text']]["flavor_text"];

    pokedex[num] = { "name": PokeName, "type": PokeType, "img": PokeImg, "des": PokeDes, "abilities": PokeAbilities, "base_stats": PokeStats };
}
async function UpdatePokemon() {
    document.getElementById("poke-img").src = pokedex[this.id]["img"];
    let TypeDiv = document.getElementById("poke-types");
    while (TypeDiv.firstChild) {
        TypeDiv.firstChild.remove();
    }
    id = this.id;
    let types = pokedex[this.id]["type"];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]);
        TypeDiv.append(type);
    }
    document.getElementById("poke-description").innerText = pokedex[this.id]["des"];
    let abDiv = document.getElementById('abilities');
    while (abDiv.firstChild) {
        abDiv.firstChild.remove();
    }
    abilities = pokedex[this.id]["abilities"];
    for (let i = 0; i < abilities.length; i++) {
        let ability = document.createElement("span");
        ability.innerText = FirstCap(abilities[i]["ability"]["name"]);
        ability.classList.add("ability");
        abDiv.append(ability);
    }

    for (let i = 0; i < pokedex[this.id]["base_stats"].length; i++) {
        let stat = document.getElementById(statsmap[pokedex[this.id]['base_stats'][i]['stat']['name']]);
        stat.querySelector('.stat-value').innerText = "";
        stat.querySelector('.stat-value').innerText = pokedex[this.id]['base_stats'][i]['base_stat'];
        StatsChecker(pokedex[this.id]['base_stats'][i]);
    }
}
function FirstCap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function sound() {
    let audio = new Audio("https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/" + id.toString() + ".ogg");
    audio.play();
}
function StatsChecker(stat) {
    let base = stat["base_stat"];
    let stat_bar = document.getElementById(statsmap[stat['stat']["name"]] + "-bar").style;
    stat_bar.width = ((base / 255) * 100).toString() + "%";
    stat_bar.height = "1rem";
    if (base <= 30) {
        stat_bar.backgroundColor = "#f34444";
    } else if (base > 30 && base <= 65) {
        stat_bar.backgroundColor = "#ff7f0f";
    } else if (base > 65 && base <= 80) {
        stat_bar.backgroundColor = "#ffdd57";
    } else if (base > 80 && base <= 110) {
        stat_bar.backgroundColor = "#a0e515";
    } else if (base > 110 && base <= 150) {
        stat_bar.backgroundColor = "#1eac4f";
    } else {
        stat_bar.backgroundColor = "#00c2b8";
    }
}
function SearchPokemon() {
    let input = document.getElementById("search");
    let filter = input.value.toUpperCase();
    let pokeList = document.getElementById("poke-list");
    let pokeNames = pokeList.getElementsByClassName("poke-name");
    for (let i = 0; i < pokeNames.length; i++) {
        let name = pokeNames[i].innerText;
        if (name.toUpperCase().indexOf(filter) > -1) {
            pokeNames[i].style.display = "";
        } else {
            pokeNames[i].style.display = "none";
        }
    }
}
function Home() {
    window.location.href = "index.html";
}