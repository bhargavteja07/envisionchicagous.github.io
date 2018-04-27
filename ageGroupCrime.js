function makeplot() {
  console.log("hello")
  
  Plotly.d3.csv("/Users/bhargavarisetty/Downloads/Envision-Chicago-WebApplication-master/data/query_3_result.csv", function(data){ processDataCrimesAge(data) } );

};


function processDataCrimesAge(allRows) {

  var checkboxes = document.getElementsByName("crimeBx");
  
  dict = {};
  batteryDict = {};
  assaultDict = {};
  sexOffDict = {};

  for (var i=0; i<allRows.length; i++) {
    row = allRows[i];

    if (dict[row["Age Group"]] == NaN || dict[row["Age Group"]] == null){
        dict[row["Age Group"]] = +row['#Crimes']; 
      
    }
    else{
          dict[row["Age Group"]] = dict[row["Age Group"]] + +row['#Crimes']; 
        
    }
    
    if (batteryDict[row["Age Group"]] == NaN || batteryDict[row["Age Group"]] == null){        
      if (row["Crime Type"].toLowerCase().includes(checkboxes[0].labels[0].textContent.trim().toLowerCase())){
        batteryDict[row["Age Group"]] = +row['#Crimes']; 
      }
    }
    else{        
        if (row["Crime Type"].toLowerCase().includes(checkboxes[0].labels[0].textContent.trim().toLowerCase())){
          batteryDict[row["Age Group"]] = batteryDict[row["Age Group"]] + +row['#Crimes']; 
        }
    }

    if (assaultDict[row["Age Group"]] == NaN || assaultDict[row["Age Group"]] == null){        
        if (row["Crime Type"].toLowerCase().includes(checkboxes[1].labels[0].textContent.trim().toLowerCase())){
            assaultDict[row["Age Group"]] = +row['#Crimes']; 
          }
      }
    else{        
        if (row["Crime Type"].toLowerCase().includes(checkboxes[1].labels[0].textContent.trim().toLowerCase())){
            assaultDict[row["Age Group"]] = assaultDict[row["Age Group"]] + +row['#Crimes']; 
          }
      }

      if (sexOffDict[row["Age Group"]] == NaN || sexOffDict[row["Age Group"]] == null){        
        if (row["Crime Type"].toLowerCase().includes(checkboxes[2].labels[0].textContent.trim().toLowerCase())){
            sexOffDict[row["Age Group"]] = +row['#Crimes']; 
          }
      }
      else{        
        if (row["Crime Type"].toLowerCase().includes(checkboxes[2].labels[0].textContent.trim().toLowerCase())){
            sexOffDict[row["Age Group"]] = sexOffDict[row["Age Group"]] + +row['#Crimes']; 
          }
        }
    }

    x=[],y=[],standard_deviation=[],x1=[],y1=[],x2=[],y2=[],x3=[],y3=[];
    for (var i in dict) {    
      x.push(i);
      y.push(dict[i]);
  }
  for (var i in batteryDict) {    
    x1.push(i);
    y1.push(batteryDict[i]);
}

for (var i in assaultDict) {    
    x2.push(i);
    y2.push(assaultDict[i]);
}


for (var i in sexOffDict) {    
    x3.push(i);
    y3.push(sexOffDict[i]);
}

  
var allCrimes = {
    x: x,
    y: y,
    mode: 'lines+markers',
    type: 'scatter',
    name: 'All Crimes'    
  };
  
  var batteryCrimes = {
    x: x1,
    y: y1,
    mode: 'lines+markers',
    type: 'scatter',
    name: 'Robbery'        
  };
  
  var assaultCrimes = {
    x: x2,
    y: y2,
    mode: 'lines+markers',
    type: 'scatter',
    name: 'Assault'    
    
  };

  var soffCrimes = {
    x: x3,
    y: y3,
    mode: 'lines+markers',
    type: 'scatter',
    name: 'Theft'        
  };
  
  data=[]
  data.push(allCrimes);
     if (checkboxes[0].checked) {
        data.push(batteryCrimes);
     }
     if (checkboxes[1].checked) {
        data.push(assaultCrimes);
     }
     if (checkboxes[2].checked) {
        data.push(soffCrimes);
     }

     var layout = {
        title: 'Crimes against Age Groups',
        xaxis: {
          title: 'Age Groups',
          titlefont: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        },
        yaxis: {
          title: 'Number Of Crimes',
          titlefont: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        }
      };
  



  //var data = [allCrimes, batteryCrimes, assaultCrimes,soffCrimes];
  
  Plotly.newPlot('xyx', data, layout);

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

makeplot();