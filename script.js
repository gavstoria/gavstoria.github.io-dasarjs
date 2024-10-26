class TodoList {
    constructor() {
        this.todos = [];
        this.form = document.getElementById('todo-form');
        this.input = document.getElementById('todo-input');
        this.listContainer = document.getElementById('todo-list');
        this.emptyState = document.getElementById('empty-state');
        
        this.initialize();
    }

    initialize() {
        
        this.loadTodos();
        
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });

        
        this.render();
    }

    loadTodos() {
        const savedTodos = localStorage.getItem('todos');
        this.todos = savedTodos ? JSON.parse(savedTodos) : [];
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    addTodo() {
        const text = this.input.value.trim();
        if (!text) return;

        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        this.todos.push(todo);
        this.saveTodos();
        this.input.value = '';
        this.render();
    }

    toggleTodo(id) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        this.saveTodos();
        this.render();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.render();
    }

    createTodoElement(todo) {
        const todoItem = document.createElement('div');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        todoItem.innerHTML = `
            <button class="todo-checkbox" onclick="todoList.toggleTodo(${todo.id})">
                ${todo.completed ? this.createCheckIcon() : this.createCircleIcon()}
            </button>
            <span class="todo-text">${this.escapeHtml(todo.text)}</span>
            <button class="delete-button" onclick="todoList.deleteTodo(${todo.id})">
                ${this.createTrashIcon()}
            </button>
        `;

        return todoItem;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    createCheckIcon() {
        return `<svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 6L9 17L4 12"></path>
            <circle cx="12" cy="12" r="10"></circle>
        </svg>`;
    }

    createCircleIcon() {
        return `<svg class="circle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
        </svg>`;
    }

    createTrashIcon() {
        return `<svg class="trash-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>`;
    }

    render() {
        
        this.listContainer.innerHTML = '';
        

        this.todos.forEach(todo => {
            this.listContainer.appendChild(this.createTodoElement(todo));
        });

        
        this.emptyState.style.display = this.todos.length === 0 ? 'block' : 'none';
    }
}


const todoList = new TodoList();