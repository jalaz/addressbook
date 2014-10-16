'use strict';
define(['app'], function(app) {
    app.factory('contactsRepo', contactsRepo);

    function contactsRepo() {
        var storageKey = "contactsApp.contacts";
        var repo = {
            getContacts: getContacts,
            saveContacts: saveContacts
        };

        return repo;

        function getContacts() {
            var contacts = localStorage[storageKey];
            if (contacts !== undefined) {
                contacts = angular.fromJson(contacts);
            } else {
                contacts = [];
            }
            return contacts;
        }
        function saveContacts(contacts) {
            localStorage[storageKey] = angular.toJson(contacts);
        }
    }
});