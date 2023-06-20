  let AddUserInput = document.getElementById('add-user-input');
  let AddTaskInput = document.getElementById('add-task-input');
  let TaskListContainer = document.getElementById('task-container');
  let UserListContainer = document.getElementById('user-container');
  document.getElementById('add-task-btn').addEventListener('click', addTask);
  document.getElementById('add-user-btn').addEventListener('click', addUser);
  document.getElementById('return-to-users').addEventListener('click', returnToUsers);
  
  let users = [];
  let activeUser = null;
  
  function CreateMyElement(tagName, textContent = "", className ="") {
    let element = document.createElement(tagName);
    element.textContent = textContent;
    className? element.classList.add(className):null;
    return element;
  }
  
  function showTask() {
    TaskListContainer.innerHTML = '';
  
    if (activeUser) {
      for (let i = 0; i < activeUser.tasks.length; i++) {
        let taskElement = CreateMyElement('li');
        let taskContent = CreateMyElement('span', activeUser.tasks[i].task, 'task-box');
        let deleteButton = CreateMyElement('button', 'Delete', 'delete-button');
        if(activeUser.tasks[i].completed){
          taskContent.classList.add('active')
        }
        
        deleteButton.addEventListener('click', () => deleteTask(i));
        taskContent.addEventListener('click', () => taskDone(i));
  
        taskElement.appendChild(taskContent);
        taskElement.appendChild(deleteButton);
        TaskListContainer.appendChild(taskElement);
      }
    }
    
  }
  
  function addTask() {
    let taskDescription = AddTaskInput.value.trim();
  
    if (taskDescription !== '' && activeUser) {
      activeUser.tasks.push({task:taskDescription,completed:false});
      showTask();
      AddTaskInput.value = '';
    }
  }
  
  function deleteTask(index) {
    activeUser.tasks.splice(index, 1);
    showTask();
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
    let userName = AddUserInput.value.trim();
  
    if (userName !== '') {
      let newUser = { name: userName, tasks: [] };
      users.push(newUser);
      showUsers();
      AddUserInput.value = '';
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
  
  function taskDone(index) {
    //taskElement.classList.toggle('active');
    activeUser.tasks[index].completed = !activeUser.tasks[index].completed
    showTask();
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
  