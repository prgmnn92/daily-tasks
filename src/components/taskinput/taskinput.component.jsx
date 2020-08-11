import React from 'react';

import { Form, Button } from 'react-bootstrap';

import './taskinput.styles.scss';

const TaskInput = ({ titleHandler, bodyHandler, title, body, addTask }) => (
	<div className="taskinput">
		<Form>
			<Form.Group controlId="exampleForm.ControlInput1">
				<Form.Label className="taskinput__label">Title</Form.Label>
				<Form.Control
					value={title}
					onChange={titleHandler}
					type="text"
					placeholder="title"
					className="taskinput__title-input"
				/>
			</Form.Group>
			<Form.Group controlId="exampleForm.ControlTextarea1">
				<Form.Label className="taskinput__label">Task Description</Form.Label>
				<Form.Control
					value={body}
					onChange={bodyHandler}
					as="textarea"
					rows="6"
					className="taskinput__body-input"
				/>
			</Form.Group>
		</Form>
		<Button onClick={addTask} variant="primary" className="taskinput__btn">
			ADD
		</Button>
	</div>
);

export default TaskInput;
