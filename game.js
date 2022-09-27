var userClickedPattern = [];
var gamepattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("LEVEL " + level);
        nextSequence();
        started = true;
    }
});
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});
function checkAnswer(currentLevel) {
    if (gamepattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (userClickedPattern.length == gamepattern.length) {
            setTimeout(function () { nextSequence(); }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () { $("body").removeClass("game-over"); }, 200);
        startOver();
    }

}
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("LEVEL " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamepattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
function startOver() {
    level = 0;
    gamepattern = [];
    started = false;
}