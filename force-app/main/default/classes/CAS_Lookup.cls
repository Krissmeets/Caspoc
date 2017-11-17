public with sharing class CAS_Lookup {

//##################################
//
// DISCLAIMER 
// Code comes with not warranty, has not passed security review and is provided as is
// Date: November 2017
// Contact: ksmeets@salesforce.com
//
//##################################

	
    public class clitem {
	    @AuraEnabled public  String Id;
	    @AuraEnabled public  String fld1;
	    @AuraEnabled public  String fld2;
	    @AuraEnabled public  String fld3;
        
        public clitem(string v1, string v2, string v3, string v4) {
            Id = v1;
            fld1 = v2;
            fld2 = v3;
            fld3 = v4;
        }
    }
    
    @AuraEnabled
    public static list<clitem> fnRequestData(string lookupid, string searchkey) {
        list<clitem> lcl = new list<clitem>();
        set<id> sid = new set<id>();
        string sQuery;
            
        string objectname;
        string filter;
        string orderby;
        string[] fields;
     
        CAS_Page_Detail__c soPageDetail = [SELECT Lookup_Object__c, Field_Detail__c, Lookup_Field__c, Lookup_Limit__c
                                 FROM CAS_Page_Detail__c
                                 WHERE id = :lookupid];
        if (soPageDetail != null) {
            objectname = soPageDetail.Lookup_Object__c;
            filter = soPageDetail.Field_Detail__c;
            fields = soPageDetail.Lookup_Field__c.split(',');
            orderby = '';

            if (searchkey.compareTo('__RecentlyViewed__') == 0) {
              	for (sobject fso : [select id 
                                    from RecentlyViewed 
                                    where type = :objectname order by lastvieweddate desc limit 10]) sid.add(fso.id);
                if (!sid.isEmpty()) {  	
                    sQuery = 'Select ' + string.join(fields, ',') + ' from ' + objectname;
                    sQuery += ' where id in :sid order by Createddate desc';
                }
                else {
                    sQuery = 'Select ' + string.join(fields, ',') + ' from ' + objectname;
                    sQuery += ' order by Createddate desc limit 10';
            	}        
                
            } else {
                
                sQuery = 'Select ' + string.join(fields, ',') + ' from ' + objectname;
                sQuery += ' where ' + fields[0] + ' like '+ '\'%' + searchkey + '%\'';
                sQuery += ((filter != null && filter != '')  == true ? ' and ' + filter : '');
                sQuery += ' order by ' + ((orderby != null && orderby != '')  == true ? orderby: 'Createddate desc');
                sQuery += ' limit 10';
            }

       		if (fields.size() < 4) {
               for (integer i=0;i<4-(fields.size());i++) fields.add(null);
         	}
   
       	    try {
                       
                for (sobject fso : Database.query(SQuery) ) {
     
                    lcl.add( new clitem((string) fso.get('id'),
                        			   (string) fso.get(fields[0]),
                        			    fields[1] == null ? null : (string) fso.get(fields[1]),
                        			    fields[2] == null ? null : (string) fso.get(fields[2]))
                    );
                }
            
            } catch (Exception e) {
        	
                lcl.add(new clitem('Exception', e.getMessage(),e.getStackTraceString(),sQuery));
            }
        }
        else {  lcl.add(new clitem('Invalid Lookup Definition', lookupid,'','')); }

        return lcl;      
    }


}
