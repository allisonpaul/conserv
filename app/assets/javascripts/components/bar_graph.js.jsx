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
      .selectAll("#chart")
        .data(points)
        .enter()
        .append("div")
        .attr("class", "barChartContainer")
        .append("div")
        .attr("class", "barChart")
        .style("width", 0)
        .transition().style("width", function(d) { return d * 5 + "%"; })
        .text(function(d, i) { return dates[i] + "  " + points[i] + " points"; }).style("color", "lightblue")
        .transition().text(function(d, i) { return dates[i] + " " + points[i] + " points"; }).style("color", "whitesmoke");

    console.log(d3.select("#chart").selectAll("div"))
  },

  render: function(){
    if(this.state.data != undefined) {
      return <div> { this.BarGraph(this.state.data.data) } </div>
      } else { return <div></div>
    }
  },
});
