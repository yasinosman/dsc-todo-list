import  {v4 as uuid} from "uuid";
import Header from "./Header"
import Todo from "./Todo"

export default class TodoList {
  /**
   *    Bir TodoList instance'ı yaratır.
   * Tarayıcının "localStorage" kısmında depolanan "todos" nesnesini çeker.
   * Daha sonra listedeki yapılacakları yapılmış olarak işaretlememizi,
   * silmemizi veya listeye yeni bir yapılacak eklememizi sağlayan
   * "eventleri" oluşturur.
   */
  constructor() {
    this.todos = this.getTodos();

    this.render();
  }

  /**
   *    Tarayıcının localStorage'ından "todos" isimli veriyi çeker.
   */
  getTodos() {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos === null){
        return []
    } else {
        return todos
    };
  }

  saveTodos() {
      localStorage.setItem("todos", JSON.stringify(this.todos))
  }

  /**
   *    Ekrana üst kısımda yer alan ve resim, yenile butonu ve tarih
   * bilgilerini içeren "header" komponentinin, orta kısımda bulunan
   * "todo" komponentlerinin ve en aşağıda bulunan "addTodoForm"
   * komponentinin renderlanmasını sağlar.
   */
  render() {
    this.setupHeader();

    this.setupTodos();

    this.setupAddNewTodoForm();
  }

  setupTodos() {
    if (this.todos !== null && this.todos.length > 0) {
        document.querySelector("#list").innerHTML = "";
        this.todos.forEach((to_do) => {
            new Todo(to_do.todo, to_do.isComplete, to_do.id);
        });
    }

    this.setEventListeners();
  }

  setupHeader() {
    return new Header();
  }

  setupAddNewTodoForm() {
    const todoInput = document.querySelector("#input");
    todoInput.addEventListener("keypress", (e) => {
      this.handleAddTodoEvent(e);
    });
  }

  /**
   *      Yapılacaklar yani "todo" ögelerinin sahip olduğu HTML elementlerini seçer.
   *  Daha sonra bu elementlere bir "eventListener" ekler. Bu sayede kullanıcı
   * bu elementler ile etkileşime geçtiğinde, "todo" hakkında yapılması istenen
   * işlemi gerçekleştiren fonksiyonlar çağırılmış olur.
   */
  setEventListeners() {
      //Bir todo'yu tamamlandı/tamamlanmadı olarak işaretleme
      const toggleButtons = document.querySelectorAll("i[job='toggle']");

      for(let i = 0; i < toggleButtons.length; i++){
          toggleButtons[i].addEventListener("click", e => {
              this.handleToggleTodoEvent(e);
          })
      }

      //Bir todo'yu silme
      const deleteTodoButtons = document.querySelectorAll("i[job='delete']");

      for (let i = 0; i < deleteTodoButtons.length; i++) {
        deleteTodoButtons[i].addEventListener("click", (e) => {
          this.handleDeleteTodoEvent(e);
        });
      }
  }

  /**
   *    Kullanıcı, bir todo'yu tamamlanmış veya tamamlanmamış işaretleme butonuna
   * bastığı zaman bu fonksiyon çalışır.
   * @param {*} e Event
   */
  handleToggleTodoEvent(e) {
    const todoId = e.target.attributes.todoId.value;

    return this.toggleTodo(todoId);
  }

  /**
   *    Bir todo'nun, tamamlanmış veya tamamlanmamış olma bilgisine göre değiştirilmesini
   * ve uygulamanın durumunun güncellenmesini sağlar.
   * @param {String} todoId Güncellenecek todo'nun id'si.
   */
  toggleTodo(todoId) {
    //TodoList instance'ını güncelle
    this.todos = this.todos.map((todo) =>
      todo.id === todoId ? { ...todo, isComplete: !todo.isComplete } : todo
    );

    //Değişiklikleri localStorage'a kaydet
    this.saveTodos();

    //Uygulama durumunu güncelle
    this.setupTodos();
  }

  /**
   *    Kullanıcı, bir todo'yu silme butonun bastığı zaman bu fonksiyon çalışır.
   * @param {*} e Event
   */
  handleDeleteTodoEvent(e) {
    const todoId = e.target.attributes.todoId.value

    return this.deleteTodo(todoId);
  }

  /**
   *    Bir todo'nun, silinmesini ve uygulamanın durumunun güncellenmesini sağlar.
   * @param {String} todoId Silinecek todo'nun id'si.
   */
  deleteTodo(todoId) {
    //TodoList instance'ını güncelle
    this.todos = this.todos.filter((todo) => todo.id !== todoId);

    //Değişiklikleri local storage'a kaydet
    this.saveTodos();

    //Uygulama durumunu güncelle
    this.setupTodos();
  }

  /**
   *    Kullanıcı, yeni yapılacak ekleme formuna bir değer girdikten sonra "enter"
   * tuşuna basarsa bu fonksiyon çalışır.
   * @param {*} e Event
   */
  handleAddTodoEvent(e) {
    //Kullanıcının enter tuşuna bastığını kontrol et
    if (e.keyCode === 13) {
      //Kullanıcının boş bir todo oluşturmadığını kontrol et
      if (e.target.value !== "") {
        //Yeni bir todo objesi oluştur
        const newTodo = {
          id: uuid(),
          todo: e.target.value,
          isComplete: false,
        };

        //Oluşturulan todo objesini kaydet
        this.addTodo(newTodo);

        //Formu sıfırla
        e.target.value = ""
      }
    }
  }

  /**
   *    Yeni bir "todo" objesini hem "TodoList" instance'ına hem de
   * tarayıcının localStorage'ına kaydetmeye yarar
   * @param {{id:String, todo:String, isComplete:boolean}} todo
   */
  addTodo(todo) {
    //TodoList instance'ına söz konusu todo'yu ekle
    this.todos.push(todo);

    //Yapılacakları localStorage'a kaydet
    this.saveTodos();

    //Uygulama durumunu güncelle
    this.setupTodos();
  }
}