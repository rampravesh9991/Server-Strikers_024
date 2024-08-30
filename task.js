let midBar = document.querySelector("#midBar228");
midBar.style.minWidth = "600px";

//making sure every task div has unique id
let taskCounter = 0;

//today layout
let today = document.querySelector("#today228");
today.style.cursor = "pointer";
today.addEventListener("click", ()=>displayToday());

function displayToday(){
    midBar.innerHTML = "";
    let head = document.createElement("h1");
    head.innerText = "Today";
    // head.style.border = "1px solid black";
    head.style.marginTop = "20px"
    midBar.append(head);

    //status div
    let statsDiv = document.createElement("div");
    statsDiv.id ="statusDiv";
    statsDiv.style.border = "1px solid black"; //important
    statsDiv.style.width = "100%";
    statsDiv.style.height = "80px";
    statsDiv.style.marginTop = "20px";
    statsDiv.style.borderRadius = "10px";
    statsDiv.style.display = "flex";
    statsDiv.style.justifyContent = "space-around";

    let estimatedTime = document.createElement("div");
    // estimatedTime.style.border = "1px solid black";
    let esTime = document.createElement("h1");
    esTime.innerText = `${0}m`;
    let estimatedTime_p = document.createElement("p");
    estimatedTime_p.innerText = "Estimated Time";

    estimatedTime.append(esTime, estimatedTime_p);
    statsDiv.append(estimatedTime);


    let completeTask = document.createElement("div");
    // completeTask.style.border = "1px solid black";
    let taskLeft = document.createElement("h1");
    taskLeft.innerText = `${0}`;
    let taskLeft_p = document.createElement("p");
    taskLeft_p.innerText = "Task to be completed";

    completeTask.append(taskLeft, taskLeft_p);
    statsDiv.append(completeTask);


    let elapsedTime = document.createElement("div");
    // elapsedTime.style.border = "1px solid black";
    let timeCount = document.createElement("h1");
    timeCount.innerText = `${0}m`;
    let timeCount_p = document.createElement("p");
    timeCount_p.innerText = "Elapsed Time";

    elapsedTime.append(timeCount, timeCount_p);
    statsDiv.append(elapsedTime);


    let taskCompleted = document.createElement("div");
    // taskCompleted.style.border = "1px solid black";
    let countCompleted = document.createElement("h1");
    countCompleted.innerText = `${0}`;
    let countCompleted_p = document.createElement("p");
    countCompleted_p.innerText = "Estimated Time";

    taskCompleted.append(countCompleted, countCompleted_p);
    statsDiv.append(taskCompleted);
    midBar.append(statsDiv);

    //statusdiv styling
    let statsDivFlex = document.querySelectorAll("#statusDiv > div");
    statsDivFlex.forEach((el)=>{
        el.style.display ="flex";
        el.style.flexDirection = "column";
        el.style.justifyContent = "center";
        el.style.alignItems = "center";
    })
    console.log(statsDivFlex);


    //add task
    let addTask = document.createElement("div");
    addTask.id = "addTask";
    addTask.style.border = "1px solid black";//important
    addTask.style.width = "100%";
    addTask.style.height = "50px";
    addTask.style.marginTop = "10px";
    addTask.style.borderRadius = "10px";
    addTask.style.display = "flex";
    addTask.style.justifyContent = "space-between";

    //creating div to contain 3 elements in add task

    //1st for + icon -- google font
    let iconBox1 = document.createElement("div");
    iconBox1.style.width = "90%";
    iconBox1.style.minWidth = "350px"
    iconBox1.style.marginLeft = "10px";
    iconBox1.style.display = "flex";
    iconBox1.style.alignItems ="center";
    // iconBox1.style.border = "1px solid black";

    let plusSpan = document.createElement("span");
    // plusSpan.style.border = "1px solid black";
    plusSpan.style.marginRight = "10px"
    plusSpan.className = "material-symbols-outlined";
    plusSpan.innerText = "add";
    iconBox1.append(plusSpan);

    //2nd creating input feild for user
    let newTask = document.createElement("input");
    newTask.addEventListener("keydown",function(event){
        if(event.key == "Enter"){
            let value = this.value;
            createNewTask(value);
            this.value = "";
        }
    })
    newTask.style.width = "100%";
    newTask.style.height = "100%";
    newTask.style.border = "none";
    newTask.style.outline = "none";
    newTask.type = "text";
    newTask.placeholder = `Add a task to 'Tasks', Press [Enter] to save`;
    iconBox1.append(newTask);

    //3rd - some styling
    let someIcons = document.createElement("div");
    // someIcons.style.border ="1px solid black";
    someIcons.style.marginRight = "10px";
    someIcons.style.display = "flex";
    someIcons.style.alignItems = "center";

    //assignment icon
    let assignmentSpan = document.createElement("span");
    // assignmentSpan.style.border = "1px solid black";
    assignmentSpan.style.marginRight = "5px";
    assignmentSpan.className = "material-symbols-outlined";
    assignmentSpan.innerText = "assignment";
    someIcons.append(assignmentSpan);

    //calender icon
    let calenderSpan = document.createElement("span");
    // calenderSpan.style.border = "1px solid black";
    calenderSpan.className = "material-symbols-outlined";
    calenderSpan.innerText = "calendar_month";
    someIcons.append(calenderSpan);

    addTask.append(iconBox1, someIcons);
    midBar.append(addTask);

    //High Priority
    let h3High = document.createElement("h3");
    h3High.innerText = "High Priority";
    h3High.style.marginTop = "10px";
    midBar.append(h3High);

    //this is where i will store all high priority task
    let highDiv = document.createElement("div");
    highDiv.id = "highPriority";
    highDiv.style.border = "1px solid black";
    highDiv.style.width = "100%";
    highDiv.style.marginTop = "10px";
    midBar.append(highDiv);

    //medium priority
    let h3Mid = document.createElement("h3");
    h3Mid.innerText = "Medium Priority";
    h3Mid.style.marginTop = "10px";
    midBar.append(h3Mid);

    //this is where i will store all mid priority task
    let midDiv = document.createElement("div");
    midDiv.id = "mediumPriority";
    midDiv.style.border = "1px solid black";
    midDiv.style.width = "100%";
    midDiv.style.marginTop = "10px"
    midBar.append(midDiv);

    //low priority
    let h3Low = document.createElement("h3");
    h3Low.innerText = "Low Priority";
    h3Low.style.marginTop = "10px";
    midBar.append(h3Low);

    //this is where i will store all low priority task
    let lowDiv = document.createElement("div");
    lowDiv.id = "lowPriority";
    lowDiv.style.border = "1px solid black";
    lowDiv.style.width = "100%";
    lowDiv.style.marginTop = "10px"
    midBar.append(lowDiv);

    //no priority
    let h3Nop = document.createElement("h3");
    h3Nop.innerText = "No Priority";
    h3Nop.style.marginTop = "10px";
    midBar.append(h3Nop);

    //this is where i will store all no priority task
    let noDiv = document.createElement("div");
    noDiv.id = "noPriority";
    noDiv.style.border = "1px solid black";
    noDiv.style.width = "100%";
    noDiv.style.marginTop = "10px"
    midBar.append(noDiv);
}
displayToday();

