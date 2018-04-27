function makeplot3() {
  console.log("hello")
  
  Plotly.d3.csv("data/query_8_result.csv", function(data){ processDataBiz(data) } );

};



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

function makePlotly( x, y, standard_deviation ){
  var plotDiv = document.getElementById("plot");
  var traces = [{
      x: x, 
      y: y
  }];

  var layout = {
    title: 'Business Viablility',
    xaxis: {
      title: 'Years survived after failed inspection',
      titlefont: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    },
    yaxis: {
      title: 'Number Of Restaurants',
      titlefont: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    }
  };

  Plotly.newPlot('bizPlot', traces, layout);
};
makeplot3();