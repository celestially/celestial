Home = React.createClass({
  render() {
    menuItems = [
      { route: 'get-started', text: 'Get Started' },
      { route: 'customization', text: 'Customization' },
      { route: 'components', text: 'Components' },
      { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
      {
        type: MenuItem.Types.LINK,
        payload: 'https://github.com/callemall/material-ui',
        text: 'GitHub'
      },
      {
        text: 'Disabled',
        disabled: true
      },
      {
        type: MenuItem.Types.LINK,
        payload: 'https://www.google.com',
        text: 'Disabled Link',
        disabled: true
      },
    ];

    //Toggle the LeftNav
    //this.refs.leftNav.toggle();

    //Docked Left Nav

    return (
      <div>

        <LeftNav ref="leftNav" menuItems={menuItems} />

      </div>
    );
  }
});

