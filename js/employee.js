// //fetch data
// function get_employee_list(url, function_name) {
//     fetch(url)
//         .then(response => response.json())
//         .then(list => function_name(list))
//  }
 
//  //to display details in table
//  get_employee_list("../assets/json/employee_list.json", get_employee_details)
 
 
//  function get_employee_details(list) {
//     tbody = document.querySelector("tbody")
//     list.forEach(employee => {
 
//         //to display skills in table
//   get_employee_list("../assets/json/skills.json", get_skill_details)
//         function get_skill_details(skill_list) {
 
//             const skill_name_array = employee.skills.map(element => {
//                 for (let skill_obj of skill_list) {
 
//                     if (skill_obj.skill_id == element) {
//                         return skill_obj.skill
//                     }
//                 }
//             })
//             return skill_name_array
//         }
 
 
//         let tr = document.createElement("tr")
//         tr.innerHTML = ` <td>${employee.employee_id}</td>
//  <td>${employee.name}</td>
//  <td>${get_skill_details([
//             {
//                 "skill_id": 1,
//                 "skill": "Java"
//             },
//             {
//                 "skill_id": 2,
//                 "skill": "C"
//             },
//             {
//                 "skill_id": 3,
//                 "skill": "CPP"
//             },
//             {
//                 "skill_id": 4,
//                 "skill": "Python"
//             },
//             {
//                 "skill_id": 5,
//                 "skill": "HTML"
//             }
//         ]
//         )}</td>
//  <td>${employee.experience}</td>
//  <td>
//   <i id="edit_icon" onclick="open_update_modal()" class="fa-solid fa-user-pen"></i>
// <i id="delete_icon" onclick="open_dlt_modal()" class="fa-solid fa-user-slash"></i>
//  </td>`
//         tbody.appendChild(tr)
//   })
 
//  }
 
 
 
 
 
 
 
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
