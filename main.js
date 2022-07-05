var tasks = [];
var count = 0;
var currEditedId = -1;

//get data from local storage
let getDataFromLocalStorage=()=>{
    let data=localStorage.getItem("tasks");
    tasks=JSON.parse(data);
    return tasks;
}

//set data to local storage
let setDataToLocalStorage=(tasks)=>{
    let stringifyData=JSON.stringify(tasks);
    localStorage.setItem("tasks",stringifyData);
}

// Reset The Task Array
function resetTodo() {
    if (confirm('Are You Sure??') === true) {
        tasks = [];
        setDataToLocalStorage(tasks);
        showTodos();
    }
}

//Set the current task in Edit Text Box input
function editTask(id) {
    document.getElementById("submitBtn").disabled = true;
    document.getElementById('saveBtn').style.visibility="visible";
    var todoEdit = document.getElementById("todo");
    tasks = tasks.map((task) => {
        if (task.id === id) {
            todoEdit.value = task.todo;
        }
        return task;
    });
    currEditedId = id;
}

//Saves The Edited Task
function saveTask() {
    let saveBtn = document.getElementById("saveBtn");
    saveBtn.style.visibility = "hidden";
    var todoEdit = document.getElementById("todo").value;
    tasks = tasks.map((task) => {
        if (task.id === currEditedId) task.todo = todoEdit;
        return task;
    });
    document.getElementById("todo").value = "";
    document.getElementById("submitBtn").disabled = false;
    setDataToLocalStorage(tasks)
    showTodos();
}

//Deletes the task
function deleteTask(id) {
    tasks = tasks.filter((t) => t.id != id);
    setDataToLocalStorage(tasks);
    showTodos();
}

//Checkes for the status
function doneTodo(id) {
    
    tasks = tasks.map((t) => {
        if (t.id === id) {
            
            if (t.status === 1) {
                t.status = 0;
            } else {
                t.status = 1;
            }
        }
        return t;
    });
    setDataToLocalStorage(tasks);
    showTodos();
}

//Shows all todos
function showTodos() {
    if(getDataFromLocalStorage()){
        tasks = getDataFromLocalStorage();
    }else setDataToLocalStorage([])
    
    var todo_list = document.getElementById("todo_list");
    

    tasks = getDataFromLocalStorage();
    todo_list.innerHTML = "";
    tasks.forEach((task,id) => {
        task.id=id;
        if (task.status === 0) {
            todo_list.innerHTML += `<div class="  mt-3 mb-3 d-flex justify-content-between">      
            <div class="col-lg-7 mr-2"><input onchange='doneTodo(${task.id})' type='checkbox'><span> ${task.id+1}. &nbsp ${task.todo} </span>
            </div>
               <div
                class="col-lg-5 container"><button class="btn btn-danger" type="button" onclick='deleteTask(${task.id})'>Delete</button>&nbsp&nbsp <button class="btn btn-warning" type="button" onclick='editTask(${task.id})'>Edit</button>
            </div>`;
        } else {
            todo_list.innerHTML += `<div class="  mt-3 mb-3 d-flex justify-content-between">      
            <div class="col-lg-7 mr-2"><input checked onchange='doneTodo(${task.id})' type='checkbox'> <span style="text-decoration: line-through; display= "inline-block"> ${task.id+1}. &nbsp ${task.todo} </span>
            </div>
               <div
                class="col-lg-5 container"><button class="btn btn-danger" type="button" onclick='deleteTask(${task.id})'>Delete</button>&nbsp&nbsp <button class="btn btn-warning" type="button" onclick='editTask(${task.id})'>Edit</button><button class="btn btn-success" type="button" style="visibility: hidden;" id="saveBtn" onclick='saveTask()'>Save</button>
            </div>`;
        }
    });
}

//Adds a new todo
function addTodo() {
    var todo = document.getElementById("todo").value;
    if (todo != "") {
        tasks.push({
            id: ++count,
            todo: todo,
            status: 0,
        });
        
        document.getElementById("todo").value = "";
    } else {
        alert("Empty ToDo");
    }

    setDataToLocalStorage(tasks);
    showTodos();
}

//Calling for fetching previous todos
setTimeout(() =>{
    showTodos()
})

