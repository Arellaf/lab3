let students = [
  { id: 1, firstName: "Іван", lastName: "Петренко", birthYear: 2002, averageGrade: 85, course: 3 },
  { id: 2, firstName: "Олена", lastName: "Шевченко", birthYear: 2001, averageGrade: 90, course: 4 },
  { id: 3, firstName: "Марія", lastName: "Іваненко", birthYear: 2003, averageGrade: 88, course: 2 },
  { id: 4, firstName: "Олександр", lastName: "Коваль", birthYear: 2000, averageGrade: 78, course: 5 },
  { id: 5, firstName: "Анна", lastName: "Захаренко", birthYear: 2002, averageGrade: 92, course: 3 }
];

function displayStudents(students = []) {
  let table = document.getElementById("table-body");

  table.innerHTML = `
  <tr>
    <th onclick="sortStudents('id')">ID</th>
    <th onclick="sortStudents('firstName')">Ім'я</th>
    <th onclick="sortStudents('lastName')">Прізвище</th>
    <th onclick="sortStudents('birthYear')">Рік народження</th>
    <th onclick="sortStudents('averageGrade')">Середній бал</th>
    <th onclick="sortStudents('course')">Курс</th>
    <th>Дії</th>
  </tr>`;

  students.forEach(student => {
    table.insertAdjacentHTML("beforeend", `
      <tr>
        <td>${student.id}</td>
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        <td>${student.birthYear}</td>
        <td>${student.averageGrade}</td>
        <td>${student.course}</td>
        <td>
          <button class="table-btn" onclick="showModalDelete(${student.id})">Вилучити</button>
          <button class="table-btn" onclick="showModalEdit(${student.id})">Редагувати</button>
        </td>
      </tr>
    `);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayStudents(students);
});

// сортіровка за заголовком

let sortOrder = 'asc'; 

function sortStudents(field) {
  const sortedStudents = [...students]; 
  sortedStudents.sort((a, b) => {
    if (a[field] < b[field]) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (a[field] > b[field]) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';

  displayStudents(sortedStudents);
}

// сотіровка за input

function filterStudents() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const filteredStudents = students.filter(student =>
    student.firstName.toLowerCase().includes(query) 
  );
  
  displayStudents(filteredStudents); 
}

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", filterStudents);

// мадальне вікно modal-add

const modalAdd = document.getElementById("modal-add");
const addBtn = document.getElementById("add-btn");
const addCloseBtn = document.getElementById("add-close-btn");
const addSaveBtn = document.getElementById("add-save-btn");

addBtn.addEventListener("click", () => {
  modalAdd.style.display = "flex"; 
});

addCloseBtn.addEventListener("click", () => {
  modalAdd.style.display = "none"; 
});

addSaveBtn.addEventListener("click", () => {
  const newStudent = {
    id: students.length + 1,
    firstName: document.getElementById("add-first-name").value,
    lastName: document.getElementById("add-last-name").value,
    birthYear: parseInt(document.getElementById("add-birth-year").value),
    averageGrade: parseFloat(document.getElementById("add-average-grade").value),
    course: parseInt(document.getElementById("add-course").value)
  };

  students.push(newStudent); 
  displayStudents(students); 

  document.getElementById("add-first-name").value = "";
  document.getElementById("add-last-name").value = "";
  document.getElementById("add-birth-year").value = "";
  document.getElementById("add-average-grade").value = "";
  document.getElementById("add-course").value = "";
  modalAdd.style.display = "none";
});

// мадальне вікно modal-edit

const modalEdit = document.getElementById("modal-edit");
const editCloseBtn = document.getElementById("edit-close-btn");
const editSaveBtn = document.getElementById("edit-save-btn");
const editCancelBtn = document.getElementById("edit-cancel-btn");

let editStudentId;

function showModalEdit(id) {
  editStudentId = id;
  const student = students.find(student => student.id === id);
  
  document.getElementById("edit-first-name").value = student.firstName;
  document.getElementById("edit-last-name").value = student.lastName;
  document.getElementById("edit-birth-year").value = student.birthYear;
  document.getElementById("edit-average-grade").value = student.averageGrade;
  document.getElementById("edit-course").value = student.course;

  modalEdit.style.display = "flex";
}

editCloseBtn.addEventListener("click", () => {
  modalEdit.style.display = "none";
});

editCancelBtn.addEventListener("click", () => {
  modalEdit.style.display = "none";
});

editSaveBtn.addEventListener("click", () => {
  const editedStudent = students.find(student => student.id === editStudentId);

  editedStudent.firstName = document.getElementById("edit-first-name").value;
  editedStudent.lastName = document.getElementById("edit-last-name").value;
  editedStudent.birthYear = parseInt(document.getElementById("edit-birth-year").value);
  editedStudent.averageGrade = parseFloat(document.getElementById("edit-average-grade").value);
  editedStudent.course = parseInt(document.getElementById("edit-course").value);

  displayStudents(students);

  modalEdit.style.display = "none";
});

// мадальне вікно modal-delete

const modalDelete = document.getElementById("modal-delete");
const deleteCloseBtn = document.getElementById("delete-close-btn");
const deleteConfirmBtn = document.getElementById("delete-confirm-btn");
const deleteCancelBtn = document.getElementById("delete-cancel-btn");
let deleteStudentId;

function showModalDelete(id) {
  deleteStudentId = id;
  const student = students.find(student => student.id === id);
  const deleteConfirmMessage = document.getElementById("delete-confirm-message");
  deleteConfirmMessage.textContent = `Ви впевнені, що хочете вилучити студента ${student.firstName} ${student.lastName}?`;

  modalDelete.style.display = "flex"; 
}

deleteCloseBtn.addEventListener("click", () => {
  modalDelete.style.display = "none"; 
});

deleteCancelBtn.addEventListener("click", () => {
  modalDelete.style.display = "none"; 
});

deleteConfirmBtn.addEventListener("click", () => {
  students = students.filter(student => student.id !== deleteStudentId);
  displayStudents(students);
  modalDelete.style.display = "none"; 
});
