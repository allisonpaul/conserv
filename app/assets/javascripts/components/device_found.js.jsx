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
      if (response.errors) {
        $(".errors").find("li").remove()
        var errors = response.errors
        $(".errors").append(`<li> ${errors} </li>`)
      } else {
        this.props.onAction(destination, {houseMember: true})
      }
    }.bind(this));
  },

  render: function(){
    return (
      <div className="device-found">
        <h3 className="graph-titles">device found!</h3>
        <h3 className="graph-titles">{ this.props.message }</h3>
        <div className="thumbs">
        <a onClick={this.joinClick.bind(null, "house")} className="btn-floating btn-large">
          <i className="material-icons left">thumb_up</i>
        </a>
        <a onClick={this.handleClick.bind(null, "userShow")} className="btn-floating btn-large">
          <i className="material-icons left">thumb_down</i>
        </a>
        </div>
      </div>
    )
  }
});
