var timerDuration  = 0
var questions

function Question(question, options, correctIndex){
    this.question = question
    this.options = options
    this.correctIndex = correctIndex
    this.userSelectionIndex = -1

    this.userIsCorrect = function(){
        return userSelectionIndex === correctIndex
    }

    this.questionAttempted = function(){
        return userSelectionIndex > -1
    }
}

function getQuestions(){
    var questions = [
        new Question("Who is the original actor of Superman 2 1980?",
                ["Christopher Reeves", "Silvester Stallone", "Rober De Niro"], 0),
        new Question("Who did Rocky Balboa beat in Rocky?",
                ["Christopher Reeves", "Apollo Creed", "Rober De Niro"], 1),
        new Question("What actor said the famous line 'You talkin' to me'?",
                ["Al Pacino", "Danny Devito", "Rober De Niro"], 2),
        new Question("Who is the original actor of Superman 2 1980?",
                ["Christopher Reeves", "Silvester Stallone", "Rober De Niro"], 0),
        new Question("Who did Rocky Balboa beat in Rocky?",
                ["Christopher Reeves", "Apollo Creed", "Rober De Niro"], 1),
        new Question("What actor said the famous line 'You talkin' to me'?",
                ["Al Pacino", "Danny Devito", "Rober De Niro"], 2)
    ]

    return questions
}

function countQuestionsAttempted(){
    var questionsAttempted  = 0
    for(var i; i < questions.length; i++){
        if(questions[i].questionAttempted()){
            questionsAttempted++
        }
    }

    return questionsAttempted
}

function countQuestionsRight(){
    var questionsCorrect  = 0
    for(var i; i < questions.length; i++){
        if(questions[i].userIsCorrect()){
            questionsCorrect++
        }
    }

    return questionsCorrect
}

var correctAnswers = {}
var correctAnswerCount = 0
var incorrectAnswerCount  =0
var allAnswers = {}
function handleClick(x, i){

    if(allAnswers[i] == undefined){
        allAnswers[i] = i
        if(correctAnswers[x] === x){
            correctAnswerCount++
            console.log("clicked right answer")
        }
        else{
            incorrectAnswerCount++
            console.log("clicked wrong answer")
        }
    }
}

function appendQuestions(){

    console.log("appending questions")
    correctAnswers = {}    

    $('<form>').appendTo('#questions')
    for(var i=0;i<questions.length;i++){
        $('<h3>'+questions[i].question+'</h3>').appendTo('#questions')

        for(var j=0;j<questions[i].options.length;j++){
            var id = '_' + i + '_' + j

            $('<input type="radio" name="option_'+i+'" value="'+ j + '" id="' + id +'">' +
                questions[i].options[j] + '<br>').appendTo('#questions')

            if(j == questions[i].correctIndex){
                correctAnswers[id] = id
            }

            console.log('questions ' + id)
            $('#'+id).click(
                (function(x, i){
                    return function(){
                       handleClick(x, i) 
                    }
                })(id, i)
            )
            
        }
        $('<br>').appendTo('#questions')
    }
    $('</form>').appendTo('#questions')
}

function endGame(){

    var questionsAttempted = countQuestionsAttempted()

    $('#questions').hide()
    $('#finish').hide()
    $('#results').show()
    $('#correct-answers').html(correctAnswerCount.toString())
    $('#incorrect-answers').html(incorrectAnswerCount.toString())
    $('#unanswered').html(questions.length - (correctAnswerCount+incorrectAnswerCount))
    
    $('#clock').html("0")
    
}

function updateGameTime(){
    timerDuration -=1

    $('#clock').html(timerDuration.toString() + ' seconds remaining')

    if(timerDuration <= 0){
        endGame();
    }
    else{
        setTimeout(updateGameTime, 1000)
    }
}

function start(){
    timerDuration = 120
    questions = getQuestions()
    $('#questions').show()
    $('#start-game').hide()
    $('#finish').show()
    appendQuestions()
    setTimeout(updateGameTime, 1000) 
}

$(document).ready( function(){

    $('#start-game').click(function(){
        start()
    })
    
    $('#finish').click(function(){
        timerDuration = 0
    })

    $('#start-game').show()
    $('#questions').hide()
    $('#finish').hide()
    $('#results').hide()

})