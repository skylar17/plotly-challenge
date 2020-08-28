// create function for data plotting
function plotting(id) {
    
    // get data from the json file
    d3.json("data/samples.json").then((data)=> {
        // console.log(data)
        
        // filter samples by id 
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        // console.log(samples);
  
        // Getting the top 10 OTUs' info
        var sampleValues = samples.sample_values.slice(0, 10).reverse();
        // console.log(`Sample Values: ${sampleValues}`)
  
        // get only top 10 OTU ids and reversing it. 
        var OTU_ten = (samples.otu_ids.slice(0, 10)).reverse();
        
        // get the otu id's to the desired form for the plot
        var OTU_id = OTU_ten.map(ids => "OTU " + ids);
        // console.log(`OTU IDS: ${OTU_id}`)
          
        // get the top 10 otu labels
        var labels = samples.otu_labels.slice(0, 10);
  


        // create the bar plot
        var trace1 = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
              color: 'rgb(100,30,50)'},
            type:"bar",
            orientation: "h",
        };

        var data1 = [trace1];
  
        var layout1 = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
  
        Plotly.newPlot("bar", data1, layout1);
      
        
        // create the buuble plot
        var trace2 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };

        var data2 = [trace2];
  
        var layout2 = {
            xaxis:{title: "OTU IDs"},
            height: 500,
            width: 1000
        };

        Plotly.newPlot("bubble", data2, layout2); 
  
    });
}  



// create the function for demographic panel
function getInfo(id) {

    // get data from the json file
    d3.json("data/samples.json").then((data)=> {
        
        // get the metadata info
        var metadata = data.metadata;
        // console.log(metadata)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");
        
        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // grab data for the id input and append the info to the panel
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// create the function for the change event
function change(id) {
    plotting(id);
    getInfo(id);
}

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data
        plotting(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();