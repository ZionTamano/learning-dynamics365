function hidden(executionContext) {
    var fromContext = executionContext.getFormContext();
    fromContext.getControl("soft_idfield").setVisible(false);
    fromContext.getControl("soft_passportnumberfield").setVisible(false);
    fromContext.getControl("soft_dateofimmigration").setVisible(false);



}
