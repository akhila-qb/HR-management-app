//get add employee modal
let modal = document.querySelector('#my_modal');
// Get the button that opens edit modal
let btn = document.getElementById("add_btn");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
//get close button
let close_btn=document.getElementById("cancel")
// When the user clicks on add employee button, open the edit modal
btn.onclick = function() {
modal.style.display = "block";
}
// When the user clicks on <span> (x), close the edit modal
span.onclick = function() {
modal.style.display = "none";
}
// When the user clicks on cancel, close the edit modal
close_btn.onclick = function() {
    modal.style.display = "none";
    }
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
modal.style.display = "none";
}
}

//get update employee modal
let update_modal = document.querySelector('#my_modal');
// Get the button that opens update modal
let update_btn = document.getElementById("edit_icon");
// Get the <span> element that closes the update modal
let update_span = document.getElementsByClassName("close")[0];
//get update close button
let update_close_btn=document.getElementById("cancel")
//get heading
let update_heading = document.getElementById("dynamic_heading")
// When the user clicks on edit button, open the update modal
update_btn.onclick = function() {
update_modal.style.display = "block";
update_heading.textContent="Update Employee";

}
// When the user clicks on <span> (x), close the edit modal
update_span.onclick = function() {
update_modal.style.display = "none";
}
// When the user clicks on cancel, close the update modal
update_close_btn.onclick = function() {
 update_modal.style.display = "none";
    }
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
update_modal.style.display = "none";
}
}

//get delete modal
let delete_modal=document.getElementById("delete_modal")
// Get the button that opens the delete modal
let delete_icon=document.getElementById("delete_icon")
// Get the button that closes the delete modal
let cancel_icon=document.getElementById("cancel_delete")
// When the user clicks on delete button, open the delete modal
delete_icon.onclick = function() {
delete_modal.style.display = "block";
}
// When the user clicks on cancel, close the delete modal
cancel_icon.onclick = function() {
delete_modal.style.display = "none";
}

