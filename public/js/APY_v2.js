var canvas = document.getElementById('updating-chart');

var ctx = canvas.getContext('2d');
var dat = {
  labels: converted_xAxis,
  datasets: [
    {
      label: "My First dataset",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: yValues
    },

  ]
};
var myLiveChart = new Chart(ctx, {

    type: 'line',
    data: dat
  });