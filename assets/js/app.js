
  


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
$("#button").on("click", function(){
	// don't refresh the page!
	event.preventDefault();
	console.log("hi")
	// define temp variables
	database.ref().push({
		jobID: 1010480,
		dateApplied: "12/31/2017",
		appSummary: "Emailed recruiter on 1/1/14",
		Status: "Waiting for response."
		});

	});





// firebase watcher & initial loader
database.ref().on("child_added", function(snapshot) {
	// creating variable to call the output pathway
	var snap = snapshot.val();

	// populates html fields with user input data from firebase
	$("#date-applied").html(snap.dateApplied);
	$("#app-summary").html(snap.appSummary);
	$("#status").html(snap.Status);


	// ajax call to populate job posting data from jobID saved in firebase
	
	// creating variable to store jobID from firebase
	var jobID = snap.jobID;

	var queryURL = "https://api-v2.themuse.com/jobs/" + jobID

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response){

		$(".company-name").html(response.company.name);
		$(".job-position").html(response.name);
		$(".job-description").html(response.contents);
		// adds attribute to map class storing the city from Muse API, to be used with google maps api
		$(".map").attr("data-city", response.locations[0].name)

		});


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




