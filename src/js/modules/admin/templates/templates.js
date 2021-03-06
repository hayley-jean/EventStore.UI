define(['angular'], function (angular) {'use strict'; (function(module) {
try {
  module = angular.module('es-ui.admin.templates');
} catch (e) {
  module = angular.module('es-ui.admin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('admin.tpl.html',
    '<header class=page-header><h2 class=page-title>Admin</h2><ul class=page-nav><li class=page-nav__item><a href=# ng-click=shutdown($event)>Shutdown Server</a></li><li class=page-nav__item><a href=# ng-click=scavenge($event)>Scavenge</a></li></ul></header><div class=container><div class=container-left><table><thead><tr><th>Enabled Sub Systems</th></tr></thead><tbody><tr ng-repeat="subSystem in subSystems"><td>{{ subSystem }}</td></tr><tr ng-hide=subSystems><td><em>No sub systems are running.</em></td></tr></tbody></table></div><div class=container-right><table><thead><tr><th>Scavenge Status<span ng-show=scavengeRunning>- <em>Running</em></span></th><th>Time</th></tr></thead><tbody><tr ng-hide="scavengeMessages.length > 0 || scavengeRunning"><td><em>No scavenge in progress.</em></td><td></td></tr><tr ng-show="scavengeRunning && scavengeMessages.length == 0"><td>Scavenging ...</td><td></td></tr><tr ng-repeat="message in scavengeMessages"><td>{{message.operation}}</td><td>{{message.time}}</td></tr></tbody></table></div></div>');
}]);
})();
 });