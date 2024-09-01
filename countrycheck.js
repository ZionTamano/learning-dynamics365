function countrych(executionContext) {
    var fromContext = executionContext.getFormContext();
    var countryname = fromContext.getAttribute("soft_countryofbirth").getValue();

    if (countryname != "ישראל") {
        fromContext.getControl("soft_dateofimmigration").setVisible(true);
        fromContext.getAttribute("soft_dateofimmigration").setRequiredLevel("required");
    }   
}
//function countrych(executionContext) {
//    var fromContext = executionContext.getFormContext();
//    var countryname = fromContext.getAttribute("soft_countryofbirth").getValue();

//    if (countryname != 0) {
//        fromContext.getControl("soft_dateofimmigration").setVisible(true);
//        fromContext.getControl("soft_dateofimmigration").setRequiredLevel("required");
//    } else {
//        formContext.getAttribute("soft_dateofimmigration").setRequiredLevel("none");
//        fromContext.getControl("soft_dateofimmigration").setVisible(false);
//    }



//}