/**
*
*  Javascript trim, ltrim, rtrim
*  http://www.webtoolkit.info/
*
**/
 
function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

// useful selectors that came on my way
/*
 * $("> div", node) => divs directly under node
 * $("*[name]", node) => all nodes with attribute name
 * $("> :first-child", node) => don't forget '>' otherwise all first childs will be selected
 * if ($(event.target).is('li') ) {}

 *http://jquery-howto.blogspot.com/2009/02/how-to-get-full-html-string-including.html
 */

var show = function(node) {
	alert($('<div>').append($(node).clone()).remove().html());
}
