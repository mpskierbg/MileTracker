$(document).one("pageinit", function() {
  // display runs
  showRuns();
  // Add handler
  $("#submitAdd").on("tap", addRun);

  /*
   * Show all runs
   */
  function showRuns() {
    // get runs string
    var runs = getRunsObject();

    if (runs != "" && runs != null) {
      for (var i = 0; i < runs.length; i++) {
        $("#stats").append(
          '<li class="ui-body-inherit ui-li-static"><strong>Date: </strong>' +
            runs[i]["date"] +
            "<br><strong>Distance: </strong>" +
            runs[i]["miles"] +
            ' miles<div class="controls"><a href="#edit">Edit</a> <a href="#delete">Delete</a></div></li>'
        );
      }
      $("#home").bind("pageinit", function() {
        $("#stats").listview("refresh");
      });
    }
  }

  /*
   * Add Run
   */
  function addRun() {
    // Get form values
    var miles = $("#addMiles").val();
    var date = $("#addDate").val();

    // Create 'run' object
    var run = {
      date: date,
      miles: parseFloat(miles)
    };

    var runs = getRunsObject();

    // add run to runs array
    runs.push(run);

    alert("Run Added");

    // set stringfy object to localstorage
    localStorage.setItem("runs", JSON.stringify(runs));

    // redirect
    window.location.href = "index.html";

    return false;
  }

  /*
   * Get Runs object
   */
  function getRunsObject() {
    // set runs array
    var runs = new Array();
    // get current runs from localstorage
    var currentRuns = localStorage.getItem("runs");

    // check localstorage
    if (currentRuns != null) {
      // set to runs
      var runs = JSON.parse(currentRuns);
    }

    // return runs object
    return runs.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }
});
