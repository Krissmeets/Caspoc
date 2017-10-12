({
	jsInit : function(cmp) {

		var aLoadTemplate = cmp.get("c.LoadTemplates")
		var sObjectName = cmp.get("v.sObjectName");

		console.log('LOG:' + sObjectName);
		
		//### Retrieve the available templates
		aLoadTemplate.setParams({v_object:sObjectName});
		aLoadTemplate.setCallback(this, function(res) {
			var sState = res.getState(); 
			if ( sState == "SUCCESS") {
				cmp.set("v.TemplateValues",res.getReturnValue());
				cmp.find("CASTemplate").set("v.value", res.getReturnValue()[0]);
			} else {
				alert("Error Loading Templates:" + sState);

			}

		})
		$A.enqueueAction(aLoadTemplate);

	}

})