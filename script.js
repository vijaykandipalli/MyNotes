const countEl = document.getElementById("notes-count");
const titleEl=document.getElementById("note-title");
const descEl=document.getElementById("note-description");
const saveBtn=document.getElementById("save-btn");
const notesList=document.getElementById("note-list");
const emptyEl=document.querySelector(".empty-state");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

let editing = false;

let editingId= null;

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

    if(editing){
        const note =notes.find(n=> n.time ===editingId);
        note.title=title;
        note.description=description;
        editing=false;
        editingId=null;
        saveBtn.innerText="Save Note";
    }else{
    notes.push ( {
        time: Date.now(),
        title: title,
        description: description
    });
}

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


function renderNotes() {
    notesList.innerText="";

    notes.forEach( note => {
        const li=document.createElement("li");
        li.className="note-item";
        li.innerHTML=`
             <div class="note-content">
                <h2 class="title">${note.title}</h2>
                <p class="description">${note.description}</p>
                <span class="time">${new Date(note.time).toLocaleString()}</span>
                <button class="edit-btn"><i class="fas fa-edit"></i></button>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        li.querySelector(".delete-btn").addEventListener("click", () => {
            notes = notes.filter( n => n.time !== note.time);
            saveAndRender();
        });

        li.querySelector(".edit-btn").addEventListener("click", () => {
             titleEl.value = note.title;
             descEl.value = note.description;
             editing = true;
             editingId = note.time;
             saveBtn.innerText = "Update";
             titleEl.focus();
        });

        
        notesList.appendChild(li);
    });

  
    updateCount();
    showEmptyState();
}



renderNotes();

