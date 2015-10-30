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

    insertKey() {
      const newKey = `${this.props.dotKey}.${this.state.newKey}`;
      console.log('insertKey: ' + newKey);
      let obj = {}
      obj[newKey] = {}
      this.props.collection.update(this.props._id, {"$set": obj})
      this.changeKey(this.state.newKey)
    },

    updateKey() {
      const oldKey = `${this.props.dotKey}.${this.state.oldKey}`;
      const selectedKey = `${this.props.dotKey}.${this.state.selectedKey}`;
      console.log('updateKey: ' + oldKey + ', ' + selectedKey);
      let obj = {}
      obj[oldKey] = selectedKey
      console.log('obj: ' + JSON.stringify(obj));
      this.props.collection.update(this.props._id, {"$rename": obj})
    },

    deleteKey() {
      const key = `report.${this.state.selectedKey}`;
      console.log('deleteKey: ' + key);
      let obj = {}
      obj[key] = ''
      this.props.module.collection.update(this.props.item._id, {"$unset": obj})
    },

    renderKeyEditor() {
      console.log('renderKeyEditor this.state.selectedKey: ' + this.state.selectedKey);
      return <div id={'openModalKE'} className="modalDialog">
        <div><a href="#close" title="Close" className="close">X</a>
          <div>
            <h3>Edit Key:</h3>
            <input type="text" />
            <button onClick={this.updateKey} defaultValue={this.state.selectedKey}>Update Key</button>
            <button onClick={this.deleteKey}>Delete Key</button>
          </div>
          <div>
            <h3>New Key:</h3>
            <input type="text" />
            <button onClick={this.insertKey}>Insert Key</button>
          </div>
        </div>
      </div>
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
                <a href={'#openModalKE'}>Add/Edit Key</a>
                {this.renderKeyEditor()}
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