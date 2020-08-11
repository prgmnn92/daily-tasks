import React from 'react';

import TaskCard from '../taskcard/taskcard.component';

import './tasklist.styles.scss';

const TaskList = ({ title, tasks, startTask, finishTask, dropid, deleteTask }) => (
	<div className="tasklist">
		<h2 className="tasklist__header">{title}</h2>
		<div className="tasklist__list">
			{tasks && tasks.length ? (
				tasks.map((task, id) => {
					return (
						<TaskCard
							startTask={startTask}
							finishTask={finishTask}
							deleteTask={deleteTask}
							taskData={task}
							key={id}
							title={title}
						/>
					);
				})
			) : null}
		</div>
	</div>
);

export default TaskList;
