var schema =
  [
    //label, render
    ['Maryland', renderForm(AuditDataMDSchema)],
    ['DC', renderForm(AuditDataMDSchema)],
  ];

function renderForm() {
}

function renderLink() {}

AuditTest = React.createClass({

  getData: () => [
    //label, render
    ['Maryland', renderForm(AuditDataMDSchema)],
    ['DC', renderForm(AuditDataMDSchema)],
  ],

  render() {

    var links = []

    var test = ['a', 'b']
    schema.map(section => {
        section.map(it => {
          links.push(<a onClick={it[0]}>it[0]</a>)
          //links.push(renderLink(it))
        })
      });

    var link = <div>test {it}</div>;
    links.push(link)


    return (
      <div className='container'>
        Test

        {links}
      </div>
    );
  }
});

