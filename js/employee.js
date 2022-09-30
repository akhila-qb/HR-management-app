//function to fetch and store data
function fetch_store_content(url, variable_to_store_json) {
    fetch(url)
        .then(response => response.json())
        .then(list => localStorage.setItem(variable_to_store_json, JSON.stringify(list)))
}

//setting global variable
let list
//to display details in table
fetch_store_content("../assets/json/employee_list.json", "employee_details")

get_employee_details()

function get_employee_details() {
    tbody = document.getElementById("tbody")
    JSON.parse(localStorage.getItem("employee_details")).forEach(employee => {
        console.log(employee);
        fetch_store_content("../assets/json/skills.json", "skill_details")
        //   get_skill_details()
        function get_skill_details() {
            const skill_details = JSON.parse(localStorage.getItem("skill_details"))
            console.log(typeof employee.skills);
            const skill_name_array = employee.skills.map(element => {

                for (let skill_obj of skill_details) {
                    if (skill_obj.skill_id == element) {
                        return skill_obj.skill
                    }
                }
            })
            return skill_name_array
        }

        let tr = document.createElement("tr")
        tr.setAttribute("class", "table_data")

                                          tr.setAttribute("id", `${employee.employee_id}`)
        
        tr.innerHTML = ` <td>${employee.employee_id}</td>
    <td >${employee.name}</td>
    <td>${get_skill_details()}</td>
    <td>${employee.experience}</td>
    <td>
    <i id="edit_icon" onclick="open_modal(false,${employee.employee_id})" class="fa-solid fa-user-pen"></i>
    <i id="delete_icon" onclick="open_dlt_modal(this)" class="fa-solid fa-user-slash"></i>
    </td>`
        tbody.appendChild(tr)
    })
}

const skills=[]
function checkbox_value (a){
    skills.push(a)
    console.log(skills);
}
//function to add new emp
function save_new_emp_data() {
    const employee_id = document.getElementById("emp_id").value
    const name = document.getElementById("emp_name").value
    const experience = document.getElementById("emp_exp").value
  //  const skills = document.getElementById("emp_skill").value.split(", ")
//let skills=trial()
//console.log(temp_skills);

    const phone = document.getElementById("emp_phone").value
    const email = document.getElementById("emp_mail").value
    
    const new_emp_obj = { employee_id, name, experience, skills, phone, email }
    console.log(new_emp_obj);
    const employee_details = JSON.parse(localStorage.getItem("employee_details"))
    employee_details.push(new_emp_obj)
    localStorage.setItem("employee_details", JSON.stringify(employee_details))
    remove_old_details()
    get_employee_details()
    close_modal()


    // function trial (){
    //     console.log("hi");
    // const skill_details = JSON.parse(localStorage.getItem("skill_details"))
    // let skills = temp_skills.map(item => {
    //     for (let skill_obj of skill_details) {
    //         if (skill_obj.skill == item) {
    //             console.log(skill_obj.skill_id);
    //             return skill_obj.skill_id
                
    //         }
    //     }
    // })
    // console.log(skills);
    // return skills 
    
    // }


}

function remove_old_details() {
    document.querySelectorAll('.table_data').forEach(empRow => empRow.remove());
}

function open_modal(is_add,row_id) {
    let modal = document.querySelector(".modal");
    modal.style.display = "block";
    let overlay = document.querySelector("#overlay");
    overlay.style.display = "block";
    if (is_add) {
  
        let update_heading = document.querySelector("#dynamic_heading")
        update_heading.textContent = "Add Employee";
        let save=document.getElementById("save")
        save.onclick=()=>{save_new_emp_data()}

        let input_box = document.querySelectorAll(".input_box")
        input_box.forEach(content =>{
            content.value=""
        })
    }
    else {

        let update_heading = document.querySelector("#dynamic_heading")
        update_heading.textContent = "Update Employee";
        let input_box = document.querySelectorAll(".input_box")
        input_box.forEach(content =>{
            content.value=""
        })
                

    }
}


function close_modal() {
    let modal = document.querySelector(".modal");
    let overlay = document.querySelector("#overlay");
    overlay.style.display = "none";
    modal.style.display = "none";
}

function open_dlt_modal(target_dlt_icon) {
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



var expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}



