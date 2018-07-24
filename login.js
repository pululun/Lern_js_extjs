Ext.onReady( function() {
    var loginForm = Ext.create('Ext.form.Panel', {
    renderTo: document.body,
    title: 'Вход на сайт',
    height: 150,
    width: 300,
    bodyPadding: 10,
    defaultType: 'textfield',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Псевдоним',
            emptyText: 'Alias',
            name: 'alias'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Пароль',
            emptyText: 'Password',
            inputType: 'password',
            name: 'password'
        },
        {
            xtype: 'button',
            text : 'Вход',
            margin:'9 0 0 115',
            handler: function() {
                loginForm.getForm().submit({
                   url: 'login.php', 
                    success: function(form, action) {
                        Ext.MessageBox.alert('Авторизация пройдена. ',action.result.message);
                    },
                    failure: function(form, action) {
                        Ext.MessageBox.alert('Ошибка авторизации. ',action.result.message);
                    }
                });
            }
        }
    ]
});
});
