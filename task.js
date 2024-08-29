let midBar = document.querySelector("#midBar228");
midBar.style.minWidth = "600px";

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

    let highDiv = document.createElement("div");
    highDiv.style.border = "1px solid black";
    highDiv.style.width = "100%";
    highDiv.style.marginTop = "10px"
    midBar.append(highDiv);

    //medium priority
    let h3Mid = document.createElement("h3");
    h3Mid.innerText = "Medium Priority";
    h3Mid.style.marginTop = "10px";
    midBar.append(h3Mid);

    let midDiv = document.createElement("div");
    midDiv.style.border = "1px solid black";
    midDiv.style.width = "100%";
    midDiv.style.marginTop = "10px"
    midBar.append(midDiv);

    //low priority
    let h3Low = document.createElement("h3");
    h3Low.innerText = "Low Priority";
    h3Low.style.marginTop = "10px";
    midBar.append(h3Low);

    let lowDiv = document.createElement("div");
    lowDiv.style.border = "1px solid black";
    lowDiv.style.width = "100%";
    lowDiv.style.marginTop = "10px"
    midBar.append(lowDiv);

    //no priority
    let h3Nop = document.createElement("h3");
    h3Nop.innerText = "No Priority";
    h3Nop.style.marginTop = "10px";
    midBar.append(h3Nop);

    let noDiv = document.createElement("div");
    noDiv.style.border = "1px solid black";
    noDiv.style.width = "100%";
    noDiv.style.marginTop = "10px"
    midBar.append(noDiv);
}
displayToday();

//Creating new Task
//high priority  : highDiv
let highTask = document.createElement("div");
highDiv.append(highTask);
//medium priority : midDiv
let mediumTask = document.createElement("div");
midDiv.append(mediumTask);
//low priority : lowDiv
let lowTask = document.createElement("div");
lowDiv.append(lowTask);
//No priority : noDiv
let noTask = document.createElement("div");
noDiv.append(noTask);


function createNewTask(value){

    //task container
    let divBox = document.createElement("div");

    //child1 will containe play button and task name
    let child1 = document.createElement("div");
    let status = document.createElement("div");
    status.style.width = "20px";
    status.style.height = "20px";
    status.style.borderRadius = "50%";

    child1.append(status);

    //child2  will contain date and timetaken
    let child2 = document.createElement("div");

    divBox.append(child1);
    noTask.append(divBox);
}