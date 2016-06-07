var BarGraphContainer = React.createClass ({

  render: function(){
     return <div>
      <div className="graph-titles">
        <h1>Recent Activity</h1>
      </div>
      <div id="bargraph"></div>
       <BarGraph />
    </div>
  },
})
