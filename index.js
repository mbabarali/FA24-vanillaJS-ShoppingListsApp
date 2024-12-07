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
