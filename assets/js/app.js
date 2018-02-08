



// =========== INITIALIZE FIREBASE, database variable declared globally

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

// ======================================================================




// =========== POPULATES 'YOUR SAVED JOBS' TABLE ON PAGE LOAD......

// firebase watcher & initial loader
database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
	// creating variable to call the output pathway
	var snap = snapshot.val();

	// ajax call to populate job posting data from jobID saved in firebase
	
	// creating variable to store jobID from firebase
	var jobID = snap.jobID;

	var queryURL = "https://api-v2.themuse.com/jobs/" + jobID

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response){
		

		// creates new row div
		var newRow = $("<tr>");
		// assigns attributes to reference the row's posting
			// assigns the randomly generated firebase key to #ID
			newRow.attr("data-fireID",snapshot.key);
			//  assigns the jobID saved in firebase as a data attribute
			newRow.attr("data-jobID", snap.jobID);
			// adds class "job-row" to each row
			newRow.addClass("job-row");

			// appends applicable saved elements from firebase to table
			newRow.append("<td class='table-companyName'>" + response.company.name + "</td>");
			newRow.append("<td class='table-positionName'>" + response.name + "</td>");
			newRow.append("<td class='table-dateApplied'>" + snap.dateApplied + "</td>");
			newRow.append("<td class='table-status'>" + snap.status + "</td>");
			// commenting these buttons out for now
			// newRow.append("<td><button class='view-job'>View</button></td>");
			// newRow.append("<td><button class='remove-job'>X</button></td>");

			// appends newRow to table body
			// $("").append(newRow)
			// $("").append("<tr class='spacer'></tr>");

		});



}, function(errorOnject) {
	console.log("Errors handled: " + errorObject.code);
});

// =================================================================================





// 	======== WHEN A ROW FROM THE TABLE IS CLICKED, POPULATES JOB-VIEW AREA....

	// need to make this so on click, pulls id from the row and populates below with....
	
	$(document).on("click", "table-companyName", function() {
		var activeID = $(this).parent().parent().attr("data-jobID");

		database.ref().on("child_added", function(snapshot) {
			var snap = snapshot.val();


	 // ajax call to populate job posting data from jobID saved in firebase
	
	 // creating variable to store jobID from firebase
	 	var jobID = snap.jobID;

		var queryURL = "https://api-v2.themuse.com/jobs/" + jobID

	 $.ajax({
	 	url: queryURL,
	 	method: "GET"
	 }).then(function(response){

	 	$(".company").text(response.company.name);
	 	$(".job-").text(response.name);
	 	$(".job-description").html("<h3>Description</h3><p class='job-p'>" + response.contents + "</p><button>...Learn more</button>");
	 	// adds attribute to map class storing the city from Muse API, to be used with google maps api
	 	$(".map").attr("data-city", response.locations[0].name)

	 	// populates job-view html fields with user input data from firebase
	 	// put here so it doesn't run until after the AJAX call is complete
	  	$("#date-applied").html(snap.dateApplied);
	  	$("#app-summary").html(snap.appSummary);
	  	$("#status").html(snap.Status);

	 	});

	});
});

// =================================================================================




// 	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ search-job.html

// ========== AJAX SEARCH TO GENERATE LIST OF JOBS TO ADD TO SAVED TABLE

	// listener for a change to the #position-dropdown select div
	$("#position-dropdown").on("change", function() {
		// prevents page from refresh when submit button is hit (might not need this with dropdown)
		event.preventDefault();

		// assigns value of the dropdown to a variable
		var userCategory = $(this).val()

	//  AJAX call to Muse API, to be used in search

		function ajaxMuse () {

			var category = userCategory;
			// need to fix location search to replace spaces with "%20" 
			var location = "San Francisco";
			var queryURL = "https://api-v2.themuse.com/jobs?category=" + category + "&location=San%20Francisco%2C%20CA&page=1"



			$.ajax({
				url: queryURL,
				method: "GET"
			}).then(function(response){

				// clears previous results from table, put here so less of a delay when outside of AJAX call
				$(".search-results").empty();

				for (var i = 0; i <= response.results.length; i++) {
					// create new row
					var newRow = $("<tr>");
					newRow.attr("data-jobID", response.results[i].id);

					newRow.append("<td>" + response.results[i].company.name + "</td>");
					newRow.append("<td>" + response.results[i].name + "</td>");
					newRow.append("<td>"+ response.results[i].locations[0].name + "</td>");
					newRow.append("<td><button class='add-btn add-button'>Add Job</button><td>")



					// append it onto the search-body tably
					$(".search-results").append(newRow);
					$(".search-results").append("<tr class='spacer'></tr>")
					};

				});
			};

		ajaxMuse();

	});



	// Listener for clicks of buttons with .add-job, pushes the jobID saved as a data attribute to Firebase with empty fields for user entry
	$(document).on("click", ".add-button", function() {
		var jobID = $(this).parent().parent().attr("data-jobID");

		// push jobID with empty user inputs for later use
		database.ref().push({
			jobID: jobID,
			dateApplied: "Not Submitted",
			appSummary: "",
			status: "Need to Research",
			dateAdded: firebase.database.ServerValue.TIMESTAMP
		})

	});




// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ GLOBAL FUNCTIONS

	// listener to remove saved jobs....
	$(document).on("click", ".remove-job", function() {
		// pulls firebase key from the rowID and saves to a temp variable
		var removeKey = $(this).parent().parent().attr("data-fireID");
		// removes the corresponding key/value pair child from the root in Firebase
		database.ref().child(removeKey).remove();
		// updates HTML
		$(this).closest("tr").remove();

	})







// ========= ELEPHANT GRAVEYARD (unused, preserved code)
//  JUST UPDATES FOR A SPECIFIC JOB (JOB-VIEW)


// // firebase watcher & initial loader
// database.ref().on("child_added", function(snapshot) {
// 	// creating variable to call the output pathway
// 	var snap = snapshot.val();

// 	// populates job-view html fields with user input data from firebase
// 	$("#date-applied").html(snap.dateApplied);
// 	$("#app-summary").html(snap.appSummary);
// 	$("#status").html(snap.Status);


// 	// ajax call to populate job posting data from jobID saved in firebase
	
// 	// creating variable to store jobID from firebase
// 	var jobID = snap.jobID;

// 	var queryURL = "https://api-v2.themuse.com/jobs/" + jobID

// 	$.ajax({
// 		url: queryURL,
// 		method: "GET"
// 	}).then(function(response){
// 		console.log(response)
// 		$(".company-name").html(response.company.name);
// 		$(".job-position").html(response.name);
// 		$(".job-description").html(response.contents);
// 		// adds attribute to map class storing the city from Muse API, to be used with google maps api
// 		$(".map").attr("data-city", response.locations[0].name)

// 		});


// }, function(errorOnject) {
// 	console.log("Errors handled: " + errorObject.code);
// });


// =============================================================

  




// ==============================






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




