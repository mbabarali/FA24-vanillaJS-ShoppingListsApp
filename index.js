// ==============================================================
// Start: Operations on an Item
// ==============================================================
function createItem(title, status = "seek") {
  console.log("[createItem]", title, status);

  // Create parent node and children nodes
  const newItem = document.createElement("li");
  const itemTitle = title;
  const shiftBtn = document.createElement("Button");
  const deleteBtn = document.createElement("Button");

  // Configure nodes
  newItem.classList = "list-group-item";

  if (status == "mark") {
    shiftBtn.innerHTML = "&#8634;";
    shiftBtn.classList = "mx-1 seek-btn";
    shiftBtn.addEventListener("click", shiftToSeekEventHandler);
  } else {
    shiftBtn.innerHTML = "&check;";
    shiftBtn.classList = "mx-1 mark-btn";
    shiftBtn.addEventListener("click", shiftToMarkEventHandler);
  }

  deleteBtn.innerHTML = "&cross;";
  deleteBtn.classList = "mx-1 delete-btn";
  deleteBtn.addEventListener("click", deleteEventHandler);

  console.log("shiftBtn", shiftBtn, "--> Type:", typeof shiftBtn);
  console.log("deleteBtn", deleteBtn, "--> Type:", typeof deleteBtn);

  // Attach children nodes to parent node
  newItem.append(itemTitle, shiftBtn, deleteBtn);

  // Return item
  return newItem;
}

function renderItem(item, status, category = "grocery") {
  console.log("[renderItem]", category, status, item);

  // Append content
  document.querySelector(`#${category}-${status}-list`).appendChild(item);
}

// ==============================================================
// Start: Register Event Handlers to Get New Item from User
// ==============================================================
console.log("==============================================");
const newComponent = document.getElementById("new-component");
const titleNewItem = newComponent.children[0]; // OR newComponent.getElementsByTagName("input")[0];
const buttonsNewItem = newComponent.getElementsByTagName("button");

// console.log("newComponent", newComponent);
// console.log("titleNewItem", titleNewItem);
// console.log("buttonsNewItem", buttonsNewItem);
// --------------------------------------------------
function addEventHandler(status, e) {
  console.log("[NEW-ITEM-" + status.toUpperCase() + "]");
  console.log("target", e.target);
  console.log("parentElement", e.target.parentElement);

  // Validate content
  if (titleNewItem.value == "") return;

  // Create and render content
  const newItem = createItem(titleNewItem.value, status);
  renderItem(newItem, status);

  // Reset form-fields
  titleNewItem.value = "";
}

// --------------------------------------------------
buttonsNewItem[0].addEventListener("click", addEventHandler.bind(null, "seek"));
buttonsNewItem[1].addEventListener("click", addEventHandler.bind(null, "mark"));

/*
// --------------------------------------------------
function addToSeekEventHandler(e) {
  console.log("[NEW-ITEM-SEEK]");
  console.log("target", e.target);
  console.log("parentElement", e.target.parentElement);

  // Validate content
  if (titleNewItem.value == "") return;

  // Create and render content
  const newItem = createItem(titleNewItem.value, "seek");
  renderItem(newItem, "seek");

  // Reset form-fields
  titleNewItem.value = "";
}

// --------------------------------------------------
function addToMarkEventHandler(e) {
  console.log("[NEW-ITEM-MARK]");
  console.log("target", e.target);
  console.log("parentElement", e.target.parentElement);

  // Validate content
  if (titleNewItem.value == "") return;

  // Create and render content
  const newItem = createItem(titleNewItem.value, "mark");
  renderItem(newItem, "mark");

  // Reset form-fields
  titleNewItem.value = "";
}

// --------------------------------------------------
buttonsNewItem[0].addEventListener("click", addToSeekEventHandler);
buttonsNewItem[1].addEventListener("click", addToMarkEventHandler);
*/

