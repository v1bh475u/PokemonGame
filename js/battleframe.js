let battlebacks = ['cave1', 'cave2', 'cave3', 'champion1', 'champion2', 'city', 'city_eve', 'distortion', 'forest', 'forest_eve', 'forest_night', 'field', 'field', 'field_eve', 'field_night', 'water'];
let playerteam = {};
let enemyteam = {};
let playermoves = {};
let enemymoves = {};
let playermon = {};
let enemymon = {};
import typelookup from "./../JSON/typelookup.json" with { type: "json" };

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

async function getPokemonmoves(pokemon) {
    let moves = pokemon['moves'];
    let chosen_moves = [];
    let i = 0;
    while (i < 4) {
        let x = Object.getOwnPropertyNames(moves).length;
        while (x >= Object.getOwnPropertyNames(moves).length) x = Math.floor(Math.random() * Object.getOwnPropertyNames(moves).length) % Object.getOwnPropertyNames(moves).length;
        let chosen_move = {};
        if (!(chosen_moves.hasOwnProperty(moves[x]['move']['name']))) {
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
            chosen_moves.push(chosen_move);
            i++;
        }
    }
    return chosen_moves;
};

async function Statusmove(move, battlers, index) {
    if (move.stat_changes) {
        for (let i = 0; i < move.stat_changes.length; i++) {
            if (move.stat_changes[i]['change'] == -1) {
                battlers[index]['battle_stats'][move.stat_changes[i]['stat']] -= battlers[0]['battle_stats'][move.stat_changes[i].stat.name] * 0.25;
                document.getElementById('DialogBox').innerText = battlers[index]['name'] + "'s " + move.stat_changes[i].stat.name + " fell!";
                await sleep(1000);
            } else if (move.stat_changes[i]['change'] == 1) {
                battlers[index]['battle_stats'][move.stat_changes[i]['stat']] += battlers[0]['battle_stats'][move.stat_changes[i].stat.name] * 0.5;
                document.getElementById('DialogBox').innerText = battlers[index]['name'] + "'s " + move.stat_changes[i].stat.name + " rose!";
                await sleep(1000);
            } else {
                battlers[index]['battle_stats'][move.stat_changes[i]['stat']] += battlers[0]['battle_stats'][move.stat_changes[i].stat.name];
                document.getElementById('DialogBox').innerText = battlers[index]['name'] + "'s " + move.stat_changes[i].stat.name + " sharply rose!";
                await sleep(1000);
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
        document.getElementById('DialogBox').innerText = "It was not very effective!";
        let effectmusic = new Audio('./assets/Music/Battle damage weak.ogg');
        effectmusic.play();
    } else if (factor == 1) {
        let effectmusic = new Audio('./assets/Music/Battle damage normal.ogg');
        effectmusic.play();
    } else {
        document.getElementById('DialogBox').innerText = "It's super effective!";
        let effectmusic = new Audio('./assets/Music/Battle damage super.ogg');
        effectmusic.play();
    }
    return factor;
};

async function move(move, battlers) {
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
            if (move.accuracy > Math.floor(Math.random() * 50)) {
                damage = Math.floor(Math.floor(Math.floor(2 * battlers[0]['level'] / 5 + 2) * battlers[0]['battle_stats']['attack'] * move['power'] / battlers[1]['battle_stats']['defense'] / 50));
                damage *= factorcalc(move, battlers);
                console.log(damage);
                battlers[1]['battle_stats']['hp'] = Math.max(battlers[1]['battle_stats']['hp'] - damage, 0);
            } else {

                document.getElementById('DialogBox').innerText = "The move missed!";
            }
            break;
        }
        case 'special': {
            if (move.accuracy > Math.floor(Math.random() * 50)) {
                damage = Math.floor(Math.floor(Math.floor(2 * battlers[0]['level'] / 5 + 2) * battlers[0]['battle_stats']['special-attack'] * move['power'] / battlers[1]['battle_stats']['special-defense'] / 50));
                damage *= factorcalc(move, battlers);
                console.log(damage);
                battlers[1]['battle_stats']['hp'] = Math.max(battlers[1]['battle_stats']['hp'] - damage, 0);
            } else {

                document.getElementById('DialogBox').innerText = "The move missed!";

            }
            break;
        }

    }
};

