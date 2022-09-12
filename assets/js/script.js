var tasks=["","","","","","","","",""];
var loadTasks=function(){
    tasks=JSON.parse(localStorage.getItem("dailyTasks"))

    if (!tasks){
        tasks=["","","","","","","","",""];
    };
    for (var i=0; i<9; i++){
        $("div[data-time="+ (i+9) +"]").text(tasks[i]);
    };

    $(".work").each(function(){
        auditTask($(this));
    });
};


$(".work").on("click",function(){
    var timeSlot= $(this).attr("data-time");
    console.log(this);
    console.log(timeSlot);
    var text = $("div[data-time="+timeSlot+"]").text().trim();
    var newText= $("<textarea>").addClass("from-control col-9 work").attr("data-time",timeSlot).text(text);
    console.log(newText);
    $(this).replaceWith(newText);
    newText.trigger("focus");
});

$(".saveBtn").on("click",function(){
    console.log($(this).parent());
    var seq = $(this).parent().attr("data-seq");
    console.log(seq);
    var seq2=parseInt(seq)+9;
    console.log(seq2);
    text=$("textarea[data-time="+seq2+"]").val();
    console.log($("textarea[data-time="+seq2+"]"));
    console.log(text);
    tasks[seq]=text;
    saveTasks();
    var newDiv=$("<div>").addClass("col-9 work d-flex align-items-center").attr("data-time",seq2).text(tasks[seq]);
    $("textarea[data-time="+seq2+"]").replaceWith(newDiv);

    $("div.work").each(function(){
        auditTask($(this));
    });
});


var saveTasks=function(){
    localStorage.setItem("dailyTasks", JSON.stringify(tasks));
};

function auditTask(workEl){
    //get time from task element
    var timeHour = parseInt($(workEl).attr("data-time"));
    if (moment().hour() < timeHour){
        $(workEl).removeClass("past").removeClass("present").addClass("future");
    } 
    else if(moment().hour() == timeHour) {
        $(workEl).removeClass("future").removeClass("past").addClass("present");
    } 
    else{
        $(workEl).removeClass("present").removeClass("future").addClass("past");
    }
};


// loadTasks when open the page
loadTasks();

setInterval(function(){
    console.log(moment().hour());
    $("div.work").each(function(){
        auditTask($(this));
    });
}, 1000);
