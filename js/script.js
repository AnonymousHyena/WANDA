$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

(function (global) {

var lb = {};

var homeHtmlUrl = "snippets/home-snippet.html";
var aboutHtml = "snippets/about-snippet.html";
var type;

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Remove the class 'active' from home and switch to Menu button
var switchMenuToActive = function (buttonIndex) {
  // Remove 'active' from home button
  var classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navHomeButton").className = classes;

  var classes = document.querySelector("#navMenuAboutButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navMenuAboutButton").className = classes;

  var menuSelector;
  if (buttonIndex==1){menuSelector="#navMenuAboutButton";}
  // Add 'active' to menu button if not already there
  classes = document.querySelector(menuSelector).className;
  if (classes.indexOf("active") == -1) {
    classes += " active";
    document.querySelector(menuSelector).className = classes;
  }
};

// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {
  
// On first load, show home view
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  homeHtmlUrl, 
  buildAndShowHomeHTML, 
  false); // Explicitely setting the flag to get JSON from server processed into an object literal
});

lb.contctUs = function(){
  window.open('mailto:stathisbozikas@gmail.com?Subject=WANDA%20is%20Awesome');
}
// Builds HTML for the home page based on categories array
// returned from the server.
function buildAndShowHomeHTML (categories) {
  // Load home snippet page
  $ajaxUtils.sendGetRequest(
    homeHtmlUrl,
    function (homeHtml) {
      insertHtml("#main-content",homeHtml);
    },
    false); // False here because we are getting just regular HTML from the server, so no need to process JSON.
}

lb.loadAboutPage = function () {
  showLoading("#main-content");
  switchMenuToActive(1);
  $ajaxUtils.sendGetRequest(
    aboutHtml,
    function(aboutHtml){
       insertHtml("#main-content",aboutHtml);
    },false);
};

global.$lb = lb;

})(window);

