document.getElementById("Pokedex").onclick = function () { location.href = "./pokedex.html" };
document.getElementById("battle").onclick = function () { location.href = "./battle.html" };
document.getElementById("Pokedex").onmouseenter = function () { document.querySelector(':root').style.setProperty('--pixel-border-3', 'red') };
document.getElementById("Pokedex").onmouseleave = function () { document.querySelector(':root').style.setProperty('--pixel-border-3', '#484040') };

document.getElementById("battle").onmouseenter = function () { document.querySelector(':root').style.setProperty('--pixel-border', 'red') };
document.getElementById("battle").onmouseleave = function () { document.querySelector(':root').style.setProperty('--pixel-border', '#484040') };