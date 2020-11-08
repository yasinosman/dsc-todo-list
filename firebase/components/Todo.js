export default class Todo{
    constructor(todo, isComplete, id){
        this.id = id;
        this.todo = todo;
        this.isComplete = isComplete;
        this.render()
    }

    render(){
      const circleClass = this.isComplete
        ? "fa-check-circle"
        : "fa-circle-thin";
      const lineClass = this.isComplete ? "lineThrough" : "";

        /**
            <li class="item">
                <i class="fa ${circleClass} co" job="toggle" todoId="${this.id}"></i>
                <p class="text ${lineClass}">${this.todo}</p>
                <i class="fa fa-trash-o de" job="delete" todoId="${this.id}"></i>
            </li>
        */
      const todoNode = document.createElement("li");
      todoNode.classList.add("item");
      todoNode.innerHTML = `<i class="fa ${circleClass} co" job="toggle" todoId="${this.id}"></i>
                            <p class="text ${lineClass}">${this.todo}</p>
                            <i class="fa fa-trash-o de" job="delete" todoId="${this.id}"></i>`;

      document.querySelector("#list").appendChild(todoNode);
    }
}