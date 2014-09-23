'use strict';
define(['app'], function(app) {
    app.factory('contactsRepo', contactsRepo);

    function contactsRepo() {
        var repo = {
            getContacts: getContacts,
            saveContacts: saveContacts
        };

        return repo;

        function getContacts() {
            var contacts = localStorage["contacts"];
            if (contacts !== undefined) {
                contacts = angular.fromJson(contacts);
            } else {
                contacts = [];
            }
            return contacts;
        }
        function saveContacts(contacts) {
            localStorage["contacts"] = angular.toJson(contacts);
        }
    }
});