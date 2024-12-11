/* --------------------------------------------------------------
"author": "Muhammad Babar Ali",
"repository": {
  "type": "git",
  "url": "git+https://github.com/mbabarali/FA24-vanillaJS-ShoppingListsApp.git"
},
"bugs": {
  "url": "https://github.com/mbabarali/FA24-vanillaJS-ShoppingListsApp.git/issues"
},
--------------------------------------------------------------- */
// ==============================================================
// Start: Creating category components
// ==============================================================
let bs_bg_postFix = "info";

// --------------------------------------------------
function createCategory(category) {
  console.log("[createCategory]", category);

  // create nodes
  const categoryComponent = document.createElement("article");

  // configure nodes
  bs_bg_postFix = bs_bg_postFix == "primary" ? "info" : "primary"; // Bootrstrap postfix
  categoryComponent.classList = `col-12 text-bg-${bs_bg_postFix}`;
  categoryComponent.id = `${category}-component`;

  // ----------- OPTION 01 -----------
  // categoryComponent.innerHTML = `
  // <h2>${category[0].toUpperCase() + category.slice(1)} List</h2>
  //   <div class="container">
  //     <div class="row">
  //       <ul class="col-6 list-group p-1 mb-1" id="${category}-seek-list">
  //         <!-- Item to seek list here -->
  //       </ul>
  //       <ul class="col-6 list-group p-1 mb-1" id="${category}-mark-list">
  //         <!-- Item to mark list here -->
  //       </ul>
  //     </div>
  // </div>
  // `;

  // ----------- OPTION 02 -----------
  const heading = document.createElement("h2");
  const container = document.createElement("div");
  const row = document.createElement("div");
  const listSeek = document.createElement("ul");
  const listMark = document.createElement("ul");

  heading.innerHTML = `${category[0].toUpperCase() + category.slice(1)} List`;
  container.classList = "container";
  row.classList = "row";

  listSeek.classList = "col-6 list-group p-1 mb-1";
  listSeek.id = `${category}-seek-list`;

  listMark.classList = "col-6 list-group p-1 mb-1";
  listMark.id = `${category}-mark-list`;

  // Attach children nodes to parent nodes
  row.append(listSeek, listMark);
  container.append(row);
  categoryComponent.append(heading, container);
  categoryComponent.append(heading, container);

  // Return componenet
  return categoryComponent;
}

// --------------------------------------------------
document
  .getElementById("category-components")
  .append(createCategory("grocery"));
document
  .getElementById("category-components")
  .append(createCategory("electronics"));
document
  .getElementById("category-components")
  .append(createCategory("kitchen"));
document.getElementById("category-components").append(createCategory("health"));

// ==============================================================
// Start: Drag and drop of an Item
// ==============================================================
let draggedComponent;

function dragStartEventHandler(e) {
  console.log("%c[START-DRAG]", "background-color: darkgrey");
  console.log("%ctarget", "font-weight: bold", e.target);
  console.log("   parentElement", e.target.parentElement);
  console.log("%ccurrentTarget", "font-weight: bold", e.currentTarget);
  console.log("   parentElement", e.currentTarget.parentElement);

  draggedComponent = e.target; // Storing reference of the item,  draggeded item
}

function dragOverEventHandler(e) {
  console.log("%c[OVER-DRAG]", "background-color: orange");
  console.log("%ctarget", "font-weight: bold", e.target);
  console.log("   parentElement", e.target.parentElement);
  console.log("%ccurrentTarget", "font-weight: bold", e.currentTarget);
  console.log("   parentElement", e.currentTarget.parentElement);

  // Prevent default to allow drop: The drop event won't fire without preventing default
  e.preventDefault(); // [****] Enables "currentTarget" to receive drop events

  e.stopPropagation(); // [Optional][STOP-EVENT-BUBBLING] Prevent bubbling of 'dragover' event
}

function dropEventHandler(e) {
  console.log("%c[DROP]", "background-color: red");
  console.log("%ctarget", "font-weight: bold", e.target);
  console.log("   parentElement", e.target.parentElement);
  console.log("%ccurrentTarget", "font-weight: bold", e.currentTarget);
  console.log("   parentElement", e.currentTarget.parentElement);

  draggedComponent &&
    updateItem(draggedComponent, e.currentTarget.id.split("-")[1]);

  draggedComponent && e.currentTarget.appendChild(draggedComponent);
}

function dragEndEventHandler(e) {
  console.log("%c[END-DRAG]", "background-color: black; color:white");
  console.log("%ctarget", "font-weight: bold", e.target);
  console.log("   parentElement", e.target.parentElement);
  console.log("%ccurrentTarget", "font-weight: bold", e.currentTarget);
  console.log("   parentElement", e.currentTarget.parentElement);
}

function dragEnterEventHandler(e) {
  console.log("%c[ENTER-DRAG]", "background-color: lightgreen");
  console.log("%ctarget", "font-weight: bold", e.target);
  console.log("   parentElement", e.target.parentElement);
  console.log("%ccurrentTarget", "font-weight: bold", e.currentTarget);
  console.log("   parentElement", e.currentTarget.parentElement);
}

