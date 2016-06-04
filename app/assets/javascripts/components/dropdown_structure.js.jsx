var dropdownStructure = React.createClass({
  render: function(){
    return(
      <div>
        <ul id='dropdown1' class='dropdown-content'>
          <li><a href="#!">Week</a></li>
          <li class="divider"></li>
          <li><a href="#!">Month</a></li>
          <li class="divider"></li>
          <li><a href="#!">Year</a></li>
          <li class="divider"></li>
          <li><a href="#!">House</a></li>
        </ul>
      </div>
    );
  }
})
