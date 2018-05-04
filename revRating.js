function makeplot2() {
  console.log("hello")
  
  Plotly.d3.csv("data/query_6_result.csv", function(data){ processDataSentiments(data) } );

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
      title: 'Review Rating',
      titlefont: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    }
  };
  
  Plotly.newPlot('revRatPlot', data, layout);
}

makeplot2();