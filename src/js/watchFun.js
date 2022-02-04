function likeFun(id) {
    $.ajax({
        url: "/api/boards/" + id + "/like",
        method: "post",
        success: function (res) {
            document.getElementById("like").innerHTML = "좋아요👍 " + res.like;
        },
        error: function () {
            console.log("error...ㅠㅠㅠㅠ");
        },
    });
}

function hateFun(id) {
    $.ajax({
        url: "/api/boards/" + id + "/hate",
        method: "post",
        success: function (res) {
            document.getElementById("hate").innerHTML = "싫어요👎 " + res.hate;
        },
        error: function () {
            console.log("error...ㅠㅠㅠㅠ");
        },
    });
}

function dateView(TorF) {
    fetch(`/api/${TorF}/date`, {
        method: "post",
    })
        .then((res) => res.json())
        .then((res) => {
            localStorage.setItem("dateSort", res.TorF);
            localStorage.setItem("likeSort", 0);
            localStorage.setItem("hateSort", 0);
            if (document.querySelector("table")) {
                document.querySelector("table").remove();
            }
            tableLoad(res.boards);
        });
}

function likeView(TorF) {
    fetch(`/api/${TorF}/like`, {
        method: "post",
    })
        .then((res) => res.json())
        .then((res) => {
            localStorage.setItem("likeSort", res.TorF);
            localStorage.setItem("hateSort", 0);
            localStorage.setItem("dateSort", 0);
            if (document.querySelector("table")) {
                document.querySelector("table").remove();
            }
            tableLoad(res.boards);
        });
}

function hateView(TorF) {
    fetch(`/api/${TorF}/hate`, {
        method: "post",
    })
        .then((res) => res.json())
        .then((res) => {
            localStorage.setItem("hateSort", res.TorF);
            localStorage.setItem("likeSort", 0);
            localStorage.setItem("dateSort", 0);
            if (document.querySelector("table")) {
                document.querySelector("table").remove();
            }
            tableLoad(res.boards);
        });
}

function hateView3() {
    fetch(`/api/hateOnly`, {
        method: "post",
    })
        .then((res) => res.json())
        .then((res) => {
            if (document.querySelector("table")) {
                document.querySelector("table").remove();
            }
            tableLoad(res.boards);
        });
}

function likeView3() {
    fetch(`/api/likeOnly`, {
        method: "post",
    })
        .then((res) => res.json())
        .then((res) => {
            if (document.querySelector("table")) {
                document.querySelector("table").remove();
            }
            tableLoad(res.boards);
        });
}

function dateView3() {
    fetch(`/api/dateOnly`, {
        method: "post",
    })
        .then((res) => res.json())
        .then((res) => {
            if (document.querySelector("table")) {
                document.querySelector("table").remove();
            }
            tableLoad(res.boards);
        });
}

function tableLoad(boards) {
    const page = Number(localStorage.getItem("page"));
    let max = page * 20 >= boards.length ? boards.length : page * 20;
    let thtml =
        "<table id='table-th' border='1'><th>번호</th><th>제목</th><th>작성자</th><th>좋아요</th><th>싫어요</th><th>작성일</th>";

    for (let i = page * 20 - 20; i < max; i++) {
        thtml +=
            "<tr><td>" +
            (i + 1) +
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
            boards[i].createdAt +
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
            "비밀번호가 틀렸습니다..";
    }
}

function pageNum(params) {
    localStorage.setItem("page", Number(params));
    let preDate = Number(localStorage.getItem("dateSort"));
    let preLike = Number(localStorage.getItem("likeSort"));
    let preHate = Number(localStorage.getItem("hateSort"));

    if (preDate == 1) {
        dateView3();
    } else if (preLike == 1) {
        likeView3();
    } else if (preHate == 1) {
        hateView3();
    } else {
        dateView3();
    }
}

function tableRemove() {
    if (document.querySelector("table")) {
        document.querySelector("table").remove();
    }
}
