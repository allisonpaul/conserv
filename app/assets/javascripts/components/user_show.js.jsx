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
          <div>
            <h1 id="username">{this.state.data.username}</h1>
            <img id="avatar" src={ Gravtastic(this.state.data.email) } />
          </div>
          <BarGraphContainer />
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
});
