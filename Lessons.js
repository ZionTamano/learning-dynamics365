function onchange_classtype(executionContext) {
    var formContext = executionContext.getFormContext();
    var switch_on = formContext.getAttribute("soft_classtype").getValue();
     
    switch (switch_on) {
        case 461020000://יומי
             handelDailyLessons(formContext);
            break;
        case 461020001://מספר שיעורים
             severalLessons(formContext);
            break;
        default:
    }
}
function handelDailyLessons(formContext) {
    formContext.getAttribute("soft_numberofmeetings").setValue(461020000);
    formContext.getControl("soft_numberofmeetings").setDisabled(true);
    formContext.getControl("soft_enddate").setVisible(false);
}

function severalLessons(formContext) {
    formContext.getControl("soft_numberofmeetings").setDisabled(false);
    formContext.getAttribute("soft_numberofmeetings").setValue(461020020);
    formContext.getControl("soft_enddate").setVisible(true);
    formContext.getAttribute("soft_enddate").setRequiredLevel("required");
}


