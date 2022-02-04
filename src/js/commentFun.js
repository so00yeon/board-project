const watch_container = document.getElementById("watch_container");
const form = document.getElementById("commentForm");

const addComment = (text, id) => {
    const boardComments = document.querySelector("#comment-view ul");
    const newComment = document.createElement("li");
    newComment.setAttribute("id", `com${id}`);
    newComment.className = "board__comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    const span2 = document.createElement("span");
    span2.innerText = "❌";
    newComment.appendChild(span);
    newComment.appendChild(span2);
    span2.setAttribute("onclick", `removeComment(${id})`);
    boardComments.prepend(newComment);
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const boardId = watch_container.dataset.id;
    if (text === "") {
        return;
    }
    const response = await fetch(`/api/boards/${boardId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // express에게 String이 아니고 JSON을 보내고 있다고 알려주는 부분
        },
        body: JSON.stringify({ text }),
    });
    if (response.status === 201) {
        textarea.value = "";
        const { newCommentId } = await response.json(); // response 에서 댓글 id를 추출
        addComment(text, newCommentId);
    }
};

const removeComment = async (id) => {
    id = Number(id);
    document.querySelector(`#com${id}`).remove();
    const response = await fetch(`/api/boards/${id}/remove`, {
        method: "POST",
    });
};

if (form) {
    form.addEventListener("submit", handleSubmit);
}
