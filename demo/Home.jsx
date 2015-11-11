const Home = React.createClass({
  render() {
    return <div>
      <h1>Welcome to Celestial demo</h1>
      <h2>
        <ul>
          <li>
            <a href='/task/list'>Simple Tasks Demo</a>
          </li>
          <li>
            <a href='/task-dd/list'>Data-driven Tasks Demo</a>
          </li>
          <li>
            <a href='/schema/list'>Edit Schemas</a>
          </li>
        </ul>
      </h2>
      Note: built-in schemas are locked to prevent them being edited in public demo. Remove "locked": true
      in bootrap.jsx if you want to edit them.
    </div>
  }
});

const HomeLayout = React.createClass({
  render() {
    return <div>{this.props.content}</div>
  }
});

Reaktor.init(
  <Router>
    <Route path="/" layout={HomeLayout} content={Home}/>
  </Router>);
