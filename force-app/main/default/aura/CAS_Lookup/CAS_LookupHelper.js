({
    
    setActive : function (cmp, searchkey) {

        if (searchkey == null || searchkey == "") searchkey = '__RecentlyViewed__';
      	this.requestData(cmp, searchkey);

        if ((cmp.get("v.expanded") =="false") ) {
            cmp.set("v.expanded", "true");    

            var cmp1 = cmp.find("combobox_container");
            $A.util.addClass(cmp1, "slds-has-input-focus");
            
            var cmp2 = cmp.find("combobox");
            $A.util.addClass(cmp2, "slds-is-open");
        }        

    },
	requestData : function(cmp, searchkey) {
        if (!$A.util.isUndefined(cmp.get("v.msoRecords")[searchkey])) {
        
            var ret = cmp.get("v.msoRecords")[searchkey];
   			cmp.set("v.lRecords",ret);
        } else {
            var apex = cmp.get("c.fnRequestData");
        
            apex.setParams({
                'lookupid' : cmp.get("v.lookupid"),
                'searchkey' : searchkey
            });
            apex.setCallback(this, function (res) {

                
                if (res.getState() == "SUCCESS") {
                    var lso = res.getReturnValue();
                                          
                    var mso = cmp.get("v.msoRecords");
                    mso[searchkey] = lso;
                    cmp.set("v.lRecords",lso);

                }
            }
		                
                     
           );
    		$A.enqueueAction(apex);	
		};
         
	}
})