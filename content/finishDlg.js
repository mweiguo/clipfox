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
	for ( var i=0; i<testwindow.clips.length; i++ ) {
	    var tmp = testwindow.clips[i].replace (/"/g, "\\\"");
	    tmp = tmp.replace (/'/g, "\\\'");
	    ext += "'" + tmp + "',";
	}
	
	ext += "], comment:'" + comment + "'}";
	
//	ext = ext.replace (/;/g, "$sc$");
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
//	var cmd = "https://api.del.icio.us/v1/posts/add?";
	var cmd = "url=" + encodeURIComponent (url);
	if ( desc != "" )
	    cmd += "&description=" + desc;
	if ( ext != "" )
	    cmd += "&extended=" + encodeURIComponent(ext);
	if ( tags != "" )
	    cmd += "&tags=" + tags;

//	alert ( cmd );
	new Ajax.Request( "https://api.del.icio.us/v1/posts/add",
			  { 
			      postBody:cmd,
			      method:'post', 
			      onSuccess: suCallback,
			      onFailure: function(){ alert('Something went wrong...') }
			  }
			);
    }
};

window.onload = testwindow.onload;
