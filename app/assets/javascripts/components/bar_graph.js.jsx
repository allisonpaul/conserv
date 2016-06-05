var BarGraph = React.createClass ({
  renderBarGraph: function(data) {
    var points = [];
    var dates = [];

    data.forEach(function(i){
      points.push(i.points)
      dates.push(i.date)
    })

    var x = d3.scale.linear()
        .domain([0, d3.max(points)])
        .range([0, 420]);

    var chart = d3.select("#chart")
      .selectAll("div")
        .data(points)
      .enter().append("div")
          .style("width", 0)
        .transition().style("width", function(d) { return d * 10 + "px"; })
        .text(function(d, i) { return dates[i] + "  " + points[i] + " points"; }).style("color", "lightblue")
        .transition().text(function(d, i) { return dates[i] + " " + points[i] + " points"; }).style("color", "whitesmoke");

    console.log(d3.select(".chart").selectAll("div"))
  },

  render: function(){
      var data = [{date: "1-May-12", points: 63}, {date: "1-May-13", points: 58},
        {date: "1-May-14", points: 71}, {date: "1-May-15", points: 51}, {date: "1-May-16", points: 48},
        {date: "1-May-17", points: 44}, {date: "1-May-18", points: 46}, {date: "1-May-19", points: 39}];

      return(
        <div>
          <div className="chart"></div>
          { this.renderBarGraph(data) }
        </div>
      );
    }
});
