const btnRef = document.querySelector("#get-students-btn");
const tbodyRef = document.querySelector(".tbody");
const formRef = document.querySelector(".form");

let currentId = null;

btnRef.addEventListener("click", () => {
  getStudents().then(renderStudents);
});


function getStudents() {
  return fetch("http://localhost:3000/students")
  .then((res) => res.json());
}



function renderStudents(students) {
  const item = students
    .map(({ id, name, age, course, skills, email, isEnrolled }) => {
      return `<tr id="${id}">
    <td>${id}</td>
    <td class="name-td">${name}</td>
    <td class="age-td">${age}</td>
    <td class="course-td">${course}</td>
    <td class="skills-td">${skills}</td>
    <td class="email-td">${email}</td>
    <td class="isEnrolled-td">${isEnrolled}</td>
    <td>
    <button type="button" data-action="edit">Edit</button>
    <button type="button" data-action="delete">Delete</button>
</td>
</tr>`;
    }).join("");

  tbodyRef.innerHTML = item;
}




  formRef.addEventListener("submit", (e)=>{
    e.preventDefault()
    const elem = e.currentTarget.elements
    const data = {
        name: elem.name.value,
        age: elem.age.value,
        course: elem.course.value,
        skills: elem.skills.value,
        email: elem.email.value,
        isEnrolled: elem.isEnrolled.checked
    };
if (currentId) {
    updateStudent(data, currentId)
      .then(getStudents)
      .then(renderStudents)
      .finally(() => {
        currentId = null;
        formRef.reset();
      });
    return;
}

    addStudent(data)
    .then(getStudents)
    .then(res=>renderStudents(res))
    .finally(()=>{
        formRef.reset()
    })
    
    
  })

  function addStudent(data) {
    const options = {
method: "POST",
body: JSON.stringify(data),
headers: {
"Content-Type": "application/json; charset=UTF-8",
},
    };
    return fetch("http://localhost:3000/students", options)
    .then((res) => res.json());

  }


tbodyRef.addEventListener("click", (e)=>{
  if (e.target.nodeName !== "BUTTON") {
    return
  }  
    const action = e.target.dataset.action;
    const tr = e.target.closest("tr");
    const id = tr.id;
    
    if (action === "edit") {
        currentId = id
    formRef.elements.name.value = tr.querySelector(".name-td").textContent;
    formRef.elements.age.value = tr.querySelector(".age-td").textContent;
    formRef.elements.course.value = tr.querySelector(".course-td").textContent;
    formRef.elements.skills.value = tr.querySelector(".skills-td").textContent;
    formRef.elements.email.value = tr.querySelector(".email-td").textContent;
}

    if (action === "delete") {
        deleteStudent(id)
        .then(getStudents)
        .then(res=>renderStudents(res))
    }
    
})

function updateStudent(data, id) {
   const options = {
method: "PUT",
body: JSON.stringify(data),
headers: {
"Content-Type": "application/json; charset=UTF-8",
},
};
return fetch(`http://localhost:3000/students/${id}`, options)
.then(res=>res.json())
}


function deleteStudent(id) {
  return fetch(`http://localhost:3000/students/${id}`,{
method: "DELETE",
})
}
