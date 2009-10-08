function getAbsPos ( node ) {
    var pos = {x:0,y:0};
    while ( node != null ) {
	pos.x += node.offsetLeft;
	pos.y += node.offsetTop;
	node = node.offsetParent;
    }
    return pos;
}

var helloworld = {
    label1:"maybe",
    captureList:[],
    captureBoxes:[],
    div:[],
    onLoad: function() {
	// initialization code
	this.initialized = true;
	this.strings = document.getElementById("helloworld-strings");
    },

    onMenuItemCommand: function(l) {
	var cb = document.getElementById ("Testing-Doit-Button");
	var tb = document.getElementById("cliptoolbar");
	if ( cb.checked ) {
            for ( var i=0; i<4; i++ ) {
		helloworld.div[i] = content.document.createElement("div");
		helloworld.div[i].style.position = "absolute";
		helloworld.div[i].style.display = "block";
		helloworld.div[i].style.border = "1px solid blue";
		helloworld.div[i].style.zIndex = 9999;
		helloworld.div[i].style.opacity = 0.9;
		helloworld.div[i].style.backgroundColor = "blue";
		content.document.body.appendChild ( helloworld.div[i] );
            }

	    tb.style.display = "block";
	    // add mouse event handler on current content
	    content.document.body.addEventListener("mouseover", helloworld.onTargetMouseOver, true );
	    content.document.body.addEventListener("mousedown", helloworld.onTargetMouseDown, true );
	} else {
	    tb.style.display = "none";
	    // remove event handler
	    content.document.body.removeEventListener("mouseover", helloworld.onTargetMouseOver, true );
	    content.document.body.removeEventListener("mousedown", helloworld.onTargetMouseDown, true );

	    // remove fixed div
            for ( var i=0; i<4; i++ )
		helloworld.div[i].style.display = "none";
	    
	    for ( var i=0; i<helloworld.captureBoxes.length; i++ )
		content.document.body.removeChild ( helloworld.captureBoxes[i] );

	    helloworld.captureBoxes = [];
	}
    },

    onTargetMouseOver: function (e) {
        for ( var i=0; i<4; i++ )
            helloworld.div[i].style.display = "none";
	helloworld.div.innerHTML = e.target.nodeName;
	var pos = getAbsPos ( e.target );
	helloworld.div[0].style.left = pos.x+"px";
	helloworld.div[0].style.top = pos.y+"px";
	helloworld.div[0].style.width = "2px";
	helloworld.div[0].style.height = e.target.offsetHeight+"px";

	helloworld.div[1].style.left = pos.x+"px";
	helloworld.div[1].style.top = pos.y+"px";
	helloworld.div[1].style.width = e.target.offsetWidth+"px";
	helloworld.div[1].style.height = "2px";

	helloworld.div[2].style.left = pos.x + e.target.offsetWidth + "px";
	helloworld.div[2].style.top = pos.y+"px";
	helloworld.div[2].style.width = "2px";
	helloworld.div[2].style.height = e.target.offsetHeight+"px";

	helloworld.div[3].style.left = pos.x + "px";
	helloworld.div[3].style.top = pos.y + e.target.offsetHeight + "px";
	helloworld.div[3].style.width = e.target.offsetWidth+"px";
	helloworld.div[3].style.height = "2px";
        for ( var i=0; i<4; i++ )
            helloworld.div[i].style.display = "block";
    },

    onTargetMouseDown: function ( e ) {
	helloworld.captureList.push ( e.target );
	// display
	var pos = getAbsPos ( e.target );
	var div = document.createElement("div");
	div.style.position = "absolute";
	div.style.display = "block";
	div.style.border = "1px solid blue";
	div.style.zIndex = 9999;
	div.style.opacity = 0.5;
	div.style.backgroundColor = "red";
	div.style.left = pos.x+"px";
	div.style.top = pos.y+"px";
	div.style.width = e.target.offsetWidth + "px";
	div.style.height = e.target.offsetHeight+"px";

	content.document.body.appendChild ( div );
	helloworld.captureBoxes.push ( div );

//	alert ( e.target.nodeName + " is selected and total selected count is " + helloworld.captureList.length );	
    },

    onFinisheEditing: function () {
	// get clip
	var tmp = [];
	for ( var i=0; i<helloworld.captureList.length; i++ ) {
	    var div1 = content.document.createElement("div");
	    div1.appendChild (helloworld.captureList[i].cloneNode(true));
	    tmp.push ( div1.innerHTML );
	}
	helloworld.captureList = [];

	// open dialog
	window.openDialog("chrome://clipfox/content/finishDlg.xul", "save", "chrome,centerscreen,width=500,height=280", 
			  {status:"mystatus", mylo:content.document.location, myclips:tmp} );
		
	// restore ui
	document.getElementById ("Testing-Doit-Button").checked = false;
	helloworld.onMenuItemCommand();
    }
};

window.addEventListener("load", function(e) { helloworld.onLoad(e); }, false);
