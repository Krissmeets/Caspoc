({
   jsBuildPage : function(cmp, field) {

	var ref = cmp.getReference("c.jsValidate");
	var	elm = [];
	var vclass = "slds-size--1-of-2 slds-p-horizontal_x-small";



	for (var j=0;j<field.length;j++) {
		switch (field[j].Type) {

			case "checkbox": 
				elm.push(["lightning:input", {"class":vclass, "type":field[j].Type, "name":field[j].Name, "label":field[j].Label,"checked":field[j].DefaultValue}]);
				break;
			case "text": 
				elm.push(["lightning:input", {"class":vclass, "type":field[j].Type, "name":field[j].Name, "label":field[j].Label, "required":field[j].Required, "value":field[j].DefaultValue}]);
				break;
			case "none":		
				elm.push(["lightning:layoutitem", {"class":"slds-size--1-of-2 slds-p-horizontal_x-small", "name":"nofield"}]);
				break;

			default:
				elm.push(["lightning:input", {"class":vclass, "type":field[j].Type, "name":field[j].Name, "label":field[j].Label, "required":field[j].Required, "value":field[j].DefaultValue}]);
				break;
		}

	}

//	elm2.push(["lightning:input", {"class": "slds-size--1-of-2 slds-p-horizontal_x-small","type" : "checkbox","aura:id" : "field","label": "test"}]);
//	elm2.push(["lightning:button", {"class": "slds-size--1-of-2 slds-p-horizontal_x-small","aura:id" : "button2","label": "test2","onclick" : ref}]);
	
    	$A.createComponents(elm
    		, function(ccmp,csts,cerr) {
		    	var obj = cmp.get("v.temp");
		    	obj = [];
		    	for (var i=0; i<ccmp.length;i++) {
		    		obj.push(ccmp[i])

		    	};
		    	cmp.set("v.temp",obj);
    		}
    	);
    },
    
    jsAddMessage : function(cmp,msg) {
    	var pagemsg = cmp.get("v.pagemsg");
    	pagemsg.push(msg);
    	cmp.set("v.pagemsg", pagemsg);					
    },

    jsValidate : function(cmp) {
    	alert ("clicked!");
    }

})
