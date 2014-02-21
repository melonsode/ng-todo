var mainCtrl = function($scope, $http) {
	// { "body": "hogehoge", "done": false}
	
	var storage = localStorage;
	//console.log( storage.getItem("tasksStr") );
	if(storage.getItem("tasksStr")){
		$scope.tasks = JSON.parse( storage.getItem("tasksStr") );	
	}else{
		$scope.tasks = [];
	}
	if(storage.getItem("doneTasksStr")){
		$scope.doneTasks = JSON.parse( storage.getItem("doneTasksStr") );	
	}else{
		$scope.doneTasks = [];
	}

	$scope.addNew = function(){
		if($scope.newTaskBody == ''){
			return;
		}
		$scope.tasks.push({ "body": $scope.newTaskBody, "done": false});
		$scope.newTaskBody = '';
		storage.setItem("tasksStr", JSON.stringify($scope.tasks) );
	}

	$scope.getDoneCount = function(){
		var count = 0;
		angular.forEach($scope.tasks, function(task){
			count += task.done ? 1 : 0;
		});
		return count;
	}
	
	$scope.getProgress = function(){
		var count = $scope.getDoneCount();
		var percent = parseInt( ( count / $scope.tasks.length ) * 100 );
		return percent;
	}

	$scope.deleteDone = function(){
		var oldTasks = $scope.tasks;
		$scope.tasks = [];
		angular.forEach(oldTasks, function(task){
			if(!task.done){
				$scope.tasks.push(task);				
			}else{
				task.doneDate = new Date();
				$scope.doneTasks.unshift(task);
			}
		});
		storage.setItem("tasksStr", JSON.stringify($scope.tasks) );
		storage.setItem("doneTasksStr", JSON.stringify($scope.doneTasks) );
	}
}