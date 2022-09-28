
//fetch data
function fetch_content(url, function_name) {
    fetch(url)
        .then(response => response.json())
        .then(list => function_name(list))
}
//setting global variable
let list
//to display details in table
fetch_content("../assets/json/employee_list.json", get_employee_details)

function get_employee_details(list) {
    tbody = document.getElementById("tbody")
    list.forEach(employee => {

        function get_skill_details(skill_list) {
            const skill_name_array = employee.skills.map(element => {
                for (let skill_obj of skill_list) {
                    if (skill_obj.skill_id == element) {
                         return skill_obj.skill
                    }
                }
            })
            return skill_name_array
        }

    let tr = document.createElement("tr")
    // tr.innerHTML = ` <td>${employee.employee_id}</td>
    // <td >${employee.name}</td>
    // <td>${fetch_content("../assets/json/skills.json",get_skill_details)}</td>
    // <td>${employee.experience}</td>
    // <td>
    // <i id="edit_icon" onclick="open_modal(false)" class="fa-solid fa-user-pen"></i>
    // <i id="delete_icon" onclick="open_dlt_modal()" class="fa-solid fa-user-slash"></i>
    // </td>`
    tbody.appendChild(tr)
    })


}


function open_modal(is_add,id_num,emp_obj){
    let modal = document.querySelector(".modal");
    modal.style.display = "block";
    let overlay = document.querySelector("#overlay");
    overlay.style.display = "block";
    if(is_add){
        let update_heading = document.querySelector("#dynamic_heading")
        update_heading.textContent = "Add Employee";
    }
    else{
        let update_heading = document.querySelector("#dynamic_heading")
        update_heading.textContent = "Update Employee";       
    }
}


function close_modal() {
    let modal = document.querySelector(".modal");
    let overlay = document.querySelector("#overlay");
    overlay.style.display = "none";
    modal.style.display = "none";
}

function open_dlt_modal() {
    let dlt_modal = document.querySelector("#delete_modal");
    let overlay_dlt = document.querySelector("#overlay_delete");
    overlay_dlt.style.display = "block";
    dlt_modal.style.display = "block";
}

function close_dlt_modal() {
    let dlt_modal = document.querySelector("#delete_modal");
    let overlay_dlt = document.querySelector("#overlay_delete");
    overlay_dlt.style.display = "none";
    dlt_modal.style.display = "none";
}
