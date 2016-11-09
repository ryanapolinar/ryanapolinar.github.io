$(document).ready(function() {
	var users = ["ESL_SC2", "ogamingoverwatch", "cretetion", "freecodecamp", "proleaguecsgo", "tsm_dyrus", "brunofin", "NonExistantUser"];
	
	for (var i = 0; i < users.length; i++){
		constructCell(users[i]);
	}
	
	$("#allBtn").on("click", function(){
      showUsers("allBtn");
    });
	$("#onBtn").on("click", function(){
      showUsers("onBtn");
    });
	$("#offBtn").on("click", function(){
      showUsers("offBtn");
    });
	
	$(".btn").mouseup(function(){
   	$(this).blur();
	})
	
});

//show the selected user group
function showUsers(selection){
	switch(selection){
		case "allBtn":
			$("#allBtn").addClass("selected");
			$("#onBtn").removeClass("selected");
			$("#offBtn").removeClass("selected");
			$("#online").show();
			$("#offline").show();
			$("#errored").show();
			break;
		case "onBtn":
			$("#allBtn").removeClass("selected");
			$("#onBtn").addClass("selected");
			$("#offBtn").removeClass("selected");
			$("#online").show();
			$("#offline").hide();
			$("#errored").hide();
			break;
		case "offBtn":
			$("#allBtn").removeClass("selected");
			$("#onBtn").removeClass("selected");
			$("#offBtn").addClass("selected");
			$("#online").hide();
			$("#offline").show();
			$("#errored").hide();
			break;
	}
}

//creates api url
function makeURL(type, username){
	return "https://api.twitch.tv/kraken/" + type + "/" + username;
}

function constructCell(user){
	//null = offline, undefined = closed/DNE
	$.ajax({
		type: "GET",
		url: makeURL("streams", user),
		headers: {
			'Client-ID': '5hqhbsnzwyue9lidd3yi8v5rsubu6oz'
		},
		success: function(data){
			if (data.hasOwnProperty('stream')){
				if (data.stream === null){
					//user isn't streaming
					$.ajax({
						type: "GET",
						url: makeURL("channels", user),
						headers: {
							'Client-ID': '5hqhbsnzwyue9lidd3yi8v5rsubu6oz'
						},
						success: function(data){
							/*
							console.log(data);
							*/
							var streamer = {};
							streamer["name"] = data.display_name;
							streamer["status"] = "Offline";
							streamer["game"] = "";
							streamer["img"] = data.logo;
							streamer["url"] = data.url;
							displayCell(streamer);
						}
					});
				}else{
					//user is online and streaming
					$.ajax({
						type: "GET",
						url: makeURL("channels", user),
						headers: {
							'Client-ID': '5hqhbsnzwyue9lidd3yi8v5rsubu6oz'
						},
						success: function(data){
							/*
							console.log(data);
							*/
							var streamer = {};
							streamer["name"] = data.display_name;
							streamer["status"] = "Online - " + data.game;
							streamer["game"] = data.status;
							streamer["img"] = data.logo;
							streamer["url"] = data.url;
							displayCell(streamer);
						}
					});
				}
			}
		},
		error: function(data){
			var streamer = {};
			streamer["name"] = user;
			streamer["img"] = "https://placehold.it/85?text=?";
			streamer["game"] = "";
			streamer["url"] = "#";
			if (data.status == 422){
				streamer["status"] = "Account Closed";
			}else if (data.status == 404){
				streamer["status"] = "Doesn't Exist";
			}
			displayCell(streamer);
		}
	});
}

//visually displays the cell on the website
function displayCell(streamer){
	var result = "";
	var id = "";
	var bg = "";
	
	if (streamer.status.startsWith("Online")){
		id = "on";
		bg = "activated";
	}else if (streamer.status == "Offline"){
		id = "off";
		bg = "deactivated";
	}else{
		id = "err";
		bg = "deactivated";
	}
	
	var result = '<a href="'+ streamer.url + '" target="_blank"><div class="container-fluid">\
		<div class="row">\
			<div class="col-xs-2"></div>\
			<div class="col-xs-8 well '+ bg +'" id='+ id + '">\
				<div class="container-fluid">\
					<div class="row">\
						<div class="col-xs-6 col-sm-3 col-md-2">\
							<img class="img-circle user-icon" src="'+ streamer.img + '">\
						</div>\
						<div class="col-xs-6 col-sm-9 col-md-10">\
							<h5 class="overflowing"><strong><a target="_blank" href="'+ streamer.url + '">' + 
								streamer.name +'</a></strong></h5>\
							<h5 class="overflowing">'+ streamer.status +'</h5>\
							<h5 class="overflowing">'+ streamer.game + '</h5>\
						</div>\
					</div>\
				</div>\
			</div>\
			<div class="col-xs-2"></div>\
		</div>\
	</div></a>';
	if (streamer.status.startsWith("Online")){
		$("#online").append(result);
	}else if (streamer.status == "Offline"){
		$("#offline").append(result);
	}else{
		$("#errored").append(result);
	}
	
}