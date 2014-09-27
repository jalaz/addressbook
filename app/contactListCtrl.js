'use strict';

define(['app'], function(app) {
    app.controller('contactListCtrl', contactListCtrl);

    contactListCtrl.$inject = ['$scope','contactsRepo', 'groupsRepo'];

    function contactListCtrl($scope, contactsRepo, groupsRepo) {
        var vm = this;
        vm.activeIndex = 0;
        vm.contacts = contactsRepo.getContacts();
        vm.selectedGroup = '';
        vm.groups = groupsRepo.getGroups();
        $scope.filtered = vm.contacts;

        vm.select = function(index) {
            vm.activeIndex = index;
            openCurrentContact($scope.filtered);
        }

        $scope.$watch(function (scope) { return scope.filtered; }, function (newValue) {
            if (newValue.length - 1 < vm.activeIndex) {
                vm.activeIndex = 0;
            }
            if (newValue && newValue.length) {
                openCurrentContact(newValue);
            } else {
                vm.editContact = {};
            }
        }, true);

        vm.isNotValid = function(name) {
            return $scope.editForm[name].$dirty && $scope.editForm[name].$invalid;
        }

        vm.saveContact = function () {
            if ($scope.editForm.$valid) {
                if (typeof (vm.editContact.id) === 'undefined') {
                    var id = vm.contacts.length ? vm.contacts[vm.contacts.length - 1].id + 1 : 0;
                    vm.editContact.id = id;
                    vm.contacts.push(angular.copy(vm.editContact));
                    vm.activeIndex = vm.contacts.length - 1;
                }
                else {
                    vm.contacts[vm.activeIndex] = angular.copy(vm.editContact);
                }

                contactsRepo.saveContacts(vm.contacts);
                vm.groups = groupsRepo.getGroups();
                
                $scope.editForm.$setPristine();
            }
        }

        vm.deleteContact = function() {
            vm.contacts.splice(vm.activeIndex, 1);
            
            contactsRepo.saveContacts(vm.contacts);
            vm.groups = groupsRepo.getGroups();
        }

        vm.addNew = function () {
            vm.activeIndex = -1;
            vm.editContact = {};
        }

        $scope.contactFilter = function (contact) {
            var search = $scope.searchText;
            return (!search || (contact.firstName + ' ' + contact.lastName).toLowerCase().indexOf(search.toLowerCase()) > -1) && 
                    (!vm.selectedGroup || contact.group.toLowerCase() == vm.selectedGroup.toLowerCase());
        }

        function openCurrentContact(contacts) {
            vm.editContact = angular.copy(contacts[vm.activeIndex]);
        };
    }
});