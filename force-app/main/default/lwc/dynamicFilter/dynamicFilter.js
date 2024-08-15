import { LightningElement, api } from 'lwc';
export default class DynamicFilter extends LightningElement {
    @api filters;
    @api tdata;
    originalTdata;

    connectedCallback() {
        this.originalTdata = JSON.parse(JSON.stringify(this.tdata));
        this.filters = JSON.parse(JSON.stringify(this.filters));
        this.filters.forEach(item => {
            item[item.type] = true;
            if (item.type == 'text' || item.type == 'number' || item.type == 'tel' || item.type == 'date' || item.type == 'datetime' || item.type == 'color') {
                item.stdIp = true;
            }
            if (item.type == 'picklist') {
                item.options = [];
            }
        });

        this.originalTdata.forEach(item => {
            this.filters.forEach(filter => {
                if (filter.type === 'picklist') {
                    const value = item[filter.name];
                    if (!filter.options.includes(value) && value != null) {
                        filter.options.push(value);
                    }
                }
            });
        });

        this.filters.forEach(filter => {
            if (filter.type === 'picklist') {
                filter.options.sort();
                filter.options = [{ label: '-Select-', value: null }].concat(filter.options.map(item => ({ label: String(item), value: String(item) })));
            }
        });
    }

    handleChange(event) {
        this.filters.find(filter => filter.name === event.target.name).value = event.target.value;
        this.filterData();
    }

    filterData() {
        let data = this.originalTdata.filter(item => {
            return this.filters.every(filter => {
                if (!filter.value) {
                    return true;
                }
                if (filter.type == 'text' || filter.type == 'number' || filter.type == 'tel') {
                    return String(String(item[filter.name])).toLowerCase().includes(String(filter.value).toLowerCase());
                } else if (filter.type == 'picklist' || filter.type == 'date' || filter.type == 'datetime' || filter.type == 'color') {
                    return String(item[filter.name]) == (filter.value);
                }
            });
        });
        this.sendData(data);
    }

    sendData(data) {
        this.dispatchEvent(new CustomEvent('filter', { detail: { data } }));
    }

    resetFilters() {
        this.filters.forEach(filter => {
        if (filter.type == 'text') {
                filter.value = '';
            }
            if (filter.type == 'picklist') {
                filter.value = null;
            }
        });

        let textInputs = this.template.querySelectorAll('lightning-input');
        textInputs.forEach(input => {
            input.value = '';
        });
        let picklistInputs = this.template.querySelectorAll('lightning-combobox');
        picklistInputs.forEach(input => {
            input.value = null;
        });

        this.filters = JSON.parse(JSON.stringify(this.filters));
        this.sendData(this.originalTdata);
    }
}
