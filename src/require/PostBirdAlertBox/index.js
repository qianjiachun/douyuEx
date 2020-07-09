/*
    二次封装postbirdAlertBox，用于DouyuEx内部使用
    By: 小淳
*/

function showAlert(text) {
    PostbirdAlertBox.alert({
        'title': '提示',
        'content': text,
        'okBtn': '确定',
        'contentColor': 'rgb(51,51,51)',
    });
}

function showConfirm(text, callback_confirm, callback_cancel) {
    PostbirdAlertBox.confirm({
        'title': '提示',
        'content': text,
        'okBtn': '确定',
        'contentColor': 'rgb(51,51,51)',
        'onConfirm': function () {
            callback_confirm();
        },
        'onCancel': function () {
            callback_cancel();
        }
    });
}

function showPrompt(text, callback_confirm, callback_cancel) {
    PostbirdAlertBox.prompt({
        'title': text,
        'okBtn': '确定',
        onConfirm: function (data) {
            callback_confirm(data);
        },
        onCancel: function (data) {
            callback_cancel(data);
        },
    });
}