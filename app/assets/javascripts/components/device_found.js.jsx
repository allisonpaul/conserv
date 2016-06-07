var DeviceFound = React.createClass({
  handleClick: function(destination){
    this.props.onAction(destination);
  },

  joinClick: function(destination){
    $.ajax({
      url: '/houses/join',
      type: 'POST',
      data: { id: this.props.houseID }
    }).success(function(response){
      this.props.onAction(destination, {houseMember: true});
    }.bind(this));
  },

  render: function(){
    return (
      <div className="device-found">
        <h3>{ this.props.message }</h3>
        <a onClick={this.joinClick.bind(null, "house")} className="waves-effect waves-light btn">
          <i className="material-icons left">thumb_up</i>
        </a>
        <a onClick={this.handleClick.bind(null, "userShow")} className="waves-effect waves-light btn">
          <i className="material-icons left">thumb_down</i>
        </a>
      </div>
    )
  }
});
