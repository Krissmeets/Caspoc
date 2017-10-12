({
   
    jsNavigateHome : function(cmp, evt, hlp) {
		var sObjectName = cmp.get("v.sObjectName");

		var e1 = $A.get("e.force:navigateToObjectHome");
    	e1.setParams({"scope":sObjectName});
    	e1.fire();

    },
    jsSelectTemplate : function(cmp, evt, hlp) {
    	var sTmp = cmp.find("CASTemplate").get("v.value");
    	alert("selected:" + sTmp);

    	var e = cmp.getEvent("SelectTemplateEvent");
    	e.setParams({"Template": sTmp});
    	e.fire();

    }
})
