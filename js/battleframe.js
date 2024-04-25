let battlebacks = ['cave1', 'cave2', 'cave3', 'champion1', 'champion2', 'city', 'city_eve', 'distortion', 'forest', 'forest_eve', 'forest_night', 'field', 'field', 'field_eve', 'field_night', 'water'];
let playerteam = {};
let enemyteam = {};
// import typelookup from '../assets/json/type-lookup.json' assert { type: 'json' };

let base_statmap = { 'hp': 0, 'attack': 1, 'defense': 2, 'special-attack': 3, 'special-defense': 4, 'speed': 5 };
let typelookup = {
    "normal": {
        "normal": 1,
        "fire": 1,
        "water": 1,
        "electric": 1,
        "grass": 1,
        "ice": 1,
        "fighting": 1,
        "poison": 1,
        "ground": 1,
        "flying": 1,
        "psychic": 1,
        "bug": 1,
        "rock": 0.5,
        "ghost": 0,
        "dragon": 1,
        "dark": 1,
        "steel": 0.5,
        "fairy": 1
    },
    "fire": {
        "normal": 1,
        "fire": 0.5,
        "water": 0.5,
        "electric": 1,
        "grass": 2,
        "ice": 2,
        "fighting": 1,
        "poison": 1,
        "ground": 1,
        "flying": 1,
        "psychic": 1,
        "bug": 2,
        "rock": 0.5,
        "ghost": 1,
        "dragon": 0.5,
        "dark": 1,
        "steel": 2,
        "fairy": 1
    },
    "water": {
        "normal": 1,
        "fire": 2,
        "water": 0.5,
        "electric": 1,
        "grass": 0.5,
        "ice": 1,
        "fighting": 1,
        "poison": 1,
        "ground": 2,
        "flying": 1,
        "psychic": 1,
        "bug": 1,
        "rock": 2,
        "ghost": 1,
        "dragon": 0.5,
        "dark": 1,
        "steel": 1,
        "fairy": 1
    },
    "electric": {
        "normal": 1,
        "fire": 1,
        "water": 2,
        "electric": 0.5,
        "grass": 0.5,
        "ice": 1,
        "fighting": 1,
        "poison": 1,
        "ground": 0,
        "flying": 2,
        "psychic": 1,
        "bug": 1,
        "rock": 1,
        "ghost": 1,
        "dragon": 0.5,
        "dark": 1,
        "steel": 1,
        "fairy": 1
    },
    "grass": {
        "normal": 1,
        "fire": 0.5,
        "water": 2,
        "electric": 1,
        "grass": 0.5,
        "ice": 1,
        "fighting": 1,
        "poison": 0.5,
        "ground": 2,
        "flying": 0.5,
        "psychic": 1,
        "bug": 0.5,
        "rock": 2,
        "ghost": 1,
        "dragon": 0.5,
        "dark": 1,
        "steel": 0.5,
        "fairy": 1
    },
    "ice": {
        "normal": 1,
        "fire": 0.5,
        "water": 0.5,
        "electric": 1,
        "grass": 2,
        "ice": 0.5,
        "fighting": 1,
        "poison": 1,
        "ground": 2,
        "flying": 2,
        "psychic": 1,
        "bug": 1,
        "rock": 1,
        "ghost": 1,
        "dragon": 2,
        "dark": 1,
        "steel": 0.5,
        "fairy": 1
    },
    "fighting": {
        "normal": 2,
        "fire": 1,
        "water": 1,
        "electric": 1,
        "grass": 1,
        "ice": 2,
        "fighting": 1,
        "poison": 0.5,
        "ground": 1,
        "flying": 0.5,
        "psychic": 0.5,
        "bug": 0.5,
        "rock": 2,
        "ghost": 0,
        "dragon": 1,
        "dark": 2,
        "steel": 2,
        "fairy": 0.5
    },
    "poison": {
        "normal": 1,
        "fire": 1,
        "water": 1,
        "electric": 1,
        "grass": 2,
        "ice": 1,
        "fighting": 1,
        "poison": 0.5,
        "ground": 0.5,
        "flying": 1,
        "psychic": 1,
        "bug": 1,
        "rock": 0.5,
        "ghost": 0.5,
        "dragon": 1,
        "dark": 1,
        "steel": 0,
        "fairy": 2
    },
    "ground": {
        "normal": 1,
        "fire": 2,
        "water": 1,
        "electric": 2,
        "grass": 0.5,
        "ice": 1,
        "fighting": 1,
        "poison": 2,
        "ground": 1,
        "flying": 0,
        "psychic": 1,
        "bug": 0.5,
        "rock": 2,
        "ghost": 1,
        "dragon": 1,
        "dark": 1,
        "steel": 2,
        "fairy": 1
    },
    "flying": {
        "normal": 1,
        "fire": 1,
        "water": 1,
        "electric": 0.5,
        "grass": 2,
        "ice": 1,
        "fighting": 2,
        "poison": 1,
        "ground": 1,
        "flying": 1,
        "psychic": 1,
        "bug": 2,
        "rock": 0.5,
        "ghost": 1,
        "dragon": 1,
        "dark": 1,
        "steel": 0.5,
        "fairy": 1
    },
    "psychic": {
        "normal": 1,
        "fire": 1,
        "water": 1,
        "electric": 1,
        "grass": 1,
        "ice": 1,
        "fighting": 2,
        "poison": 2,
        "ground": 1,
        "flying": 1,
        "psychic": 0.5,
        "bug": 1,
        "rock": 1,
        "ghost": 1,
        "dragon": 1,
        "dark": 0,
        "steel": 0.5,
        "fairy": 1
    },
    "bug": {
        "normal": 1,
        "fire": 0.5,
        "water": 1,
        "electric": 1,
        "grass": 2,
        "ice": 1,
        "fighting": 0.5,
        "poison": 0.5,
        "ground": 1,
        "flying": 0.5,
        "psychic": 2,
        "bug": 1,
        "rock": 1,
        "ghost": 0.5,
        "dragon": 1,
        "dark": 2,
        "steel": 0.5,
        "fairy": 0.5
    },
    "rock": {
        "normal": 1,
        "fire": 2,
        "water": 1,
        "electric": 1,
        "grass": 1,
        "ice": 2,
        "fighting": 0.5,
        "poison": 1,
        "ground": 0.5,
        "flying": 2,
        "psychic": 1,
        "bug": 2,
        "rock": 1,
        "ghost": 1,
        "dragon": 1,
        "dark": 1,
        "steel": 0.5,
        "fairy": 1
    },
    "ghost": {
        "normal": 0,
        "fire": 1,
        "water": 1,
        "electric": 1,
        "grass": 1,
        "ice": 1,
        "fighting": 1,
        "poison": 1,
        "ground": 1,
        "flying": 1,
        "psychic": 2,
        "bug": 1,
        "rock": 1,
        "ghost": 2,
        "dragon": 1,
        "dark": 0.5,
        "steel": 0.5,
        "fairy": 1
    },
    "dragon": {
        "normal": 1,
        "fire": 1,
        "water": 1,
        "electric": 1,
        "grass": 1,
        "ice": 1,
        "fighting": 1,
        "poison": 1,
        "ground": 1,
        "flying": 1,
        "psychic": 1,
        "bug": 1,
        "rock": 1,
        "ghost": 1,
        "dragon": 2,
        "dark": 1,
        "steel": 0.5,
        "fairy": 0
    },
    "dark": {
        "normal": 1,
        "fire": 1,
        "water": 1,
        "electric": 1,
        "grass": 1,
        "ice": 1,
        "fighting": 0.5,
        "poison": 1,
        "ground": 1,
        "flying": 1,
        "psychic": 2,
        "bug": 1,
        "rock": 1,
        "ghost": 2,
        "dragon": 1,
        "dark": 0.5,
        "steel": 0.5,
        "fairy": 0.5
    },
    "steel": {
        "normal": 1,
        "fire": 0.5,
        "water": 0.5,
        "electric": 0.5,
        "grass": 1,
        "ice": 2,
        "fighting": 1,
        "poison": 1,
        "ground": 1,
        "flying": 1,
        "psychic": 1,
        "bug": 1,
        "rock": 2,
        "ghost": 1,
        "dragon": 1,
        "dark": 1,
        "steel": 0.5,
        "fairy": 2
    },
    "fairy": {
        "normal": 1,
        "fire": 0.5,
        "water": 1,
        "electric": 1,
        "grass": 1,
        "ice": 1,
        "fighting": 2,
        "poison": 0.5,
        "ground": 1,
        "flying": 1,
        "psychic": 1,
        "bug": 1,
        "rock": 1,
        "ghost": 1,
        "dragon": 2,
        "dark": 2,
        "steel": 0.5,
        "fairy": 1
    }
};
async function getPokemonmoves(id) {
    let data = await getPokemon(id);
    let moves = data['moves'];
    let chosen_moves = { 0: null, 1: null, 2: null, 3: null };
    for (let i = 0; i < 4; i++) {
        let x = Math.floor(Math.random() * moves.length) % moves.length;
        let chosen_move = {};
        chosen_move['name'] = moves[x]['move']['name'];
        let response = await fetch(moves[x]['move']['url']);
        let data = await response.json();
        chosen_move['power'] = data['power'];
        chosen_move['type'] = data['type']['name'];
        chosen_move['accuracy'] = data['accuracy'];
        chosen_move['damage_class'] = data['damage_class']['name'];
        chosen_move['target'] = data['target']['name'];
        if (data['meta']) {
            chosen_move['crit_rate'] = data['meta']['crit_rate'];
            chosen_move['drain'] = data['meta']['drain'];
            chosen_move['flinch_chance'] = data['meta']['flinch_chance'];
            chosen_move['healing'] = data['meta']['healing'];
            chosen_move['stat_chance'] = data['meta']['stat_chance'];
        }
        chosen_move['priority'] = data['priority'];
        chosen_move['max_pp'] = data['pp'];
        chosen_move['pp'] = data['pp'];
        chosen_move['stat_changes'] = data['stat_changes'];
        chosen_moves[i] = chosen_move;
    }
    return chosen_moves;
};

