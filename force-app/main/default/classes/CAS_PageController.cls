public with sharing class CAS_PageController {
//##################################
//
// DISCLAIMER 
// Code comes with not warranty, has not passed security review and is provided as is
// Date: November 2017
// Contact: ksmeets@salesforce.com
//
//##################################
 
/*
force:data:tree:export

sfdx force:data:tree:export -q "SELECT Id, Name, Object__c, Page_columns__c, Sequence__c,(SELECT Id, Name, Page_Template__c, Default__c, Field_Detail__c, Label__c, Lookup_Field__c, Lookup_Limit__c, Lookup_Object__c, Required__c, Sequence__c, Type__c FROM CAS_Page_Details__r) FROM CAS_Page_Template__c" -p -d data/

*/

    public class clTemplate {
        @AuraEnabled public String Id;
        @AuraEnabled public String Name;
    	@AuraEnabled public String Label;
    	@AuraEnabled public String Type;
    	@AuraEnabled public String DefaultValue;
        @AuraEnabled public String FieldDetail;

    	@AuraEnabled public Boolean Required;

    	public clTemplate(string v0, string v1, string v2, string v3, string v4, string v5, boolean v6) {
    		Id = v0;
            Name = v1;
    		Label = v2;
    		Type = v3;
    		DefaultValue = v4;
            FieldDetail = v5;
    		Required = v6;
    	}
    }

	@AuraEnabled
    public static List<clTemplate> LoadTemplateDetail(string v_object, string v_template) {
    	List<clTemplate> ret = new list<clTemplate>();

		for (CAS_Page_Detail__c fso: 	[SELECT Name, Type__c, Default__c, Required__c, Label__c, Field_Detail__c
							FROM CAS_Page_Detail__c
							WHERE Page_Template__r.Object__c = :v_object
							AND Page_Template__r.Name = :v_template
							ORDER BY Sequence__c]) {
	
		   	clTemplate tmp = new clTemplate(fso.id,
                                            fso.Name, 
                                            fso.Label__c, 
                                            fso.Type__c, 
                                            fso.Default__c,
                                            fso.Field_Detail__c,
                                            fso.Required__c);
	    	ret.add(tmp);

		}
 
    	return ret;

    }


	@AuraEnabled
    public static List<string> LoadTemplates(string v_object) {
    	List<string> ret = new list<string>();

    	for (sobject fso : [select Name,Page_columns__c 
    						from CAS_Page_Template__c 
    						where Object__c = :v_object
    						order by Sequence__c]) {
    		ret.add((string) fso.get('Name'));

    	}
    	if (ret.size() == 0) ret.add('NO TEMPLATES');
    	return ret;
    }


}
