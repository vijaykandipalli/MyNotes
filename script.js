const countEl = document.getElementById("notes-count");
const titleEl=document.getElementById("note-title");
const descEl=document.getElementById("note-description");
const saveBtn=document.getElementById("save-btn");
const notesList=document.querySelectorAll(".note-list");
const emptyEl=document.querySelector(".empty-state");

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

    notes.push ( {
        title: title,
        description: description
    });

    titleEl.value = "";
    descEl.value = "";
    titleEl.focus();

    saveAndRender();
}

function updateCount(){
    countEl.innerText = `${notes.length} notes`;
}

function showEmptyState(){
 emptyEl.style.display = notes.length === 0 ? "block" : "none";
}

function saveAndRender(){
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
}
