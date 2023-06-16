let input = document.getElementById('my-input')
let TaskListContainer = document.getElementById('task-container');
console.log(TaskListContainer)
let AddButton =document.getElementById('add-btn').addEventListener('click',addtask)


function addtask(){
var taskDescription = input.value;
if(taskDescription !==''){
let taskElement = CreateMyElement('li')
let taskContent = CreateMyElement('span',taskDescription,'task-box')
let deleteButton= CreateMyElement('button','Delete','delete-button')
deleteButton.addEventListener('click',deleteTask);
taskContent.addEventListener('click',taskDone)
taskElement.appendChild(taskContent)
taskElement.appendChild(deleteButton)
TaskListContainer.appendChild(taskElement);
input.value = '';

}}
 function CreateMyElement(tagName, textContent, className){
    var element = document.createElement(tagName);
    element.textContent = textContent;
    element.classList.add(className);
    return element;
 }
function deleteTask(event){
    event.target.parentNode.remove()
}
function taskDone(event){
    event.target.classList.toggle('active')
}

//document.addEventListener('click',function (e){
  //  if(e.target.className == 'delete-button'){
       
    //}
    //if(e.target.classList.contains('task-box')){
    //    e.target.classList.toggle('active')
    //}
//})


   
