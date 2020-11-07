import Datetime from "./Datetime"

export default class Header{
    constructor(){
        //Tarih ve saat bilgilerinin renderlanması
        new Datetime();

        //Temizle butonu için gerekli event listener'ın eklenmesi
        this.setEventListeners()
    }

    setEventListeners(){
        document.querySelector(".clear").addEventListener("click", () => {
            localStorage.clear();
            location.reload()
        })
    }
}