function dragLeaveEventHandler(e) {
  console.log("%c[LEAVE-DRAG]", "background-color: pink");
  console.log("%ctarget", "font-weight: bold", e.target);
  console.log("   parentElement", e.target.parentElement);
  console.log("%ccurrentTarget", "font-weight: bold", e.currentTarget);
  console.log("   parentElement", e.currentTarget.parentElement);
}

function dragEventHandler(e) {
  console.log("%c[DRAG]", "background-color: crimson");
  console.log("%ctarget", "font-weight: bold", e.target);
  console.log("   parentElement", e.target.parentElement);
  console.log("%ccurrentTarget", "font-weight: bold", e.currentTarget);
  console.log("   parentElement", e.currentTarget.parentElement);
}

// --------------------------------------------------
// Configure drop acceptance on all "UL" elements
(function configureDropAcceptance() {
  const dropAcceptingElements = document.getElementsByTagName("UL");
  for (let dae of dropAcceptingElements) {
    console.log(dae);

    dae.style = "background-color: black";

    // -- (1) Listening in CAPTURING Phase of event propagation - { capture: true }
    // -- (2) Target Phase of event propagation
    // dae.addEventListener("drop", dropEventHandler, true);
    // dae.addEventListener("dragover", dragOverEventHandler, true);
    // dae.addEventListener("dragstart", dragStartEventHandler, true);
    // dae.addEventListener("dragend", dragEndEventHandler, true);
    // dae.addEventListener("dragenter", dragEnterEventHandler, true);
    // dae.addEventListener("dragleave", dragLeaveEventHandler, true);
    // dae.addEventListener("drop", dropEventHandler, true);

    // -- (2) Target Phase of event propagation
    // -- (3) Listening in BUBBLING Phase of event propagation - { capture: false }
    dae.addEventListener("drop", dropEventHandler);
    dae.addEventListener("dragover", dragOverEventHandler); // [****]
    // dae.addEventListener("dragstart", dragStartEventHandler);
    // dae.addEventListener("dragend", dragEndEventHandler);
    // dae.addEventListener("dragenter", dragEnterEventHandler);
    // dae.addEventListener("dragleave", dragLeaveEventHandler);
    // dae.addEventListener("drop", dropEventHandler);
  }
})();

// --------------------------------------------------
// Test Items
renderItem(createItem("Suger", "seek"), "seek");
renderItem(createItem("Salt", "seek"), "seek");
renderItem(createItem("Pepper", "seek"), "seek");
renderItem(createItem("Potato", "mark"), "mark");
renderItem(createItem("Tomato", "mark"), "mark");

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
  newItem.setAttribute("draggable", true);

  // -- (1) Listening in CAPTURING Phase of event propagation - { capture: true }
  // -- (2) Target Phase of event propagation
  // newItem.addEventListener("dragstart", dragStartEventHandler, true);
  // newItem.addEventListener("dragend", dragEndEventHandler, true);
  // newItem.addEventListener("dragenter", dragEnterEventHandler, true);
  // newItem.addEventListener("dragleave", dragLeaveEventHandler, true);
  // newItem.addEventListener("drop", dropEventHandler, true);
  // newItem.addEventListener("dragover", dragOverEventHandler, true);

  // -- (2) Target Phase of event propagation
  // -- (3) Listening in BUBBLING Phase of event propagation - { capture: false }
  newItem.addEventListener("dragstart", dragStartEventHandler);
  // newItem.addEventListener("dragend", dragEndEventHandler);
  // newItem.addEventListener("dragenter", dragEnterEventHandler);
  // newItem.addEventListener("dragleave", dragLeaveEventHandler);
  // newItem.addEventListener("drop", dropEventHandler);
  // newItem.addEventListener("dragover", dragOverEventHandler);

  shiftBtn.addEventListener("click", moveEventHandler);
  deleteBtn.addEventListener("click", moveEventHandler);
  if (status == "mark") {
    shiftBtn.innerHTML = "&#8634;";
    shiftBtn.classList = "mx-1 seek-btn";
    // shiftBtn.addEventListener("click", shiftToSeekEventHandler);
  } else {
    shiftBtn.innerHTML = "&check;";
    shiftBtn.classList = "mx-1 mark-btn";
    // shiftBtn.addEventListener("click", shiftToMarkEventHandler);
  }

  deleteBtn.innerHTML = "&cross;";
  deleteBtn.classList = "mx-1 delete-btn";
  // deleteBtn.addEventListener("click", deleteEventHandler);

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

