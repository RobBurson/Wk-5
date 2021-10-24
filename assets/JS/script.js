function setToday() {

    // Get Current Month/Day/Year and Hour/Minute/Second in a favorable format and display it
    $("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));
}

function setSaveButtons() {

    // if i replaces the numbers, i is out of scope and id will return as undefined

    $("#saveItem0").on("click", () => {
        saveField(0);
    });

    $("#saveItem1").on("click", () => {
        saveField(1);
    });

    $("#saveItem2").on("click", () => {
        saveField(2);
    });

    $("#saveItem3").on("click", () => {
        saveField(3);
    });

    $("#saveItem4").on("click", () => {
        saveField(4);
    });

    $("#saveItem5").on("click", () => {
        saveField(5);
    });

    $("#saveItem6").on("click", () => {
        saveField(6);
    });

    $("#saveItem7").on("click", () => {
        saveField(7);
    });

    $("#saveItem8").on("click", () => {
        saveField(8);
    });
}

// save each event text to local storage via array

function saveField(id) {

    var currentSched = JSON.parse(localStorage.getItem("sched"));

    var textField = $(`#input${id}`).val();

    currentSched[id] = textField;

    localStorage.setItem("events", JSON.stringify(currentSched));
}

//Set up Local Storage
function setLocalStorage() {
    //get array of events
    var events = JSON.parse(localStorage.getItem("events"));

    //if there is no calendar yet, create and return a new one
    if (!calEvents) {
        localStorage.setItem("events", JSON.stringify([]));
        return;
    }
    
    //Set saved events to populate in the calendar
for (var i = 0; i < 9; i++) {
    var textEl = $(`#input$[i]`);
    if (calEvents[i]) {
        textEl.val(calEvents[i]);
        } 
    }
}

//Set BG Colors on calendar events based on current day/time
function colors() {

    //current value of 24 hour clock
    var currently = moment().format("H");

    //set elements
    for (var i = 0; i < 9; i++) {

        //get time to set color
        var hour = $(`input${i}`);

        // use data attr to get 24 hour value of each time block
        var curHour = hour.attr("data-hour");

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
    saveField();
}

run ();