async function turn(player_move, enemy_moves, playermon, enemymon) {
    console.log(player_move);
    let enemy_move = enemy_moves[Math.floor(Math.random() * 4) % 4];
    console.log(enemy_move);
    let player_speed = playermon['stats'][5]['base_stat'];
    let enemy_speed = enemymon['stats'][5]['base_stat'];
    if (player_move['pp'] != 0) {
        if (player_speed >= enemy_speed) {
            document.getElementById('DialogBox').innerText = "The player's " + playermon['name'] + " used " + player_move['name'] + "!";

            await move(player_move, [playermon, enemymon]);
            document.getElementById('enemy_hp_bar').style.width = (Math.max(enemymon['battle_stats']['hp'], 0) / enemymon['battle_stats']['max_hp'] * 100).toString() + '%';
            updateBackgroundColor('enemy_hp_bar');
            document.getElementById('player_hp_bar').style.width = (Math.max(playermon['battle_stats']['hp'], 0) / playermon['battle_stats']['max_hp'] * 100).toString() + '%';
            updateBackgroundColor('player_hp_bar');
            await sleep(2000);
            if (enemymon['battle_stats']['hp'] <= 0) {
                await sleep(2000);
                try {
                    document.getElementById('front').remove();
                } catch (err) { }; document.getElementById('DialogBox').innerText = "The enemy's " + enemymon['name'] + " fainted!";
                enemnymonchoice();
                await sleep(2000);
            } else {
                document.getElementById('DialogBox').innerText = "The enemy's " + enemymon['name'] + " used " + enemy_move['name'] + "!";
                await sleep(2000);
                await move(enemy_move, [enemymon, playermon]);
                document.getElementById('player_hp_bar').style.width = (Math.max(playermon['battle_stats']['hp'], 0) / playermon['battle_stats']['max_hp'] * 100).toString() + '%';
                document.getElementById('enemy_hp_bar').style.width = (Math.max(enemymon['battle_stats']['hp'], 0) / enemymon['battle_stats']['max_hp'] * 100).toString() + '%';
                updateBackgroundColor('enemy_hp_bar');
            }
        } else {
            document.getElementById('DialogBox').innerText = "The enemy's " + enemymon['name'] + " used " + enemy_move['name'] + "!";
            await move(enemy_move, [enemymon, playermon]);
            document.getElementById('enemy_hp_bar').style.width = (Math.max(enemymon['battle_stats']['hp'], 0) / enemymon['battle_stats']['max_hp'] * 100).toString() + '%';
            updateBackgroundColor('enemy_hp_bar');
            document.getElementById('player_hp_bar').style.width = (Math.max(playermon['battle_stats']['hp'], 0) / playermon['battle_stats']['max_hp'] * 100).toString() + '%';
            updateBackgroundColor('player_hp_bar');
            if (playermon['battle_stats']['hp'] <= 0) {
                await sleep(2000);
                try {
                    document.getElementById('back').remove();
                } catch (err) { };
                document.getElementById('DialogBox').innerText = "The player's " + playermon['name'] + " fainted!";
                await sleep(2000);
                document.getElementById('DialogBox').innerText = "Choose another pokemon!";
                document.getElementById('action').innerHTML = "";
                switchmonchoice();
            } else {
                await sleep(2000);
                document.getElementById('DialogBox').innerText = "The player's " + playermon['name'] + " used " + player_move['name'] + "!";
                await sleep(2000);
                await move(player_move, [playermon, enemymon]);
                document.getElementById('enemy_hp_bar').style.width = (Math.max(enemymon['battle_stats']['hp'], 0) / enemymon['battle_stats']['max_hp'] * 100).toString() + '%';
                updateBackgroundColor('enemy_hp_bar');
                document.getElementById('player_hp_bar').style.width = (Math.max(playermon['battle_stats']['hp'], 0) / playermon['battle_stats']['max_hp'] * 100).toString() + '%';
                updateBackgroundColor('player_hp_bar');
            }
        }
        console.log('playermon', playermon['battle_stats']['hp']);
        console.log('enemymon', enemymon['battle_stats']['hp']);
        enemy_move['pp']--;
        player_move['pp']--;
        if (enemymon['battle_stats']['hp'] <= 0) {
            document.getElementById('action').innerHTML = "";
            await sleep(2000);
            try {
                document.getElementById('front').remove();
            } catch (err) { };
            document.getElementById('DialogBox').innerText = "The enemy's " + enemymon['name'] + " fainted!";
            enemnymonchoice();
            await sleep(2000);
        }
        if (playermon['battle_stats']['hp'] <= 0) {
            document.getElementById('action').innerHTML = "";
            await sleep(2000);
            try {
                document.getElementById('back').remove();
            } catch (err) { };
            document.getElementById('DialogBox').innerText = "The player's " + playermon['name'] + " fainted!";
            await sleep(2000);
            document.getElementById('DialogBox').innerText = "Choose another pokemon!";
            switchmonchoice();
        }
        game(playerteam, enemyteam);
    } else {
        document.getElementById('DialogBox').innerText = "There's no pp left for this move!";
        await sleep(2000);
        choice();
    }
};

