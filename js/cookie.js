function setCookie(name, value, expireDays) {
  var expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + expireDays);
  var c_value = escape(value) + ((expireDays === null) ? "" : "; expires="+expireDate.toUTCString());
  document.cookie=name + "=" + c_value;
  console.log("Cookie set.");
}

function getCookie(c_name) {
  var i,x,y,ARRcookies = document.cookie.split(";");
  for (i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x == c_name) {
      return unescape(y);
    }
  }
}

(function(){
  console.log("Checking cookies.");
  var ws = getCookie("warehouse_selection");
  console.log("Warehouse selection: " + ws);
  
  var url;
  switch(ws){
    case "US-AL": url = "http://www.huntsville.lcdcycle.com"; break;
    case "US-TX": url = "http://www.dallas.lcdcycle.com"; break;
    case "US-FL": url = "http://www.orlando.lcdcycle.com"; break;
    case "US-MI": url = "http://www.michigan.lcdcycle.com"; break;
  }
  
  if(url != null)
    window.location.href = url;
})();