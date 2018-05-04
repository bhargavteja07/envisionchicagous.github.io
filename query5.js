function makeplotTotRat() {
  console.log("hello1")
  
  Plotly.d3.csv("data/query_5_result.csv", function(data){
     processDataSentiments1(data) 
    });
};


function processDataSentiments1(allRows) {
  dict = {"positive":0,"negative":0,"neutral":0};
  posTot = 0, negTot =0, neutralTot = 0;
  pos_senti = {1:0,2:0,3:0,4:0,5:0}
  neg_senti = {1:0,2:0,3:0,4:0,5:0}
  for (var i=0; i<allRows.length; i++) {
    row = allRows[i];
    if (row["Review Sentiment"] == "positive"){
        pos_senti[+row['rating_y']] = pos_senti[+row['rating_y']] + 1
        dict["positive"] = dict["positive"] + +row['rating_y']        
        posTot++;
    }
    if (row["Review Sentiment"] == "negative"){
        neg_senti[+row['rating_y']] = neg_senti[+row['rating_y']] + 1
        dict["negative"] = dict["negative"] + +row['rating_y']        
        negTot++;
    }    
  }
  dict["positive"] = dict["positive"]/posTot
  dict["negative"] = dict["negative"]/posTot
  var posData =
    {
      x: [1,2,3,4,5],
      y: [pos_senti[1], pos_senti[2], pos_senti[3], pos_senti[4], pos_senti[5]],
      mode: 'lines+markers',
      type: 'scatter',
      name: 'Positive Sentiment'        
    };

  var negData =
    {
      x: [1,2,3,4,5],
      y: [neg_senti[1], neg_senti[2], neg_senti[3], neg_senti[4], neg_senti[5]],
      mode: 'lines+markers',
      type: 'scatter',
      name: 'Negative Sentiment'        
    };

  data1 = [posData,negData]
  var layout = {
    title: 'Total reviews for each rating',
    xaxis: {
      title: 'Ratings',
      titlefont: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    },
    yaxis: {
      title: 'Total Ratings',
      titlefont: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    }
  };
  
  Plotly.newPlot('totRatPlot', data1, layout);
}

makeplotTotRat();