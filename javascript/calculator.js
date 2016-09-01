$(document).ready(function() {
	
	//calculates the shit
	function doMath(a, b, operator){
		var result = 0;
		switch(operator){
			case "divide":
				result = parseFloat(a/b);
				break;
			case "multiply":
				result = parseFloat(a*b);
				break;
			case "subtract":
				result = parseFloat(a-b);
				break;
			case "add":
				result = parseFloat(a+b);
				break;
		}
		return result;
	}
	
	$("input").on("click", function(){
		$(this).blur();
	});
	
	//initialize variables and display
	var numHist = [];
	var opHist = [];
	var currNum = "0.0";
	var literal = "0.0";
	$("#test").html('<h3>' + currNum + '</h3>');
	$("#literal").html('<h6>' + literal + '</h6>');
	
	/**************************
	FUNCTION BUTTONS
	perform an erasing function
	***************************/
	$(".func-btn").on("click", function(){
		//console.log(this.id);		//DEBUGGING
		var func = this.id;
		switch(func){
			case "reset":
				literal = "0.0";
				currNum = "0.0";
				numHist = [];
				opHist = [];
				$("#test").html('<h3>' + currNum + '</h3>');
				$("#literal").html('<h6>' + literal + '</h6>');
				break;
			case "clear":
				if (currNum != "0.0"){
					literal = literal.substring(0, literal.length - currNum.length);
				}
				currNum = "0.0";
				if (literal === ""){literal = "0.0";}
				$("#test").html('<h3>' + currNum + '</h3>');
				$("#literal").html('<h6>' + literal + '</h6>');
				break;
			case "back":
				if (currNum != "0.0"){
					literal = literal.substring(0, literal.length - 1);
					currNum = currNum.substring(0, currNum.length - 1);
				}
				if (currNum === ""){currNum = "0.0";}
				if (literal === ""){literal = "0.0";}
				$("#test").html('<h3>' + currNum + '</h3>');
				$("#literal").html('<h6>' + literal + '</h6>');
				break;
		}
	});
	
	/**************************
	NUMBER BUTTONS
	input a number
	***************************/
	$(".num-btn").on("click", function(){
		//don't add to "0.0"
		if (currNum == "0.0"){
			currNum = "";
		}
		if (literal == "0.0"){
			literal = "";
		}
		//if it's not 0, add to the current number
		//console.log(this.id);		//DEBUGGING
		console.log(currNum.includes("."));
		if (this.id == "."){
			//don't screw it over with too many decimal points
			if (!currNum.includes(".")){
				currNum += this.id;
				literal += this.id;
			}
		}else if (currNum.length <= 10 && literal.length <= 25){
			currNum += this.id;
			literal += this.id;
		}
		
		$("#test").html('<h3>' + currNum + '</h3>');
		$("#literal").html('<h6>' + literal + '</h6>');
    });
	
	/***********************************
	OPERATOR BUTTONS
	input an operator in between numbers
	***********************************/
	$(".op-btn").on("click", function(){
		//console.log(this.value);	//DEBUGGING
		//push out the last value to numHist before calculating
		if (currNum != "0.0"){
			numHist.push(currNum);
		}
		if (this.id == "equals"){
			//compute everything when equals is hit
			//if (numHist >= 1 && numHist.length > opHist.length){
				var result = parseFloat(numHist[0]);
				for (var i = 1; i < numHist.length; i++){
					result = doMath(result, parseFloat(numHist[i]), opHist[i-1]);
				}
				if (numHist.length === 0){result = 0.0};
				literal += this.value + result;
				$("#test").html('<h3>' + result + '</h3>');
				$("#literal").html('<h6>' + literal + '</h6>');

				literal = "0.0";
				currNum = "0.0";
				numHist = [];
				opHist = [];
			//}
		}else{
			//otherwise, continue on with the operations
			var displayOpen = literal.length <= 25;
			if (numHist.length > opHist.length || (numHist.length === 0 && currNum !== "0.0")){
				if (displayOpen){
					opHist.push(this.id);
					currNum = "0.0";
					literal += this.value;
				}
				
				
				$("#literal").html('<h6>' + literal + '</h6>');
			}
		}
	});
	
});