import { LightningElement, api } from 'lwc';
import getRecords from '@salesforce/apex/DynamicDatatableHandler.getRecords';

export default class DynamicDatatable extends LightningElement {
    @api objectName;
    @api fields;
    @api columns;
    @api filterCriteria;
    @api filters;
    data;
    
    // columns;

    connectedCallback(){
        this.columns = (typeof this.columns == "string"?this.getParsed(this.columns):this.columns);
        this.filters = ((typeof this.filters == "string")?this.getParsed(this.filters):this.filters);
        // console.log(typeof this.objectName);
        getRecords({objectName:this.objectName, fields:this.fields, filterCriteria : this.filterCriteria})
        .then(res=>{
            console.log('Result',res[0]);
            this.data = res;
        })
        .catch(err=>{
            console.log("An error occurred while fetching the records", err);
        })

    }

    get filtersData(){
        return (this.filters != undefined && this.data != undefined)?this.filters:false;
    }

    getParsed(val){
        if(val != undefined){
            let json = val.replace(/([a-zA-Z0-9]+?):/g, '"$1":').replace(/'/g, '"');
            return (JSON.parse(json));
        }
    }

    handleFilter(event){
        this.data = event.detail.data;
    }
}