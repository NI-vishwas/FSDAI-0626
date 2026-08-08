// app.js
 
// By ID
var titleElement = document.getElementById('title');
titleElement.innerText = 'Updated Title';
titleElement.style.color = 'blue';
 
// By Class Name
var highlightElements = document.getElementsByClassName('highlight');
for (var i = 0; i < highlightElements.length; i++) {
    highlightElements[i].style.fontWeight = 'bold';
}
 
// By Tag Name
var paragraphElements = document.getElementsByTagName('p');
for (var i = 0; i < paragraphElements.length; i++) {
    paragraphElements[i].style.border = '1px solid #ccc';
}
 
// By Using Query Selector
var firstParagraph = document.querySelector('p');
firstParagraph.style.fontSize = '18px';
 
// By Using Query Selector All
var allParagraphs = document.querySelectorAll('p');
allParagraphs.forEach(function(paragraph) {
    paragraph.style.margin = '10px';
});