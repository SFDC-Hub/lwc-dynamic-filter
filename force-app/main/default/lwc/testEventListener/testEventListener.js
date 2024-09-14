import { LightningElement } from 'lwc';
export default class TestEventListener extends LightningElement {

    _handler;
    connectedCallback() {
        console.log('Cache copy 8');
        // document.addListener(e => console.log("Some Event", e), "button");
        document.addEventListener("click", e => console.log("Calling brand button"), "slds-button_brand");
        document.addEventListener("click", e => this.refreshPage(e), "button");
        // document.addEventListener('click', (e) => this.close());
        // // document.addEventListener('click', this._handler = this.close().bind(this));
        // document.addEventListener('click', function(e) {
        //     // if(e.target.name == "SaveEdit") {
        //         console.log(JSON.stringify(e.target));
        //         // this code will be executed only when elements with class 
        //         // 'myclass' are clicked on
        //         console.log("Save Event Called");
        //     // }
        // });
    }

    refreshPage(e){
        console.log('Event called');
        console.log(e.target);
        console.log(e.details);
    }

    disconnectedCallback() {
        document.removeEventListener('click', this._handler);
    }

    ignore(event) {
        event.stopPropagation();
        return false;
    }
    
    close(e) { 
        // console.log(JSON.stringify(e.target));
        console.log('we should close now');
        // console.log()
    }
}