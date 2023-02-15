window.onload = function () {

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var categories;
    var selectedCategory;
    var lives;
    var word;
    var guess;
    var geusses = [];
    var space;
    var counter;

    var showLives = document.getElementById("livesLeft");
    var showClue = document.getElementById("clue");

    var selectCategory = function () {
        if (selectedCategory === categories[0]) {
            categoryName.innerHTML = "<br><br><br><br>The Chosen Category Is Movies";
        } else if (selectedCategory === categories[1]) {
            categoryName.innerHTML = "<br><br><br><br>The Chosen Category Is Video Games";
        } else if (selectedCategory === categories[2]) {
            categoryName.innerHTML = "<br><br><br><br>The Chosen Category Is Animals";
        } else {
            categoryName.innerHTML = "<br><br><br><br>The Chosen Category Does Not xist";
        };
    };

    var comments = function () {
        showLives.innerHTML = "You have " + lives + " lives";
        if (lives < 1) {
            showLives.innerHTML = "Death! (No more lives left)";
            alphabet.setAttribute("disabled", true);
        };
        for (var i = 0; i < geusses.length; i++) {
            if (counter + space === geusses.length) {
                showLives.innerHTML = "Victory! (All letters guessed)";
            };
        };
    };

    var buttons = function () {
        myButtons = document.getElementById('buttons');
        letters = document.createElement('ul');

        for (var i = 0; i < alphabet.length; i++) {
            letters.id = 'alphabet';
            list = document.createElement('li');
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            list.className = 'inactive';
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        };
    };

    var result = function () {
        wordHolder = document.getElementById('wordHolder');
        correctGuess = document.createElement('ul');

        for (var i = 0; i < word.length; i++) {
            correctGuess.setAttribute('id', 'my-word');
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');
            if (word[i] === "-") {
                guess.innerHTML = "-";
                space = 1;
            } else {
                guess.innerHTML = "_";
            };

            geusses.push(guess);
            wordHolder.appendChild(correctGuess);
            correctGuess.appendChild(guess);
        };
    };

    var check = function () {
        list.onclick = function () {
            var geuss = (this.innerHTML);
            this.setAttribute("class", "active");
            this.innerHTML = '/';
            this.onclick = null;
            for (var i = 0; i < word.length; i++) {
                if (word[i] === geuss) {
                    geusses[i].innerHTML = geuss;
                    counter += 1;
                };
            };
            var j = (word.indexOf(geuss));
            if (j === -1) {
                lives -= 1;
                comments();
            } else {
                comments();
            };
        };
    };

    var play = function () {
        categories = [["ted", "finding-nemo", "jaws", "veronica", "spirited-away", "titanic", "jurassic-park", "the-exorcist", "taken"],
        ["minecraft", "outlast", "watch-dogs", "bloodborne", "the-forest", "portal", "hangman", "super-mario", "minesweeper", "nosgoth"],
        ["tiger", "monkey", "blue-whale", "shark", "anaconda", "chameleon", "ant", "camel", "armadillo", "lion",]];
        selectedCategory = categories[Math.floor(Math.random() * categories.length)];
        word = selectedCategory[Math.floor(Math.random() * selectedCategory.length)];
        word = word.replace(/\s+/g, "-");
        buttons();
        geusses = [];
        lives = 10;
        counter = 0;
        space = 0;
        result();
        comments();
        selectCategory();
    };
    play();

    hint.onclick = function () {
        hints = [["Talking teddy bear.", "Dad fish finding his son.", "Giant great white shark.", "Horror based on a real story.", "Animated movie about the spirit world.",
            "Based on accounts of a sinking ship.", "Dinosaur theme park.", "Teenage girl is possessed by a mysterious entity.", "Father trying to save his daughter."],
        ["Survival game made of cubes.", "Horror game taking place in a mental asylum.", "Open World game where you play as a hacker.",
            "Action game where you fight monsters.", "Survival game where you survive against cannibals.", "Single player game where you need to escape from a laboratory.",
            "Game where you need to guess words.", "You have to save a princess.", "You have to avoid mines.", "Game where you fight as or againts vampires."],
        ["Has white and orange stripes.", "Closely related to humans.", "Biggest animal on the planet.", "Predator of the Sea.", "Very large snake.",
            "Can change color.", "Can carry up to twenty times their own body weight.", "Can survive for long periods of time without food or water.",
            "Has natural armor protecting them.", "Also known as king of the forest."]];
        var catagoryIndex = categories.indexOf(selectedCategory);
        var hintIndex = selectedCategory.indexOf(word);
        showClue.innerHTML = "Clue: - " + hints[catagoryIndex][hintIndex];
    };

    document.getElementById('reset').onclick = function () {
        correctGuess.parentNode.removeChild(correctGuess);
        letters.parentNode.removeChild(letters);
        showClue.innerHTML = "Clue: -";
        play();
    };
};