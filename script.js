const countEl = document.getElementById("notes-count");
const titleEl=document.getElementById("note-title");
const descEl=document.getElementById("note-description");
const saveBtn=document.getElementById("save-btn");
const notesList=document.getElementById("notes-list");
const emptyEl=document.getElementById("empty-state");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

