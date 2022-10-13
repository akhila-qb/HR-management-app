/*function to fetch and store data
@ param {string} url of json file
@ param {string} variable to store json*/
async function fetchStoreContent(url) {
  const response=await fetch(url)
  const list= await response.json()
  return list
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