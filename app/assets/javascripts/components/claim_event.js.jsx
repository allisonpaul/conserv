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
      console.log(response)
        this.setState({data: response});
      }.bind(this));
  },

  render: function(){
    // console.log(this.state.data.events)
    return(
      <div>
         < div className="graph-titles">
         <h1>Claim an event</h1></div>
         <p id="event-sentence">recent events from your house</p>
         <EventList events={this.state.data} />
      </div>
    );
  },
});

