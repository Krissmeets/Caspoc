({
   jsBuildPage : function(cmp, field) {

	var ref = cmp.getReference("c.jsValidate");
	var	elm = [];
	var vclass = "slds-size--1-of-2 slds-p-horizontal_x-small";



	for (var j=0;j<field.length;j++) {
		switch (field[j].Type) {

			case "lookup":
				var Item = {};
				if (field[j].DefaultValue != null) {
					var Lookupdef = field[j].DefaultValue.split(',');
					if (Lookupdef.length > 1) {
						Item = {"Id": Lookupdef[0], "fld1":Lookupdef[1]};
					}
				}
				elm.push(["c:CAS_Lookup", {"class":vclass,"label":field[j].Label, "type":field[j].Type,"name":field[j].Name,"required":field[j].Required, "lookupid":field[j].Id, "input":field[j].DefaultValue, "Item":Item}]);
				break;
			case "currency":
				elm.push(["lightning:input", {"class":vclass, "type":"number", "formatter":field[j].Type, "step":"50.00", name:field[j].Name, "label":field[j].Label, "required":field[j].Required, "value":field[j].DefaultValue}]);
				break;	
			case "picklist":
				var options = field[j].FieldDetail.split(",");
				elm.push(["c:CAS_Select", {"selectClass":vclass,"selectLabel":field[j].Label,"type":field[j].Type,"name":field[j].Name,"selectOptions":options}]);
				break;				
			case "checkbox": 
				elm.push(["lightning:input", {"class":vclass, "type":field[j].Type, "name":field[j].Name, "label":field[j].Label,"checked":field[j].DefaultValue}]);
				break;
			case "text": 
				elm.push(["lightning:input", {"class":vclass, "type":field[j].Type, "name":field[j].Name, "label":field[j].Label, "required":field[j].Required, "value":field[j].DefaultValue}]);
				break;
			case "none":		
				elm.push(["lightning:formattedText", {"class":"slds-size--1-of-2 slds-p-horizontal_x-small", "linkify":"false", "value":""}]);
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

		       	var src = cmp.find("spinner");
     			var evt1 = src.get("e.toggle");
     			evt1.setParam("isVisible",false);
		     	evt1.fire();

		    	var cmp1 = cmp.find("recDetail");
		    	$A.util.removeClass(cmp1, "slds-hide");

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
