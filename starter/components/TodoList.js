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
  getTodos() {}

  saveTodos() {}

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
        //Todo instance'ları yarat...
    }

    this.setEventListeners();
  }

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
    //Eventi kullanarak todo id'sini bul...

    return this.toggleTodo(todoId);
  }

  /**
   *    Bir todo'nun, tamamlanmış veya tamamlanmamış olma bilgisine göre değiştirilmesini
   * ve uygulamanın durumunun güncellenmesini sağlar.
   * @param {String} todoId Güncellenecek todo'nun id'si.
   */
  toggleTodo(todoId) {
    //TodoList instance'ını güncelle...

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
    //Eventi kullanarak todo id'sini bul...

    return this.deleteTodo(todoId);
  }

  /**
   *    Bir todo'nun, silinmesini ve uygulamanın durumunun güncellenmesini sağlar.
   * @param {String} todoId Silinecek todo'nun id'si.
   */
  deleteTodo(todoId) {
    //TodoList instance'ını güncelle...

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
    //Kullanıcının enter tuşuna bastığını kontrol et...
    
      //Kullanıcının boş bir todo oluşturmadığını kontrol et

        //Yeni bir todo objesi oluştur


        //Oluşturulan todo objesini kaydet

        //Formu sıfırla

  }

  /**
   *    Yeni bir "todo" objesini hem "TodoList" instance'ına hem de
   * tarayıcının localStorage'ına kaydetmeye yarar
   * @param {{id:String, todo:String, isComplete:boolean}} todo
   */
  addTodo(todo) {
    //TodoList instance'ına söz konusu todo'yu ekle...

    //Yapılacakları localStorage'a kaydet
    this.saveTodos();

    //Uygulama durumunu güncelle
    this.setupTodos();
  }
}