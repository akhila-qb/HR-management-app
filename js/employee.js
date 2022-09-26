
//fetch data
function get_employee_list(url, function_name) {
    fetch(url)
        .then(response => response.json())
        .then(list => function_name(list))
}

//to display details in table
get_employee_list("../assets/json/employee_list.json", get_employee_details)


function get_employee_details(list) {
    tbody = document.getElementById("tbody")
    list.forEach(employee => {

        //to display skills in table
        // get_employee_list("../assets/json/skills.json", get_skill_details)
        function get_skill_details(skill_list) {

            const skill_name_array = employee.skills.map(element => {
                for(let skill_obj of skill_list){

                    if (skill_obj.skill_id == element) {
                       // console.log(skill_obj.skill);
                        return skill_obj.skill
                    }
                }
            })
            console.log(skill_name_array);
            return skill_name_array
        }


        let tr = document.createElement("tr")
        tr.innerHTML = ` <td>${employee.employee_id}</td>
<td>${employee.name}</td>
<td>${get_skill_details([
            {
                "skill_id": 1,
                "skill": "Java"
            },
            {
                "skill_id": 2,
                "skill": "C"
            },
            {
                "skill_id": 3,
                "skill": "CPP"
            },
            {
                "skill_id": 4,
                "skill": "Python"
            },
            {
                "skill_id": 5,
                "skill": "HTML"
            }
        ]
        )}</td>
<td>${employee.experience}</td>
<td>
    <img id="edit_icon" src="../assets/images/edit_icon.png" alt="edit icon">
    <img id="delete_icon" onclick="delete_msg()" src="../assets/images/delete_icon.png" alt="delete icon">
</td>`
        tbody.appendChild(tr)
    })
}


