var BarGraph = React.createClass ({
  getInitialState: function(){
    return {
      data: undefined
    }
  },

  componentWillMount: function(){
    $.ajax({
      url: '/graphs/bar',
      type: 'GET'
    }).success(function(response){
      console.log(response)
      this.setState({data: response});
    }.bind(this));
  },

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

    var chart = d3.select("#bargraph")
      .selectAll(".barChart")
        // .insert("div")
        // .attr("class", "barChartContainer")
        .data(points)
        .enter("#bargraph")
        .insert("span")
        // .text(function(d,i) { return dates[i]; })
        .attr("class", "bar-chart-date")
        .insert("div", "#bargraph")
        .attr("class", "barChart")
        .style("width", 0)
        .transition().style("width", function(d) { return d * 3 + "%"; })
        // .text(function(d, i) { return dates[i] + "  " + points[i] + " points"; }).style("color", "lightblue")
        // .transition().text(function(d, i) { return dates[i] + " " + points[i] + " points"; }).style("color", "whitesmoke");
        .text(function(d, i) { return points[i]; }).style("color", "lightblue")
        .transition().text(function(d, i) { return points[i]; }).style("color", "whitesmoke");

        d3.selectAll(".bar-chart-date")
          .insert("div", ":first-child")
          .attr("class", "date-t")
          .text(function(d,i) { return dates[i] })
  },

  render: function(){
    if(this.state.data != undefined) {
      return <div>
        { this.renderBarGraph(this.state.data.data) }
      </div>
      } else { return <div></div>
    }
  },
});
