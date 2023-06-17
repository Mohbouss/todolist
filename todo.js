/* let input1 = document.getElementById('my-input1');
let input2 = document.getElementById('my-input2')
let TaskListContainer = document.getElementById('task-container');
let UserListContainer = document.getElementById('user-container');
document.getElementById('add-btn').addEventListener('click',addtask)
document.getElementById('add-user').addEventListener('click',AddUser);
document.getElementById('returnToUsers').addEventListener('click', returnToUsers);
let arrayoftasks=[]
let arrayofUsers=[]
function CreateMyElement(tagName, textContent, className){
    let element = document.createElement(tagName);
    element.textContent = textContent;
    element.classList.add(className);
    return element;
 }

function showtask(array){
    TaskListContainer.innerHTML = '';
    for(let i=0; i<array.length;i++){
    let taskElement = CreateMyElement('li')
    let taskContent = CreateMyElement('span',array[i],'task-box')
    let deleteButton= CreateMyElement('button','Delete','delete-button')
    deleteButton.addEventListener('click',deleteTask);
    taskContent.addEventListener('click',taskDone)
    taskElement.appendChild(taskContent)
    taskElement.appendChild(deleteButton)
    TaskListContainer.appendChild(taskElement);    
}}
function showUsers(array){
    UserListContainer.innerHTML = '';
    for(let i=0; i<array.length;i++){
    let UserElement = CreateMyElement('li')
    let UserContent = CreateMyElement('span',array[i],'Users-box')
    let deleteButton= CreateMyElement('button','Delete','delete-button')
    deleteButton.addEventListener('click',deleteUser);
    //UserContent.addEventListener('click',taskDone)
    UserElement.appendChild(UserContent)
    UserElement.appendChild(deleteButton)
    UserListContainer.appendChild(UserElement);   
    UserContent.addEventListener('click', toggleDivs); 
}}

//code for page1
function AddUser(){
    let UserName = input1.value;
    if(UserName !==''){
    arrayofUsers.push(UserName)
    showUsers(arrayofUsers)
    input1.value = '';
    }}

    function deleteUser(event){
        arrayofUsers.pop()
        event.target.parentNode.remove()
    }
  
      
 

//code for page2

function addtask(){
let taskDescription = input2.value;

if(taskDescription !==''){
arrayoftasks.push(taskDescription)
showtask(arrayoftasks)
input2.value = '';
}}
function deleteTask(event){
    arrayoftasks.pop()
    event.target.parentNode.remove()
}
function taskDone(event){
    event.target.classList.toggle('active')
}

function toggleDivs() {
    let page1 = document.querySelector('#page1');
    let page2 = document.querySelector('#page2');
    page1.classList.add('hidden');
    page2.classList.remove('hidden');
  }
  
  function returnToUsers() {
    let page1 = document.querySelector('#page1');
    let page2 = document.querySelector('#page2');
    page1.classList.remove('hidden');
    page2.classList.add('hidden');
  }


 
 */
  let input1 = document.getElementById('my-input1');
  let input2 = document.getElementById('my-input2');
  let TaskListContainer = document.getElementById('task-container');
  let UserListContainer = document.getElementById('user-container');
  document.getElementById('add-btn').addEventListener('click', addTask);
  document.getElementById('add-user').addEventListener('click', addUser);
  document.getElementById('returnToUsers').addEventListener('click', returnToUsers);
  
  let users = [];
  let activeUser = null;
  
  function CreateMyElement(tagName, textContent, className) {
    let element = document.createElement(tagName);
    element.textContent = textContent;
    element.classList.add(className);
    return element;
  }
  
  function showTask() {
    TaskListContainer.innerHTML = '';
  
    if (activeUser) {
      for (let i = 0; i < activeUser.tasks.length; i++) {
        let taskElement = CreateMyElement('li');
        let taskContent = CreateMyElement('span', activeUser.tasks[i], 'task-box');
        let deleteButton = CreateMyElement('button', 'Delete', 'delete-button');
  
        deleteButton.addEventListener('click', () => deleteTask(i));
        taskContent.addEventListener('click', () => taskDone(taskContent));
  
        taskElement.appendChild(taskContent);
        taskElement.appendChild(deleteButton);
        TaskListContainer.appendChild(taskElement);
      }
    }
  }
  
  function showUsers() {
    UserListContainer.innerHTML = '';
  
    for (let i = 0; i < users.length; i++) {
      let userElement = CreateMyElement('li');
      let userContent = CreateMyElement('span', users[i].name, 'users-box');
      let deleteButton = CreateMyElement('button', 'Delete', 'delete-button');
  
      deleteButton.addEventListener('click', () => deleteUser(i));
      userContent.addEventListener('click', () => toggleDivs(i));
  
      userElement.appendChild(userContent);
      userElement.appendChild(deleteButton);
      UserListContainer.appendChild(userElement);
    }
  }
  
  function addUser() {
    let userName = input1.value.trim();
  
    if (userName !== '') {
      let newUser = { name: userName, tasks: [] };
      users.push(newUser);
      showUsers();
      input1.value = '';
    }
  }
  
  function deleteUser(index) {
    users.splice(index, 1);
    showUsers();
    if (index === activeUser) {
      activeUser = null;
      showTask();
    }
  }
  
  function addTask() {
    let taskDescription = input2.value.trim();
  
    if (taskDescription !== '' && activeUser) {
      activeUser.tasks.push(taskDescription);
      showTask();
      input2.value = '';
    }
  }
  
  function deleteTask(index) {
    activeUser.tasks.splice(index, 1);
    showTask();
  }
  
  function taskDone(taskElement) {
    taskElement.classList.toggle('active');
  }
  
  function toggleDivs(index) {
    activeUser = users[index];
    let page1 = document.querySelector('#page1');
    let page2 = document.querySelector('#page2');
    page1.classList.add('hidden');
    page2.classList.remove('hidden');
    showTask();
  }
  
  function returnToUsers() {
    activeUser = null;
    let page1 = document.querySelector('#page1');
    let page2 = document.querySelector('#page2');
    page1.classList.remove('hidden');
    page2.classList.add('hidden');
    showUsers();
  }
  