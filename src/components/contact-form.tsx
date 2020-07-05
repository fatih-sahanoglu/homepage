import React from "react";
import {Column, PADDING, Row} from "./grid";
import styled from "styled-components";
export interface Props {}
export interface State {
	status: string;
}

const Label = styled.div``;

const Button = styled.button`
	background: #ddd;
	color: black;
	border: 0;
	border-radius: 2px;
	padding: 0.5em calc(var(${PADDING}) * 1px);
	cursor: pointer;
	&:active {
		background: #bbb;
	}
`;
const Input = styled.input`
	background: white;
	color: black;
	border: 1px solid #ddd;
	border-radius: 2px;
	padding: 0.5em calc(var(${PADDING}) * 1px);
	width: 100%;
`;
const Textarea = styled.textarea`
	background: white;
	color: black;
	border: 1px solid #ddd;
	border-radius: 2px;
	padding: 0.5em calc(var(${PADDING}) * 1px);
	width: 100%;
`;

export default class ContactForm extends React.Component<Props, State> {
	public state = {
		status
	};
	constructor(props) {
		super(props);
		this.submitForm = this.submitForm.bind(this);
		this.state = {
			status: ""
		};
	}

	render() {
		const {status} = this.state;
		return (
			<Column>
				<form
					onSubmit={this.submitForm}
					action="https://formspree.io/xrgyykye"
					method="POST">
					<Row>
						<Column m={4} raw>
							<label>
								<Label>Email:</Label>
								<Input type="email" name="email" />
							</label>
						</Column>
						<Column />
						<Column m={4} raw>
							<label>
								<Label>Message:</Label>
								<Textarea name="message" />
							</label>
						</Column>
						<Column raw>
							{status === "SUCCESS" ? <p>Thanks!</p> : <Button>Submit</Button>}
							{status === "ERROR" && <p>Ooops! There was an error.</p>}
						</Column>
					</Row>
				</form>
			</Column>
		);
	}

	submitForm(ev) {
		ev.preventDefault();
		const form = ev.target;
		const data = new FormData(form);
		const xhr = new XMLHttpRequest();
		xhr.open(form.method, form.action);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.onreadystatechange = () => {
			if (xhr.readyState !== XMLHttpRequest.DONE) return;
			if (xhr.status === 200) {
				form.reset();
				this.setState({status: "SUCCESS"});
			} else {
				this.setState({status: "ERROR"});
			}
		};
		xhr.send(data);
	}
}
