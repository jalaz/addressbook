'use strict';

define(['app'], function (app) {
    app.factory('groupsRepo', GroupsRepo);
    GroupsRepo.$inject = ['contactsRepo'];
    function GroupsRepo(contactsRepo) {
        var service = {
            getGroups: getGroups
        }
        return service;

        function getGroups() {
            var groups = groupsFromContacts();
            return groups;
        }

        function groupsFromContacts() {
            var contacts = contactsRepo.getContacts();
            var groups = {};
            for (var i = 0; i < contacts.length; i++) {
                var group = contacts[i].group;
                if (group) {
                    groups[contacts[i].group.toLowerCase()] = undefined;
                }
            }
            return groups;
        };
    }
});