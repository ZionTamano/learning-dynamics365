function readonly(executionContext) {
    var formContext = executionContext.getFormContext();
    var classtype = formContext.getAttribute("soft_classtype").getValue();

    if (classtype == "461020000") {//יומי
        formContext.getAttribute("soft_numberofmeetings").setValue(461020000);
        formContext.getControl("soft_numberofmeetings").setDisabled(true);
        formContext.getControl("soft_enddate").setVisible(false);
    } else if (classtype == "461020001") {//מספר שיעורים
        formContext.getControl("soft_numberofmeetings").setDisabled(false);
        formContext.getAttribute("soft_numberofmeetings").setValue(461020020);
        formContext.getControl("soft_enddate").setVisible(true);
        formContext.getAttribute("soft_enddate").setRequiredLevel("required");
    }
}