function updateItem(item, status = "seek") {
  const shiftBtn = item.getElementsByTagName("Button")[0];

  if (status == "mark") {
    shiftBtn.innerHTML = "&#8634;";
    shiftBtn.classList = shiftBtn.classList.value.replace("mark", "seek");
  } else {
    shiftBtn.innerHTML = "&check;";
    shiftBtn.classList = shiftBtn.classList.value.replace("seek", "mark");
  }
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
  renderItem(newItem, status, newComponent.children[1].value);

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
function moveEventHandler(e) {
  console.log("[ITEM-MOVED]");
  console.log("target", e.target);
  console.log("parentElement", e.target.parentElement);

  if (e.target.nodeName != "BUTTON") return true; // Button is not clicked.

  let status;
  for (let thisClass of e.target.classList) {
    console.log("thisClass: ", thisClass, " ", typeof thisClass);

    if (thisClass.endsWith("btn")) {
      status = thisClass.split("-")[0];
      console.log("status: ", status, " ", typeof status);
      break;
    }
  }

  if (status == "delete") {
    // // Identify Item to delete
    // const itemToDelete = e.target.parentElement;
    // console.log("itemToDelete", itemToDelete, "--> Type:", typeof itemToDelete);

    // Delete item
    e.target.parentElement.remove();
    return false;
  }

  // Identify item to move
  const itemToMove = e.target.parentElement;

  // Find destination list
  const sourceListIdArray = e.target.parentElement.parentElement.id.split("-");
  const destinationId = sourceListIdArray[0] + "-" + status + "-list";
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

  if (status == "mark") {
    // shiftBtn.removeEventListener("click", shiftToMarkEventHandler);
    // shiftBtn.addEventListener("click", shiftToSeekEventHandler);
    shiftBtn.innerHTML = "&#8634;";
    shiftBtn.classList = shiftBtn.classList.value.replace("mark", "seek");
  } else {
    // shiftBtn.removeEventListener("click", shiftToSeekEventHandler);
    // shiftBtn.addEventListener("click", shiftToMarkEventHandler);
    shiftBtn.innerHTML = "&check;";
    shiftBtn.classList = shiftBtn.classList.value.replace("seek", "mark");
  }

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

  return true;
}

/*
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
*/

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

// ==============================================================
// Start: Event bubbling
// ==============================================================
console.log("==============================================");
// Using IIFE
(function (perform) {
  if (!perform) return;

  function clickEventHandler(e) {
    console.log("%c[LOG-CLICK]", "background-color: tomato");
    console.log("%ctarget", "font-weight: bold", e.target.nodeName); // e.target
    console.log("   parentElement", e.target.parentElement.nodeName); // e.target.parentElement

    console.log(
      "%ccurrentTarget",
      "font-weight: bold",
      e.currentTarget.nodeName
    ); // e.currentTarget
    console.log("   parentElement", e.currentTarget.parentElement.nodeName); // e.currentTarget.parentElement

    e.stopPropagation(); // Stop propagation thru current listenr on node
    // e.stopImmediatePropagation(); // Stop propagation thru all other listenrs on same node (having more liseners to event)
  }

  // --------------------------------------------------
  const categoryComponents =
    document.getElementsByClassName("category-component");

  for (let article of categoryComponents) {
    console.log(article);

    article.addEventListener("click", clickEventHandler, { capture: false }); // false --> execution in event bubbling phase (third phase)
  }

  // --------------------------------------------------
  // Test Items
  renderItem(createItem("Suger", "seek"), "seek");
  renderItem(createItem("Salt", "seek"), "seek");
  renderItem(createItem("Pepper", "seek"), "seek");
  renderItem(createItem("Potato", "mark"), "mark");
  renderItem(createItem("Tomato", "mark"), "mark");

  // --------------------------------------------------
  const listsOfAllCategories = document.getElementsByTagName("UL");

  for (let ul of listsOfAllCategories) {
    console.log(ul);

    ul.style = "background-color: black";
    ul.addEventListener("click", clickEventHandler, { capture: true }); // true --> execution in event capturing phase (first phase)
  }

  // --------------------------------------------------
})(false);

/*
function clickEventHandler(e) {
  console.log("%c[LOG-CLICK]", "background-color: tomato");
  console.log("%ctarget", "font-weight: bold", e.target.nodeName); // e.target
  console.log("   parentElement", e.target.parentElement.nodeName); // e.target.parentElement

  console.log("%ccurrentTarget", "font-weight: bold", e.currentTarget.nodeName); // e.currentTarget
  console.log("   parentElement", e.currentTarget.parentElement.nodeName); // e.currentTarget.parentElement

  e.stopPropagation(); // Stop propagation thru current listenr on node
  // e.stopImmediatePropagation(); // Stop propagation thru all other listenrs on same node (having more liseners to event)
}

// --------------------------------------------------
const categoryComponents =
  document.getElementsByClassName("category-component");

for (let article of categoryComponents) {
  console.log(article);

  article.addEventListener("click", clickEventHandler, { capture: false }); // false --> execution in event bubbling phase (third phase)
}

// --------------------------------------------------
// Test Items
renderItem(createItem("Suger", "seek"), "seek");
renderItem(createItem("Salt", "seek"), "seek");
renderItem(createItem("Pepper", "seek"), "seek");
renderItem(createItem("Potato", "mark"), "mark");
renderItem(createItem("Tomato", "mark"), "mark");

// --------------------------------------------------
const listsOfAllCategories = document.getElementsByTagName("UL");

for (let ul of listsOfAllCategories) {
  console.log(ul);

  ul.style = "background-color: black";
  ul.addEventListener("click", clickEventHandler, { capture: true }); // true --> execution in event capturing phase (first phase)
}

// --------------------------------------------------
*/
