const app = document.getElementById('app');

// Function to render the login page
function renderLoginPage() {
  app.innerHTML = `
    <div class="login-container text-center">
      <h1 class="p-4 text-center text-light">Login</h1>
      <form id="loginForm">
        <div class="mb-3">
          <input type="text" id="username" class="form-control" placeholder="Username" required>
        </div>
        <div class="mb-3">
          <input type="password" id="password" class="form-control" placeholder="Password" required>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  `;

  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    validateLogin(username, password, () => renderMainPage());
  });
}

// Login validation
function validateLogin(username, password, callback) {
  if (username === 'admin' && password === '12345') {
    callback();
  } else {
    alert('Invalid username or password!');
  }
}

// Render the main page
function renderMainPage() {
  app.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">ToDo</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" href="#" id="todoMenu">Todo List</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" id="logoutMenu">LogOut</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container todo-container" id="content">
      <h3>Welcome to the Todo App!</h3>
    </div>
  `;

  document.getElementById('todoMenu').addEventListener('click', renderTodoList);
  document.getElementById('logoutMenu').addEventListener('click', renderLoginPage);
}

// Fetch and render the todo list
function renderTodoList() {
  const content = document.getElementById('content');
  content.innerHTML = '<h3>Loading Todos...</h3>';

  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())    
    .then(data => {
      content.innerHTML = '<h3>Todo List</h3>';
      const todoList = document.createElement('ul');
      todoList.className = 'list-group';




      let completedCount = 0;

      data.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        todoItem.innerHTML = `
          <span>${todo.title}</span>
          <input type="checkbox" ${todo.completed ? 'checked disabled' : ''}>
        `;

        const checkbox = todoItem.querySelector('input');
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) {
            completedCount++;
          } else {
            completedCount--;
          }

          if (completedCount === 5) {
            showCongrats();
          }
        });

        todoList.appendChild(todoItem);
      });

      content.appendChild(todoList);
    });
}

// Show the "Congrats" alert
function showCongrats() {
  return new Promise((resolve) => {
    alert('Congrats. 5 Tasks have been Successfully Completed');
    resolve();
  });
}

// Initialize the app
renderLoginPage();
