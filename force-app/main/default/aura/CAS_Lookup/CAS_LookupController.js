({


    jsInit : function(cmp, evt, hlp) {
        hlp.requestData(cmp,'__RecentlyViewed__');
        var cmp1 = cmp.find("main");

        console.log ("CLASS:" + cmp.get("v.class"));
        $A.util.addClass(cmp1,cmp.get("v.class"));

      //  cmp.set("v.input","TESTING");

    },
   
	jsActive : function(cmp, evt, hlp) {

       	hlp.setActive(cmp, null);   
 	},
    jsInactive : function (cmp, evt, hlp) {
 		var cmp1 = cmp.find("combobox_container");
        $A.util.removeClass(cmp1, "slds-has-input-focus");                
        
  		var cmp2 = cmp.find("combobox");
        $A.util.removeClass(cmp2, "slds-is-open");
        
        cmp.set("v.expanded", "false");
           
    },
    
    jsItemSelect : function(cmp, evt, hlp) {

 		var cmp1 = cmp.find("combobox_container");
        $A.util.removeClass(cmp1, "slds-has-input-focus");                
    
		var cmp2 = cmp.find("combobox");
        $A.util.removeClass(cmp2, "slds-is-open");
        
        var cmp3 = cmp.find("lookup1");
        $A.util.removeClass(cmp3, "slds-is-open");
        $A.util.addClass(cmp3, "slds-hide");
        
        var cmp4 = cmp.find("lookup2");
        $A.util.removeClass(cmp4, "slds-hide");

        cmp.set("v.expanded", "false");
        
        var item = evt.getParam("Item");
       	cmp.set("v.Item", item);
        cmp.set("v.lRecords",[]);


    },
    	jsClear : function(cmp, evt, hlp) {
		  
        var cmp3 = cmp.find("lookup1");
        $A.util.removeClass(cmp3, "slds-hide");
        
        var cmp4 = cmp.find("lookup2");
        $A.util.addClass(cmp4, "slds-hide");    

	},
    
    jsKeyPress : function(cmp, evt, hlp) {
       var src = evt.getSource();
              
        if (evt.getParam('keyCode') == 27) {
            src.set("v.value","");
            cmp.set("v.lRecords",[]);  
            cmp.set("v.expanded", "false");
            
            var cmp1 = cmp.find("combobox_container");
            $A.util.removeClass(cmp1, "slds-has-input-focus");
            
            var cmp2 = cmp.find("combobox");
            $A.util.removeClass(cmp2, "slds-is-open");
               
        } else {
        	hlp.setActive(cmp, src.get("v.value"));   
       
        }        
    }
})