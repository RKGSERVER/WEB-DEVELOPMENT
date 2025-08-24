
const els = {
  input: document.getElementById('taskInput'),
  addBtn: document.getElementById('addBtn'),
  clearAllBtn: document.getElementById('clearAllBtn'),
  deleteSelectedBtn: document.getElementById('deleteSelectedBtn'),
  list: document.getElementById('todoList'),
  template: document.getElementById('todoItemTemplate'),
  itemsLeft: document.getElementById('itemsLeft'),
  filterBtns: document.querySelectorAll('.filter'),
};

let todos = loadTodos();
let currentFilter = 'all';

function loadTodos() {
  try {
    const raw = localStorage.getItem('todos_v1');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem('todos_v1', JSON.stringify(todos));
}

function updateItemsLeft() {
  const left = todos.filter(t => !t.completed).length;
  els.itemsLeft.textContent = `${left} item${left !== 1 ? 's' : ''} left`;
}

function addTodo(title) {
  const trimmed = title.trim();
  if (!trimmed) return;
  todos.push({
    id: crypto.randomUUID(),
    title: trimmed,
    completed: false,
    createdAt: Date.now(),
  });
  saveTodos();
  render();
}

function updateTodo(id, newTitle) {
  const t = todos.find(x => x.id === id);
  if (!t) return;
  const trimmed = newTitle.trim();
  if (!trimmed) return;
  t.title = trimmed;
  saveTodos();
  render();
}

function toggleTodo(id) {
  const t = todos.find(x => x.id === id);
  if (!t) return;
  t.completed = !t.completed;
  saveTodos();
  render();
}

function deleteTodo(id) {
  todos = todos.filter(x => x.id !== id);
  saveTodos();
  render();
}

function deleteSelected() {
  todos = todos.filter(x => !x.completed);
  saveTodos();
  render();
}

function clearAll() {
  todos = [];
  saveTodos();
  render();
}

function setFilter(filter) {
  currentFilter = filter;
  els.filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  render();
}

function getFilteredTodos() {
  switch (currentFilter) {
    case 'active': return todos.filter(t => !t.completed);
    case 'completed': return todos.filter(t => t.completed);
    default: return todos;
  }
}

function render() {
  els.list.innerHTML = '';
  const frag = document.createDocumentFragment();
  const items = getFilteredTodos();

  items.forEach(todo => {
    const node = els.template.content.cloneNode(true);
    const li = node.querySelector('.todo-item');
    const checkbox = node.querySelector('.toggle');
    const title = node.querySelector('.title');
    const editInput = node.querySelector('.edit-input');
    const editBtn = node.querySelector('.edit');
    const saveBtn = node.querySelector('.save');
    const cancelBtn = node.querySelector('.cancel');
    const deleteBtn = node.querySelector('.delete');

    li.dataset.id = todo.id;
    title.textContent = todo.title;
    editInput.value = todo.title;
    checkbox.checked = todo.completed;
    li.classList.toggle('completed', todo.completed);

    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    editBtn.addEventListener('click', () => {
      title.style.display = 'none';
      editInput.style.display = 'block';
      editBtn.classList.add('hidden');
      saveBtn.classList.remove('hidden');
      cancelBtn.classList.remove('hidden');
      editInput.focus();
      const val = editInput.value;
      editInput.value = '';
      editInput.value = val;
    });

    saveBtn.addEventListener('click', () => {
      updateTodo(todo.id, editInput.value);
    });

    cancelBtn.addEventListener('click', () => render());

    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    editInput.addEventListener('blur', () => {
      if (editInput.value.trim()) {
        updateTodo(todo.id, editInput.value);
      } else {
        render();
      }
    });
    editInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') updateTodo(todo.id, editInput.value);
      if (e.key === 'Escape') render();
    });

    frag.appendChild(node);
  });

  els.list.appendChild(frag);
  updateItemsLeft();
}

els.addBtn.addEventListener('click', () => {
  addTodo(els.input.value);
  els.input.value = '';
  els.input.focus();
});

els.input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTodo(els.input.value);
    els.input.value = '';
  }
});

els.clearAllBtn.addEventListener('click', clearAll);
els.deleteSelectedBtn.addEventListener('click', deleteSelected);
els.filterBtns.forEach(btn => btn.addEventListener('click', () => setFilter(btn.dataset.filter)));

render();
