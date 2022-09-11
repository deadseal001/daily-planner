var tasks=["","","","","","","","",""];
console.log(tasks);
var loadTasks=function(){
    tasks=JSON.parse(localStorage.getItem("dailyTasks"))
    console.log(tasks);

    if (!tasks){
        tasks=["","","","","","","","",""];
    };
    console.log(tasks);
    for (var i=0; i<9; i++){
        $("div[data-time="+ (i+9) +"]").text(tasks[i]);
    };
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
});


var saveTasks=function(){
    localStorage.setItem("dailyTasks", JSON.stringify(tasks));
};



// $(time-block).on()

loadTasks();
