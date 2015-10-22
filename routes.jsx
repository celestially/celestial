Reaktor.init(
  <Router>
    <Route path="/" layout={Layout} content={Home} />
    <Route path="/grid" layout={Layout} content={GridDemo} />
    <Route path="/collConfig" layout={Layout} content={CollectionConfig} />

    <Route path="/grid/ex1" layout={Layout} content={GridEx1} />

    <Route path="/audit/list" layout={Layout2} content={auditList(ItemList)}/>
    <Route path="/audit/table" layout={Layout2} content={AuditTable}/>
    <Route path="/schema/list" layout={SchemaLayout} content={SchemaInput}/>

    <Route path="/config" layout={SchemaLayout} content={configList(ItemList)}/>
    <Route path="/config/report" layout={SchemaLayout} content={withSchema(ConfigEditor)}/>

  </Router>
);


