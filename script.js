function makeplot2() {
  console.log("hello")
  
  Plotly.d3.csv("/Users/bhargavarisetty/Downloads/Envision-Chicago-WebApplication-master/data/query_6_result.csv", function(data){ processDataSentiments(data) } );

};


function processDataSentiments(allRows) {
  dict = {"positive":0,"negative":0,"neutral":0};
  posTot = 0, negTot =0, neutralTot = 0;
  for (var i=0; i<allRows.length; i++) {
    row = allRows[i];
    if (row["average sentiments"] == "positive"){
      dict["positive"] = dict["positive"] + +row['rating_y']
      posTot++;
    }
    if (row["average sentiments"] == "negative"){
      dict["negative"] = dict["negative"] + +row['rating_y']
      negTot++;
    }    
  }
  dict["positive"] = dict["positive"]/posTot
  dict["negative"] = dict["negative"]/posTot
  var data = [
    {
      x: ['positive', 'negative'],
      y: [dict["positive"], dict["negative"]],
      type: 'bar'
    }
  ];

  var layout = {
    title: 'Average reviews against sentiments',
    xaxis: {
      title: 'Sentiment',
      titlefont: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    },
    yaxis: {
      title: 'Revie Rating',
      titlefont: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    }
  };
  
  Plotly.newPlot('revRatPlot', data, layout);
}

function processDataCrimesAge(allRows,crimeType) {
  dict = {};
  for (var i=0; i<allRows.length; i++) {
    row = allRows[i];
    if (dict[row["Age Group"]] == NaN || dict[row["Age Group"]] == null){
      if (row["Crime Type"] == crimeType){
        dict[row["Age Group"]] = +row['#Crimes']; 
      }
    }
    else{
      if (row["Crime Type"] == crimeType){
        dict[row["Age Group"]] = dict[row["Age Group"]] + +row['#Crimes']; 
      }
    }
  }
  x=[],y=[],standard_deviation=[];
  for (var i in dict) {    
    x.push(i);
    y.push(dict[i]);
}
console.log( 'X',x, 'Y',y, 'SD',standard_deviation );
makePlotly( x, y, standard_deviation );
}

function processDataBiz(allRows) {
  dict = {};
  for (var i=0; i<allRows.length; i++) {
    row = allRows[i];
    if (dict[Math.round(row["Alive for x years"])] == NaN || dict[Math.round(row["Alive for x years"])] == null){
      dict[Math.round(row["Alive for x years"])] = 1;
    }
    else{
    dict[Math.round(row["Alive for x years"])] = dict[Math.round(row["Alive for x years"])] + 1; 
    }
  }
  x=[],y=[],standard_deviation=[];
  for (var i in dict) {    
    x.push(i);
    y.push(dict[i]);
}
console.log( 'X',x, 'Y',y, 'SD',standard_deviation );
makePlotly( x, y, standard_deviation );

}

function processData1(allRows) {
  r1 =0, r2 =0, r3 =0, r4 =0, r5 =0;
  r1Tot =0, r2Tot =0, r3Tot =0, r4Tot =0, r5Tot =0;
  for (var i=0; i<allRows.length; i++) {
    row = allRows[i]; 
    perc_pass = ((+row["#Failed Inspection"])/(+row["#Pass"] + +row["#Failed Inspection"] + +row["#Conditional"]))*100;    
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
    mode: 'lines+markers',
    type: 'scatter'
  };

  var data = [trace1];
  
  //Plotly.newPlot('myDiv', data);


}  
  
function processData(allRows) {

  console.log(allRows);

  r1 = [], r2 = [], r3 = [], r4 = [], r5 = [];

  //var x = [], y = [], standard_deviation = [];

  for (var i=0; i<allRows.length; i++) {
      row = allRows[i];
      perc_pass = ((+row["#Pass"])/(+row["#Pass"] + +row["#Failed Inspection"] + +row["#Conditional"]))*100;
      console.log(perc_pass);
      r1.push(perc_pass);
      if (row["Average Yelp Review"] == 1.0){
        r1.push(perc_pass);        
      }
      if (row["Average Yelp Review"] == 2.0){
        r2.push(perc_pass);        
      }
      if (row["Average Yelp Review"] == 3.0){
        r3.push(perc_pass);        
      }
      if (row["Average Yelp Review"] == 4.0){
        r4.push(perc_pass);        
      }
      if (row["Average Yelp Review"] == 5.0){
        r5.push(perc_pass);        
      }        
      //x.push( row['AAPL_x'] );
      //y.push( row['AAPL_y'] );
  }
  var trace1 = {
    y: r1,
    type: 'box'
  };
  
  var trace2 = {
    y: r2,
    type: 'box'
  };

  var trace3 = {
    y: r3,
    type: 'box'
  };

  var trace4 = {
    y: r4,
    type: 'box'
  };

  var trace5 = {
    y: r5,
    type: 'box'
  };
  
  var data = [trace1, trace2, trace3, trace4,  trace5];
  
  Plotly.newPlot('myDiv', data);
  
  //console.log( 'X',x, 'Y',y, 'SD',standard_deviation );
  //makePlotly( x, y, standard_deviation );
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
makeplot2();