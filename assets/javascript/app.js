function handleClick() {
    var amountCorrect = 0;
    for (var i = 1; i <= 5; i++) {
        var radios = document.getElementsByName('q' + i);
        for (var j = 0; j < radios.length; j++) {
            var radio = radios[j];
            if (radio.value == "correct" && radio.checked) {
                amountCorrect++;
            }
        }
    }
    alert("Correct Responses: " + amountCorrect);
}
$(document).ready(function () {
    $("#start-button").click(function () {
        var number = 50;
        $("#start-button").on("click", start);
        $("#submit").on("click", finish);
        // functions
        function start() {
            counter = setInterval(timer, 1000);
            showMe(".question");
            showMe("#submit");
            hideMe(".rules");
            hideMe(".true");
        }
        function timer() {
            number--
            $("#show-number").html("<h2>" + number + "</h2>");
            if (number === 0) {
                stop();
            }
        }
        function stop() {
            clearInterval(counter);
            $(".question").hide();
            $(".submit").hide();
            $(".correct").show();
            $(".true").show();
        }        
        
        function finish() {
            number = 1;
            clearInterval(counter);
            timer();
        }
        function hideMe(e) {
            $(e).hide();
        }
        function showMe(e) {
            $(e).show();
        }
        start();
    });
})