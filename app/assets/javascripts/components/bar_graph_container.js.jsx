var BarGraphContainer = React.createClass ({

  render: function(){
     return <div>
        <div id="bargraph"></div>
        <BarGraph />
        <h1 className="graph-titles">Recent Activity</h1>
      </div>
  },
})
