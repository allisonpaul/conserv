var HouseForm = React.createClass({
  handleFormSubmit: function(event) {
    event.preventDefault();
    data = $(event.target).serialize();
    $.ajax({
      url: '/houses',
      type: 'post',
      data: data
    }).success(function(response){
      if (response.errors) {
        var errors = response.errors
        $(".errors").append(`<li> ${errors} </li>`)
      } else {
        this.props.onAction('house', {houseMember: true})
      }
    }.bind(this));
  },

  skipClick: function(destination) {
    this.props.onAction(destination, {newUser: false});
  },

  render: function(){
    if ( this.props.newUser === true ) {
      return (
        <div className="house-form-page">
          <h1 className="graph-titles"> add or join a house</h1>
          <div className="house-form">
            <form onSubmit={this.handleFormSubmit} className="col s10">
              <div className="row">
                <div className="input-field col s10">
                  <i className="material-icons prefix">store</i>
                  <input type="text" className="validate" name="name" />
                  <label>House name</label>
                </div>
                <div className="input-field col s10 center-align">
                  <button className="other-buttons" type="submit" name="action">
                  Submit
                  </button>
                </div>
                <a onClick={this.skipClick.bind(null, "userShow")} className="waves-effect waves-light btn">
                   Skip for now
                </a>
                </div>
          </form>
          <div className="errors-div">
            <ul className="errors">
            </ul>
          </div>
        </div>
      </div>
        )
      } else { return (
          <div className="house-form-page">
          <h1 className="graph-titles"> add or join a house</h1>
          <div className="house-form">
            <form onSubmit={this.handleFormSubmit} className="col s10">
              <div className="row">
                <div className="input-field col s10">
                  <i className="material-icons prefix">store</i>
                  <input type="text" className="validate" name="name" />
                  <label>House name</label>
                </div>
                <div className="input-field col s10 center-align">
                  <button className="other-buttons" type="submit" name="action">
                  Submit
                  </button>
                </div>
              </div>
          </form>
          <div className="errors-div">
            <ul className="errors">
            </ul>
          </div>
        </div>
      </div>
        )
      }
  }
});
