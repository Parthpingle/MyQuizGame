class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz
    fill("red");
    textSize(20);
    text("Result of the quiz ",340,50);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();


    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      var displayAnswer = 230;
      fill("blue");
      textSize(15);
      text("*NOTE : contestant who answered correct are highlited in green color!",130,230);
      for(var plr in allContestants){
        var correct = "2"
        if(correct === allContestants[plr].answer){
          fill("green");
        }
        else {
          fill("red");
        }
        displayAnswer+=30;
        textSize(15);
        text(allContestants[plr].name+": "+allContestants[plr].answer,250,displayAnswer);   

      }
    }

    //write code to add a note here

    //write code to highlight contest who answered correctly
    
  }

}
