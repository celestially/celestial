Reaktor.init(
  <Router>
    <Route path="/" layout={Layout} content={AuditList} />
    <Route path="/audits" layout={Layout} content={AuditList} />
    <Route path="/collConfig" layout={Layout} content={CollectionConfig} />

    <Route path="/grid/ex1" layout={Layout} content={GridEx1} />

  </Router>
);


