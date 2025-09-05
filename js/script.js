// Ambil elemen-elemen dari DOM
const todoInput = document.getElementById('todo-input');
const dateInput = document.getElementById('todo--dateinput');
const addButton = document.getElementById('add-todo-button');
const todoList = document.getElementById('todo-list');
const deleteAllButton = document.getElementById('delete-all-button');
const filterButton = document.getElementById('filter-tasks-button');

// Simpan semua to-do
let todos = [];
let isFilterActive = false;

// Cegah submit form reload halaman
document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();
    addTodo();
});

// Tambah tugas baru
function addTodo() {
    const task = todoInput.value.trim();
    const dueDate = dateInput.value;

    if (!task || !dueDate) {
        alert("Hayo lupa ya... :3 Isi task dan tanggal dulu ya!");
        return;
    }

    const newTodo = {
        id: Date.now(),
        task,
        dueDate,
        completed: false
    };

    todos.push(newTodo);
    renderTodos();
    todoInput.value = "";
    dateInput.value = "";
}

// Render tampilan tugas
function renderTodos() {
    todoList.innerHTML = "";

    const visibleTodos = isFilterActive
        ? todos.filter(todo => !todo.completed)
        : todos;

    if (visibleTodos.length === 0) {
        todoList.innerHTML = `<tr><td colspan="4">No task found</td></tr>`;
        return;
    }

    visibleTodos.forEach(todo => {
        const tr = document.createElement("tr");

        const taskTd = document.createElement("td");
        taskTd.textContent = todo.task;

        const dateTd = document.createElement("td");
        dateTd.textContent = todo.dueDate;

        const statusTd = document.createElement("td");
        statusTd.textContent = todo.completed ? "Completed" : "Pending";
        statusTd.style.color = todo.completed ? "green" : "red";

        const actionsTd = document.createElement("td");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = todo.completed ? "Undo" : "Done";
        completeBtn.style.marginRight = "8px";
        completeBtn.addEventListener("click", () => toggleComplete(todo.id));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

        actionsTd.appendChild(completeBtn);
        actionsTd.appendChild(deleteBtn);

        tr.appendChild(taskTd);
        tr.appendChild(dateTd);
        tr.appendChild(statusTd);
        tr.appendChild(actionsTd);

        todoList.appendChild(tr);
    });
}

// Toggle status selesai
function toggleComplete(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos();
}

// Hapus tugas spesifik
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// Hapus semua tugas
deleteAllButton.addEventListener("click", () => {
    if (confirm("Yakin mau hapus semua tugas?")) {
        todos = [];
        renderTodos();
    }
});

// Filter toggle
filterButton.addEventListener("click", () => {
    isFilterActive = !isFilterActive;
    filterButton.textContent = isFilterActive ? "Show All" : "Filter Tasks";
    renderTodos();
});
