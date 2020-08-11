import React from 'react';

import './dashboard.styles.scss';
import TaskList from '../tasklist/tasklist.component';

const Dashboard = ({ openTasks, progressTasks, doneTasks, startTask, finishTask, dragEnd, deleteTask }) => (
	<div className="dashboard">
		<TaskList
			startTask={startTask}
			finishTask={finishTask}
			deleteTask={deleteTask}
			title="Open"
			tasks={openTasks}
		/>
		<TaskList
			startTask={startTask}
			finishTask={finishTask}
			deleteTask={deleteTask}
			title="In Progress"
			tasks={progressTasks}
		/>
		<TaskList
			startTask={startTask}
			finishTask={finishTask}
			deleteTask={deleteTask}
			title="Done"
			tasks={doneTasks}
		/>
	</div>
);

export default Dashboard;
