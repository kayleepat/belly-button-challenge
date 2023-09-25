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
        var selectedSample = data.samples.find(sample => sample.id === selectedId)
        var selectedSubject = data.metadata.find(subject => subject.id === parseInt(selectedId))

        var sampleValues = selectedSample.sample_values
        var otuIds = selectedSample.otu_ids
        var otuLabels = selectedSample.otu_labels

        updateBarChart(sampleValues, otuIds, otuLabels)
        updateBubbleChart(sampleValues, otuIds, otuLabels)
        updateMetadata(selectedSubject)
    })

}

function updateBarChart(sampleValues, otuIds, otuLabels) {

    var data = [{
        x: sampleValues.slice(0,10).reverse(),
        y: otuIds.slice(0,10).map(id => `OTU ${id}`).reverse(),
        text: otuLabels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
    }]

    Plotly.newPlot("bar", data)

}

function updateBubbleChart(sampleValues, otuIds, otuLabels) {

    var data = [{
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
            size: sampleValues,
            color: otuIds
        }
    }]

    Plotly.newPlot("bubble", data)

}

function updateMetadata(selectedSubject) {
    var subjectId = selectedSubject.id
    var subjectEthnicity = selectedSubject.ethnicity
    var subjectGender = selectedSubject.gender
    var subjectAge = selectedSubject.age
    var subjectLocation = selectedSubject.location
    var subjectBbtype = selectedSubject.bbtype
    var subjectWfreq = selectedSubject.wfreq
    
    // console.log(subjectAge)
    // console.log(selectedSubject)
}

init()