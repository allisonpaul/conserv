var DropdownToggle = React.createClass({
  render: function(){
    return(
      <div>
        <a className="dropdown-button btn" href="#" data-activates="dropdown1">Usage</a>

         <select value="B">
          <option id = "fuck" value="A">Apple</option>
          <option value="B">Banana</option>
          <option value="C">Cranberry</option>
        </select>
      </div>
    );
  }
})
