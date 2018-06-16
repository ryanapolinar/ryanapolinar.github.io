function getQuote(){	
	$.getJSON("https://random-quote-generator.herokuapp.com/api/quotes/random", function(json) {
		//console.log(json);
		parseQuote(json);
		updateTweet(json);
	});
}

$(document).ready(function() {
	getQuote();
	$("#refresh").on("click", function(){
      getQuote();
    });
	$(".btn").mouseup(function(){
   	$(this).blur();
	})
});

function parseQuote(json){
	function anonAuthor(val){
		if (val){return val;}
		else{return "Anonymous";}
	}
	function badQuote(val){
		if (val){return val;}
		else{return "One thing you can't recycle is wasted time.";}
	}
	$("#quote").html("<div class='animated fadeIn'>" + badQuote(json.quote) + "</div>");
	$("#author").html("<div class='animated fadeIn'>- " + anonAuthor(json.author) + "</div>");
	
}

function updateTweet(json){
	if (json.quote){
		$("#tweet").html("<a class='btn btn-default spacing' role='button' href='https://twitter.com/intent/tweet?text=" + encodeURIComponent(json.quote).replace(/'/g, "%27") + " - " + encodeURIComponent(json.author).replace(/'/g, "%27") + "' target='_blank'><i class='fa fa-twitter navy'></i></a>");
	}else{
		$("#tweet").html("<a class='btn btn-default spacing' role='button' href='https://twitter.com/intent/tweet?text=" + encodeURIComponent("One thing you can't recycle is wasted time.").replace(/'/g, "%27") + " - Anonymous" + "' target='_blank'><i class='fa fa-twitter navy'></i></a>");
	}
}