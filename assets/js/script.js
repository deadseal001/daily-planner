var tasks = ["", "", "", "", "", "", "", "", ""];

//function loadTasks
var loadTasks = function () {
  tasks = JSON.parse(localStorage.getItem("dailyTasks"));

  if (!tasks) {
    tasks = ["", "", "", "", "", "", "", "", ""];
  }
  for (var i = 0; i < 9; i++) {
    $("div[data-time=" + (i + 9) + "]").text(tasks[i]);
  }

  $(".work").each(function () {
    auditTask($(this));
  });
};

//change timeblocks into textarea and let user input the tasks.
$(".time-block").on("click", ".work", function () {
  var timeSlot = $(this).attr("data-time");
  console.log(this);
  // console.log(timeSlot);
  var text = $("div[data-time=" + timeSlot + "]")
    .text()
    .trim();
  var newText = $("<textarea>")
    .addClass("from-control col-9")
    .attr("data-time", timeSlot)
    .text(text);
  console.log(newText);
  $(this).replaceWith(newText);
  newText.trigger("focus");
});

//saveBtn eventlistener
$(".saveBtn").on("click", function () {
  var seq2 = parseInt($(this).parent().attr("data-seq")) + 9;
  text = $("textarea[data-time=" + seq2 + "]").val();
  tasks[parseInt($(this).parent().attr("data-seq"))] = text;
  saveTasks();
  var newDiv = $("<div>")
    .addClass("col-9 work d-flex align-items-center")
    .attr("data-time", seq2)
    .text(tasks[parseInt($(this).parent().attr("data-seq"))]);
  $("textarea[data-time=" + seq2 + "]").replaceWith(newDiv);

  $("div.work").each(function () {
    auditTask($(this));
  });
});

//save button
$(".btn").on("click", function () {
  var resetBtn = confirm(
    "Do you want to clear the Scheduler? All the task lists on this scheduler will be deleted."
  );
  if (resetBtn) {
    tasks = ["", "", "", "", "", "", "", "", ""];
    saveTasks();
    loadTasks();
  };
});

//save calendar to the local storage.
var saveTasks = function () {
  localStorage.setItem("dailyTasks", JSON.stringify(tasks));
};

//function auditTask check the time and determin the bg color of the calendar.
function auditTask(workEl) {
  var timeHour = parseInt($(workEl).attr("data-time"));
  if (moment().hour() < timeHour) {
    $(workEl).removeClass("past").removeClass("present").addClass("future");
  } else if (moment().hour() == timeHour) {
    $(workEl).removeClass("future").removeClass("past").addClass("present");
  } else {
    $(workEl).removeClass("present").removeClass("future").addClass("past");
  }
}

// loadTasks when open the page
loadTasks();

// check time and call function auditTask
var timeH = 0;
setInterval(function () {
  if (timeH != moment().hour()) {
    timeH = moment().hour();
    $("div.work").each(function () {
      auditTask($(this));
    });
  }
}, 1000);
