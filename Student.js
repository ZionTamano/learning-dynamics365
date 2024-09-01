var incorectIDMessage = "Error message:Please enter 9 numbers of id";
var incorectIDCode = "123456789";
var fieldCountry = "name country";
var textAlertCountry = "Entering a country other than Israel, please also enter the date of arrival";
function onload(executionContext) {
    init(executionContext);
}
function init(executionContext) {
    var formContext = executionContext.getFormContext();
    var formType = formContext.ui.getFormType();
    console.log(formType);
    switch (formType) {
        case 1:
            //for Create form
            setVisible(formContext, false, "soft_idfield", "soft_passportnumberfield", "soft_dateofimmigration");
            setDisabled(formContext, true, "soft_fullname", "soft_name");


            break;
        case 2:
            //for Update form
            alertRrcordeForGetId();
            onchange_idtype(executionContext);
            onchange_countryofbirth(executionContext, formType);
            break;
    }
}
function onchange_idtype(executionContext) {
    var formContext = executionContext.getFormContext();
    var idtype = formContext.getAttribute("soft_idtype").getValue();
    switch (idtype) {
        case 461020000:
            IDtypeID(formContext);
            break;
        case 461020001:
            PassportTypeID(formContext);
            break;
        default:
    }
}
function IDtypeID(formContext) {
    formContext.getControl("soft_passportnumberfield").setVisible(false);
    formContext.getControl("soft_idfield").setVisible(true);
    formContext.getAttribute("soft_idfield").setRequiredLevel("required");
}
function PassportTypeID(formContext) {
    formContext.getControl("soft_idfield").setVisible(false);
    formContext.getControl("soft_passportnumberfield").setVisible(true);
    formContext.getAttribute("soft_passportnumberfield").setRequiredLevel("required");
}
function onchange_countryofbirth(executionContext) {
    var formContext = executionContext.getFormContext();
    var countryname = formContext.getAttribute("soft_countryofbirth").getValue();
        if (countryname != 461020004 && countryname != null) {
            formContext.getControl("soft_dateofimmigration").setVisible(true)
            formContext.getAttribute("soft_dateofimmigration").setRequiredLevel("required")
        } else {
            formContext.getAttribute("soft_dateofimmigration").setRequiredLevel("none");
            formContext.getControl("soft_dateofimmigration").setVisible(false);
        }
}
function onchange_fullnamefirstnameandlastname(executionContext) {
    var formContext = executionContext.getFormContext();
    var firstname = formContext.getAttribute("soft_firstname").getValue();
    var lastname = formContext.getAttribute("soft_lastname").getValue();

    if (firstname != null && lastname != null) {
        var fullname = firstname + " " + lastname;
        formContext.getAttribute("soft_fullname").setValue(fullname);
    }
}
function onsave_idcheck(executionContext) {
    var formContext = executionContext.getFormContext();
    // Perform custom logic or validation
    var numbersid = formContext.getAttribute("soft_idfield").getValue();
    if (numbersid.length != 9) {
        alertId()
        // formContext.ui.setFormNotification(incorectIDMessage, "ERROR", incorectIDCode);
        // executionContext.getEventArgs().preventDefault();
    } else {
        formContext.ui.clearFormNotification(incorectIDCode);
    }
}

function alertId() {
    var alertStrings = { confirmButtonLabel: "Yes", text: "You may have entered more or less digits of the ID card number, please enter 9 digits for the ID card", title: "Error entering ID card" };
    var alertOptions = { height: 120, width: 260 };
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
        function (success) {
            console.log("Alert dialog closed");
        },
        function (error) {
            console.log(error.message);
        }
    )
}
function alert(countryname) {
    if (countryname != 461020004 && countryname != null) {
        var alertStrings = { confirmButtonLabel: "Yes", text: textAlertCountry, title: fieldCountry };
        var alertOptions = { height: 120, width: 260 };
        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
            function (success) {
                console.log("Alert dialog closed");
            },
            function (error) {
                console.log(error.message);
            }
        )
    }
}
function alertRrcordeForGetId() {
    var id = Xrm.Page.data.entity.getId();
    var alertStrings = { confirmButtonLabel: "Yes", text: "Record id is : " + id, title: "RecordId " };
    var alertOptions = { height: 120, width: 260 };
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
        function (success) {
            console.log("Alert dialog closed");
        },
        function (error) {
            console.log(error.message);
        }
    )
}

//var confirmStrings = { text: "This is a confirmation.", title: "Confirmation Dialog" };
    //var confirmOptions = { height: 200, width: 450 };
    //Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
    //    function (success) {
    //        if (success.confirmed)
    //            console.log("Dialog closed using OK button.");
    //        else
    //            console.log("Dialog closed using Cancel button or X.");
    //    });



//function onsave_fields(formContext) {
//    var idfield = formContext.getAttribute("soft_idfield").getValue();
//    var passportnumberfield = formContext.getAttribute("soft_passportnumberfield").getValue();
//    var dateofimmigration = formContext.getAttribute("soft_dateofimmigration").getValue();

//    var fields = [idfield, passportnumberfield, dateofimmigration];

//    var soft_fields = ["soft_idfield", "soft_passportnumberfield", "soft_dateofimmigration"];

//    console.log(fields);
//    for (var i = 0; i < fields.length; i++) {
//        if (fields[i] != null) {
//            for (var j = j; j <= i; j++) {
//                var fieldvisible = soft_fields[j].toString();
//                formContext.getControl(fieldvisible).setVisible(true);
//            }
//        }
//    }
//}
//function formTypeofaction(executionContext) {
//    var formContext = executionContext.getFormContext();
//    var formType = formContext.ui.getFormType();
//    console.log(formType);
//    switch (formType) {
//        case 1:
//            onsave_fields(formContext);
//            //for Create form
//            break;
//        case 2:
//            //for Update form
//            break;
//    }
//}
//function Essentialdetails(executionContext) {
//    var formContext = executionContext.getFormContext();
//    var fullname = formContext.getAttribute("soft_fullname").getValue();
//    var id = formContext.getAttribute("soft_idfield").getValue();
//    var passport = formContext.getAttribute("soft_passportnumberfield").getValue();
//    if (fullname != null && passport != null || id != null) {
//        var details = fullname + " " + "-" + " " + id + passport;
//        formContext.getAttribute("soft_name").setValue(details);
//    }
//}

// fields.setVisible(true);
 //var soft_idfieldvisible = formContext.getControl("soft_idfield");
  //var soft_passportnumberfieldvisible = formContext.getControl("soft_passportnumberfield");
 //var soft_dateofimmigrationvisible = formContext.getControl("soft_dateofimmigration");

//function onsave_createformstudent(fields) {

//    fields.forEach(function () {
//        if (null !== myArray[0]) {
//          fields.setVisible(true);
//        }
//    });

//    return passing;
//}
//var countryofbirth = formContext.getAttribute("soft_countryofbirth").getValue();
//var firstname = formContext.getAttribute("soft_firstname").getValue();
//var fullname = formContext.getAttribute("soft_fullname").getValue();
//var idtype = formContext.getAttribute("soft_idtype").getValue();
//var lastname = formContext.getAttribute("soft_lastname").getValue();