// jQuery Smart [AJAX] Form handler (C) 2011/11/27 by Wil Barath, under BSD license.
// by my convention: 't' = this and 'j' = jQuery(this)

jQuery.fn.smartForm = function(){ // initialize the form
	// attach default handler to all inputs:
	//console.log("attaching to form ",this);
	$(":input",this).each(function(){
		var t = this, j = $(this); 
		if (t.title!=""){
			if (t.attributes && t.attributes.value) t.default=t.attributes.value.value;
			else t.default=j.attr("value");
			//console.log(this.name,this.default);
			// make it dim if it is default
			(j.val()=="" || j.val()==t.default) && j.css({"color":"#999"});
			// set up focus event only if there's a title/message:
			j.blur(function(){
				var j = $(this);
				if (j.val() == ""){
					j.val(this.default);
					j.css({"color":"#999"});
				}
			});
			j.focus(function(){
				var j = $(this);
				// make it dark
				j.css({"color":"#000"});
				// if it's the default value, clear it:
				j.val() == this.default && j.val("");	
			});
		}
	});
	// form submit handler:
	$(this).submit(function(){
		var t = this, j = $(this);
		// validate all inputs
		//console.log("validating form ",this);
		var issues = "";
		$(":input",t).each(function(){
			var t = this, j = $(this);
			// if check that a non-default value has been set if it has a title
			if (j.prop('title') && (j.val() == t.default || j.val() == "")){
				// if value is default, log it
				issues == "" && t.focus();
				issues += j.prop('title') + "\n";
			}
		});
		// if error happened, focus the element, warn the user
		if (issues != ""){
			alert(issues);
			return false;
		}
		// only do ajax submit if the "ajax" property is set on the form:
		if (j.attr("ajax") != undefined){
			// if no error hapened, submit the request
			$.post(j.prop("action")+"&method=ajax",j.serialize(),function(response){
				//console.log("target:",$(".ajax_response",target));
				$(".ajax_response",t).html(response);
			});
			return false; // prevents normal form submit.
		}
		// otherwise return nothing; this will perform an normal submit
	});
}
