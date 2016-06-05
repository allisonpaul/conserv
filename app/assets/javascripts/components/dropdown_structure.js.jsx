var DropdownStructure = React.createClass({
  getInitialState: function() {
    return {
      value: "0"
    };
  },

  handleChange: function(event) {
    // var value = event.target.value;
    // console.log(value, " was selected");
    this.setState({
      value: event.target.value
    });
    this.props.handle
  },

  render: function() {
    return (
      <form>
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="0">Choose your option</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
      </form>
    );
  }
});
