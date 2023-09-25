let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function init() {
    d3.json(url).then(function(data) {
        loadIds()
        loadData(data.samples[0].id)
    })
}

function loadIds() {
    d3.json(url).then(function(data) {
        var subjectIds = data.names

        var dropdown = d3.select("#selDataset")

        subjectIds.forEach(id => {
            dropdown.append("option").text(id).attr("value", id)
        });
    })
}

function loadData(selectedId) {
    d3.json(url).then(function(data) {
        // console.log(data)

        var selectedSample = data.samples.find(sample => sample.id === selectedId)
        
        var sampleValues = selectedSample.sample_values.slice(0,10).reverse()
        var otuIds = selectedSample.otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse()
        var otuLabels = selectedSample.otu_labels.slice(0,10).reverse()

        var data = [{
            x: sampleValues,
            y: otuIds,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        }]
    
        Plotly.newPlot("bar", data)
    })
}

init()