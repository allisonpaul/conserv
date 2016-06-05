var PieGraph = React.createClass ({
  getInitialState: function(){
	return {
	  data: undefined
	}
  },

  componentWillMount: function(){
	$.ajax({
	  url: '/graphs/pie',
	  type: 'GET'
	}).success(function(response){
	  this.setState({data: response});
	}.bind(this));
  },

  popoutPie: function(data, width, height) {

	var points = [];
	var usernames = [];
	var colors = ['#00040D', '#65756B', '#9EA792', '#333B3D'];

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
		.innerRadius(innerRadius);

	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("id", function() {
			return "pie"
		})
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


	svg.selectAll("path")
		.data(pie(points))
		.enter().append("path")
		.each(function(d) {
			d.outerRadius = outerRadius - 20;
		})
		.attr("d", arc)
		.on("mouseover", arcTween(outerRadius, 0))
		.attr("fill", function(d, i) {
			return colors[i];
		})
		.attr("user", function(d,i) {return usernames[i]})
		.attr("points", function(d,i) {return points[i]})

		.on("mouseout", arcTween(outerRadius - 20, 150))
		.on("click", function() {
				var that = this
				d3.selectAll("#legContent").remove();
				d3.select("#legend")
					.append("div")
					.attr("id", "legContent")
					.style("margin-left", function(){return parseInt(width/4) + "px"})
					.text(function(d,i) { return that.attributes[2].value  + " " + that.attributes[3].value })
					.style("background-color", function(d,i) { return that.attributes[1].value })
			});

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
		if (this.state.data != undefined) {
			return <div> <div id="legend"></div>
			  { this.pieGraph(this.state.data.data) }
			</div>
		} else {
			return <div></div>
		}
	);
  }
})
