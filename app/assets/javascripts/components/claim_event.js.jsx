var ClaimEvent = React.createClass({
  getInitialState: function() {
    return {
      data: ''
    }
  },

  componentWillMount: function() {
    $.ajax({
      url: '/events',
      type: 'get',
    }).success(function(response){
        this.setState({data: response});
      }.bind(this));
  },

  render: function(){
    // console.log(this.state.data.events)
    return(
      <div>
       < div className="graph-titles"><h1>Claim a slot</h1></div>
        <EventList events={this.state.data} />
      </div>
    );
  },
});
