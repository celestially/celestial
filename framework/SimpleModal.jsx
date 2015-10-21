
SimpleModal = React.createClass({
  render() {
    return (
      <div>
        <a href={'#openModal' + this.props.name}>{this.props.label}</a>
        <div id={'openModal' + this.props.name} className="modalDialog">
          <div><a href="#close" title="Close" className="close">X</a>
            <pre>{this.props.value}</pre>
          </div>
        </div>
      </div>
    );
  }
});

