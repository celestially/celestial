Reaktor.init(
  <Router>
    <Route path="/" layout={Layout} content={Home} />
    <Route path="/collConfig" layout={Layout} content={CollectionConfig} />

    <Route path="/audit/list" layout={Layout2} content={auditList(ItemList)}/>
    <Route path="/audit/table" layout={Layout2} content={AuditTable}/>
    <Route path="/schema/list" layout={SchemaLayout} content={SchemaInput}/>

  </Router>
);


