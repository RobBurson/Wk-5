var settings = {
  debug: false,
};

function setToday() {
  // Get Current Month/Day/Year and Hour/Minute/Second in a favorable format and display it
  $("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));
}

function setSaveButtons() {
  if (settings.debug) {
    console.log("setSaveButtons called");
  }

  for (var i = 0; i < 9; i++) {
    $(`#saveItem${i}`).click((e) => {
      if (settings.debug) {
        console.log("e", e);
      }
      var id = e.target.id;
      if (settings.debug) {
        console.log(`${id} clicked`);
      }
      id = id.replace("saveItem", "");
      saveField(+id);
    });
  }
}

// save each event text to local storage via array

function saveField(id) {
  if (settings.debug) {
    console.log("saveField called", id);
  }

  var currentSched = JSON.parse(localStorage.getItem("events"));
  if (settings.debug) {
    console.log("currentSched", currentSched);
  }

  var textField = $(`#input${id}`).val();
  if (settings.debug) {
    console.log("textField", textField);
  }

  currentSched[id] = textField;

  var stringCal = JSON.stringify(currentSched);
  if (settings.debug) {
    console.log(" Stringcal ", stringCal);
  }

  localStorage.setItem("events", stringCal);
}

//Set up Local Storage
function setLocalStorage() {
  //get array of events
  var calEvents = JSON.parse(localStorage.getItem("events"));

  //if there is no calendar yet, create and return a new one
  if (!calEvents) {
    localStorage.setItem("events", JSON.stringify([]));
    return;
  }

  //Set saved events to populate in the calendar
  for (var i = 0; i < 9; i++) {
    var textEl = $(`#input${i}`);
    if (calEvents[i]) {
      textEl.val(calEvents[i]);
    }
  }
}

//Set BG Colors on calendar events based on current day/time
function colors() {
  //current value of 24 hour clock
  var currently = +(moment().format("H"));
  if (settings.debug) {
    console.log("currently", currently);
}
  //set elements
  for (var i = 0; i < 9; i++) {
    //get time to set color
    var hour = $(`#input${i}`);

    // use data attr to get 24 hour value of each time block
    var curHour = +(hour.attr("data-hour"));
    if (settings.debug) {
        console.log("curHour", curHour);
    }

    //set color based on past, current or future
    if (currently > curHour) {
      hour.addClass("past");
    } else if (currently < curHour) {
      hour.addClass("future");
    } else if (currently == curHour) {
      hour.addClass("present");
    }
  }
}

//Run Application
function run() {
  //Show Date
  setToday();

  //Create Button Events
  setSaveButtons();

  //Access Local Storage to populate fields with saved events
  setLocalStorage();

  colors();

  setInterval(() => {
     colors(); 
  }, 60000);
}

run();
