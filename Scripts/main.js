require.config({
    baseUrl: 'addressbook/app',
    urlArgs: 'v=1.0'
});

require([
    'app',
    'contactsRepo',
    'groupsRepo',
    'contactListCtrl'
    ],
    function() {
        angular.bootstrap(document, ['contactsApp']);
    });