function Statusmove(move, battlers, index) {
    if (move.stat_changes) {
        for (let i = 0; i < move.stat_changes.length; i++) {
            if (move.stat_changes[i]['change'] == -1) {
                battlers[index]['battle_stats'][move.stat_changes[i]['stat']] -= battlers[0]['battle_stats'][move.stat_changes[i].stat.name] * 0.25;
                setTimeout(() => {
                    document.getElementById('DialogBox').innerText = battlers[index]['name'] + "'s " + move.stat_changes[i].stat.name + " fell!";
                }, 4000);
            } else if (move.stat_changes[i]['change'] == 1) {
                battlers[index]['battle_stats'][move.stat_changes[i]['stat']] += battlers[0]['battle_stats'][move.stat_changes[i].stat.name] * 0.5;
                setTimeout(() => {
                    document.getElementById('DialogBox').innerText = battlers[index]['name'] + "'s " + move.stat_changes[i].stat.name + " rose!";
                }, 4000);
            } else {
                battlers[index]['battle_stats'][move.stat_changes[i]['stat']] += battlers[0]['battle_stats'][move.stat_changes[i].stat.name];
                setTimeout(() => {
                    document.getElementById('DialogBox').innerText = battlers[index]['name'] + "'s " + move.stat_changes[i].stat.name + " sharply rose!";
                }, 4000);
            }
        }
    }
};

