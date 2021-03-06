'use strict';

angular.module('issueTrackingSystem.issues.issuesService', [])
    .factory('issuesService', [
        '$http',
        '$q',
        'authService',
        'BASE_URL',
        function($http, $q, authService, BASE_URL) {
            return {
                getIssueComments: function(id) {
                    var deferred = $q.defer(),
                        headers = authService.getAuthHeaders(),
                        request = {
                            method: 'GET',
                            url: BASE_URL + 'issues/'+id+'/comments',
                            headers: headers
                        };

                    $http(request).then(function(receivedComments){
                       deferred.resolve(receivedComments.data);
                    }, function(error) {
                        deferred.reject(error.data);
                    });


                    return deferred.promise;
                },

                getIssue: function(id) {
                    var deferred = $q.defer(),
                        headers = authService.getAuthHeaders(),
                        request = {
                            method: 'GET',
                            url: BASE_URL + 'issues/'+ id,
                            headers: headers
                        };

                    $http(request).then(function(receivedIssue) {
                        deferred.resolve(receivedIssue.data);
                    }, function (error) {
                        deferred.reject(error.data);
                    });

                    return deferred.promise;
                },

                addIssueComment: function(issueId, commentText, success, error) {
                    var request = {
                        method: 'POST',
                        url: BASE_URL+'issues/'+issueId+'/comments',
                        headers: authService.getAuthHeaders(),
                        data: {
                            Text: commentText
                        }
                    };

                    $http(request).success(success).error(error);

                },

                addIssue: function(title, description, dueDate, projectId, assigneeId, priorityId, labelOne, labelTwo, success, error) {
                    var request = {
                        method: 'POST',
                        url: BASE_URL+'issues',
                        headers: authService.getAuthHeaders(),
                        data: {
                            Title: title,
                            Description: description,
                            DueDate: dueDate,
                            ProjectId: projectId,
                            AssigneeId: assigneeId,
                            PriorityId: priorityId,
                            'Labels[0].Name': labelOne,
                            'Labels[1].Name': labelTwo
                        }
                    };

                    $http(request).success(success).error(error);
                }

            }
        }
    ]);