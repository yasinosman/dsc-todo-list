export default class Datetime {
  constructor() {
    this.initDateTime();
  }

  initDateTime() {
    const currentDatetime = new Date().toLocaleString();
    this.render(currentDatetime);

    //Her saniye fonksiyonu recursive olarak çağır, bu sayede saat sürekli olarak güncellenecek
    setTimeout(() => {
      this.initDateTime();
    }, 500);
  }

  render(datetime) {
    document.querySelector("#date").innerHTML = datetime;
  }
}
