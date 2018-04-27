function q10makeplot() {
  console.log("hello")
  
  Plotly.d3.csv("data/query_10_csv.csv", function(data){ qury_10_map(data) } );

};

function qury_10_map(allRows){
    dict = {};
    for (var i=0; i<allRows.length; i++) {
      row = allRows[i];
      if (dict[+row["MeanTemperature"]] == NaN || dict[+row["MeanTemperature"]] == null){
          dict[+row["MeanTemperature"]] = 1; 
        }
        else{
            dict[+row["MeanTemperature"]] = dict[+  row["MeanTemperature"]] + 1; 
        }
      }
      for (var i in dict) {    
        x.push(i);
        y.push(dict[i]);
    }
    var traces = [{
        x: x, 
        y: y
    }];
  
    var layout = {
      title: 'Crimess wrt Weather',
      xaxis: {
        title: 'Mean Temperature',
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
      yaxis: {
        title: 'No of Crimes',
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      }
    };
  
    Plotly.newPlot('q10Plot', traces, layout);

}

q10makeplot();