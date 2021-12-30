// Following with Dom's office hours direction for this homework

console.log("this is plots.js");

// Bar Chart
function DrawBarchart(sampleId) {
    console.log(`DrawBarchart(${sampleId})`);
    d3.json("samples.json").then(data => {
        //        console.log(data);

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id === sampleId);
        let result = resultArray[0];

        console.log(result);

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
        let yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();


        console.log(sample_values)

        let barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        };

        let barArray = [barData];

        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 20 }
        }

        Plotly.newPlot("bar", barArray, barLayout);
    });
}

// Bubble chart
function DrawBubblechart(sampleId) {
    //    console.log(`DrawBubblechart(${sampleId})`);
    d3.json("samples.json").then(data => {
        let samples = data.samples;
        let resultArray = samples.filter(s => s.id === sampleId);
        let result = resultArray[0];
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let graphData = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"

            },
            text: otu_labels
        };
        let bubbleArray = [graphData];
        let bubbleLayout = {
            title: "Bacteria Cultures Per Samples",
            margin: { t: 30, 1: 20 }
        }
        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    })
}
// Demgraphic Info
function ShowMetadata(sampleId) {
    //    console.log(`ShowMetadata(${sampleId})`);
    d3.json("samples.json").then(data => {
            let metadata = data.metadata;
            let filtermetadata = metadata.filter(s => s.id === +sampleId);
            //console.log(metadata);
            let result = filtermetadata[0];
            let Id = result.id;
            let ethnicity = result.ethnicity;
            let gender = result.gender;
            let age = result.age;
            let location = result.location;
            let bbtype = result.bbtype;
            let wfreq = result.wfreq;

            var ShowMetadata = d3.select(".panel-body");

            ShowMetadata.html("");
            ShowMetadata.append("p").html(
                ` id:  ${Id}<br>
            ethnicity: ${ethnicity}<br>
            gender:    ${gender}<br>
            age:       ${age}<br>
            location:  ${location}<br>
            bbtype:    ${bbtype}<br>
            wfreq:     ${wfreq}`
            );

        })

}
function optionChanged(id) {
    console.log(`optionChanged(${id})`);
    DrawBarchart(id);
    DrawBubblechart(id);
    ShowMetadata(id);
}

function InitDashboard() {
    console.log("Initialinzing Dashboard");

    let selector = d3.select("#selDataset");
    d3.json("samples.json").then(data => {
        let sampleNames = data.names;
        sampleNames.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });

        let sampleId = sampleNames[0];

        DrawBarchart(sampleId);
        DrawBubblechart(sampleId);
        ShowMetadata(sampleId);
    });
}
InitDashboard();