function factorcalc(move, battlers) {
    let factor = 1;
    for (let i = 0; i < battlers[1]['types'].length; i++) {
        factor *= typelookup[move['type']][battlers[1]['types'][i]['type']['name']];
    }
    if (factor < 1) {
        setTimeout(() => {
            document.getElementById('DialogBox').innerText = "It was not very effective!";
            let effectmusic = new Audio('./assets/Music/Battle damage weak.ogg');
            effectmusic.play();
        }, 4000);
    } else if (factor == 1) {
        setTimeout(() => {
            let effectmusic = new Audio('./assets/Music/Battle damage normal.ogg');
            effectmusic.play();
        }, 4000);
    } else {
        setTimeout(() => {
            document.getElementById('DialogBox').innerText = "It's super effective!";
            let effectmusic = new Audio('./assets/Music/Battle damage strong.ogg');
            effectmusic.play();
        }, 4000);
    }
    return factor;
}
function move(move, battlers) {
    let damage = 0;
    switch (move.damage_class) {
        case 'status': {
            if (move.target == 'user') {
                battlers[0]['battle_stats']['hp'] += move.healing % battlers[0].battle_stats.max_hp;
                Statusmove(move, battlers, 0);
            } else {
                battlers[1]['battle_stats']['hp'] += move.healing % battlers[1].battle_stats.max_hp;
                Statusmove(move, battlers, 1);
            }
            break;
        }
        case 'physical': {
            damage = Math.floor(Math.floor(Math.floor(2 * battlers[0]['level'] / 5 + 2) * battlers[0]['battle_stats']['attack'] * move['power'] / battlers[1]['battle_stats']['defense'] / 50));
            damage *= factorcalc(move, battlers);
            battlers[1]['battle_stats']['hp'] -= damage % battlers[1]['battle_stats']['max_hp'];
            break;
        }
        case 'special': {
            damage = Math.floor(Math.floor(Math.floor(2 * battlers[0]['level'] / 5 + 2) * battlers[0]['battle_stats']['special-attack'] * move['power'] / battlers[1]['battle_stats']['special-defense'] / 50));
            damage *= factorcalc(move, battlers);
            battlers[1]['battle_stats']['hp'] -= damage % battlers[1]['battle_stats']['max_hp'];
            break;
        }

    }
};

