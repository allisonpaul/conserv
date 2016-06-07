var BarGraph = React.createClass ({
  getInitialState: function(){
    return {
      data: undefined
    }
  },

  componentWillMount: function(){
    $.ajax({
      url: '/graphs/line',
      type: 'GET'
    }).success(function(response){
      this.setState({data: response});
    }.bind(this));
  },

  BarGraph: function(data) {
    var points = [];
    var dates = [];

    data.forEach(function(i){
      points.push(i.points)
      dates.push(i.date)
    })

    var x = d3.scale.linear()
        .domain([0, d3.max(points)])
        .range([0, 420]);

    var chart = d3.select(".app-container")
      .selectAll("div").attr("class", "barChartContainer")
        .insert("div")
        .attr("class", "barChartContainer")
        .data(points)
        .enter("#barGraph")
        .insert("div")
        .attr("class", "barChart")
        .style("width", 0)
        .transition().style("width", function(d) { return d * 5 + "%"; })
        .text(function(d, i) { return dates[i] + "  " + points[i] + " points"; }).style("color", "lightblue")
        .transition().text(function(d, i) { return dates[i] + " " + points[i] + " points"; }).style("color", "whitesmoke");

    console.log(d3.select("#chart").selectAll("div"))
  },

  render: function(){
    if(this.state.data != undefined) {
      return <div>
                <div id="bargraph">
                  <div className="graph-titles">
                    <h1>Recent Activity</h1>
                  </div>
                </div>
                { this.BarGraph(this.state.data.data) }
              </div>
      } else { return <div></div>
    }
  },
});
