const request = window.indexedDB.open("budget", 1);

// Create schema
request.onupgradeneeded = event => {
  const db = event.target.result;
  
  const budgetStore = db.createObjectStore("budget", {keyPath: "listID"});
  // Creates a statusIndex that we can query on.
  budgetStore.createIndex("statusIndex", "status"); 
}

// Opens a transaction, accesses the budget objectStore and statusIndex.
request.onsuccess = () => {
  const db = request.result;
  const transaction = db.transaction(["budget"], "readwrite");
  const budgetStore = transaction.objectStore("budget");
  const statusIndex = budgetStore.index("statusIndex");

  // Adds data to our objectStore
  budgetStore.add({ listID: "1", status: "complete" });
  budgetStore.add({ listID: "2", status: "in-progress" });
  budgetStore.add({ listID: "3", status: "complete" });
  budgetStore.add({ listID: "4", status: "backlog" });
 
  // Return an item by keyPath
  const getRequest = budgetStore.get("1");
  getRequest.onsuccess = () => {
    console.log(getRequest.result);
  };

  // Return an item by index
  const getRequestIdx = statusIndex.getAll("complete");
  getRequestIdx.onsuccess = () => {
    console.log(getRequestIdx.result); 
  }; 
};