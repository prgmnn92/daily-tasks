import React from 'react';
import moment from 'moment';
import { Button, Row, Col, Card } from 'react-bootstrap';

import './taskcard.styles.scss';

const styles = {
	taskcard: {
		backgroundColor: '#fff',
		padding: '1rem .8rem',
		borderRadius: '5px',
		maxHeight: '18rem',
		height: '18rem',
		marginBottom: '1rem'
	},
	title: {
		marginBottom: '1rem',
		fontSize: '1.8rem',
		fontWeight: 'bold'
	},
	body: {
		fontSize: '1.4rem'
	},
	text: {
		marginBottom: '1rem'
	},
	buttons: {
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		marginBottom: '.2rem'
	},
	time: {
		fontWeight: 'bold',
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '.2rem'
	},
	deleteBtn: {
		position: 'absolute',
		top: '1rem',
		right: '1rem',
		cursor: 'pointer'
	}
};

const TaskCard = ({ taskData, startTask, finishTask, deleteTask, title }) => {
	const dateHandler = (date) => {
		if (date === undefined) {
			return '---';
		}

		return moment(date).format('hh:mm a');
	};

	return (
		<Card style={styles.taskcard} className="taskcard">
			<div onClick={() => deleteTask(title, taskData.id)} style={styles.deleteBtn}>
				X
			</div>
			<Card.Body style={styles.body}>
				<Card.Title>
					<h3 style={styles.title}>{taskData.title}</h3>
				</Card.Title>
				<p style={styles.text}>{taskData.body}</p>

				<Row>
					<Col sm={6}>
						<p style={styles.time}>
							<span>Started at:</span>
							<span>{dateHandler(taskData.startedAt)}</span>
						</p>
						<p style={styles.time}>
							<span>Finished at:</span>
							<span>{dateHandler(taskData.finishedAt)}</span>
						</p>
					</Col>
					<Col style={styles.buttons} sm={6}>
						<Button
							size="lg"
							variant="primary"
							disabled={taskData.isFinished === true || taskData.isFinished === false}
							className={'taskcard__btn'}
							onClick={() => startTask(taskData.id)}
						>
							START
						</Button>
						<Button
							size="lg"
							variant="primary"
							disabled={taskData.isFinished === undefined || taskData.isFinished === true}
							className={'taskcard__btn'}
							onClick={() => finishTask(taskData.id)}
						>
							FINISH
						</Button>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default TaskCard;
