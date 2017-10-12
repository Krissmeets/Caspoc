({
   
    jsNavigateHome : function(cmp, evt, hlp) {
		var sObjectName = cmp.get("v.sObjectName");

		var e1 = $A.get("e.force:navigateToObjectHome");
    	e1.setParams({"scope":sObjectName});
    	e1.fire();

    },
    
    jsLoadTemplateDetail : function(cmp, evt) {
    	var sTemplate = evt.getParam("Template");
		
		var arcmp = []; 

    	$A.createComponent(
    		"lightning:input", 
    		{
    			"type" : "checkbox",
    			"aura:id" : "field",
    			"label": sTemplate,
    		}, function(ccmp,csts,cerr) {
    			arcmp.push(ccmp);
    		}

    	);

    	$A.createComponent(
    		"lightning:button", 
    		{
    			"aura:id" : "button2",
    			"label": sTemplate,
    			"onclick" : cmp.getReference("c.jsValidate") 
    		}, function(ccmp,csts,cerr) {
    			arcmp.push(ccmp);
    		}

    	);

    	var obj = cmp.get("v.temp");
    	obj = [];
    	for (var i=0; i<arcmp.length;i++) obj.push(arcmp[i]);
    	cmp.set("v.temp",obj);


    },
    
    jsValidate : function(cmp) {
    	alert ("clicked!");
    }


})
