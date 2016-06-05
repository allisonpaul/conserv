var HouseForm = React.createClass({
  handleFormSubmit: function(event) {
    event.preventDefault();
    data = $(event.target).serialize();
    $.ajax({
      url: '/houses',
      type: 'post',
      data: data
    }).success(function(response){
      this.props.onAction('main')
    });
  },

  render: function(){
    return (
      <div className="house-form-page">
        <h3> Create a house </h3>
        <div className="house-form">
          <form onSubmit={this.handleFormSubmit} className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">store</i>
                <input type="text" className="validate" name="name" />
                <label>Give your house a name.</label>
              </div>
              <div className="input-field col s12 center-align">
                <button className="btn waves-effect waves-light" type="submit" name="action">
                Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
});
