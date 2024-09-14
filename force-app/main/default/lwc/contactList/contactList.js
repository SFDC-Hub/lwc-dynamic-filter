import { LightningElement, wire } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import LS_FIELD from '@salesforce/schema/Contact.LeadSource';
import EMAILOPT_FIELD from '@salesforce/schema/Contact.HasOptedOutOfEmail';
import getContacts from '@salesforce/apex/ContactController.getContacts';

const COLUMNS = [
    { label: 'First Name', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Last Name', fieldName: LASTNAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Email', fieldName: EMAIL_FIELD.fieldApiName, type: 'text' },
    { label: 'Lead Source', fieldName: LS_FIELD.fieldApiName, type: 'text' },
    { label: 'Email Preference', fieldName: EMAILOPT_FIELD.fieldApiName, type: 'checkbox' }
];
export default class ContactList extends LightningElement {
    columns = COLUMNS;
    contacts;
    // filters = [
    //     { label: 'Name', type: 'text', api: NAME_FIELD.fieldApiName},
    //     { label: 'Last Name', type: 'text', api: LASTNAME_FIELD.fieldApiName},
    //     { label: 'Email', type: 'text', api: EMAIL_FIELD.fieldApiName},
    //     { label: 'Lead Source', type: 'picklist', api: LS_FIELD.fieldApiName},
    //     { label: 'Email Preference', type: 'picklist', api: EMAILOPT_FIELD.fieldApiName}
    // ];
    filters = COLUMNS;
    
    @wire(getContacts)
    wireContacts({data, error}){
        if(data){
            this.contacts = data; 
        }
    };

    handleFilter(event){
        this.contacts = event.detail.data;
    }
}