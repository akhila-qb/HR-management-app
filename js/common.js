/*function to fetch and store data
@ param {string} url of json file
@ param {string} variable to store json*/
function fetchStoreContent(url, variableToStoreJson) {
  fetch(url)
    .then((response) => response.json())
    .then((list) =>
      localStorage.setItem(variableToStoreJson, JSON.stringify(list))
    );
 }
 /*function to get local storage data
 @ param {string} variable to store data*/
 function getLocalstorageData(storageVariable) {
  return JSON.parse(localStorage.getItem(storageVariable));
 }
 /*function to set local storage data
 @ param {string} variable to store data*/
 function setLocalstorageData(variableToStoreString,storageVariable) {
  return localStorage.setItem(
    variableToStoreString,
    JSON.stringify(storageVariable)
  );
 }