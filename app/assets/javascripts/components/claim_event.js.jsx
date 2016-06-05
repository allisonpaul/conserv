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
      <div className="soft-white-bg">
        <h1 className="claim-event">Claim a slot </h1>
        <p>hi</p>
        <EventList events={this.state.data} />
      </div>
    );
  },
});
