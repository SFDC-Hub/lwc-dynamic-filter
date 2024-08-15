# Dynamic Filter Lightning Web Component

This Lightning Web Component (LWC) provides dynamic filtering functionality for data tables in Salesforce. It generates filters based on a provided JSON configuration and allows users to filter data in the table accordingly.

## Installation

To use this component in your Salesforce org, follow these steps:

1. Clone this repository to your local machine.
2. Deploy the component to your Salesforce org using Salesforce CLI or Salesforce Extension for Visual Studio Code.
3. Use the component in your Lightning pages or Lightning communities.

## Usage

To use the Dynamic Filter component in your Salesforce org:

1. Include the component in your Lightning page or Lightning community using the following syntax:

`<c-dynamic-filter filters={filters} tdata={tableData} onfilter={handleFilter}></c-dynamic-filter>`


2. Provide the necessary attributes to the component:
   - `filters`: JSON array containing field attribute configurations for filters.
   - `tdata`: JSON array containing the original data for the table.
   - `onfilter`: Event handler for receiving filtered data from the component.

3. Handle the `onfilter` event in your JavaScript controller to receive filtered data from the component.

## Attributes

The Dynamic Filter component accepts the following attributes:

- `filters`: JSON array containing field attribute configurations for filters. Each filter object should include the following attributes:
  - `name`: API name of the field in Datatable.
  - `type`: Type of the field (text, number, picklist, date, datetime, color).
  - `label`: Label of the field in the filter.
- `tdata`: JSON array containing the original data for the table.

## Example

Here's an example of how to use the Dynamic Filter component:

```javascript
// Define filters configuration
const filters = [
    { name: 'name', type: 'text', label: 'Name' },
    { name: 'status', type: 'picklist', label: 'Status'}
];


// Handle filter event
handleFilter(event) {
    //Reassign the Table Data with filtered data:
    this.tdata = event.detail.data;
}
```

# Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.


