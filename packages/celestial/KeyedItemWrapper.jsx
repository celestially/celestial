KeyedItemWrapper = function (Component) {
  return React.createClass({

    getInitialState: function () {
      return {
      };
    },

    changeKey(name) {
      console.log('go to name: ' + name);
      this.setState({
        selectedKey: name,
        //selectedValue: this.props.item.report[name],
        oldKey: name
      })
      //this.props.onSelectKey(name);
    },

    renderKeys() {
      const keys = Object.keys(this.props.item);
      console.log('renderKeys keys: ' + keys);
      return keys.sort().map((it, i) => {
        //if (!hideSectionMap[this.props.item.report[it].sectionKey]) {
        return <div key={i}>
          <a href='#' onClick={this.changeKey.bind(this,it)}>{it}</a>
        </div>
        //}
      });
    },

    render() {
      console.log('KeyedItemWrapper item: ' + Object.keys(this.props.item));
      console.log('KeyedItemWrapper this.props.dotKey: ' + this.props.dotKey);
      console.log('KeyedItemWrapper this.props.dotKey: ' + this.state.selectedKey);
      this.state.selectedKey && console.log('KeyedItemWrapper subitem: ' + Object.keys(this.props.item[this.state.selectedKey]));
      return (
        <div>
          <div className='row'>
            <div className='col-xs-3'>
              <div className='reportSections orange'>
                {this.renderKeys()}
              </div>
            </div>
            <div className='col-xs-9'>
              {this.state.selectedKey &&
              <Component {...this.props}
                item={this.props.item[this.state.selectedKey]}
                dotKey={this.props.dotKey+'.'+this.state.selectedKey}
                 />}
            </div>
          </div>
        </div>
      );
    }

  })
}