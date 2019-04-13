$(document).ready(function() {
    // var timerStart = true;
    var intervalId;
    var showQuestion = false;
    var count = 0;
    var correctGuesses = 0;
    var incorrectGuesses = 0;
    var unanswered = 0;
    var time = 30;
    var userGuess;

    var questionsArray = [
        {
            question:
                "The bride had a list of five people she was going to get even with. Which one of these characters wasn't on her list?",
            answers: [
                "Elle Driver",
                "Vernita Green",
                "O-ren Ishii",
                "Beatrix Kiddo"
            ],
            answer: "Beatrix Kiddo",
            image: "./assets/images/ListsKBill.png"
        },
        {
            question:
                "This character watched as her parents were murdered and later became the head of all organized crime in Japan",
            answers: [
                "Johnny Mo",
                "Go-Go Yubari",
                "Sofie Fatale",
                "O-Ren Ishii"
            ],
            answer: "O-Ren Ishii",
            image: "./assets/images/oren.gif"
        },
        {
            question:
                "What was one of the weapons used by Go-Go to fight the Bride?",
            answers: [
                "Spiked Ball on a Chain",
                "Hanzo Sword",
                "shotgun",
                "5 finger death punch"
            ],
            answer: "Spiked Ball on a Chain",
            image: "./assets/images/gogo.jpg"
        },
        {
            question: "What is the name of O-ren's private army?",
            answers: [
                "The Lethal 97",
                "White Dragons",
                "The Crazy 88",
                "Pai Mei"
            ],
            answer: "The Crazy 88",
            image: "./assets/images/crazy88.jpg"
        },
        {
            question: "What happened to the sword of Bill's brother Budd?",
            answers: [
                "It broke during a fight",
                "He sold it to a pawn shop",
                "He kept it in his trailer",
                "He gave it to Elle for her collection"
            ],
            answer: "He kept it in his trailer",
            image: "./assets/images/budds.jpg"
        }
    ];
    $(document).on("click", "#start", startQuiz);
    function startQuiz() {
        time = 30;
        $(".list-group-item").remove();
        $("#correct").empty();
        $("#incorrect").empty();
        $("#unanswered").empty();
        $("#retry").hide();
        count = 0;
        correctGuesses = 0;
        incorrectGuesses = 0;
        unanswered = 0;
        $(this).hide(nextQuestion);
    }

    function showImage() {
        console.log("inside showImage");
        $(".list-group-item").remove();
        var imageDisplayed = questionsArray[count].image;
        console.log(questionsArray[count].image);
        $("#image").html("<img src=" + imageDisplayed + " width='300px'>");
        setTimeout(checkAnswer, 3000);
    }
    $(document).on("click", "#test", function() {
        console.log("inside on click: ");
        userGuess = $(this).text();
        // console.log("userGuess after click: " + userGuess);
        var display = $("<p>");
        display.text(
            "you guessed " +
                userGuess +
                " the answer was " +
                questionsArray[count].answer
        );
        $("#image").append(display);
    });

    function nextQuestion() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
        var question = questionsArray[count];
        $("#question").html(question.question);
        for (var i = 0; i < question.answers.length; i++) {
            $(".list").append(
                "<button type='button' id='test' class='choice list-group-item list-group-item-action'>" +
                    question.answers[i] +
                    "</button>"
            );
        }
        $(".list-group-item").click(showImage);
    }
    function decrement() {
        time--;
        $("#timer").html("<h2>" + time + " seconds left" + "</h2>");
        if (time <= 0 || count === questionsArray.length) {
            clearInterval(intervalId);
            endGame();
        }
    }
    function checkAnswer() {
        $("#image").empty();
        console.log(typeof userGuess);
        console.log(count);
        console.log("answer: " + questionsArray[count].answer);
        //add and display some text here telling the user if they got it right or wrong. show the answer//
        if (userGuess === questionsArray[count].answer) correctGuesses++;
        else if (userGuess === null) unansweredGuesses++;
        else incorrectGuesses++;
        console.log("correct: " + correctGuesses);
        console.log("incorrect: " + incorrectGuesses);
        console.log("unanswered: " + unanswered);
        count++;
        if (count === questionsArray.length) endGame();
        else nextQuestion();
    }

    function endGame() {
        $("#timer").empty();
        $("#question").empty();
        $(".list").empty();
        unanswered =
            questionsArray.length - (incorrectGuesses + correctGuesses);
        console.log(unanswered);
        $("#result").text("Results:");
        $("#correct").text("correct guesses: " + correctGuesses);
        $("#incorrect").text("incorrect guesses: " + incorrectGuesses);
        $("#unanswered").text("unanswered guesses: " + unanswered);
        $("#retry").show();
        $("#retry").click(startQuiz);
    }
});
