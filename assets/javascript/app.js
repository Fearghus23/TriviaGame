$(document).ready(function(){
  // event listeners
  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);
})
var trivia = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId : '',
  questions: {
    q1: 'Who is a patty chef?',
    q2: 'What does patrick live under?',
    q3: 'who isnt a sea animal?',
    q4: 'How many pets does spongebob have?',
    q5: "who plays the clarinet (badly)?",
    q6: 'who did the voice of mermaid man?',
    q7: "Who lives in a pineapple under the sea?"
  },
  options: {
    q1: ['spongebob', 'sally', 'squidward', 'patrick star'],
    q2: ['cliff', 'anenome', 'rock', 'pineapple'],
    q3: ['spongebob', 'sally', 'squidward', 'patrick star'],
    q4: ['3', '8', '1', '6'],
    q5: ['spongebob', 'sally', 'squidward', 'patrick star'],
    q6: ['Brad Englewood','John Robinson','Tim Conway','Ernest Borgnine'],
    q7: ['spongebob squarepants', 'mr crabs', 'ms puff', 'plankton']
  },
  answers: {
    q1: 'spongebob',
    q2: 'rock',
    q3: 'sally',
    q4: '1',
    q5: 'squidward',
    q6: 'Ernest Borgnine',
    q7: 'spongebob squarepants'
  },
  startGame: function(){
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    $('#game').show();
    $('#results').html('');
    $('#timer').text(trivia.timer);
    $('#start').hide();
    $('#remaining-time').show();
    trivia.nextQuestion();
  },
  nextQuestion : function(){
    trivia.timer = 10;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
  },
  timerRunning : function(){
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    else if(trivia.currentSet === Object.keys(trivia.questions).length){
      $('#results')
        .html('<h3>Thank you for playing!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>'+
        '<p>Please play again!</p>');
      $('#game').hide();
      $('#start').show();
    }
  },
  guessChecker : function() {
    var resultId;
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    if($(this).text() === currentAnswer){
      $(this).addClass('btn-success').removeClass('btn-info'); 
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }
    else{
      $(this).addClass('btn-danger').removeClass('btn-info');  
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
    }
  },
  guessResult : function(){
    trivia.currentSet++;
    $('.option').remove();
    $('#results h3').remove();
    trivia.nextQuestion();  
  }

}