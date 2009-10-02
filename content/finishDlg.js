var testwindow = {
    onload : function() {
	if("arguments" in window && window.arguments.length > 0) {
	    document.getElementById ("input-link").value = window.arguments[0].mylo;
	    testwindow.clips = window.arguments[0].myclips;
	} else {
	    alert ( document.location );
	}
    },
    onok : function () {
	var url = document.getElementById ("input-link").value;
	var desc = document.getElementById ("input-title").value;
	var tags = document.getElementById ("input-tags").value + " 书籍";
	var comment = document.getElementById ("input-comment").value;
	
	var ext = "{desc:[";
	for ( var i=0; i<testwindow.clips.length; i++ )
	    ext += "'" + testwindow.clips[i] + "',";
	ext += "], comment:'" + comment + "'}";
	ext = ext.replace (/;/g, "$sc$");
	deliapi.addPost ( url, desc, ext, tags, testwindow.onPostFinished );
    }, 
    oncancel : function() {
	window.close();
    },
    onPostFinished : function ( response ) {
	alert ( response.responseText );
	window.close();
    }
};

var deliapi = {
    addPost: function (url, desc, ext, tags, suCallback ) {
	var cmd = "https://api.del.icio.us/v1/posts/add?";
	cmd += "url=" + encodeURIComponent (url);
	if ( desc != "" )
	    cmd += "&description=" + encodeURI ( desc );
	if ( ext != "" )
	    cmd += "&extended=" + encodeURI (ext);
	if ( tags != "" )
	    cmd += "&tags=" + encodeURI ( tags );
	new Ajax.Request( cmd,
			 { method:'get', 
			   onSuccess: suCallback,
			   onFailure: function(){ alert('Something went wrong...') }
			 }
			);
    }
};

window.onload = testwindow.onload;
