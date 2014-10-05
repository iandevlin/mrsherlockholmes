/**
* bookmark
*
* @author Ian Devlin <ian@iandevlin.com>
* http://twitter.com/iandevlin
* http://iandevlin.com
*
*/
var bookmark = function(title) {
	var bookTitle = title;

	// totop button
	var toTopBtn = document.getElementById('toTop');
	toTopBtn.addEventListener('click', function(e) {
		window.scrollTo(0, 0);
		e.preventDefault();
	}, false);
	toTopBtn.addEventListener('touchstart', function(e) {
		window.scrollTo(0, 0);
		e.preventDefault();
	}, false);
	// Goto bookmark button
	var gotoBookmarkBtn = document.getElementById('gotoBookmark');
	gotoBookmarkBtn.addEventListener('click', function(e) {
		gotoBookmark();
		e.preventDefault();
	}, false);
	gotoBookmarkBtn.addEventListener('touchstart', function(e) {
		gotoBookmark();
		e.preventDefault();
	}, false);
	// Save bookmark button
	var saveBookmarkBtn = document.getElementById('saveBookmark');
	saveBookmarkBtn.addEventListener('click', function(e) {
		saveBookmark(bookTitle);
		e.preventDefault();
	}, false);
	var saveBookmarkBtn = document.getElementById('saveBookmark');
	saveBookmarkBtn.addEventListener('touchstart', function(e) {
		saveBookmark(bookTitle);
		e.preventDefault();
	}, false);
	// Clear bookmark button
	var clearBookmarkBtn = document.getElementById('clearBookmark');
	clearBookmarkBtn.addEventListener('click', function(e) {
		clearBookmark(bookTitle);
		e.preventDefault();
	}, false);
	clearBookmarkBtn.addEventListener('touchstart', function(e) {
		clearBookmark(bookTitle);
		e.preventDefault();
	}, false);

	// React to keypresses
	document.onkeypress = function(ev) {
		var e = ev || window.event;
		var char = getChar(e);
		// s
		if (char === 115) saveBookmark(bookTitle);
		// g
		if (char === 103) gotoBookmark();
	}

	// Returns the document height
	var getDocHeight = function() {
	    var d = document;
	    return Math.max(
	        Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
	        Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
	        Math.max(d.body.clientHeight, d.documentElement.clientHeight)
	    );
	}

	// Returns the current Y scroll position
	var getYScrollPos = function() {
		return window.pageYOffset || document.documentElement.scrollTop;
	}

	// Returns the key that was pressed
	var getChar = function(e) {
		return ('charCode' in e) ? e.charCode : e.keyCode;
	}

	// Scrolls to the saved bookmark
	var gotoBookmark = function() {
		var y = getBookmark(bookTitle);
		if (y != 0) window.scrollTo(0, y);
	}

	// Saves the current scroll position as a bookmark
	var saveBookmark = function(title) {
		var h = getDocHeight();
		var y = getYScrollPos();
		var percent = (parseFloat(y) / parseFloat(h) * 100);
		saveBookmarkLocation(title, percent);
	}

	// Clears a bookmark
	var clearBookmark = function(title) {
		localStorage.removeItem(title + '-bookmark-location');
	}

	// Returns the stored bookmark value
	var getBookmark = function(title) {
		var percent = getBookmarkLocation(title);
		if (percent != 0) {
			var h = getDocHeight();
			var y = (parseFloat(percent) / 100) * h;
			return y;
		}
		return 0;
	}

	// Saves the specified bookmark location in localStorage
	var saveBookmarkLocation = function(title, value) {
		localStorage.setItem(title + '-bookmark-location', value);
	}

	// Returns the bookmark location from localStorage
	var getBookmarkLocation = function(title) {
		var percent = localStorage.getItem(title + '-bookmark-location');
		return (percent === 'undefined' ? 0 : percent);
	}
}