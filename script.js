document.addEventListener("DOMContentLoaded", function () {

  const startBtn = document.querySelector("button");
  const welcome = document.getElementById("welcome");

  startBtn.addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();

    if (username === "") {
      alert("Username daalo");
      return;
    }

    localStorage.setItem("daily_user", username);
    welcome.innerText = "Welcome, " + username;
  });

});