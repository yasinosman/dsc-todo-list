export default class Todo{
    constructor(todo, isComplete, id){
        this.id = id;
        this.todo = todo;
        this.isComplete = isComplete;
        this.render()
    }

    render(){
        const circleClass = this.isComplete ? 'fa-check-circle' : 'fa-circle-thin';
        const lineClass = this.isComplete ? "lineThrough" : "";

        const todoNode = `<li class="item">
                            <i class="fa ${circleClass} co" job="complete" id="${this.id}"></i>
                            <p class="text ${lineClass}">${toDo}</p>
                            <i class="fa fa-trash-o de" job="delete" id="${this.id}"></i>
                        `;

        document.querySelector("#list").insertAdjacentElement(todoNode, "beforeend");
    }
}