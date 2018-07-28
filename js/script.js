$(document).one("pageinit", function() {
  // display runs
  showRuns();
  // Add handler
  $("#submitAdd").on("tap", addRun);

  // Edit handler
  $("#submitEdit").on("tap", editRun);

  // Delete handler
  $("#stats").on("tap", "#deleteLink", deleteRun);

  // Set Current handler
  $("#stats").on("tap", "#editLink", setCurrent);

  // Clear handler
  $("#clearRuns").on("tap", clearRuns);

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
            ' miles<div class="controls"><a href="#edit" id="editLink" data-miles="' +
            runs[i]["miles"] +
            '" data-date="' +
            runs[i]["date"] +
            '">Edit</a> | <a href="#delete" id="deleteLink" data-miles="' +
            runs[i]["miles"] +
            '" data-date="' +
            runs[i]["date"] +
            '" onClick="return confirm(\'Are you sure?\')">Delete</a></div></li>'
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
   * Edit run
   */
  function editRun() {
    // get current data
    currentMiles = localStorage.getItem("currentMiles");
    currentDate = localStorage.getItem("currentDate");

    var runs = getRunsObject();

    // loop through runs
    for (var i = 0; i < runs.length; i++) {
      if (runs[i].miles == currentMiles && runs[i].date == currentDate) {
        runs.splice(i, 1);
      }
      localStorage.setItem("runs", JSON.stringify(runs));
    }

    // Get form values
    var miles = $("#editMiles").val();
    var date = $("#editDate").val();

    // Create 'run' object
    var update_run = {
      date: date,
      miles: parseFloat(miles)
    };

    // add run to runs array
    runs.push(update_run);

    alert("Run Updated");

    // set stringfy object to localstorage
    localStorage.setItem("runs", JSON.stringify(runs));

    // redirect
    window.location.href = "index.html";

    return false;
  }

  /*
   * clear runs
   */
  function clearRuns() {
    localStorage.removeItem("runs");
    $("#stats").html("<p>You have no logged runs</p>");
  }

  /*
   * delete run
   */
  function deleteRun() {
    // set localstorage itms
    localStorage.setItem("currentMiles", $(this).data("miles"));
    localStorage.setItem("currentDate", $(this).data("date"));

    // get current data
    currentMiles = localStorage.getItem("currentMiles");
    currentDate = localStorage.getItem("currentDate");

    var runs = getRunsObject();

    // loop through runs
    for (var i = 0; i < runs.length; i++) {
      if (runs[i].miles == currentMiles && runs[i].date == currentDate) {
        runs.splice(i, 1);
      }
      localStorage.setItem("runs", JSON.stringify(runs));
    }

    alert("Run Deleted");

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

  /*
   * Set current clicked miles and date
   */
  function setCurrent() {
    // set localstorage itms
    localStorage.setItem("currentMiles", $(this).data("miles"));
    localStorage.setItem("currentDate", $(this).data("date"));

    // inset for fields
    $("#editMiles").val(localStorage.getItem("currentMiles"));
    $("#editDate").val(localStorage.getItem("currentDate"));
  }
});
