let t=document.querySelector("#get-students-btn"),e=document.querySelector(".tbody"),n=document.querySelector(".form"),l=null;function s(){return fetch("http://localhost:3000/students").then(t=>t.json())}function a(t){e.innerHTML=t.map(({id:t,name:e,age:n,course:l,skills:s,email:a,isEnrolled:d})=>`<tr id="${t}">
    <td>${t}</td>
    <td class="name-td">${e}</td>
    <td class="age-td">${n}</td>
    <td class="course-td">${l}</td>
    <td class="skills-td">${s}</td>
    <td class="email-td">${a}</td>
    <td class="isEnrolled-td">${d}</td>
    <td>
    <button type="button" data-action="edit">Edit</button>
    <button type="button" data-action="delete">Delete</button>
</td>
</tr>`).join("")}t.addEventListener("click",()=>{s().then(a)}),n.addEventListener("submit",t=>{var e,d;t.preventDefault();let o=t.currentTarget.elements,r={name:o.name.value,age:o.age.value,course:o.course.value,skills:o.skills.value,email:o.email.value,isEnrolled:o.isEnrolled.checked};l?(e=r,d=l,fetch(`http://localhost:3000/students/${d}`,{method:"PUT",body:JSON.stringify(e),headers:{"Content-Type":"application/json; charset=UTF-8"}}).then(t=>t.json())).then(s).then(a).finally(()=>{l=null,n.reset()}):fetch("http://localhost:3000/students",{method:"POST",body:JSON.stringify(r),headers:{"Content-Type":"application/json; charset=UTF-8"}}).then(t=>t.json()).then(s).then(t=>a(t)).finally(()=>{n.reset()})}),e.addEventListener("click",t=>{var e;if("BUTTON"!==t.target.nodeName)return;let d=t.target.dataset.action,o=t.target.closest("tr"),r=o.id;"edit"===d&&(l=r,n.elements.name.value=o.querySelector(".name-td").textContent,n.elements.age.value=o.querySelector(".age-td").textContent,n.elements.course.value=o.querySelector(".course-td").textContent,n.elements.skills.value=o.querySelector(".skills-td").textContent,n.elements.email.value=o.querySelector(".email-td").textContent),"delete"===d&&(e=r,fetch(`http://localhost:3000/students/${e}`,{method:"DELETE"})).then(s).then(t=>a(t))});
//# sourceMappingURL=18hw.6c37b5ce.js.map
