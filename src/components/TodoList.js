import { v4 as uuid } from "uuid"
import { createHtmlElement } from "../utils"
import "@fortawesome/fontawesome-free/css/all.min.css" 

class TodoList{
    /**
     *      Bir TodoList instance'ı yaratır. 
     * Tarayıcının "localStorage" kısmında depolanan "todos" nesnesini çeker.
     * Daha sonra listedeki yapılacakları yapılmış olarak işaretlememizi,
     * silmemizi veya listeye yeni bir yapılacak eklememizi sağlayan
     * "eventleri" oluşturur.
     */
    constructor() {
        this.todos = this.getTodosFromLocalStorage()

        if (this.todos === null || typeof this.todos === "undefined" || this.todos.length <= 0) {
            this.todos = [
                {"id":uuid(), "todo": "DSC'ye uye ol", "isComplete": false},
                {"id":uuid(), "todo": "Etkinliklere katil", "isComplete": false},
            ]

            this.saveTodosToLocalStorage()
        }

        this.renderCurrentTodos()

        this.setEventListeners()
    }

    /**
     *      Yapılacaklar yani "todo" ögelerinin sahip olduğu HTML elementlerini seeçer.
     *  Daha sonra bu elementlere bir "eventListener" ekler. Bu sayede kullanıcı 
     * bu elementler ile etkileşime geçtiğinde, "todo" hakkında yapılması istenen
     * işlemi gerçekleştiren fonksiyonlar çağırılmış olur.
     */
    setEventListeners() {
        const addTodoField = document.querySelector("#addTodo")
        const toggleTodoButtons = document.querySelectorAll(".toggleTodo")
        const removeTodoButtons = document.querySelectorAll(".removeTodo")
        const todoIcons = document.querySelectorAll("i")

        
        //Yeni bir todo yaratmak
        addTodoField.addEventListener("keypress", e => {
            if (e.keyCode === 13) {
                this.handleAddTodoClick(e.target.value);
                e.target.value = "";
            }
        })

        
        //Todoları tamamlanmış/tamamlanmamış olarak işaretlemek
        for (let i = 0; i < toggleTodoButtons.length; i++){
            toggleTodoButtons[i].addEventListener("click", e => {
                this.handleToggleTodoClick(e.target.id)
            })
        } 

        
        //Var olan bir todoyu silmek
        for (let i = 0; i < removeTodoButtons.length; i++){
            removeTodoButtons[i].addEventListener("click", e => {
                this.handleRemoveTodoClick(e.target.id)
            })
        }

        //İkonlar hem todo işaretlemede hem de todo silmede kullanılabilir
        for (let i = 0; i < todoIcons.length; i++){
            todoIcons[i].addEventListener("click", e => {
                if (e.target.parentElement.classList.contains("toggleTodo")) {
                this.handleToggleTodoClick(e.target.parentElement.id)
                }
                if (e.target.parentElement.classList.contains("removeTodo")) {
                    this.handleRemoveTodoClick(e.target.parentElement.id)
                }
            })
        }
    }

    /**
     * Kullanıcı yeni todo ekleme butonuna bastığında bu fonksiyon çalışır.
     * @param {{id:String, todo:String, isComplete:boolean}} todo 
     */
    handleAddTodoClick(todo) {
        const newTodo = {
            "id": uuid(),
            "todo": todo,
            "isComplete":false
        }

        //Eğer todo içeriği boş ise, kullanıcıya bir hata döndür.
        if (todo === "") {
            return null
        } else {
            //Todo içeriği boş değil ise bu todoyu kaydet.
            return this.addTodo(newTodo)
        }
    }

    /**
     *  Yeni bir "todo" objesini hem "TodoList" instance'ına hem de
     * tarayıcının localStorage'ına kaydetmeye yarar
     * @param {{id:String, todo:String, isComplete:boolean}} todo 
     */
    addTodo(todo) {
        this.todos.push(todo)
        this.saveTodosToLocalStorage()
        this.renderCurrentTodos()
        this.setEventListeners()
    }

    getTodosFromLocalStorage() {
        try {
            return JSON.parse(localStorage.getItem("todos"))
        } catch (error) {
            console.log(error)
            return null
        }
        
    }
    /**
     *  "TodoList" instance'ının sahip olduğu todoları, tarayıcının
     * localStorage'ına kaydeder.
     */
    saveTodosToLocalStorage() {
        localStorage.setItem("todos", JSON.stringify(this.todos))
    }

    /**
     *   Kullanıcının sahip olduğu todoları ve bu toddolar hakkında işlem
     * yapılmasını sağlayan butonları HTML'e render eder.
     */
    renderCurrentTodos() {
        const todoContainer = document.querySelector("#todo-container")
        todoContainer.innerHTML = ""
        this.todos.forEach(todo => {
            const todoDiv = createHtmlElement("div", "", {
                class:"todo-container"
            })
            //Todo metni
            const todoText = createHtmlElement("span", todo.todo, { class: "todo-text" })
            if (todo.isComplete) {
                todoText.classList.add("todo-crossed")
            }
            
            todoDiv.appendChild(todoText)

            //Todo'yu tamamlanmış/tamamlanmamış olarak işaretleme
            if (todo.isComplete) {
                const toggleAsCompletedButton = createHtmlElement(
                    "button",
                    "<i class='far fa-check-square'></i>",
                    {
                        id      :todo.id,
                        class   :"toggleTodo"
                    }
                )

                todoDiv.appendChild(toggleAsCompletedButton)
            } else {
                const toggleAsUncompletedButton = createHtmlElement(
                    "button",
                    "<i class='far fa-square'></i>",
                    {
                        id      :todo.id,
                        class   :"toggleTodo"
                    }
                )

                todoDiv.appendChild(toggleAsUncompletedButton)
            }

            //Todo'yu silme
            const removeTodoButton = createHtmlElement(
                "button",
                "<i class='far fa-trash-alt'></i>",
                {
                    class   : "removeTodo",
                    id      : todo.id
                }
            )

            todoDiv.appendChild(removeTodoButton)

            const todoListElement = createHtmlElement("li", "", { class: "todo" })
            todoListElement.appendChild(todoDiv)
            todoContainer.appendChild(todoListElement)
        })
    }

    /**
     * Kullanıcı todo silme butonuna bastığında bu fonskiyon çalışır.
     * @param {String} todoId 
     */
    handleRemoveTodoClick(todoId) {
        this.todos = this.todos.filter(todo => todo.id !== todoId)
        this.saveTodosToLocalStorage()
        this.renderCurrentTodos()
        return this.setEventListeners()
    }

    /**
     *  Kullanıcı bir todo'ya ait tamamlanma durumunun değiştirilmesini sağlayan
     * butona bastığında bu fonksiyon çalışır.
     * @param {String} todoId 
     */
    handleToggleTodoClick(todoId) {
        this.todos = this.todos.map(todo => 
            todo.id === todoId ? {...todo, isComplete: !todo.isComplete} : todo    
        )

        this.saveTodosToLocalStorage()
            
        this.renderCurrentTodos()

        return this.setEventListeners()
    }   
}

export default TodoList;