async function enemnymonchoice() {
    enemymoves = {};
    let x = 0;
    while (enemyteam[x]['battle_stats']['hp'] <= 0) {
        x = Math.floor(Math.random() * 6) % 6;
    }
    let front = enemyteam[x];
    let img = document.createElement('img');
    img.src = front['sprites']['other']['showdown']['front_default'];
    img.setAttribute('id', 'front');
    img.style.position = 'absolute';
    img.style.bottom = '60%';
    img.style.margin = '0 auto';
    document.getElementById('battler1').querySelector('div').appendChild(img);
    enemymon = enemyteam[x];
    document.getElementById('enemy_hp_bar').style.width = (Math.max(enemymon['battle_stats']['hp'], 0) / enemymon['battle_stats']['max_hp'] * 100).toString() + '%';
    updateBackgroundColor('enemy_hp_bar');
    for (let i = 0; i < 4; i++) {
        x = Math.floor(Math.random() * enemymon.moves.length) % enemymon.moves.length;
        let chosen_move = {};
        chosen_move['name'] = enemymon.moves[x]['move']['name'];
        let response = await fetch(enemymon.moves[x]['move']['url']);
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
        enemymoves[i] = chosen_move;
    }
};

function game(playerteam, enemyteam) {
    let win = 0;
    let gameover = 1;
    for (let i = 0; i < Object.getOwnPropertyNames(playerteam).length; i++) {
        win |= (playerteam[i]['battle_stats']['hp'] >= 0);
    }
    if (win) {
        for (let i = 0; i < Object.getOwnPropertyNames(enemyteam).length; i++) {
            gameover &= (enemyteam[i]['battle_stats']['hp'] <= 0);
        }
    }
    if (gameover) {
        if (win) {
            document.getElementById('DialogBox').innerText = "You win!";
            battlemusic.stop();
            let victorymusic = new Audio('./assets/Music/Battle victory.ogg');
            victorymusic.play();
        } else
            document.getElementById('DialogBox').innerText = "You lose!";
    } else {
        if (playermon.battle_stats.hp >= 0)
            choice();
    }
};

function choice() {
    document.getElementById('DialogBox').innerText = "Would you like to battle?";
    document.getElementById('action').innerHTML = "";
    let start = document.createElement('button');
    start.innerText = "Switch";
    start.setAttribute('id', 'switch');
    document.getElementById('action').appendChild(start);
    document.getElementById('switch').addEventListener('click', () => { document.getElementById('action').innerHTML = ""; switchmonchoice(); });
    start = document.createElement('button');
    start.innerText = "Attack";
    start.setAttribute('id', 'attack');
    document.getElementById('action').appendChild(start);
    document.getElementById('attack').addEventListener('click', () => { document.getElementById('action').innerHTML = ""; attackchoice(playermoves, enemymoves); });
};

let battlemusic = new Audio('./assets/Music/fireleafbattle.ogg');
battlemusic.loop = true;

