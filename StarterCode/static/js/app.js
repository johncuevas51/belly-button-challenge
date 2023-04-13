
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function (data) {
    console.log(data);
});

// explanation of init -- This code defines a function called init that populates a dropdown menu on an HTML page with options generated from a list or array called names.
function init() {
    // Populate the dropdown from the list/array
    selector = d3.select("#selDataset");
    d3.json(url).then(function (data) {
        const names = data.names;
        for (let i = 0; i < names.length; i++) {
            //console.log(countries[names[i]])
            selector.append("option").text(names[i]).property("value", names[i]);
        }
        buildChart(names[0])
        buildMetaData(names[0])
    });
}

init()

// code to build bar chart
function buildChart(sampleID){
    d3.json(url).then(function (data) {
        const samples = data.samples
        const resultArray = samples.filter(sample => sample.id==sampleID)
        const result = resultArray[0]

        const otuIDs = result.otu_ids
        const otuLabels = result.otu_labels
        const sampleValues = result.sample_values

        //build trace. needs to be within function buildchart
        trace = {
                  x: sampleValues.slice(0,10).reverse(),
                  y: otuIDs.slice(0,10).map(x => "OTUID "+ x).reverse(),
                  text: otuLabels.slice(0,10).reverse(),
                  type: "bar",
                  orientation: 'h'

              };

        let layout = {
          title: "Top 10 OTUs found",
          
          };

        Plotly.newPlot("bar",[trace],layout);

// Bubble Chart
        var trace1 = {
            x: otuIDs,
            y: sampleValues,
            mode: 'markers',
            marker: {
                color: otuIDs,
                size: sampleValues,
                colorscale: 'Viridis'
                },
            text : otuLabels
        };
        
        var data = [trace1];
        
        let layout2 = {
            xaxis: { title: 'OTU ID' },
            yaxis: { title: 'Sample Values' }
        };
        
        Plotly.newPlot('bubble', data, layout2);

            });
        }

// for meta data 
function buildMetaData(sampleID){
    d3.json(url).then(function (data) {
        const metaData = data.metadata
        const resultArray = metaData.filter(sample => sample.id==sampleID)
        const result = resultArray[0]
        const panel = d3.select("#sample-metadata");
        panel.html("")
        for (key in result){
            panel.append("p").text(key + ": " + result[key])
        }
    });
}

function optionChanged(newSample){
    buildChart(newSample)
    buildMetaData(newSample)

}










