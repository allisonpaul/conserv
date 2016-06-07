var UserShow = React.createClass ({
  getInitialState: function() {
    return {
      data: undefined
    }
  },

  componentWillMount: function(){
    $.ajax({
      url: '/users/show',
      type: 'GET'
    }).success(function(response){
      this.setState({data: response});
    }.bind(this));
  },

  render: function(){
    if (this.state.data != undefined) {
      return(
        <div>
          username
          <p id="image"><img src={ Gravtastic(this.state.data.email) } /></p>
          <BarGraph />
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
});
