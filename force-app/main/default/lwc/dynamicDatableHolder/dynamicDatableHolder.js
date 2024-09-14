import { LightningElement } from 'lwc';
export default class DynamicTableHolder extends LightningElement {
    objectName = "Contact";
    fields = "FirstName, LastName, Email, LeadSource, HasOptedOutOfEmail";
    columns = [  { label: 'First Name', fieldName: "FirstName", type: 'text' },  { label: 'Last Name', fieldName: "LastName", type: 'text' },  { label: 'Email', fieldName: "Email", type: 'text' },  { label: 'Lead Source', fieldName: "LeadSource", type: 'text' },  { label: 'Email Preference', fieldName: "HasOptedOutOfEmail", type: 'checkbox' }];
    filters = [  { label: 'First Name', fieldName: "FirstName", type: 'text' },  { label: 'Last Name', fieldName: "LastName", type: 'text' },  { label: 'Email', fieldName: "Email", type: 'text' },  { label: 'Lead Source', fieldName: "LeadSource", type: 'picklist' },  { label: 'Email Preference', fieldName: "HasOptedOutOfEmail", type: 'picklist' }];
    // filters = this.columns;
}