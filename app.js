var taskInput = document.querySelector(".section__input_add_item");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.querySelector(".section__tasks_todo");
var completedTasksHolder = document.querySelector(".section__tasks_complete");

var createNewTaskElement = function(taskString) {

  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");

  var deleteButton = document.createElement("button");
	var deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = 'section__label';

  checkBox.type = "checkbox";
  checkBox.classList.add('section__check');
  editInput.type = "text";
  editInput.className = "section__input";

  editButton.innerText = "Edit";
  editButton.className = "section__button section__button_edit";

  deleteButton.className = "section__button section__button_delete";
  deleteButtonImg.src ='./remove.svg';
  deleteButtonImg.classList.add('section__button-image');
  deleteButton.appendChild(deleteButtonImg);

  listItem.classList.add("section__task");

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask=function(){
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

var editTask = function(){
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".section__button_edit");
  var containsClass = listItem.classList.contains("section__task_edit");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("section__task_edit");
};

var deleteTask=function(){
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

var taskCompleted = function() {
  var listItem=this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete=function(){
  var listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest = function(){
}

addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  var checkBox = taskListItem.querySelector(".section__check");
  var editButton = taskListItem.querySelector(".section__button_edit");
  var deleteButton = taskListItem.querySelector(".section__button_delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++){
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++){
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
