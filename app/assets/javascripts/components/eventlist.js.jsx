var EventList = React.createClass({


  render: function() {
    if (this.props.events.events != undefined) {
      var list = this.props.events.events.map(function(event, i){
        return <ClaimEventButton key={i} event={event} />
      });
      return <div className='event-button-container'>
        {list}
      </div>
    } else {
      return <div></div>
    }
  },




})
