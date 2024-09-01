function id(executionContext) {
    var fromContext = executionContext.getFormContext();
    var idtype = fromContext.getAttribute("soft_idtype").getValue();

    if (idtype == "461020000") {
        fromContext.getControl("soft_passportnumberfield").setVisible(false);
        fromContext.getControl("soft_idfield").setVisible(true);
        fromContext.getAttribute("soft_idfield").setRequiredLevel("required");
    } else if (idtype == "461020001") {
        fromContext.getControl("soft_idfield").setVisible(false);
        fromContext.getControl("soft_passportnumberfield").setVisible(true);
        fromContext.getAttribute("soft_passportnumberfield").setRequiredLevel("required");
    } 
            
    
}
