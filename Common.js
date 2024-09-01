function setVisible(fromContext, isVisible, ...fields) {
    for (var i = 0; i < fields.length; i++) {
        fromContext.getControl(fields[i]).setVisible(isVisible);
    }
} 
function setDisabled(fromContext, isDisabled, ...fields) {
    for (var i = 0; i < fields.length; i++) {
        fromContext.getControl(fields[i]).setDisabled(isDisabled);
    } 
}


