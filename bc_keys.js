"use strict";

//run functions after browser reloads
window.addEventListener("load", findKeyWords);
window.addEventListener("load", makeKeyStyles);

/*Locate the keywords in the article indicated by the <dfn> tag
and add those keywords in alphabetical order to a keyword box. */
function findKeyWords() {
    //create aside tag and set its id
    var keyWordBox = document.createElement("aside");
    keyWordBox.id = "keywords";

    //create h1 tag,display list,then add h1 child tag to the aside tag
    var keyWordTitle = document.createElement("h1");
    keyWordTitle.innerHTML = "Keyword List";
    keyWordBox.appendChild(keyWordTitle);

    //create ordered list tag,then add ol child tag to the aside tag
    var keyWordList = document.createElement("ol");
    keyWordBox.appendChild(keyWordList);

    //generate the list of keywords and add IDs to each keyword entry in the source article
    var keyWordElems = document.querySelectorAll("article#doc dfn");
    var keyWords = new Array(keyWordElems.length);//array for no of characters 

    //loop through list of keyword tags
    for (var i = 0; i < keyWordElems.length; i++) {
        keyWords[i] = keyWordElems[i].textContent;//display text for list
        var linkID = replaceWS(keyWords[i]);//replace whitespace for each key word
        keyWordElems[i].id = "keyword_" + linkID;//set id for keyword tags
    }
    //sort array in alphabetical order
    keyWords.sort(); 

    //generate the list items in the keyword list
    for (var i = 0; i < keyWords.length; i++) {
        //create list item tag
        var keyWordListItem = document.createElement("li");
        //create hyperlink tag
        var keyWordLink = document.createElement("a");
        keyWordLink.innerHTML = keyWords[i];//display link for array for keyword tags
        //replace whitespace for each key word
        var linkID = replaceWS(keyWords[i]);
        keyWordLink.href = "#keyword_" + linkID;//set href attribute
        keyWordList.appendChild(keyWordListItem);//add child list item to ordered list
        keyWordListItem.appendChild(keyWordLink);//add child hyperlink to ordered list
    }
    //list box inserted under article#doc
    var historyDoc = document.getElementById("doc");//article document
    historyDoc.insertBefore(keyWordBox, historyDoc.firstChild)//aside tag is 1st child
}

//Create an embedded style sheet for the keyword box.
function makeKeyStyles() {
    //create style attribute in head tag
    var keyStyles = document.createElement("style");
    document.head.appendChild(keyStyles);//add child styles to head tag

    document.styleSheets[document.styleSheets.length - 1].insertRule(
        "aside#keywords { \
        border: 3px solid rgb(101,101,101); \
        float: right; \
        margin: 20px 0 20px 20px; \
        padding: 10px; \
        width: 320px; \ }", 0);
    document.styleSheets[document.styleSheets.length - 1].insertRule(
        "aside#keywords h1 { \
        font-size: 2em; \
        margin: 5px; \
        text-align: center; \ }", 1);
    document.styleSheets[document.styleSheets.length - 1].insertRule(
        "aside#keywords ol { \
        margin-left: 20px; \
        font-size: 1.2em; \ }", 2);
    document.styleSheets[document.styleSheets.length - 1].insertRule(
        "aside#keywords ol li { \
        line-height: 1.5em; \ }", 3);
    document.styleSheets[document.styleSheets.length - 1].insertRule(
        "aside#keywords ol li a { \
        color: rgb(101, 101, 101); \
        text-decoration: none; \ }", 4);
}

/*Replaces occurences of one or more consecutive white space
characters with the _ character.*/
function replaceWS(textStr) {
   var revText = textStr.replace(/\s+/g,"_");
   return revText;
}
