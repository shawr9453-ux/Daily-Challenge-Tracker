document.addEventListener("DOMContentLoaded", () => {

    const loginScreen = document.getElementById("loginScreen");
    const dashboard = document.getElementById("dashboard");

    const usernameInput = document.getElementById("usernameInput");
    const startBtn = document.getElementById("startBtn");

    const greeting = document.getElementById("greeting");
    const todayDate = document.getElementById("todayDate");

    const tasksDiv = document.getElementById("tasks");
    const doneBtn = document.getElementById("doneBtn");
    const taskStatus = document.getElementById("taskStatus");

    const streakCount = document.getElementById("streakCount");
    const historyTable = document.getElementById("historyTable");

    const logoutBtn = document.getElementById("logoutBtn");

    const defaultTasks = [
        "Read for 20 minutes",
        "Exercise for 15 minutes",
        "Drink 8 glasses of water",
        "Practice a skill",
        "Meditate for 10 minutes"
    ];

    let selectedTask = "";

    const username = localStorage.getItem("username");

    if (username) {
        showDashboard(username);
    }

    startBtn.addEventListener("click", () => {

        const user = usernameInput.value.trim();

        if (user === "") {
            alert("Please enter a username.");
            return;
        }

        localStorage.setItem("username", user);

        showDashboard(user);

    });

    function showDashboard(user) {

        loginScreen.classList.add("hidden");
        dashboard.classList.remove("hidden");

        greeting.textContent = "Welcome, " + user;

        todayDate.textContent =
            new Date().toDateString();

        loadTasks();
        loadHistory();
        updateStreak();

    }

    function loadTasks() {

        tasksDiv.innerHTML = "";

        defaultTasks.forEach(task => {

            const btn = document.createElement("button");

            btn.textContent = task;

            btn.className = "taskBtn";

            btn.onclick = () => {

                document
                    .querySelectorAll(".taskBtn")
                    .forEach(b => b.classList.remove("selected"));

                btn.classList.add("selected");

                selectedTask = task;

                doneBtn.disabled = false;

            };

            tasksDiv.appendChild(btn);

        });

    }

    doneBtn.addEventListener("click", () => {

        if (selectedTask === "") return;

        const history =
            JSON.parse(localStorage.getItem("history")) || [];

        history.unshift({
            date: new Date().toLocaleDateString(),
            task: selectedTask
        });

        localStorage.setItem(
            "history",
            JSON.stringify(history)
        );

        taskStatus.textContent =
            "Task completed! 🎉";

        doneBtn.disabled = true;

        updateStreak();
        loadHistory();

    });

    function loadHistory() {

        historyTable.innerHTML = "";

        const history =
            JSON.parse(localStorage.getItem("history")) || [];

        history.forEach(item => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.date}</td>
                <td>${item.task}</td>
            `;

            historyTable.appendChild(row);

        });

    }

    function updateStreak() {

        const history =
            JSON.parse(localStorage.getItem("history")) || [];

        streakCount.textContent = history.length;

    }

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("username");

        location.reload();

    });

});
