// type = ['primary', 'info', 'success', 'warning', 'danger'];

graphics = {

  initDashboardPageCharts: function() {

    
////////////////////// Chart configuration options //////////////////////
    
    ForecastChartConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        filter: tooltipItem => tooltipItem.datasetIndex == 0,
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "rgba(225,78,202,0.1)",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(225,78,202,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };
    
        PriceHistoryChartConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "rgba(225,78,202,0.1)",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "rgba(225,78,202,0.1)",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };

////////////////////// Forecast chart //////////////////////
    
      var futurePrices = JSON.parse(document.getElementById('forecast').text).prices
      var futureLabels = JSON.parse(document.getElementById('forecast').text).t
      var futureAvg = parseFloat(document.getElementById('avg').text)
      
    var ctx = document.getElementById("forecastChart").getContext('2d');

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(72,72,176,0.1)');
    gradientStroke.addColorStop(0.4, 'rgba(72,72,176,0.0)');
    gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors
    var config = {
      type: 'line',
      data: {
        labels: futureLabels,
        datasets: [{
          label: "Price",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#d346b1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#d346b1',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#d346b1',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: futurePrices,
        },
        {
          label: "Average",
          fill: false,
          backgroundColor: gradientStroke,
          borderColor: '#ffffff',
          borderWidth: 1.5,
          borderDash: [5,10],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#ffffff',
          pointBorderWidth: 0,
          pointHoverRadius: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 0,
          data: new Array(futurePrices.length).fill(futureAvg),
        }
        
                   ]
      },
      options: ForecastChartConfiguration
    };
    
    var myChartData = new Chart(ctx, config);
  
    
////////////////////// Price history charts //////////////////////
    
         var prices1d = JSON.parse(document.getElementById('1d').text).prices
         var labels1d = JSON.parse(document.getElementById('1d').text).t
         var prices30d = JSON.parse(document.getElementById('30d').text).prices
         var labels30d = JSON.parse(document.getElementById('30d').text).t
         var prices180d = JSON.parse(document.getElementById('180d').text).prices
         var labels180d = JSON.parse(document.getElementById('180d').text).t
  

    var ctx = document.getElementById("chartPrices").getContext('2d');
    
    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    
    gradientStroke.addColorStop(1, 'rgba(72,72,176,0.1)');
    gradientStroke.addColorStop(0.4, 'rgba(72,72,176,0.0)');
    gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors
    var config = {
      type: 'line',
      data: {
        labels: labels1d,
        datasets: [{
          label: "Price",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#d346b1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#d346b1',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#d346b1',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: prices1d,
        }]
      },
      options: PriceHistoryChartConfiguration
    };
    var myChartData = new Chart(ctx, config);
    $("#0").click(function() {
      var data = myChartData.config.data;
      data.datasets[0].data = prices1d;
      data.labels = labels1d;
      myChartData.update();
    });
    $("#1").click(function() {
      var data = myChartData.config.data;
      data.datasets[0].data = prices30d;
      data.labels = labels30d;
      myChartData.update();
    });
    
    $("#2").click(function() {
      var data = myChartData.config.data;
      data.datasets[0].data = prices180d;
      data.labels = labels180d;
      myChartData.update();
    });
  },

  

};
