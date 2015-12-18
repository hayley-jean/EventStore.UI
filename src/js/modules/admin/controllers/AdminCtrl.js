define(['./_module'], function (app) {

    'use strict';

    return app.controller('AdminCtrl', [
		'$scope', 'AdminService', 'MessageService', 'poller',
		function ($scope, adminService, msg, poller) {
			$scope.subSystems = [];
			adminService.getSubsystems()
			.success(function(data){
				if(!data){
					return;
				}
				$scope.subSystems = data;
			})
			.error(function(){
				msg.failure('Could not retrieve sub systems');
			});
			var stop = function ($event) {
					$event.preventDefault();
					$event.stopPropagation();
				};

			$scope.shutdown = function ($event) {
				stop($event);
				var confirmation = msg.confirm('Are you sure you wish to shutdown the node?');
				if(!confirmation) {
					return;
				}
				adminService.shutdown().then(function () {
					msg.success('Server shutdown initiated');
				}, function () {
					msg.failure('Shutdown failed');
				});
			};

			$scope.scavenge = function ($event) {
				stop($event);

				adminService.scavenge().then(function () {
					msg.success('Scavenge initiated');
                    // set up the polling service here.
                    setupScavengeStatusPoller();
				}, function () {
					msg.failure('Scavenge failed');
				});
			};

            var scavengeQuery;
            $scope.scavengeRunning = false;
            function setupScavengeStatusPoller() {
                if($scope.scavengeRunning) {
                    return;
                }
				scavengeQuery = poller.create({
			        interval: 1000,
			        action: adminService.scavengeStatus,
			        params: []
			    });
			    scavengeQuery.start();
                $scope.scavengeRunning = true;
			    scavengeQuery.promise.then(null, null, function (response) {
		            $scope.scavengeMessages = response.statusMessages;
                    if(response.complete) {
                        msg.success('Scavenge completed');
                        $scope.scavengeRunning = false;
                        scavengeQuery.stop();
                    }
			    });
			}
		}
	]);
});
