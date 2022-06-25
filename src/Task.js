import React from 'react';
import Styles from './css/style.module.css';
import ClassNames from 'classnames'

const Task = ({ task, toggleTask }) => {
	var handleTaskClick = () => {
		toggleTask(task.id)
	};

	return (
		<div className={ClassNames(Styles.tasks, task.taskClassName, task.displayStateClassName)}>
			<label>
				<input
					type="checkbox"
					checked={task.checked}
					readOnly
					onChange={handleTaskClick} />
				<span>{task.name}</span>
			</label>
		</div>
	)
}

export default Task