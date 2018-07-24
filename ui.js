Ext.onReady(function() {
    Ext.define('User', {
        extend: 'Ext.data.Model',
                  
         idProperty: 'userID',
                  
         fields: [{
             name: 'userID',
             type: 'int'
         }, {
             name: 'name',
             type: 'string'
         }, {
             name: 'surname',
             type: 'string'
         }]
   });
    var store = Ext.create('Ext.data.Store', {
                 model: 'User',
                 autoLoad: true,
                 autoSync: true,
                 proxy: {
                         type: 'ajax',
                         url: 'users.json',
                         reader: {
                             type: 'json',
                             rootProperty: 'users',
                             totalProperty: 'total'
                         },
                         writer: {
                            type: 'json',
                            rootProperty: 'users',
                            totalProperty: 'total'
                          }
             }
     });
    var usersGrid = Ext.create('Ext.grid.Panel', {
        title: 'Пользователи',
        selType: 'rowmodel',
        plugins:[{
            ptype:'rowediting',
            clicksToEdit: 1
        }],
        height: 500,
        width: 1000,
        store: store,
        columns: [{
            header: 'ID',
            dataIndex: 'userID'
        }, {
            header: 'Имя',
            dataIndex: 'name',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            header: 'Фамилия',
            dataIndex: 'surname',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }],
        renderTo: Ext.getBody()
    });
    Ext.create('Ext.Button', {
        text: 'Сохранить',
        renderTo: Ext.getBody(),
        handler: function() {
            
        }
    });
    Ext.create('Ext.Button', {
        text: 'Удалить',
        renderTo: Ext.getBody(),
        handler: function() {
            var selection = usersGrid.getView().getSelectionModel().getSelection();
            store.remove(selection);
        }
    });
    var addUserStore = function(userID, name, surname) {
        this.userID = userID;
        this.name = name;
        this.surname = surname;
    }
    var oldUser = new addUserStore(0, '', '');
    var addUser = Ext.create('Ext.form.Panel', {
        renderTo: document.body,
        title: 'Добавление пользователя',
        margin: '0, 0, 0, 0',
        height: 150,
        width: 300,
        bodyPadding: 10,
        defaultType: 'textfield',
        items: [
            {
                xtype: 'textfield',
                fieldLabel: 'Имя',
                emptyText: 'Введите имя',
                name: 'name'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Фамилия',
                emptyText: 'Введите фамилию',
                name: 'surname'
            },
            {
                xtype: 'button',
                text : 'Добавить',
                margin:'9 0 0 115',
                handler: function() {
                    var name = addUser.items.get(0).value;
                    var surname = addUser.items.get(1).value;
                    var count = store.last().get('userID') + 1;
                    oldUser.userID = count;
                    oldUser.name = name;
                    oldUser.surname = surname;
                    store.add(oldUser);
                    console.log(name);
                    console.log(surname);
                }
            }
        ]
    });
});