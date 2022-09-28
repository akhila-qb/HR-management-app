function open_modal (){
    let update_heading = document.querySelector("#dynamic_heading")
    update_heading.textContent="Add Employee";
    let modal = document.querySelector(".modal");
    let overlay=document.querySelector("#overlay");
    overlay.style.display="block";
    modal.style.display = "block";
}
function close_modal(){
    let modal = document.querySelector(".modal");
    let overlay=document.querySelector("#overlay");
    overlay.style.display="none";
    modal.style.display = "none";
}
function open_update_modal (){
    let update_heading = document.querySelector("#dynamic_heading")
    update_heading.textContent="Update Employee";
    let overlay=document.querySelector("#overlay");
    overlay.style.display="block";
    let modal = document.querySelector(".modal");
    modal.style.display = "block";
}
 function open_dlt_modal(){
    let dlt_modal = document.querySelector("#delete_modal");
    let overlay_dlt=document.querySelector("#overlay_delete");
    overlay_dlt.style.display="block";
    dlt_modal.style.display = "block";
 }
 function close_dlt_modal(){
    let dlt_modal = document.querySelector("#delete_modal");
    let overlay_dlt=document.querySelector("#overlay_delete");
    overlay_dlt.style.display="none";
    dlt_modal.style.display = "none";
 }
