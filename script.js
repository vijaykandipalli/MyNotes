const countEl = document.getElementById("notes-count");
const titleEl=document.getElementById("note-title");
const descEl=document.getElementById("note-description");
const saveBtn=document.getElementById("save-btn");
const notesList=document.getElementById("notes-list");
const emptyEl=document.getElementById("empty-state");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

saveBtn.addEventListener("click", addNotes);

titleEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        descEl.focus();
    }
});

descEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        addNotes();
    }
});

function addNotes() {
    const title = titleEl.value.trim();
    const description = descEl.value.trim();
    if ((!title) || (!description) ){
        return;
    }

    tasks.push ( {
        title: title,
        description: description
    });

    titleEl.value = "";
    descEl.value = "";
    titleEl.focus();

    saveAndRender();
}