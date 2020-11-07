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

    this.setEventListeners();
  }

  /**
   *    Tarayıcının localStorage'ından "todos" isimli veriyi çeker.
   */
  getTodos() {
    return JSON.parse(localStorage.getItem("todos"));
  }

  /**
   *    Ekrana üst kısımda yer alan ve resim, yenile butonu ve tarih
   * bilgilerini içeren "header" komponentinin, orta kısımda bulunan
   * "todo" komponentlerinin ve en aşağıda bulunan "addTodoForm"
   * komponentinin renderlanmasını sağlar.
   */
  render() {
    this.setupHeader();

    this.renderTodos();

    this.setupAddNewTodoForm();
  }

  renderTodos() {}

  setupHeader() {
    return new Header();
  }

  setupAddNewTodoForm() {}

  /**
   *      Yapılacaklar yani "todo" ögelerinin sahip olduğu HTML elementlerini seçer.
   *  Daha sonra bu elementlere bir "eventListener" ekler. Bu sayede kullanıcı
   * bu elementler ile etkileşime geçtiğinde, "todo" hakkında yapılması istenen
   * işlemi gerçekleştiren fonksiyonlar çağırılmış olur.
   */
  setEventListeners() {}

  /**
   *    Kullanıcı, bir todo'yu tamamlanmış veya tamamlanmamış işaretleme butonuna
   * bastığı zaman bu fonksiyon çalışır.
   * @param {*} e Event
   */
  handleToggleTodoEvent(e) {}

  /**
   *    Bir todo'nun, tamamlanmış veya tamamlanmamış olma bilgisine göre değiştirilmesini
   * ve uygulamanın durumunun güncellenmesini sağlar.
   * @param {String} todoId Güncellenecek todo'nun id'si.
   */
  toggleTodo() {}

  /**
   *    Kullanıcı, bir todo'yu silme butonun bastığı zaman bu fonksiyon çalışır.
   * @param {*} e Event
   */
  handleDeleteTodoEvent(e) {}

  /**
   *    Bir todo'nun, silinmesini ve uygulamanın durumunun güncellenmesini sağlar.
   * @param {String} todoId Silinecek todo'nun id'si.
   */
  deleteTodo(todoId) {}

  /**
   *    Kullanıcı, yeni yapılacak ekleme formuna bir değer girdikten sonra "enter" 
   * tuşuna basarsa bu fonksiyon çalışır.
   * @param {*} e Event
   */
  handleAddTodoEvent(e) {}

  /**
   *  Yeni bir "todo" objesini hem "TodoList" instance'ına hem de
   * tarayıcının localStorage'ına kaydetmeye yarar
   * @param {{id:String, todo:String, isComplete:boolean}} todo
   */
  addTodo(todo) {}
}
