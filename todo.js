let inp = document.getElementById('myinput')
var taskListContainer = document.getElementById('taskcontainer');
let AddButton =document.getElementById('addbtn').addEventListener('click',addtask)

//console.log(add)
//console.log(del)
//addfunction
function addtask(){
var taskDescription = inp.value;
if(taskDescription !=''){
let taskElement = document.createElement('li');
var deleteButton = document.createElement("button");
taskElement.textContent = taskDescription;
taskElement.classList.add("taskbox")
deleteButton.textContent = 'Delete';
deleteButton.classList.add('delete-button');
taskElement.appendChild(deleteButton)
taskListContainer.appendChild(taskElement);
inp.value = '';

}}


document.addEventListener('click',function (e){
    if(e.target.className == 'delete-button'){
       e.target.parentNode.remove()
    }
    if(e.target.classList.contains('taskbox')){
        e.target.classList.toggle('active')
    }
})


   