// ==============================================================
// Start: Register Event Handlers on Buttons in Items
// ==============================================================
console.log("==============================================");
function shiftToMarkEventHandler(e) {
  console.log("[ITEM-MARKED]");
  console.log("target", e.target);
  console.log("parentElement", e.target.parentElement);

  // Identify item to move
  const itemToMove = e.target.parentElement;

  // Find destination list
  const sourceListIdArray = e.target.parentElement.parentElement.id.split("-");
  const destinationId = sourceListIdArray[0] + "-mark-list";
  const destinationList = document.querySelector(`#${destinationId}`);

  console.log("itemToMove", itemToMove, "--> Type:", typeof itemToMove);
  console.log(
    "sourceListIdArray",
    sourceListIdArray,
    "--> Type:",
    typeof sourceListIdArray
  );

  // Update item
  let shiftBtn = itemToMove.querySelector("Button");
  shiftBtn.removeEventListener("click", shiftToMarkEventHandler);
  shiftBtn.addEventListener("click", shiftToSeekEventHandler);
  shiftBtn.innerHTML = "&#8634;";
  shiftBtn.classList = shiftBtn.classList.value.replace("mark", "seek");

  console.log("shiftBtn", shiftBtn, "--> Type:", typeof shiftBtn);

  // Move item to destination list
  destinationList.appendChild(itemToMove);

  console.log(
    "destinationId",
    destinationId,
    "--> Type:",
    typeof destinationId
  );
  console.log(
    "destinationList",
    destinationList,
    "--> Type:",
    typeof destinationList
  );
}

// --------------------------------------------------
function shiftToSeekEventHandler(e) {
  console.log("[ITEM-RESTORED]");
  console.log("target", e.target);
  console.log("parentElement", e.target.parentElement);

  // Identify item to move
  const itemToMove = e.target.parentElement;

  // Find destination list
  const sourceListIdArray = e.target.parentElement.parentElement.id.split("-");
  const destinationId = sourceListIdArray[0] + "-seek-list"; //-+
  const destinationList = document.querySelector(`#${destinationId}`);

  console.log("itemToMove", itemToMove, "--> Type:", typeof itemToMove);
  console.log(
    "sourceListIdArray",
    sourceListIdArray,
    "--> Type:",
    typeof sourceListIdArray
  );

  // Update item
  let shiftBtn = itemToMove.querySelector("Button");
  shiftBtn.removeEventListener("click", shiftToSeekEventHandler); //-+
  shiftBtn.addEventListener("click", shiftToMarkEventHandler); //-+
  shiftBtn.innerHTML = "&check;"; //-+
  shiftBtn.classList = shiftBtn.classList.value.replace("seek", "mark"); //-+

  console.log("shiftBtn", shiftBtn, "--> Type:", typeof shiftBtn);

  // Move item to destination list
  destinationList.appendChild(itemToMove);

  console.log(
    "destinationId",
    destinationId,
    "--> Type:",
    typeof destinationId
  );
  console.log(
    "destinationList",
    destinationList,
    "--> Type:",
    typeof destinationList
  );
}

// --------------------------------------------------
function deleteEventHandler(e) {
  console.log("[ITEM-DELETED]");
  console.log("target", e.target);
  console.log("parentElement", e.target.parentElement);

  // // Identify Item to delete
  // const itemToDelete = e.target.parentElement;
  // console.log("itemToDelete", itemToDelete, "--> Type:", typeof itemToDelete);

  // Delete item
  e.target.parentElement.remove();
}

/*
// No fixed LIs, hence the following code snippet is commented.
console.log("==============================================");
const markBtnAll = document.querySelectorAll(".mark-btn");
markBtnAll.forEach((item) => {
  console.log(item);
  // item.onclick = shiftToMarkEventHandler; // Bad Practice
  item.addEventListener("click", shiftToMarkEventHandler);
});

// --------------------------------------------------
const seekBtnAll = document.querySelectorAll(".seek-btn");
seekBtnAll.forEach((item) => {
  console.log(item);
  item.addEventListener("click", shiftToSeekEventHandler);
});

// --------------------------------------------------
const deleteBtnAll = document.querySelectorAll(".delete-btn");
deleteBtnAll.forEach((item) => {
  console.log(item);
  item.addEventListener("click", deleteEventHandler);
});
*/