function gameloop() {
    document.getElementById('DialogBox').innerText = "Would you like to battle?";
    let start = document.createElement('button');
    start.innerText = "Start";
    start.setAttribute('id', 'start');
    document.getElementById('action').appendChild(start);
    document.getElementById('start').addEventListener('click', () => { battlemusic.play(); document.getElementById('action').innerHTML = ""; battle() });
    let x = Math.floor(Math.random() * 50) % 16;
    document.getElementById('battle-frame').style.backgroundImage = "url(./assets/Graphics/BattleBG/" + battlebacks[x] + "_bg.png)";
    document.getElementById('battle-frame').style.backgroundSize = "cover";
    document.getElementById('battle-frame').style.backgroundRepeat = "no-repeat";
    // if (battlebacks[x].startsWith('forest')) {
    //     document.getElementById('base0').src = "./assets/Graphics/Battlebacks/grass" + battlebacks[x].substring(6, battlebacks[x].length) + "_base1.png";
    //     document.getElementById('base1').src = "./assets/Graphics/Battlebacks/grass" + battlebacks[x].substring(6, battlebacks[x].length) + "_base1.png";
    // } else if (battlebacks[x].startsWith('city')) {
    //     document.getElementById('base0').src = "./assets/Graphics/Battlebacks/city_base1.png";
    //     document.getElementById('base1').src = "./assets/Graphics/Battlebacks/city_base1.png";
    // } else {
    //     document.getElementById('base0').src = "./assets/Graphics/Battlebacks/" + battlebacks[x] + "_base1.png";
    //     document.getElementById('base1').src = "./assets/Graphics/Battlebacks/" + battlebacks[x] + "_base1.png";
    // }
};

async function battle() {
    let loading = document.createElement('img');
    loading.src = "./assets/images/loader.gif";
    document.getElementById('action').appendChild(loading);
    await generateTeams();
    let back = playerteam[0];
    let front = enemyteam[0];
    console.log(front);
    console.log(back);
    let img = document.createElement('img');
    img.src = front['sprites']['other']['showdown']['front_default'];
    img.setAttribute('id', 'front');
    img.style.position = 'absolute';
    img.style.bottom = '60%';
    await document.getElementById('battler1').querySelector('div').appendChild(img);
    let base = await document.getElementById('base1').width;
    img = document.getElementById('front');
    // img.style.right = (-56 + base / 2 - img.width / 2).toString() + '%';
    img = document.createElement('img');
    img.src = back['sprites']['other']['showdown']['back_default'];
    img.setAttribute('id', 'back');
    img.style.position = 'absolute';
    img.style.bottom = '60%';
    document.getElementById('battler0').querySelector('div').appendChild(img);
    playermon = playerteam[0];
    enemymon = enemyteam[0];
    playermoves = await getPokemonmoves(playermon);
    playermon.battle_moves = playermoves;
    enemymoves = await getPokemonmoves(enemymon);
    enemymon.battle_moves = enemymoves;
    let hp_bar = document.createElement('div');
    hp_bar.setAttribute('class', 'hp-bar');
    hp_bar.style.width = '100%';
    hp_bar.style.backgroundColor = '#a0e515';
    hp_bar.setAttribute('id', 'player_hp_bar');
    document.getElementById('battler0').querySelector('div').appendChild(hp_bar);
    hp_bar = document.createElement('div');
    hp_bar.setAttribute('class', 'hp-bar');
    hp_bar.style.width = '100%';
    hp_bar.style.backgroundColor = '#a0e515';
    hp_bar.setAttribute('id', 'enemy_hp_bar');
    document.getElementById('battler1').querySelector('div').appendChild(hp_bar);
    document.getElementById('DialogBox').innerText = "What will you do?";
    document.getElementById('action').innerHTML = "";
    let choice = document.createElement('button');
    choice.innerText = "Switch";
    choice.setAttribute('id', 'switch');
    document.getElementById('action').appendChild(choice);
    document.getElementById('switch').addEventListener('click', () => { document.getElementById('action').innerHTML = ""; switchmonchoice(); });
    choice = document.createElement('button');
    choice.innerText = "Attack";
    choice.setAttribute('id', 'attack');
    document.getElementById('action').appendChild(choice);
    document.getElementById('attack').addEventListener('click', () => { document.getElementById('action').innerHTML = ""; attackchoice(playermoves, enemymoves); });
};