//Creating new Task
//all elements are created after displayToday() function, now access it.
//but all new task is going to be first store in no priority task
//high priority  : highDiv
let highBox = document.querySelector("#highPriority");
//medium priority : midDiv
let mediumBox = document.querySelector("#mediumPriority");
//low priority : lowDiv
let lowBox = document.querySelector("#lowPriority");
//No priority : noDiv
let noBox = document.querySelector("#noPriority");

function createNewTask(value){

    //task container
    let divBox = document.createElement("div");
    divBox.style.border = "1px solid black";
    divBox.style.display = "flex";
    divBox.style.justifyContent = "space-between";
    divBox.style.alignItems = "center";
    divBox.style.cursor = "pointer";

    //child1 will containe play button and task name
    let child1 = document.createElement("div");
    child1.style.border = "1px solid black";
    child1.style.width = "100%";
    child1.style.height = "40px";
    child1.style.display = "flex";
    child1.style.alignItems= "center";

    //for confirming if task is completed or not
    let status = document.createElement("div");
    status.id = `ram${taskCounter++}`;
    status.style.top = "1px";
    status.addEventListener("click",()=>{
        console.log("task is completed");
        console.log(this.event);
        document.querySelector(`#${this.event.target.id}`).style.backgroundColor = "green"; 
        // this.style.backgroundColor = "green";
    })
    status.style.width = "20px";
    status.style.height = "20px";
    status.style.border = "1px solid black";
    status.style.borderRadius = "50%";
    status.style.marginLeft = "5px";

    //for auto playing timer for particular task
    let doThisTask = document.createElement("div");
    doThisTask.style.width = "20px";
    doThisTask.style.height = "20px";
    doThisTask.style.border = "1px solid green";
    doThisTask.style.borderRadius = "50%";
    doThisTask.style.marginLeft = "5px";
    doThisTask.style.display = "flex";
    doThisTask.style.justifyContent = "center";
    doThisTask.style.alignItems = "center";
    doThisTask.style.backgroundColor = "green";

    let doThisSpan = document.createElement("span");
    doThisSpan.className = "material-symbols-outlined";
    doThisSpan.innerText ="play_arrow";
    doThisSpan.style.color ="black";
    doThisTask.append(doThisSpan);

    let taskName = document.createElement("p");
    taskName.innerText = value;
    taskName.style.marginLeft = "10px";

    child1.append(status,doThisTask, taskName);

    //child2  will contain date and timetaken
    let child2 = document.createElement("div");
    child2.style.border = "1px solid black";
    child2.innerText = "31Aug";
    child2.style.marginRight = "10px"

    divBox.append(child1,child2);
    noBox.append(divBox);
}