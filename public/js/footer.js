let form = document.getElementById("form");

if (form) {
  /////////////////////////////////////////
  // Обновление данных
  /////////////////////////////////////////
  form.addEventListener("submit", function (e) {
    if (this.dataset.id !== "create") {
      e.preventDefault();

      let data = {};

      Array.from(this.getElementsByTagName("input")).forEach((elem) => {
        data[elem.name] = elem.value;
      });

      fetch(this.action, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json;charst=utf-8",
        },
      })
        .then((response) => {
          console.log("Обработка fetch ");
          return response.json();
        })
        .then((data) => {
          console.log("test front");
          alert(data.message);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  });
}

/////////////////////////////////////////
// Удаление данных
/////////////////////////////////////////

Array.from(document.getElementsByClassName("del")).forEach((elem) => {
  elem.addEventListener("click", function () {
    fetch("/users/" + this.dataset.id, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.parentNode.parentNode.remove();
        alert(data.message);
      })
      .catch((err) => {
        alert("Ошибка удаления");
      });
  });
});