function turn(player_move, enemy_move, playermon, enemymon) {
    console.log(player_move);
    let player_speed = playermon['stats'][5]['base_stat'];
    let enemy_speed = enemymon['stats'][5]['base_stat'];
    if (player_move['pp'] != 0) {
        setTimeout(() => {
            document.getElementById('DialogBox').innerText = "The player's " + playermon['name'] + " used " + player_move['name'] + "!";
        }, 4000);
        move(player_move, [playermon, enemymon]);
        setTimeout(() => {
            document.getElementById('DialogBox').innerText = "The enemy's " + enemymon['name'] + " used " + enemy_move['name'] + "!";
        }, 4000);
        move(enemy_move, [enemymon, playermon]);
        let damage = 1;
        if (player_speed > enemy_speed) {
            if (player_move['accuracy'] > Math.floor(Math.random() * 50)) {
                if (player_move['damage_class'] == 'physical') {
                    console.log(playermon['level'], playermon['battle_stats']['attack'], player_move['power'], enemymon['battle_stats']['defense']);
                    damage = Math.floor(Math.floor(Math.floor(2 * playermon['level'] / 5 + 2) * playermon['battle_stats']['attack'] * player_move['power'] / enemymon['battle_stats']['defense'] / 50));
                    console.log(damage);
                    for (let i = 0; i < enemymon['types'].length; i++) {
                        damage *= typelookup[player_move['type']][enemymon['types'][i]['type']['name']];
                    }
                } else if (player_move['damage_class'] == 'special') {
                    damage = Math.floor(Math.floor(Math.floor(2 * playermon['level'] / 5 + 2) * playermon['battle_stats']['special-attack'] * player_move['power'] / enemymon['battle_stats']['special-defense'] / 50));
                    for (let i = 0; i < enemymon['types'].length; i++) {
                        damage *= typelookup[player_move['type']][enemymon['types'][i]['type']['name']];
                    }
                }
                console.log(damage);
                enemymon['battle_stats']['hp'] -= damage;
                document.getElementById('enemy_hp_bar').style.width = (Math.max(enemymon['battle_stats']['hp'], 0) / enemymon['battle_stats']['max_hp'] * 100).toString() + '%';
            } else {
                document.getElementById('DialogBox').innerText = "The move missed!";
            }
            if (enemy_move['accuracy'] > Math.floor(Math.random() * 100)) {
                if (enemy_move['damage_class'] == 'physical') {
                    console.log(playermon['level'], playermon['battle_stats']['attack'], player_move['power'], enemymon['battle_stats']['defense']);
                    damage = Math.floor(Math.floor(Math.floor(2 * enemymon['level'] / 5 + 2) * enemymon['battle_stats']['attack'] * enemy_move['power'] / playermon['battle_stats']['defense'] / 50));
                    for (let i = 0; i < playermon['types'].length; i++) {
                        damage *= typelookup[enemy_move['type']][enemymon['types'][i]['type']['name']];
                    }
                } else if (enemy_move['damage_class'] == 'special') {
                    damage = Math.floor(Math.floor(Math.floor(2 * enemymon['level'] / 5 + 2) * enemymon['battle_stats']['special-attack'] * enemy_move['power'] / playermon['battle_stats']['special-defense'] / 50));
                    for (let i = 0; i < playermon['types'].length; i++) {
                        damage *= typelookup[enemy_move['type']][playermon['types'][i]['type']['name']];
                    }
                }
                console.log(damage);
                playermon['battle_stats']['hp'] -= damage;
                document.getElementById('player_hp_bar').style.width = (Math.max(playermon['battle_stats']['hp'], 0) / playermon['battle_stats']['max_hp'] * 100).toString() + '%';
            } else {
                document.getElementById('DialogBox').innerText = "The move missed!";
            }
        } else {
            if (enemy_move['accuracy'] > Math.floor(Math.random() * 50)) {
                if (enemy_move['damage_class'] == 'physical') {
                    console.log(playermon['level'], playermon['battle_stats']['attack'], player_move['power'], enemymon['battle_stats']['defense']);
                    damage = Math.floor(Math.floor(Math.floor(2 * enemymon['level'] / 5 + 2) * enemymon['battle_stats']['attack'] * enemy_move['power'] / playermon['battle_stats']['defense'] / 50));
                    for (let i = 0; i < enemymon['types'].length; i++) {
                        damage *= typelookup[enemy_move['type']][enemymon['types'][i]['type']['name']];
                    }
                } else if (enemy_move['damage_class'] == 'special') {
                    damage = Math.floor(Math.floor(Math.floor(2 * enemymon['level'] / 5 + 2) * enemymon['battle_stats']['special-attack'] * enemy_move['power'] / playermon['battle_stats']['special-defense'] / 50));
                    for (let i = 0; i < playermon['types'].length; i++) {
                        damage *= typelookup[enemy_move['type']][playermon['types'][i]['type']['name']];
                    }
                }
                console.log(damage);
                playermon['battle_stats']['hp'] -= damage;
                document.getElementById('player_hp_bar').style.width = (Math.max(playermon['battle_stats']['hp'], 0) / playermon['battle_stats']['max_hp'] * 100).toString() + '%';
            } else {
                document.getElementById('DialogBox').innerText = "The move missed!";
            }
            if (player_move['accuracy'] > Math.floor(Math.random() * 100)) {
                if (player_move['damage_class'] == 'physical') {
                    console.log(playermon['level'], playermon['battle_stats']['attack'], player_move['power'], enemymon['battle_stats']['defense']);
                    damage = Math.floor(Math.floor(Math.floor(2 * playermon['level'] / 5 + 2) * playermon['battle_stats']['attack'] * player_move['power'] / enemymon['battle_stats']['defense'] / 50));
                    for (let i = 0; i < enemymon['types'].length; i++) {
                        damage *= typelookup[player_move['type']][enemymon['types'][i]['type']['name']];
                    }
                } else if (player_move['damage_class'] == 'special') {
                    damage = Math.floor(Math.floor(Math.floor(2 * playermon['level'] / 5 + 2) * playermon['battle_stats']['special-attack'] * player_move['power'] / enemymon['battle_stats']['special-defense'] / 50));
                    for (let i = 0; i < enemymon['types'].length; i++) {
                        damage *= typelookup[player_move['type']][enemymon['types'][i]['type']['name']];
                    }
                }
                console.log(damage);
                enemymon['battle_stats']['hp'] -= damage;
                document.getElementById('enemy_hp_bar').style.width = (Math.max(enemymon['battle_stats']['hp'], 0) / enemymon['battle_stats']['max_hp'] * 100).toString() + '%';
            } else {
                document.getElementById('DialogBox').innerText = "The move missed!";
            }
        }
        // }
        console.log(playermon['battle_stats']['hp']);
        console.log(enemymon['battle_stats']['hp']);
        enemy_move['pp']--;
        player_move['pp']--;
        if (playermon['battle_stats']['hp'] <= 0) {
            setTimeout(() => {
                document.getElementById('DialogBox').innerText = "The player's " + playermon['name'] + " fainted!";
            }, 1000);
            document.getElementById('DialogBox').innerText = "Choose another pokemon!";
            document.getElementById('back').remove();
        }
        if (enemymon['battle_stats']['hp'] <= 0) {
            document.getElementById('DialogBox').innerText = "The enemy's " + enemymon['name'] + " fainted!";
            document.getElementById('front').remove();
        }
        game(playerteam, enemyteam);
    } else {
        document.getElementById('DialogBox').innerText = "There's no pp left for this move!";
        // turn(player_move, enemy_move, playermon, enemymon);
    }
};

