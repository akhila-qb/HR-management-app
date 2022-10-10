//setting global variable
let list;
let selectedSkills = [];
let filterArray = [];
//calls fetch function to get JSON data
fetchStoreContent("../assets/json/employee_list.json", "employeeDetails");
getEmployeeDetails();
//displayFilterCheckbox();
displayCheckBoxes("filter_checkboxes")

/*function to display details on table
@ param {boolean} checks if function is calle for filtering */
function getEmployeeDetails(isFilter = false) {
  tbody = document.getElementById("tbody");
  let EmployeeDataToDisplay;
  if (isFilter) {
    EmployeeDataToDisplay = getLocalstorageData("filteredLocalStorage");
  } else {
    EmployeeDataToDisplay = getLocalstorageData("employeeDetails");
  }
  EmployeeDataToDisplay.forEach((employee) => {
    fetchStoreContent("../assets/json/skills.json", "skillDetails");
    function getSkillDetails() {
      const skillDetails = getLocalstorageData("skillDetails");
      let res = skillDetails
        .filter((skillObj) => employee.skills.includes(skillObj.skillId))
        .map((item) => item.skill);
      return res;
    }
    let tr = document.createElement("tr");
    tr.setAttribute("class", "tableData");
    tr.setAttribute("id", `${employee.employeeId}`);
    tr.innerHTML = ` <td>${employee.employeeId}</td>
 <td >${employee.name}</td>
 <td>${getSkillDetails()}</td>
 <td>${employee.experience}</td>
 <td>
 <i id="edit_icon" onclick="openModal(false,${employee.employeeId
      })" class="fa-solid fa-user-pen"></i>
 <i id="delete_icon" onclick="openDltModal(${employee.employeeId
      })" class="fa-solid fa-user-slash"></i>
 </td>`;
    tbody.appendChild(tr);
  });
}

/*function to filter employees according to the skills selected
@param {string} array of skillIds */
function filterEmployees(skillIdsToFilter) {
  let filteredEmpList = [];
  const employeeDetails = getLocalstorageData("employeeDetails");
  employeeDetails.forEach((employee) => {
    let checker = (empSkills, selectedSkills) =>
      selectedSkills.every((id) => empSkills.includes(id));
    if (checker(employee.skills, skillIdsToFilter)) {
      filteredEmpList.push(employee);
    }
  });
  setLocalstorageData("filteredLocalStorage", filteredEmpList);
  removeOldDetails();
  getEmployeeDetails(true);
}

/*displays input and label tags of checkbox div and makes it checked using onchange, for open modal as well as filtering
@ param {string} id to store in variable checkboxes*/
function displayCheckBoxes(elementToObtain) {
  let checkboxes = document.getElementById(elementToObtain);
  const skillDetails = getLocalstorageData("skillDetails");
  let div = document.createElement("div");
  skillDetails.forEach((skill) => {
    let childDiv = document.createElement("div");
    let label = document.createElement("label");
    if (elementToObtain == "filter_checkboxes") {
      label.setAttribute("for", `id-${skill.skillId}`);
    }
    else {
      label.setAttribute("for", `${skill.skillId}`);
    }
    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("class", "check_box");
    if (elementToObtain == "filter_checkboxes") {
      input.setAttribute("id", `id-${skill.skillId}`);
    }
    else {
      input.setAttribute("id", `${skill.skillId}`);
    }
    input.onchange = (event) => {
      if (input.checked) selectedSkills.push(skill.skillId);
      else {
        selectedSkills = selectedSkills.filter((item) => item != skill.skillId);
      }
      if (elementToObtain == "filter_checkboxes") {
        setSelectedFilterSkills(selectedSkills);;
      }
      else {
        setSelectedSkills(selectedSkills);;
      }
    };
    label.innerHTML = `${skill.skill}`;
    childDiv.appendChild(label);
    childDiv.appendChild(input);
    div.appendChild(childDiv);
  });
  checkboxes.replaceChildren(div);
}

