var PieGraph = React.createClass ({
  popoutPie: function(data, width, height) {

    var points = [];
    var usernames = [];

    data.forEach(function(i) {
        points.push(i.points)
        usernames.push(i.username)
    })

    var outerRadius = height / 2 - 20,
        innerRadius = outerRadius / 4,
        cornerRadius = 40;

    var pie = d3.layout.pie()
        .padAngle(.02);

    var arc = d3.svg.arc()
        .padRadius(outerRadius)
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", function() {
            return "pie"
        }).attr("class", "legend")
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var counter = 0

    svg.selectAll("path")
        .data(pie(points))
        .enter().append("path").attr("id", function(d, i) {
            return "user" + i;
        })
        .each(function(d) {
            d.outerRadius = outerRadius - 20;
        })
        .attr("d", arc)
        .on("click", arcTween(outerRadius, 0))
        .text(function(d, i) {
            return usernames[i];
        }).style("color", "red")
        .on("mouseout", arcTween(outerRadius - 20, 150))
        .text(function(d, i) {
            return usernames[i];
        }).style("color", "red");

    d3.select("body").append("p")
        .text(function(d, i) {
            return usernames[i];
        })
        .style("color", "gray");

    function arcTween(outerRadius, delay) {
        return function() {
            d3.select(this).transition().delay(delay).attrTween("d", function(d) {
                var i = d3.interpolate(d.outerRadius, outerRadius);
                return function(t) {
                    d.outerRadius = i(t);
                    return arc(d);
                };
            });
        };
    }
},


  render: function(){
    var data = [{
        username: "dom",
        points: 80
    }, {
        username: "allison",
        points: 45
    }, {
        username: "sami",
        points: 62
    }, {
        username: "dexter",
        points: 110
    }];
    var width = 500, height = 500;

    return(
      <div className="">
        { this.popoutPie(data, width, height) }
      </div>
    );
  }
})
