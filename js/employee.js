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
        fetch_store_content("../assets/json/skills.json", "skill_details")
        //   get_skill_details()
        function get_skill_details() {
            const skill_details = JSON.parse(localStorage.getItem("skill_details"))
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
    <i id="delete_icon" onclick="open_dlt_modal(${employee.employee_id})" class="fa-solid fa-user-slash"></i>
    </td>`
        tbody.appendChild(tr)
    })

    let checkboxes=document.getElementById("checkboxes")
    const skill_details = JSON.parse(localStorage.getItem("skill_details"))
    let div=document.createElement("div")
    skill_details.forEach(skill=>{
        
        let child_div=document.createElement("div")
        let label=document.createElement("label")
        label.setAttribute("for",`${skill.skill}`)
        let input=document .createElement("input")
        input.setAttribute("type","checkbox")
        input.setAttribute("class","check_box")
        input.setAttribute("id",`${skill.skill}`)
        label.innerHTML=`${skill.skill}`
        child_div.appendChild(label)
        child_div.appendChild(input)
        div.appendChild(child_div)
    })
    checkboxes.replaceChildren(div)
}
 
//function to add new emp
function save_emp_data(is_add) {
    const employee_id = document.getElementById("emp_id").value
    const name = document.getElementById("emp_name").value
    const experience = document.getElementById("emp_exp").value
    skills=[]
    let checkbox_one=document.getElementById("Java")
    if(checkbox_one.checked){
        skills.push(1)
    }
    let checkbox_two=document.getElementById("C")
    if(checkbox_two.checked){
        skills.push(2)
    }
    let checkbox_three=document.getElementById("CPP")
    if(checkbox_three.checked){
        skills.push(3)
    }
    let checkbox_four=document.getElementById("Python")
    if(checkbox_four.checked){
        skills.push(4)
    }
    let checkbox_five=document.getElementById("HTML")
    if(checkbox_five.checked){
        skills.push(5)
    }
    const phone = document.getElementById("emp_phone").value
    const email = document.getElementById("emp_mail").value
   
    const new_emp_obj = { employee_id, name, experience, skills, phone, email }
    const employee_details = JSON.parse(localStorage.getItem("employee_details"))
    if(is_add){
    employee_details.push(new_emp_obj)
    localStorage.setItem("employee_details", JSON.stringify(employee_details))
    remove_old_details()
    get_employee_details()
    close_modal()
    display_snackbar("add")
}
else{
    let employee_details=JSON.parse(localStorage.getItem("employee_details"))
    //use same name as local storage
  let content=  employee_details.find((employee) => {
        if(employee.employee_id == employee_id) {
            return employee
        }
    })
    content.name=name
    content.experience=experience
    content.skills=skills
   content.phone=phone
    content.email=email
    localStorage.setItem("employee_details", JSON.stringify(employee_details))
    remove_old_details()
    get_employee_details()
    close_modal()
    display_snackbar("update")
}
}
 
function remove_old_details() {
    document.querySelectorAll('.table_data').forEach(empRow => empRow.remove());
}
 
function open_modal(is_add,row_id) {
    let modal = document.querySelector(".modal");
    modal.style.display = "block";
    let overlay = document.querySelector("#overlay");
    overlay.style.display = "block";
    let check_box=document.querySelectorAll(".check_box")
    if (is_add) {
        check_box.forEach(checkbox=>{
            checkbox.checked=false
        })
        let update_heading = document.querySelector("#dynamic_heading")
        update_heading.textContent = "Add Employee";
        let save=document.getElementById("save")
        save.onclick=()=>{save_emp_data(true)}  
        let input_box = document.querySelectorAll(".input_box")
        input_box.forEach(content =>{
            content.value=""
        })
        
    }
    else {
        check_box.forEach(checkbox=>{
            checkbox.checked=false
        })
        let update_heading = document.querySelector("#dynamic_heading")
        update_heading.textContent = "Update Employee";
        JSON.parse(localStorage.getItem("employee_details")).forEach(employee => {
            if(employee.employee_id==row_id){
                const employee_id = document.getElementById("emp_id")
                employee_id.value=employee.employee_id
                const employee_name = document.getElementById("emp_name")
                employee_name.value=employee.name
                const employee_exp = document.getElementById("emp_exp")
                employee_exp.value=employee.experience

                const employee_skills = document.getElementById("text_area")
                employee_skills.value=default_skill_lister(employee.skills)   
                let emp_skill_list=employee_skills.value
                emp_skill_list=emp_skill_list.split(",")
                let check_box=document.querySelectorAll(".check_box")
                check_box.forEach(checkbox=>{
                    for(let skill_name of emp_skill_list){
                    if(skill_name==checkbox.id){
                    checkbox.checked=true
                    }
                }
                })

                const employee_phone = document.getElementById("emp_phone")
                employee_phone.value=employee.phone
                const employee_mail = document.getElementById("emp_mail")
                employee_mail.value=employee.email
            }
            let save=document.getElementById("save")
            save.onclick=()=>{save_emp_data(false)} 
        })
}
} 
 
function close_modal() {
    let modal = document.querySelector(".modal");
    let overlay = document.querySelector("#overlay");
    overlay.style.display = "none";
    modal.style.display = "none";
}
 
function open_dlt_modal(row_id) {
    let dlt_modal = document.querySelector("#delete_modal");
    let overlay_dlt = document.querySelector("#overlay_delete");
    overlay_dlt.style.display = "block";
    dlt_modal.style.display = "block";
    let ok_delete=document.getElementById("ok_delete")
    ok_delete.onclick=()=>{delete_employee(row_id)}
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


function display_textbox(){
    skill_list=[]
    let checkbox_one=document.getElementById("Java")
    if(checkbox_one.checked){
        skill_list.push("Java")
    }
    let checkbox_two=document.getElementById("C")
    if(checkbox_two.checked){
        skill_list.push("C")
    }
    let checkbox_three=document.getElementById("CPP")
    if(checkbox_three.checked){
        skill_list.push("CPP")
    }
    let checkbox_four=document.getElementById("Python")
    if(checkbox_four.checked){
        skill_list.push("Python")
    }
    let checkbox_five=document.getElementById("HTML")
    if(checkbox_five.checked){
        skill_list.push("HTML")
    }
    let text_area=document.getElementById("text_area")
    text_area.value=skill_list
}

function default_skill_lister(selected_employee_skills) {
    let skill_details=JSON.parse(localStorage.getItem("skill_details"))
    return selected_employee_skills.map((skill_number)=>{
        for (let obj of skill_details)
        if(obj.skill_id==skill_number){
            return obj.skill
        }
    })
}

function display_snackbar(purpose) {
    // Get the snackbar DIV
    if(purpose=="add"){
    var snackbar = document.getElementById("snackbar");
    snackbar.textContent="Saved details.."
    }
    if(purpose=="update"){
    var snackbar = document.getElementById("snackbar"); 
    snackbar.textContent="Updated details.."
}
if(purpose=="delete"){
    var snackbar = document.getElementById("snackbar"); 
    snackbar.textContent="Deleted employee"
}

    // Add the "show" class to DIV
    snackbar.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
  }


function delete_employee(row_id){
    let x=JSON.parse(localStorage.getItem("employee_details"))
    x.forEach(employee => {
        if(employee.employee_id==row_id){
       x=x.filter(employee=>employee.employee_id!=row_id)
close_dlt_modal()
       }
    })
localStorage.setItem("employee_details", JSON.stringify(x))
remove_old_details()
get_employee_details()
display_snackbar("delete")
}


