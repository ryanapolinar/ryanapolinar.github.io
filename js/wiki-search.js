$(document).ready(function() {
	$("#search").on("click", function(){
		displayResults();
    });
	
	$("#query").on("keyup", function(event){
		if (event.which == 13){
			displayResults();
		}
	});
	
});

function displayResults(){
	var query = $("#query").val();
	if (query){
		var url = "https://en.wikipedia.org//w/api.php?action=opensearch&format=json&search="
		
		$.getJSON(url + query + "&callback=?", function(json){
			var dataCells = "";
			//get the title, description, and page URL of each result
			for (var i = 0; i < json[1].length; i++){
				dataCells += buildDataCell(json[1][i], json[2][i], json[3][i]);
			}
			$("#data").html(dataCells);
		});
	}
}

//creates HTMl for one result. returns the HTML string
function buildDataCell(title, info, url){
	var result = '\
	<a href="'+url+'" target="_blank"><div class="row well blue overlay">\
		<div class="col-sm-1">\
		</div>\
		<div class="col-sm-10">\
			<h3 class="white-txt">'+title+'</h4>\
			<h5 class="white-txt">'+info+'</h5>\
		</div>\
	</div></a>';
	//console.log(result);
	return result;
}