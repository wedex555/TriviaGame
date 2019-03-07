// when a user clicks start
// show the user a questions
// show the user possible options for each question

// question q1
// options o1, o2, o3, o4
// answer o2 

var quizData = [
	{
		question: "What is the national motto of the United States?",
		options: ["In God we trust", "We are the nation", "We work hard"],
		answer: "In God we trust"
	},
	{
		question: "The phrase, First in war, first in peace, and first in the hearts of his countrymen, was spoken at the funeral of what person?",
		options: ["Ronald Reagan", "George Washington", "Bill Clinton",],
		answer: "George Washington"
	},
	{
		question: "What three-word parting catchphrase is engraved on voice actor Mel Blanc’s gravestone?",
		options: ["Not for ever", "Yes we are", "That’s all folks", ],
		answer: "That’s all folks"
	}
]

var correct = 0;
var incorrect = 0;
var currentRound = 0;

function counter() {
  gameTimer = setInterval(decrement, 1000);
}

var number = 10;
function decrement() {
		console.log(number);
      number--;

      $("#timer").text("remaining time: "+number);

      //  Once number hits zero...
      if (number === 0) {

        //  ...run the stop function.
       clearInterval(gameTimer);

        //  Alert the user that time is up.
        setTimeout(function(){
          console.log("Time Up!");
          $("#main-content").empty();
          // hide the stop game button
          // show mssg
          // show game stats
          var answered = currentRound + "/" + quizData.length;

					// remove the button becasue its no longer needed
					$("#done").remove();

					// get rid of all the questions and answers
					$("#main-content").empty();

					// tell user a message 
					var mssg = $("<h1>");
					mssg.text("GAME OVER!");

					// tell user how many question they completed
					var gameStats = $("<p>");
					gameStats.text("completed: "+answered);

					// add message and stats to page
					$("#main-content").append(mssg, gameStats);
        }, 1000);      
       
      }
}


$(document).ready(function(){
	// display starting game stats
	$("#correct").text("correct: "+correct);
	$("#incorrect").text("incorrect: "+incorrect);
	$("#timer").text("remaining time: "+number);
	
	
	// capture button click
	$("#start-game").on("click",function(){
		// remove curent element from container
		// remove the text and start button
		$("#timer, #correct, #incorrect").removeClass("hide");
		$("#main-content").empty();
		
		counter();

		// show end game button option
		$("#done").html('<button id="stop-game">DONE</button>');

		// loop through the quiz data 
		// display all the question and possible options
		// loop though questions
		for(var i = 0; i<quizData.length;i++){

			// display all of our questions and possible answers
			// create html <h2> for the question
			var questionElem = $("<h2>");
			// add any attributes .addClass to the element
			questionElem.addClass("question");
			questionElem.text(quizData[i].question);
			questionElem.attr("id", "q-"+i);
			// append the element to the main-content
			$("#main-content").append(questionElem);
			//console.log("current options", quizData[i].options.length);

			// create single container for each button group
			// we will add all the buttons to this container for each question
			var bttnGroup = $("<div>");
			bttnGroup.addClass("btn-group");
			bttnGroup.attr("role","group");
			bttnGroup.attr("id","bg"+i);
			bttnGroup.attr("aria-label","First group");
			$("#main-content").append(bttnGroup);

			// loop though the array of options of current obj
				for(var j = 0; j<quizData[i].options.length; j++){
					// create html element 
					var optionBtn = $("<button>");
					// add attr
					optionBtn.addClass("options btn btn-secondary");
					optionBtn.attr("type","button")
					optionBtn.attr("name", i);
					optionBtn.attr("id", "o-"+j);
					optionBtn.attr("value", j);
					//add text
					optionBtn.text(quizData[i].options[j]);
					// append to page
					$("#bg"+i).append(optionBtn);
				}	
		}
	});
	
	// end start game click function

// when an element is dynamically added  and doesnt exist when the page loads we have to bind the click event to the parent container and then pass the clicked element in as a second paramiter and then you pass in the function.

// options button are created and added to the page when the start-game is clicked.
// this function is the game logic
	$("#main-content").on("click", ".options", function(){
		// "this" $(this)
		// this refers to the button / element that was just clicked

		//console.log("currentRound",currentRound);
		if(currentRound < quizData.length){

			// add a round to game, each time a question is answered 
			currentRound++;

			// remove class selected from any other button in group.
			// get the value of the group name of button clicked save to variable
			var btnName = $(this).attr("name"); // 0, 1, 2

			//find all the buttons by class .btn with the name attribute store in the varible btnName. store the result to a vairable 
			// the list of button in each question group
			var bttnList = $(".btn[name=" +"'"+ +btnName+"'"+"]"); // always return an array []
			//look through all the html for any element with the class .btn
			// and check if it has the attribute name with the value of what ever btnName is equal to.

			// loop through the bttnList - group of button elements and update them.
			for(var i = 0;i<bttnList.length; i++){
				// get the list of classes and removing a class
				bttnList[i].classList.remove("selected");
				// add an attribute so user can no long click the buttons
				bttnList[i].setAttribute("disabled", true);
			}

			// style the chosen answer by adding a class
			$(this).addClass("selected");

			// get the text value from the clicked button store to a variable
			var selectedBtnText = $(this).text();
			// console.log("selectedBtnText",selectedBtnText);

			//get the name attribute of clicked button convert it to a number and store it to a variable
			var selectedBtnQuestionIndex = parseInt($(this).attr("name"));
			// console.log("selectedBtnQuestionIndex",selectedBtnQuestionIndex);


			// check if selected button is the correct answer to the question
			// logic if correct or incorrect
			if(selectedBtnText === quizData[selectedBtnQuestionIndex].answer){
				console.log("you are right!");
				correct++
				$("#correct").text("correct: "+ correct);
			} else{
				console.log("you are wrong!")
				incorrect++
				$("#incorrect").text("incorrect: "+incorrect);
				// clear everything
			}
		}
	});
// end options click function


// function to end the game if the game still has time or user doesnt want to play anymore.
// stop-game button is added to the browser after start-game is clicked
	$("#done").on("click", "#stop-game", function(){

		// stop counter 
		clearInterval(gameTimer);

		// how many question user has answered out of how many question total.
		var answered = currentRound + "/" + quizData.length;

		// remove the button beasue its no longer needed
		$("#done").remove();

		// get rid of all the questions and answers
		$("#main-content").empty();

		// tell user a message 
		var mssg = $("<h1>");
		mssg.text("GAME OVER!");

		// tell user how many question they completed
		var gameStats = $("<p>");
		gameStats.text("completed: "+answered);

		// add message and stats to page
		$("#main-content").append(mssg, gameStats);
	});
	// end stop-game click function

});
// end document ready





