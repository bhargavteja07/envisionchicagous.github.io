function makeplot1() {
  console.log("hello")
  
  return Plotly.d3.csv("data/query_4_result.csv", function(data){ processData1(data) } );

};


function fetchTraces(allRows,inspRes){
    r1 =0, r2 =0, r3 =0, r4 =0, r5 =0;
    r1Tot =0, r2Tot =0, r3Tot =0, r4Tot =0, r5Tot =0;
    for (var i=0; i<allRows.length; i++) {
      row = allRows[i]; 
      perc_pass = ((+row[inspRes])/(+row["#Pass"] + +row["#Failed Inspection"] + +row["#Conditional"]))*100;    
      if (row["Average Yelp Review"] == 1.0){
        r1 = r1 + perc_pass
        r1Tot++;
      }
      if (row["Average Yelp Review"] == 2.0){
        r2 = r2 + perc_pass
        r2Tot++;
      }
      if (row["Average Yelp Review"] == 3.0){
        r3 = r3 + perc_pass
        r3Tot++;
      }
      if (row["Average Yelp Review"] == 4.0){
        r4 = r4 + perc_pass
        r4Tot++;
      }
      if (row["Average Yelp Review"] == 5.0){
        r5 = r5 + perc_pass
        r5Tot++;
      }
    }
    r1 = r1/r1Tot;
    r2 = r2/r2Tot;
    r3 = r3/r3Tot;
    r4 = r4/r4Tot;
    r5 = r5/r5Tot;
  
    var trace1 = {
      x: [2, 3, 4, 5],
      y: [r2,r3,r4,r5],
      name: inspRes,
      mode: 'lines+markers',
      type: 'scatter'
    };
  
    return trace1;
}

function processData1(allRows) {
  
  //var data = [trace1];
  
  //Plotly.newPlot('myDiv', data);
  passTrace = fetchTraces(allRows,"#Pass");
  condPassTrace = fetchTraces(allRows,"#Conditional");
  failedTrace = fetchTraces(allRows,"#Failed Inspection");

  var checkboxes = document.getElementsByName("inspectionBx");
  

  data=[]
  data.push(passTrace);
     if (checkboxes[0].checked) {
        data.push(failedTrace);
     }
     if (checkboxes[1].checked) {
        data.push(condPassTrace);
     }
     

     var layout = {
        title: 'Inspection Result Against Average Review Rating',
        xaxis: {
          title: 'Restaurant Ratings',
          titlefont: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        },
        yaxis: {
          title: 'Percentage',
          titlefont: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        }
      };
  



  //var data = [allCrimes, batteryCrimes, assaultCrimes,soffCrimes];
  
  Plotly.newPlot('inspPlot', data, layout);


}  
  

function makePlotly( x, y, standard_deviation ){
  var plotDiv = document.getElementById("plot");
  var traces = [{
      x: x, 
      y: y
  }];

  Plotly.newPlot('xyx', traces, 
      {title: 'Plotting CSV data from AJAX call'});
};

    


makeplot1()