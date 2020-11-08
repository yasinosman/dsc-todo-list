import Header from "./Header"
import Todo from "./Todo"

//Firebase'i projeye ekle
import firebase from "firebase/app"
import "firebase/firestore"

//Firebase'i konfigüre et
const firebaseConfig = {
  apiKey: "AIzaSyBcje8VqhqSAblzA7VUcZkXaLbTt_IjWSQ",
  authDomain: "dsc-todo-list-243f8.firebaseapp.com",
  databaseURL: "https://dsc-todo-list-243f8.firebaseio.com",
  projectId: "dsc-todo-list-243f8",
  storageBucket: "dsc-todo-list-243f8.appspot.com",
  messagingSenderId: "816039357922",
  appId: "1:816039357922:web:dbfa3762db0d30afe95dbb",
};

firebase.initializeApp(firebaseConfig);


export default class TodoList {
  /**
   *    Bir TodoList instance'ı yaratır.
   * Tarayıcının "localStorage" kısmında depolanan "todos" nesnesini çeker.
   * Daha sonra listedeki yapılacakları yapılmış olarak işaretlememizi,
   * silmemizi veya listeye yeni bir yapılacak eklememizi sağlayan
   * "eventleri" oluşturur.
   */
  constructor() {
    this.todos = [];

    this.getTodos().then(() => this.render());
  }

  /**
   *    Firebase'den"todos" koleksiyonunu çeker
   */
  getTodos() {
    const promise = new Promise((resolve, reject) => {
      let todos = [];
      firebase
        .firestore()
        .collection("todos")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const todoObject = {
              id: doc.id,
              todo: doc.data().todo,
              isComplete: doc.data().isComplete,
            };

            todos.push(todoObject);
          });

          this.todos = todos;
          resolve(true);
        });
    });

    return promise;
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
    if (this.todos.length > 0) {
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
    const todoToToggle = this.todos.find(todo => todo.id === todoId)

    firebase
      .firestore()
      .collection("todos")
      .doc(todoId)
      .set({ ...todoToToggle, isComplete: !todoToToggle.isComplete })
      .then(() => {
        //TodoList instance'ını güncelle
        this.todos = this.todos.map((todo) =>
          todo.id === todoId ? { ...todo, isComplete: !todo.isComplete } : todo
        );

        //Uygulama durumunu güncelle
        this.setupTodos();
      })
      .catch((error) => console.log(error));
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
    firebase
      .firestore()
      .collection("todos")
      .doc(todoId)
      .delete()
      .then(() => {
        //TodoList instance'ını güncelle
        this.todos = this.todos.filter((todo) => todo.id !== todoId);

        //Uygulama durumunu güncelle
        this.setupTodos();
      });
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
        const newTodoInput = {
          todo: e.target.value,
          isComplete: false,
        };

        //Formu sıfırla
        e.target.value = "";

        //Oluşturulan todo objesini kaydet
        this.addTodo(newTodoInput)
          .then(() => {})
          .catch((error) => console.log(error));
      }
    }
  }

  /**
   *    Yeni bir "todo" objesini hem "TodoList" instance'ına hem de
   * tarayıcının localStorage'ına kaydetmeye yarar
   * @param {{id:String, todo:String, isComplete:boolean}} todo
   */
  addTodo(todo) {
    const promise = new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("todos")
        .add({
          todo: todo.todo,
          isComplete: todo.isComplete
        })
        .then((docRef) => {
          const newTodo = {
            id: docRef.id,
            todo: todo.todo,
            isComplete: todo.isComplete,
          };

          //TodoList instance'ına söz konusu todo'yu ekle
          this.todos.push(newTodo);

          //Uygulama durumunu güncelle
          this.setupTodos();
        })
        .catch((error) => {
          console.log(error)
        });
    })

    return promise
  }
}