function attackchoice(playermoves, enemymoves) {
    for (let i = 0; i < 4; i++) {
        let move = document.createElement('button');
        move.innerText = playermoves[i]['name'];
        move.setAttribute('id', 'move' + i.toString());
        document.getElementById('action').appendChild(move);
        document.getElementById('move' + i.toString()).addEventListener('click', () => { turn(playermoves[i], enemymoves, playermon, enemymon); document.getElementById('action').innerHTML = ""; });
    }
};

async function getPokemon(id) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id.toString());
    let data = await response.json();
    return data;
};

async function generateTeams() {
    for (let i = 0; i < 6; i++) {
        let front = {};
        let back = {};
        let x = 0;
        while (x === 0)
            x = Math.floor(Math.random() * 800) % 800;
        let y = 0;
        while (y === 0) y = Math.floor(Math.random() * 800) % 800;
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
                battle_stats['max_hp'] = Math.floor((2 * front['stats'][i]['base_stat'] / 100) * front['level']) + 110;
            } else
                battle_stats[front['stats'][i]['stat']['name']] = Math.floor((2 * front['stats'][i]['base_stat'] / 100) * front['level']) + 5;
        }
        front['battle_stats'] = battle_stats;
        playerteam[i] = back;
        enemyteam[i] = front;
    }
};

function switchmonchoice() {
    for (let i = 0; i < 6; i++) {
        let mon = document.createElement('button');
        mon.innerText = playerteam[i]['name'];
        mon.setAttribute('id', 'mon' + i.toString());
        document.getElementById('action').appendChild(mon);
        document.getElementById('mon' + i.toString()).addEventListener('click', () => { document.getElementById('action').innerHTML = ""; switchmon(i); });
    }
};

async function switchmon(index) {
    if (playerteam[index]['battle_stats']['hp'] <= 0 || playerteam[index] == playermon) {
        document.getElementById('DialogBox').innerText = "Choose another pokemon!";
        document.getElementById('action').innerHTML = "";
        switchmonchoice();
    } else {
        let back = playerteam[index];
        try {
            document.getElementById('back').remove();
        } catch (err) { };
        let img = document.createElement('img');
        img.src = back['sprites']['other']['showdown']['back_default'];
        img.setAttribute('id', 'back');
        img.style.position = 'absolute';
        img.style.bottom = '60%';
        img.style.margin = '0 auto';
        document.getElementById('battler0').querySelector('div').appendChild(img);
        playermon = playerteam[index];
        if (playermon.battle_moves == undefined) {
            playermoves = await getPokemonmoves(playermon);
            playermon.battle_moves = playermoves;
        } else
            playermoves = playermon.battle_moves;
        playermon = playerteam[index];
        document.getElementById('player_hp_bar').remove();
        let hp_bar = document.createElement('div');
        hp_bar.style.width = (playermon.battle_stats.hp / playermon.battle_stats.max_hp * 100).toString() + '%';
        hp_bar.setAttribute('class', 'hp-bar');
        hp_bar.setAttribute('id', 'player_hp_bar')
        document.getElementById('battler0').querySelector('div').appendChild(hp_bar);
        updateBackgroundColor('player_hp_bar');
        document.getElementById('DialogBox').innerText = "What will you do?";
        let choice = document.createElement('button');
        choice.innerText = "Switch";
        choice.setAttribute('id', 'switch');
        document.getElementById('action').appendChild(choice);
        document.getElementById('switch').addEventListener('click', () => { document.getElementById('action').innerHTML = ""; switchmonchoice(); });
        choice = document.createElement('button');
        choice.innerText = "Attack";
        choice.setAttribute('id', 'attack');
        document.getElementById('action').appendChild(choice);
        document.getElementById('attack').addEventListener('click', () => { document.getElementById('action').innerHTML = ""; attackchoice(playermoves, enemymoves); });
    }
};

function updateBackgroundColor(id) {
    let myDiv = document.getElementById(id);
    let percentage = parseFloat(myDiv.style.width);
    if (percentage < 20) {
        myDiv.style.backgroundColor = '#f34444';
    } else if (percentage < 50) {
        myDiv.style.backgroundColor = '#ff7f0f';
    } else if (percentage < 75) {
        myDiv.style.backgroundColor = '#ffdd57';
    } else {
        myDiv.style.backgroundColor = "#a0e515";
    }
};

window.onload = () => { gameloop() };
