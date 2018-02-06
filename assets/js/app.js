
  


function ajaxMuse () {

	var category = "Engineering";
	// need to fix location search to replace spaces with "%20" 
	var location = "San Francisco";
	var apiKey = "";
	var queryURL = "https://api-v2.themuse.com/jobs?category=" + category + "&location=San%20Francisco%2C%20CA&page=1"



	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response){

		console.log(response.results[0].company.name);
		console.log(response.results[0].name);
		console.log(response.results[0].contents);
		console.log(response)

	});
};




ajaxMuse();





// =============================


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCyrwud0YbX4UU9gqsiBsexs5EgneeZZ04",
    authDomain: "project-1-240fe.firebaseapp.com",
    databaseURL: "https://project-1-240fe.firebaseio.com",
    projectId: "project-1-240fe",
    storageBucket: "",
    messagingSenderId: "102049638069"
  };

  firebase.initializeApp(config);

var database = firebase.database();


// function to dynamically trigger new HTML rows
$("#submit-category").on("click", function(){
	// don't refresh the page!
	event.preventDefault();
	// define temp variables
	inputName = $("#category-input").val().trim();
	// code for handling the push
	database.ref().push({
		category: inputCategory,
	});

})





// firebase watcher & initial loader
database.ref().on("child_added", function(snapshot) {
	var snap = snapshot.val();
	console.log(snap);



}, function(errorOnject) {
	console.log("Errors handled: " + errorObject.code);
});







//   ELEPHANT GRAVEYARD (unused, preserved code)


// ------------------------------------------------

	// ajax call for Adzuna

		// function ajaxAdzuna () {

		//  	var category = "";
		//  	// need to fix location search to replace spaces with "%20" 
		//  	var location = ""
		//  	var salary_min = 50000
		//  	var appID = "0b80554a"
		//  	var apiKey = "472827f96df2b335cc9979fcb8db1fb5";
		// 	var queryURL = "http://api.adzuna.com:80/v1/api/jobs/gb/search/1?app_id="+ appID + "&app_key="+apiKey + "&results_per_page=20&what=javascript%20developer&what_exclude=java&where="+ location + "&sort_by=salary&salary_min=" + salary_min + "&full_time=1&permanent=1&content-type=application/json"

		//  	$.ajax({
		//  		url: queryURL,
		//  		method: "GET"
		//  	}).then(function(response){
				
		//  		console.log(response.results[0])
		//  		$("#job-posting").html(response.results[0].description)
		//  		// $("#job-posting").html(response.results[0].contents)

		//  	});
		//  };

// ------------------------------------------------




