//const custMainSchema = {
//  name: string,
//  firstName: string
//}

const custMainSchema = ['name', 'address', 'phone']

CustomerMain = React.createClass({

  render() {
    console.log('CustomerMain: ');
    return <div className="row">
      <div className="col-xs-6">
        <AutoForm fields={custMainSchema}
                  {...this.props} />
      </div>
    </div>
  }
});


