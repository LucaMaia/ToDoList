    //Selecionando o input
const inputElement = document.querySelector(".new-task-input");
    //Selecionando o botão
const addTaskButton = document.querySelector(".new-task-button");

const tasksContainer =document.querySelector('.tasks-container')

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
    const inputIsValid = validateInput();

    console.log(inputIsValid);

    if (!inputIsValid) {
        return inputElement.classList.add("error");
    }

    //criando a DIV
    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item')


    //criando o texto
    const taskContent =document.createElement('p')
    taskContent.innerText = inputElement.value;
    taskContent.addEventListener('click', ()=> handleClick(taskContent))

    //criando o icone
    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer,taskContent))


    //criando a tarefa
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);
    inputElement.value = "";

    updateLocalStorage();
}


    //Criando o COMPLETED
const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)
        if(currentTaskIsBeingClicked) {
            task.firstChild.classList.toggle('completed');
        }
    }
    updateLocalStorage()
}

    //Deletando tarefa
const handleDeleteClick = (taskItemContainer,taskContent) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)
        if(currentTaskIsBeingClicked) {
            taskItemContainer.remove();
        }
    }
    updateLocalStorage()
}


    //Validação do INPUT caso esteja vazio
const handleInputChange = () => {
    const inputIsValid = validateInput();

    if (inputIsValid) {
        return inputElement.classList.remove("error");
    }
    updateLocalStorage()
}

//Atualizando o LocalStorage
const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes;

    const localStorageTasks = [...tasks].map((task) =>{
        const content =task.firstChild;
        const isCompleted = content.classList.contains('completed');

        return {description: content.innerText, isCompleted};
    })
    localStorage.setItem('tasks', JSON.stringify(localStorageTasks))
}


const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))

    console.log({ tasksFromLocalStorage });

    for (const task of tasksFromLocalStorage) {
        const taskItemContainer = document.createElement('div')
        taskItemContainer.classList.add('task-item')

        const taskContent =document.createElement('p')
        taskContent.innerText = task.description;

        if(task.isCompleted) {
            taskContent.classList.add('completed')
        }

        taskContent.addEventListener('click', ()=> handleClick(taskContent))

        const deleteItem = document.createElement("i");
        deleteItem.classList.add("far");
        deleteItem.classList.add("fa-trash-alt");

        deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer,taskContent))

        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);

        tasksContainer.appendChild(taskItemContainer);
    }
}

    refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask())

inputElement.addEventListener("change", () => handleInputChange())
