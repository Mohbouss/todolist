let AddUserInput = document.getElementById('add-user-input');
let AddTaskInput = document.getElementById('add-task-input');
let header = document.querySelector('#page2 header');

let TaskListContainer = document.getElementById('task-container');
let UserListContainer = document.getElementById('user-container');
document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('add-user-btn').addEventListener("click",addUser);
document.getElementById('return-to-users').addEventListener('click', returnToUsers);
let activeUser = null;

function CreateMyElement(tagName, textContent = "", className = "") {
  let element = document.createElement(tagName);
  element.textContent = textContent;
  className ? element.classList.add(className) : null;
  return element;
}

function showTask() {
  TaskListContainer.innerHTML = '';
  if (activeUser[0]) {
    fetch(`http://localhost:8000/users/${activeUser[0].id}/tasks`)
      .then(response => response.json())
      .then(tasks => {
        tasks.forEach(task => {
          let taskElement = CreateMyElement('li');
          let taskContent = CreateMyElement('span', task.description, 'task-box');
          let deleteButton = CreateMyElement('button', 'Delete', 'delete-button');
          if (task.completed) {
            taskContent.classList.add('active');
          }

          deleteButton.addEventListener('click', () => deleteTask(task.id));
          taskContent.addEventListener('click', () => taskDone(task.id));

          taskElement.appendChild(taskContent);
          taskElement.appendChild(deleteButton);
          TaskListContainer.appendChild(taskElement);
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}

function addTask() {
  let taskDescription = AddTaskInput.value.trim();

  if (taskDescription !== '' && activeUser) {
    fetch('http://localhost:8000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "description": taskDescription,
        "UserId": activeUser[0].id
      })
    })
    .then(response => response.json())
    .then(newTask => {
      showTask();
      AddTaskInput.value = '';
    })
    .catch(error => {
      console.error(error);
    });
  }
}

function deleteTask(taskId) {
  fetch(`http://localhost:8000/tasks/${taskId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.status === 204) {
      showTask();
    } else {
      throw new Error(`Failed to delete task with ID ${taskId}`);
    }
  })
  .catch(error => {
    console.error(error);
  });
}

function showUsers() {
  UserListContainer.innerHTML = '';

  fetch('http://localhost:8000/users')
    .then(response => response.json())
    .then(users => {
      users.forEach(user => {
        let userElement = CreateMyElement('li');
        let userContent = CreateMyElement('span', user.name, 'users-box');
        let deleteButton = CreateMyElement('button', "", 'delete-button');
        deleteButton.innerHTML = "<i class='fa-solid fa-trash'></i>";
        deleteButton.addEventListener('click', () => deleteUser(user.id));
        userContent.addEventListener('click', () => toggleDivs(user.id));

        userElement.appendChild(userContent);
        userElement.appendChild(deleteButton);
        UserListContainer.appendChild(userElement);
      });
    })
    .catch(error => {
      console.error(error);
    });
}

function addUser(){
  let userName = AddUserInput.value.trim();
  console.log("button")
  if (userName !== '') {
    fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": userName
      })
    })
    .then(response => response.json())
    .then(newUser => {
      console.log('Button clicked!')
      showUsers();
      AddUserInput.value = '';
    })
    .catch(error => {
      console.error(error);
    });
  }
}

function deleteUser(userId) {
  fetch(`http://localhost:8000/users/${userId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.status === 204) {
      showUsers();
      if (activeUser && activeUser.id === userId) {
        activeUser = null;
        showTask();
      }
    } else {
      throw new Error(`Failed to delete user with ID ${userId}`);
    }
  })
  .catch(error => {
    console.error(error);
  });
}

function taskDone(taskId) {
  fetch(`http://localhost:8000/tasks/${taskId}/state`)
    .then(response => response.json())
    .then(task => {
     
      const newCompletedState = !task.completed;
    
      fetch(`http://localhost:8000/tasks/${taskId}/state`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          completed: newCompletedState
        })
      })
      .then(response => response.json())
      .then(updatedTask => {
        showTask();
      })
      .catch(error => {
        console.error(error);
      });
    })
    .catch(error => {
      console.error(error);
    });
}


function toggleDivs(userId) {
  fetch(`http://localhost:8000/users/${userId}`)
    .then(response => response.json())
    .then(user => {
      activeUser = user;
      let page1 = document.querySelector('#page1');
      let page2 = document.querySelector('#page2');
      page1.classList.add('hidden');
      page2.classList.remove('hidden');
      header.textContent = activeUser[0].name

      showTask();
    })
    .catch(error => {
      console.error(error);
    });
}
function returnToUsers() {
  activeUser = null;
  let page1 = document.querySelector('#page1');
  let page2 = document.querySelector('#page2');
  page1.classList.remove('hidden');
  page2.classList.add('hidden');
  showUsers();
}

// Initial setup
showUsers();
