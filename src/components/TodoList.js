import {v4 as uuid} from "uuid"

class TodoList{
    /**
     *      Bir TodoList instance'ı yaratır. 
     * Tarayıcının "localStorage" kısmında depolanan "todos" nesnesini çeker.
     * Daha sonra listedeki yapılacakları yapılmış olarak işaretlememizi,
     * silmemizi veya listeye yeni bir yapılacak eklememizi sağlayan
     * "eventleri" oluşturur.
     */
    constructor() {
        this.todos = JSON.parse(localStorage.getItem("todos"))

        if (!this.todos) {
            this.todos = [
                {"id":uuid(), "todo": "DSC'ye uye ol", "isComplete": false},
                {"id":uuid(), "todo": "Etkinliklere katil", "isComplete": false},
            ]
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
        const deleteTodoButtons = document.querySelectorAll(".deleteTodo")


        
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
        for (let i = 0; i < deleteTodoButtons.length; i++){
            deleteTodoButtons[i].addEventListener("click", e => {
                this.handleRemoveTodoClick(e.target.id)
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
        return this.renderCurrentTodos()
    }

    /**
     *  "TodoList" instance'ının sahip olduğu todoları, tarayıcının
     * localStorage'ına kaydeder.
     */
    saveTodosToLocalStorage() {
        localStorage.setItem("todos", JSON.stringify(this.toddos))
    }

    /**
     *   Kullanıcının sahip olduğu todoları ve bu toddolar hakkında işlem
     * yapılmasını sağlayan butonları HTML'e render eder.
     */
    renderCurrentTodos() {
        this.todos.forEach(todo => {
            console.log(todo)
        })
    }

    /**
     * Kullanıcı todo silme butonuna bastığında bu fonskiyon çalışır.
     * @param {String} todoId 
     */
    handleRemoveTodoClick(todoId) {
        const todoIndex = this.todos.findIndex(todo => todo.id === todoId)

        if (todoIndex) {
            this.todos = this.todos.splice(todoIndex, 1)
            this.saveTodosToLocalStorage()
            return this.renderCurrentTodos()
        }
    }

    /**
     *  Kullanıcı bir todo'ya ait tamamlanma durumunun değiştirilmesini sağlayan
     * butona bastığında bu fonksiyon çalışır.
     * @param {String} todoId 
     */
    handleToggleTodoClick(todoId) {
        const todoIndex = this.todos.findIndex(todo => todo.id === todoId)

        if (todoIndex) {
            this.todos[todoIndex] = {
                id: todo.id,
                todo: todo.todo,
                isComplete: !todo.isComplete
            }

            this.saveTodosToLocalStorage()
            
            return this.renderCurrentTodos()
        }
    }   
}

export default TodoList;