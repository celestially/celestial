ModalWrapper = function (Component) {
  return React.createClass({

    onClose() {
      //this.statete.closeHandler()
    },

    //registerCloseHandler

    render() {
      return (
        <span>
          <a href={'#openModal' + this.props.name}>{this.props.label}</a>
          <div id={'openModal' + this.props.name} className="modalDialog">
            <div><a href="#close" title="Close" className="close" onClick={this.onClose}>X</a>
              <Component {...this.props}
              />
            </div>
          </div>
        </span>
      );
    }
  })
};

