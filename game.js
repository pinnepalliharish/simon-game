
var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];

var userClickedPattern=[];

var level=0;
var started=false;

function nextSequence(){

    
    var randomNumber=Math.floor(Math.random()*4);

    var randomChosenColor =buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);


    $("#level-title").text("Level "+level)
    level+=1;

    
}

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
})


function playSound(name){
    var audio=new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },50);
    
}


$(document).keydown(function(){
    if(! started){
        nextSequence();
        started=true;
    }
})


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
            userClickedPattern=[];
            console.log("S")
        }
    }
    else{
        console.log("F")
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);

        if(level>=5){
            $("#level-title").text(" your level is "+level+" .Great 🙌 . To start again press any key.")
        }
        else{
            $("#level-title").text(" your level is "+level+ " .Improve ur IQ 😅 , To start again press any key.")
        }
        
        startOver();
    }
    
}


function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];

}