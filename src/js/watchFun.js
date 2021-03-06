function likeFun(id) {
    $.ajax({
        url: "/api/boards/" + id + "/like",
        method: "post",
        success: function (res) {
            document.getElementById("like").innerHTML = "μ’μμπ " + res.like;
        },
        error: function () {
            console.log("error...γ γ γ γ ");
        },
    });
}

function hateFun(id) {
    $.ajax({
        url: "/api/boards/" + id + "/hate",
        method: "post",
        success: function (res) {
            document.getElementById("hate").innerHTML = "μ«μ΄μπ " + res.hate;
        },
        error: function () {
            console.log("error...γ γ γ γ ");
        },
    });
}

function dateView(TorF) {
    let sortBtn = document.getElementsByClassName("sortBtn");
    fetch(`/api/${TorF}/date`, {
        method: "post",
    })
        .then((res) => res.json())
        .then((res) => {
            localStorage.setItem("dateSort", res.TorF);
            localStorage.setItem("likeSort", 0);
            localStorage.setItem("hateSort", 0);
            for (var i = 0; i < sortBtn.length; i++) {
                sortBtn[i].classList.remove("activateBtn");
                if (sortBtn[i].textContent == "μμ±μΌμ") {
                    if (localStorage.getItem("dateSort") == 1) {
                        sortBtn[i].classList.add("activateBtn");
                    }
                }
            }
            tableRemove();
            tableLoad(res.boards);
        });
}

function likeView(TorF) {
    let sortBtn = document.getElementsByClassName("sortBtn");
    fetch(`/api/${TorF}/like`, {
        method: "post",
    })
        .then((res) => res.json())
        .then((res) => {
            localStorage.setItem("likeSort", res.TorF);
            localStorage.setItem("hateSort", 0);
            localStorage.setItem("dateSort", 0);
            for (var i = 0; i < sortBtn.length; i++) {
                sortBtn[i].classList.remove("activateBtn");
                if (sortBtn[i].textContent == "μ’μμμ") {
                    if (localStorage.getItem("likeSort") == 1) {
                        sortBtn[i].classList.add("activateBtn");
                    }
                }
            }
            tableRemove();
            tableLoad(res.boards);
        });
}

function hateView(TorF) {
    let sortBtn = document.getElementsByClassName("sortBtn");
    fetch(`/api/${TorF}/hate`, {
        method: "post",
    })
        .then((res) => res.json())
        .then((res) => {
            localStorage.setItem("hateSort", res.TorF);
            localStorage.setItem("likeSort", 0);
            localStorage.setItem("dateSort", 0);
            for (var i = 0; i < sortBtn.length; i++) {
                sortBtn[i].classList.remove("activateBtn");
                if (sortBtn[i].textContent == "μ«μ΄μμ") {
                    if (localStorage.getItem("hateSort") == 1) {
                        sortBtn[i].classList.add("activateBtn");
                    }
                }
            }
            tableRemove();
            tableLoad(res.boards);
        });
}

function hateView3() {
    fetch(`/api/hateOnly`, {
        method: "post",
    })
        .then((res) => res.json())
        .then((res) => {
            tableRemove();
            tableLoad(res.boards);
        });
}

function likeView3() {
    fetch(`/api/likeOnly`, {
        method: "post",
    })
        .then((res) => res.json())
        .then((res) => {
            tableRemove();
            tableLoad(res.boards);
        });
}

function dateView3() {
    fetch(`/api/dateOnly`, {
        method: "post",
    })
        .then((res) => res.json())
        .then((res) => {
            tableRemove();
            tableLoad(res.boards);
        });
}

function dateView4() {
    fetch(`/api/dateOnlyR`, {
        method: "post",
    })
        .then((res) => res.json())
        .then((res) => {
            tableRemove();
            tableLoad(res.boards);
        });
}

function tableLoad(boards) {
    const page = Number(localStorage.getItem("page"));
    let max = page * 20 >= boards.length ? boards.length : page * 20;
    let thtml =
        "<table id='table-th' border='1'><th>λ²νΈ</th><th>μ λͺ©</th><th>μμ±μ</th><th>μ’μμ</th><th>μ«μ΄μ</th><th>μμ±μΌ</th>";

    for (let i = page * 20 - 20; i < max; i++) {
        let Tdate = new Date(boards[i].createdAt);
        Tdate = Tdate.toISOString().replace("T", " ").replace(/\..*/, "");
        thtml +=
            "<tr><td>" +
            boards[i].board_id +
            "</td><td><a href='/boards/" +
            boards[i].board_id +
            "'>" +
            boards[i].title +
            "</a></td><td>" +
            boards[i].writer +
            "</td><td>" +
            boards[i].like +
            "</td><td>" +
            boards[i].hate +
            "</td><td>" +
            Tdate +
            "</td></tr>";
    }
    thtml += "</table>";
    document.getElementById("table-container").innerHTML += thtml;
}

function view(pass, id) {
    const passValue = document.getElementById("password").value;
    if (pass == passValue) {
        document.getElementById("message").innerHTML = "";
        document.getElementById("message").innerHTML =
            '<a href="/boards/' +
            id +
            '/edit">Edit Post</a><br><a href="/boards/' +
            id +
            '/delete">Delete Post</a>';
    } else {
        document.getElementById("message").innerHTML =
            "λΉλ°λ²νΈκ° νλ Έμ΅λλ€..";
    }
}

function pageNum(params) {
    localStorage.setItem("page", Number(params));
    let spans = document.getElementsByClassName("page");
    let preDate = Number(localStorage.getItem("dateSort"));
    let preLike = Number(localStorage.getItem("likeSort"));
    let preHate = Number(localStorage.getItem("hateSort"));
    for (var i = 0; i < spans.length; i++) {
        spans[i].classList.remove("activatePage");
        if (spans[i].textContent == params) {
            spans[i].classList.add("activatePage");
        }
    }

    if (preDate == 1) {
        dateView3();
    } else if (preLike == 1) {
        likeView3();
    } else if (preHate == 1) {
        hateView3();
    } else if (preDate == 0) {
        dateView4();
    }
}

function tableRemove() {
    if (document.querySelector("table")) {
        document.querySelector("table").remove();
    }
}
