function rollD6() {
    return Math.ceil(Math.random() * 6);
}

function sumAfterRemovingLowest(rolls) {
    const minRoll = Math.min(...rolls);
    const indexToRemove = rolls.indexOf(minRoll);
    rolls.splice(indexToRemove, 1);
    return rolls.reduce((a, b) => a + b, 0);
}

function rollStat(legendary = false) {
    if (legendary) {
        const rolls = Array(4).fill().map(rollD6);
        const sumOfRolls = sumAfterRemovingLowest(rolls);
        return sumOfRolls < 18 ? sumOfRolls + 1 : sumOfRolls;
    }
    return rollD6() + rollD6() + rollD6();
}

function newCharacter(name = "Mysterious Stranger") {
    const character = {
        name,
        strength: rollStat(),
        dexterity: rollStat(),
        constitution: rollStat(),
        intelligence: rollStat(),
        wisdom: rollStat(),
        charisma: rollStat(),
    };

    let output = `Rolling Stats for ${name}:\n\n`;
    for (let key in character) {
        if (key !== 'name') {
            let statName = key.charAt(0).toUpperCase() + key.slice(1);
            output += `${statName} rolled: ${character[key]}\n`;
        }
    }

    return { character, output };
}

function checkCharacter(character) {
    const messages = {
        terrible: ["I've never seen such bad luck before.", "I'm sorry, this is a tragedy"],
        bad: ["Oof! Unlucky Rolls.", "It could be worse. Not really but stay positive.", "Sometimes playing a bad character can also be fun, right?"],
        average: ["Pretty good, have fun.", "Not bad, not great, just right.", "Work hard and you'll be alright."],
        good: ["Wow! Nice Stats!", "Looking good adventurer but talent isn't everything.", "With stats like those I'm sure you will achieve great things."],
        great: ["18! A truly legendary character, good luck.", "You have been blessed with incredible abilities, make sure you put them to use."]
    };

    let statsCount = {
        terrible: 0,
        bad: 0,
        average: 0,
        good: 0,
        great: 0
    };

    for (let stat in character) {
        if (typeof character[stat] === 'number') {
            if (character[stat] === 18) statsCount.great++;
            else if (character[stat] === 17) statsCount.good += 3;
            else if (character[stat] === 16) statsCount.good += 2;
            else if (character[stat] >= 14) statsCount.good++;
            else if (character[stat] >= 8 && character[stat] <= 13) statsCount.average++;
            else if (character[stat] >= 4 && character[stat] < 8) statsCount.bad++;
            else statsCount.terrible++;
        }
    }

    let quality;
    if (statsCount.great >= 1) quality = "great";
    else if (statsCount.good >= 3) quality = "good";
    else if (statsCount.terrible >= 1 || statsCount.bad >= 4) quality = "terrible";
    else if (statsCount.bad >= 3) quality = "bad";
    else quality = "average";

    return messages[quality][Math.floor(Math.random() * messages[quality].length)];
}

const { character, output } = newCharacter("John Winters");
const qualityMessage = checkCharacter(character);
const finalOutput = output + '\n' + qualityMessage;

function rollCharacterStats(event) {
    // This prevents the default behavior (like form submission) when pressing Enter
    if (event) {
        event.preventDefault();
    }
    const characterName = $("#characterName").val() || "Mysterious Stranger"; // Use the entered name or a default if no name is provided
    const { character, output } = newCharacter(characterName);
    const qualityMessage = checkCharacter(character);
    const finalOutput = output + '\n' + qualityMessage;

    $('#stats').html(finalOutput.replace(/\n/g, '<br>')); // replace newlines with <br> for proper HTML formatting
}


$(document).ready(function() {
    // runs code to generate a character with stats and a random message
    $('#characterName').keypress(function(event) {
        if (event.which === 13) {
            rollCharacterStats(event);
        }
    });
    $("#rollStatsButton").click(rollCharacterStats);
});