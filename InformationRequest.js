function oncahnge_ChoosingOneOfTheOptionsInTheReferenceSource(executionContext) {
    var formContext = executionContext.getFormContext();
    var oneChoiceSelected = formContext.getAttribute("soft_referralsource").getValue();
    switch (oneChoiceSelected) {
        case 461020000:
            oncahnge_Facebook(formContext)
            break;
        case 461020001:
            oncahnge_pohne(formContext)
            break;
        case 461020002:
            oncahnge_emailaddress(formContext)
            break;
        case 461020003:
            oncahnge_WhatsApp(formContext)
            break;
        default:
    }
}
function oncahnge_Facebook(formContext) {
    formContext.getControl("soft_username").setVisible(true);
    formContext.getAttribute("soft_username").setRequiredLevel("required");
    formContext.getAttribute("soft_numberphone").setRequiredLevel("none");
    formContext.getControl("soft_numberphone").setVisible(false);
    formContext.getAttribute("emailaddress").setRequiredLevel("none");
    formContext.getControl("emailaddress").setVisible(false);
}
function oncahnge_pohne(formContext) {
    formContext.getControl("soft_numberphone").setVisible(true);
    formContext.getAttribute("soft_numberphone").setRequiredLevel("required");
    formContext.getAttribute("soft_username").setRequiredLevel("none");
    formContext.getControl("soft_username").setVisible(false);
    formContext.getAttribute("emailaddress").setRequiredLevel("none");
    formContext.getControl("emailaddress").setVisible(false);
}
function oncahnge_WhatsApp(formContext) {
    formContext.getControl("soft_numberphone").setVisible(true);
    formContext.getControl("soft_username").setVisible(true);
    formContext.getAttribute("emailaddress").setRequiredLevel("none");
    formContext.getControl("emailaddress").setVisible(false);
    formContext.getAttribute("soft_numberphone").setRequiredLevel("required");
    formContext.getAttribute("soft_username").setRequiredLevel("required");
}
function oncahnge_emailaddress(formContext) {
    formContext.getControl("emailaddress").setVisible(true);
    formContext.getAttribute("emailaddress").setRequiredLevel("required");
    formContext.getAttribute("soft_numberphone").setRequiredLevel("none");
    formContext.getAttribute("soft_username").setRequiredLevel("none");
    formContext.getControl("soft_numberphone").setVisible(false);
    formContext.getControl("soft_username").setVisible(false);
}
