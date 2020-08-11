import React, { Component } from 'react';

import './home.styles.scss';
import Sidebar from '../../components/sidebar/sidebar.component';
import Dashboard from '../../components/dashboard/dashboard.component';
import Modal from '../../components/modal/modal.component';

class Home extends Component {
	state = {
		openTasks: [],
		progressTasks: [],
		doneTasks: [],
		title: '',
		body: '',
		showModal: false
	};

	componentDidMount() {
		let openTasks = JSON.parse(localStorage.getItem('openTasks'));
		let progressTasks = JSON.parse(localStorage.getItem('progressTasks'));
		let doneTasks = JSON.parse(localStorage.getItem('doneTasks'));
		let showModal = false;

		if (!openTasks && !progressTasks && !doneTasks) {
			showModal = true;
		}

		this.setState({
			openTasks: openTasks !== null ? [ ...openTasks ] : [],
			progressTasks: progressTasks !== null ? [ ...progressTasks ] : [],
			doneTasks: doneTasks !== null ? [ ...doneTasks ] : [],
			showModal: showModal
		});
	}

	ID = () => {
		return '_' + Math.random().toString(36).substr(2, 9);
	};

	onChangeTitle = (e) => {
		this.setState({ title: e.currentTarget.value });
	};
	onChangeBody = (e) => {
		this.setState({ body: e.currentTarget.value });
	};

	deleteTask = (listName, id) => {
		if (listName.toLowerCase().includes('open')) {
			this.setState(
				{
					...this.state,
					openTasks: this.state.openTasks.filter((task) => task.id !== id)
				},
				() => {
					localStorage.setItem('openTasks', JSON.stringify(this.state.openTasks));
				}
			);
		}

		if (listName.toLowerCase().includes('progress')) {
			this.setState(
				{
					...this.state,
					progressTasks: this.state.progressTasks.filter((task) => task.id !== id)
				},
				() => {
					localStorage.setItem('progressTasks', JSON.stringify(this.state.progressTasks));
				}
			);
		}

		if (listName.toLowerCase().includes('done')) {
			this.setState(
				{
					...this.state,
					doneTasks: this.state.doneTasks.filter((task) => task.id !== id)
				},
				() => {
					localStorage.setItem('doneTasks', JSON.stringify(this.state.doneTasks));
				}
			);
		}
	};

	addTaskHandler = () => {
		if (!this.state.title || !this.state.body) {
			return null;
		}

		this.setState(
			{
				...this.state,
				title: '',
				body: '',
				openTasks: [
					...this.state.openTasks,
					{
						id: this.ID(),
						title: this.state.title,
						body: this.state.body,
						startedAt: undefined,
						finishedAt: undefined,
						isFinished: undefined
					}
				]
			},
			() => {
				localStorage.setItem('openTasks', JSON.stringify(this.state.openTasks));
			}
		);
	};

	startTaskHandler = (id) => {
		let newProgressTasks = [ ...this.state.progressTasks ];
		let newOpenTasks = this.state.openTasks.filter((task) => {
			if (task.id === id) {
				task.startedAt = new Date();
				task.isFinished = false;
				newProgressTasks.push(task);
				console.log(task);
				return false;
			}
			return true;
		});

		this.setState((state) => ({
			...state,
			openTasks: [ ...newOpenTasks ],
			progressTasks: [ ...newProgressTasks ]
		}));
		localStorage.setItem('openTasks', JSON.stringify(newOpenTasks));
		localStorage.setItem('progressTasks', JSON.stringify(newProgressTasks));
	};

	finishTaskHandler = (id) => {
		let newDoneTasks = [ ...this.state.doneTasks ];
		let newProgressTasks = this.state.progressTasks.filter((task) => {
			if (task.id === id) {
				task.finishedAt = new Date();
				task.isFinished = true;
				newDoneTasks.push(task);
				return false;
			}
			return true;
		});

		this.setState((state) => ({
			...state,
			doneTasks: [ ...newDoneTasks ],
			progressTasks: [ ...newProgressTasks ]
		}));
		localStorage.setItem('doneTasks', JSON.stringify(newDoneTasks));
		localStorage.setItem('progressTasks', JSON.stringify(newProgressTasks));
	};

	render() {
		return (
			<div className="home">
				{this.state.showModal ? <Modal /> : null}
				<Sidebar
					titleHandler={this.onChangeTitle}
					bodyHandler={this.onChangeBody}
					title={this.state.title}
					body={this.state.body}
					addTask={this.addTaskHandler}
				/>
				<Dashboard
					dragEnd={this.dragEnd}
					startTask={this.startTaskHandler}
					finishTask={this.finishTaskHandler}
					deleteTask={this.deleteTask}
					openTasks={this.state.openTasks}
					progressTasks={this.state.progressTasks}
					doneTasks={this.state.doneTasks}
				/>
			</div>
		);
	}
}

export default Home;
