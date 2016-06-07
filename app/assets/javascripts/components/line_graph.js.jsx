// const d3 = require('react-d3-library');

var LineGraph = React.createClass({
    getInitialState: function() {
        return {
            data: undefined
        }
    },

    componentWillMount: function() {
        $.ajax({
            url: '/graphs/line',
            type: 'GET'
        }).success(function(response) {
            console.log(response)
            this.setState({
                data: response
            });
        }.bind(this));
    },

    lineGraph: function(data) {

        var windowSize = window.innerWidth;

        // Set the dimensions of the canvas / graph
        var margin = {
                top: 30,
                right: 20,
                bottom: 30,
                left: 50
            },
            width = windowSize - margin.left - margin.right,
            height = windowSize / 2 - margin.top - margin.bottom;

        // Parse the date / time  ---- this is wonky
        var parseDate = d3.time.format("%Y-%m-%d").parse;

        // Set the ranges
        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        // Define the axes
        var xAxis = d3.svg.axis().scale(x)
            .orient("bottom").ticks(3);

        var yAxis = d3.svg.axis().scale(y)
            .orient("left").ticks(3);


        // Define the line
        var valueline = d3.svg.line()
            .x(function(d) {
                return x(d.date);
            })
            .y(function(d) {
                return y(d.points);
            });

        var widthInput = width + margin.left + margin.right;
        var heightInput = height + margin.top + margin.bottom;

        // Adds the svg canvas
        var svg = d3.select(".app-container")
            .append("div")
            .attr("class", "lineChartContainer")
            .classed("svg-container", true)
            .append("svg")
            // .attr("width", width + margin.left + margin.right)
            // .attr("height", height + margin.top + margin.bottom)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 " + parseInt(widthInput) + " " + parseInt(heightInput))
            //  .attr("id", function() {return "valLine"})
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")
            .classed("svg-content-responsive", true);

        data.forEach(function(d, i) {
            d.date = parseDate(d.date);
            d.points = +d.points;
        });

        x.domain(d3.extent(data, function(d) {
            return d.date;
        }));
        y.domain([0, d3.max(data, function(d) {
            return d.points;
        })]);


        // Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data))
            .attr("id", function() {
                return "valLine"
            })

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

            var curtain = svg.append('rect')
              .attr('x', -1 * width)
              .attr('y', -1 * height)
              .attr('height', height)
              .attr('width', width)
              .attr('class', 'curtain')
              .attr('transform', 'rotate(180)')
              .style('fill', '#ffffff')

              var t = svg.transition()
  .delay(750)
  .duration(3000)
  .ease('linear')
  .each('end', function() {
    d3.select('line.guide')
      .transition()
      .style('opacity', 0)
      .remove()
  });

t.select('rect.curtain')
  .attr('width', 0);
t.select('line.guide')
  .attr('transform', 'translate(' + width + ', 0)')

    },

    render: function() {
        if (this.state.data != undefined) {
            return <div >
                    < div className="graph-titles"><h1> History </h1></div>
            { this.lineGraph(this.state.data.data) } < /div>
        } else {
            return <div > < /div>
        }
    },
});
