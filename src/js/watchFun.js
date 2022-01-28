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
            document.querySelector("table").remove();
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
            document.querySelector("table").remove();
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
            document.querySelector("table").remove();
            tableLoad(res.boards);
        });
}

function tableLoad(boards) {
    let thtml =
        "<table id='table-th' border='1'><th>번호</th><th>제목</th><th>작성자</th><th>좋아요</th><th>싫어요</th><th>작성일</th>";

    for (let i = 0; i < boards.length; i++) {
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