//returns a new employee object by getting new details entered
function getAddEmployeeDetails() {
  const employeeId = document.getElementById("emp_id").value;
  const name = document.getElementById("emp_name").value;
  const experience = document.getElementById("emp_exp").value;
  const phone = document.getElementById("emp_phone").value;
  const email = document.getElementById("emp_mail").value;
  skills = [];
  skills = selectedSkills;
  return { employeeId, name, experience, skills, phone, email };
}
//function that checks if every fields are filled
function formValidation() {
  const nodeList = document.querySelectorAll(".input_box");
  const formFields = Array.from(nodeList);
  return (res = formFields.every((field) => {
    return field.checkValidity();
  }));
}
//function to add new emp
function saveEmpData(isAdd) {
  let employeeDetails = getLocalstorageData("employeeDetails");
  if (isAdd) {
    const newEmpObj = getAddEmployeeDetails();
    employeeDetails.push(newEmpObj);
    setLocalstorageData("employeeDetails", employeeDetails);
    displaySnackbar("add");
  } else {
    const newEmpObj = getAddEmployeeDetails();
    employeeDetails = employeeDetails.map((employee) => {
      if (employee.employeeId == newEmpObj.employeeId)
        employee = { ...employee, ...newEmpObj };
      return employee;
    });
    setLocalstorageData("employeeDetails", employeeDetails);
    displaySnackbar("update");
  }
  selectedSkills = [];
  removeOldDetails();
  getEmployeeDetails();
  closeModal();
}
//function to avoid repetition of details when submiting
function removeOldDetails() {
  document.querySelectorAll(".tableData").forEach((empRow) => empRow.remove());
}
/*function to display modal box for add and update employee
@ param {string} checks if function is called for add employee
@ param {string} passed row id of employee if function is called for update employee */
function openModal(isAdd, rowId) {
  let modal = document.querySelector(".modal");
  modal.style.display = "block";
  let overlay = document.querySelector("#overlay");
  overlay.style.display = "block";
  let checkBox = document.querySelectorAll(".check_box");
  displayCheckBoxes("checkboxes");
  let overSelect = document.getElementById("text_area");
  if (isAdd) {
    checkBox.forEach((checkbox) => {
      checkbox.checked = false;
    });
    dynamicHeading(true);
    let save = document.getElementById("save");
    save.onclick = () => {
      if (formValidation()) {
        saveEmpData(true);
      }
    };
    let input_box = document.querySelectorAll(".input_box");
    input_box.forEach((content) => {
      content.value = "";
    });
  } else {
    checkBox.forEach((checkbox) => {
      checkbox.checked = false;
    });
    dynamicHeading(false);
    displayDefaultData(rowId);
    let save = document.getElementById("save");
    save.onclick = () => {
      if (formValidation()) {
        saveEmpData(false);
      }
    };
  }
}
//shows multiselect dropdown skills on click
function showCheckBoxes() {
  let checkboxes = document.getElementById("checkboxes");
  checkboxes.style.display = "block";
}
// displays selected skills in text area by passing the skill names to text area values.
function setSelectedSkills(value) {
  const employeeSkills = document.getElementById("text_area");
  employeeSkills.value = defaultSkillLister(value);
}
// displays selected filtered skills in text area by passing the skill names to text area values.
function setSelectedFilterSkills(value) {
  const employeeSkills = document.getElementById("text_area_filter");
  employeeSkills.value = defaultSkillLister(value);
  filterEmployees(value);
}
// displays full details of an employee
function displayDefaultData(rowId) {
  let employeeDetails = getLocalstorageData("employeeDetails");
  employeeDetails.forEach((employee) => {
    if (employee.employeeId == rowId) {
      const employeeId = document.getElementById("emp_id");
      employeeId.value = employee.employeeId;
      const employeeName = document.getElementById("emp_name");
      employeeName.value = employee.name;
      const employeeExp = document.getElementById("emp_exp");
      employeeExp.value = employee.experience;
      setSelectedSkills(employee.skills);
      selectedSkills = employee.skills;
      let checkBox = document.querySelectorAll(".check_box");
      checkBox.forEach((checkbox) => {
        for (let skillId of employee.skills) {
          if (skillId == checkbox.id) {
            checkbox.checked = true;
          }
        }
      });
      const employeePhone = document.getElementById("emp_phone");
      employeePhone.value = employee.phone;
      const employeeMail = document.getElementById("emp_mail");
      employeeMail.value = employee.email;
    }
  });
}
//changes heading of modal box for add and update functions.
function dynamicHeading(isAdd) {
  let dynamicHeading = document.querySelector("#dynamic_heading");
  if (isAdd) dynamicHeading.textContent = "Add Employee";
  else dynamicHeading.textContent = "Update Employee";
}
//closes modal box for add and update feature
function closeModal() {
  let modal = document.querySelector(".modal");
  let overlay = document.querySelector("#overlay");
  overlay.style.display = "none";
  modal.style.display = "none";
  checkboxes.style.display = "none";
}
//opens delete confirmation box
function openDltModal(rowId) {
  let dltModal = document.querySelector("#delete_modal");
  let overlayDlt = document.querySelector("#overlay_delete");
  overlayDlt.style.display = "block";
  dltModal.style.display = "block";
  let ok_delete = document.getElementById("ok_delete");
  ok_delete.onclick = () => {
    deleteEmployee(rowId);
  };
}
//closes delete confirmation box.
function closeDltModal() {
  let dltModal = document.querySelector("#delete_modal");
  let overlayDlt = document.querySelector("#overlay_delete");
  overlayDlt.style.display = "none";
  dltModal.style.display = "none";
}
/*shows the corresponding skill name from a given skill id array
@ param {string} array of skill id */
function defaultSkillLister(selectedEmployeeSkills) {
  let skillDetails = getLocalstorageData("skillDetails");
  const res = skillDetails
    .filter((obj) => selectedEmployeeSkills.includes(obj.skillId))
    .map((item) => item.skill);
  return res;
}
//changes snackbar message for various functions.
function displaySnackbar(purpose) {
  // Get the snackbar DIV
  if (purpose == "add") {
    var snackbar = document.getElementById("snackbar");
    snackbar.textContent = "Employee added successfully";
  }
  if (purpose == "update") {
    var snackbar = document.getElementById("snackbar");
    snackbar.textContent = "Employee details updated successfully";
  }
  if (purpose == "delete") {
    var snackbar = document.getElementById("snackbar");
    snackbar.textContent = "Employee deleted successfully";
  }
  // Add the "show" class to DIV
  snackbar.className = "show";
  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    snackbar.className = snackbar.className.replace("show", "");
  }, 3000);
}
//deletes particular employee details from a row an from localstorage.
function deleteEmployee(rowId) {
  let x = getLocalstorageData("employeeDetails");
  let y = x.filter((employee) => employee.employeeId != rowId);
  closeDltModal();
  setLocalstorageData("employeeDetails", y);
  removeOldDetails();
  getEmployeeDetails();
  displaySnackbar("delete");
}
//function to sort employee id and experience in ascending and descending order.
function sortNumber(event) {
  const employeeDetails = getLocalstorageData("employeeDetails");
  if (event.dataset.sortOrderId == 1) {
    employeeDetails.sort((a, b) => a.employeeId - b.employeeId);
    event.dataset.sortOrderId = 0;
  } else if (event.dataset.sortOrderId == 0) {
    employeeDetails.sort((a, b) => b.employeeId - a.employeeId);
    event.dataset.sortOrderId = 1;
  } else if (event.dataset.sortOrderExp == 1) {
    employeeDetails.sort((a, b) => a.experience - b.experience);
    event.dataset.sortOrderExp = 0;
  } else if (event.dataset.sortOrderExp == 0) {
    employeeDetails.sort((a, b) => b.experience - a.experience);
    event.dataset.sortOrderExp = 1;
  }
  setLocalstorageData("employeeDetails", employeeDetails);
  removeOldDetails();
  getEmployeeDetails();
}
//function to sort names in ascending and descending order.
function sortName(event) {
  const employeeDetails = getLocalstorageData("employeeDetails");
  if (event.dataset.sortOrderName == 1) {
    employeeDetails.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    event.dataset.sortOrderName = 0;
  } else if (event.dataset.sortOrderName == 0) {
    employeeDetails.sort((b, a) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    event.dataset.sortOrderName = 1;
  }
  setLocalstorageData("employeeDetails", employeeDetails);
  removeOldDetails();
  getEmployeeDetails();
}

// function to display multiselect checkbox on click
function showFilterCheckBoxes(event) {
  let checkboxes = document.getElementById("filter_checkboxes");
  if (checkboxes.classList.contains("hide_filter_checkboxes"))
    checkboxes.classList.remove("hide_filter_checkboxes");
  else
    checkboxes.classList.add("hide_filter_checkboxes");
}