function game(playerteam, enemyteam) {
    let win = 0;
    let gameover = 0;
    for (let i = 0; i < playerteam.length; i++) {
        win |= (playerteam[i]['battle_stats']['hp'] >= 0);
    }
    if (win) {
        for (let i = 0; i < enemyteam.length; i++) {
            gameover &= (enemyteam[i]['battle_stats']['hp'] <= 0);
        }
    }
    if (gameover) {
        if (win) {
            document.getElementById('DialogBox').innerText = "You win!";
        } else
            document.getElementById('DialogBox').innerText = "You lose!";
    } else {
        document.getElementById('DialogBox').innerText = "What will " + playerteam[0]['name'] + " do?";
    }
};
async function gameloop() {
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
    let battle_stats = {};
    front['level'] = 100;
    back['level'] = 100;
    for (let i = 0; i < 6; i++) {
        if (back['stats'][i]['stat']['name'] == 'hp') {
            battle_stats[back['stats'][i]['stat']['name']] = Math.floor((2 * back['stats'][i]['base_stat'] / 100) * back['level']) + 110;
            battle_stats['max_hp'] = Math.floor((2 * back['stats'][i]['base_stat'] / 100) * back['level']) + 110;
        } else
            battle_stats[back['stats'][i]['stat']['name']] = Math.floor((2 * back['stats'][i]['base_stat'] / 100) * back['level']) + 5;
    }
    back['battle_stats'] = battle_stats;
    battle_stats = {};
    for (let i = 0; i < 6; i++) {
        if (front['stats'][i]['stat']['name'] == 'hp') {
            battle_stats[front['stats'][i]['stat']['name']] = Math.floor((2 * front['stats'][i]['base_stat'] / 100) * front['level']) + 110;
            battle_stats['max_hp'] = Math.floor((2 * front['stats'][i]['base_stat'] / 100) * front['level']) + 5;
        } else
            battle_stats[front['stats'][i]['stat']['name']] = Math.floor((2 * front['stats'][i]['base_stat'] / 100) * front['level']) + 5;
    }
    front['battle_stats'] = battle_stats;
    playerteam[0] = back;
    enemyteam[0] = front;
    console.log(front);
    console.log(back);
    let img = document.createElement('img');
    img.src = front['sprites']['other']['showdown']['front_default'];
    img.setAttribute('id', 'front');
    img.style.position = 'absolute';
    img.style.bottom = '60%';
    img.style.margin = '0 auto';
    document.getElementById('battler1').appendChild(img);
    img = document.createElement('img');
    img.src = back['sprites']['other']['showdown']['back_default'];
    img.setAttribute('id', 'back');
    img.style.position = 'absolute';
    img.style.bottom = '60%';
    img.style.margin = '0 auto';
    document.getElementById('battler0').appendChild(img);
    let playermon = playerteam[0];
    let enemymon = enemyteam[0];
    let player_moves = await getPokemonmoves(playermon['id']);
    let enemy_moves = await getPokemonmoves(enemymon['id']);
    let hp_bar = document.createElement('div');
    hp_bar.setAttribute('class', 'hp-bar');
    hp_bar.style.width = '100%';
    hp_bar.style.height = '1rem';
    hp_bar.style.backgroundColor = 'green';
    hp_bar.setAttribute('id', 'player_hp_bar')
    document.getElementById('battler0').appendChild(hp_bar);
    hp_bar = document.createElement('div');
    hp_bar.setAttribute('class', 'hp-bar');
    hp_bar.style.width = '100%';
    hp_bar.style.height = '1rem';
    hp_bar.style.backgroundColor = 'green';
    hp_bar.setAttribute('id', 'enemy_hp_bar')
    document.getElementById('battler1').appendChild(hp_bar);
    for (let i = 0; i < 4; i++) {
        let move = document.createElement('button');
        move.innerText = player_moves[i]['name'];
        move.setAttribute('id', 'move' + i.toString());
        document.getElementById('action').appendChild(move);
        document.getElementById('move' + i.toString()).addEventListener('click', () => { turn(player_moves[i], enemy_moves[i], playerteam[0], enemyteam[0]) });
    }

}
async function getPokemon(id) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id.toString());
    let data = await response.json();
    return data;
}
gameloop();
