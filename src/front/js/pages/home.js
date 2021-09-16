import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const [users, setUsers] = useState([]);
	const [text, setText] = useState("");
	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		fetch("https://reqres.in/api/users")
			.then(resp => {
				if (resp.ok) {
					return resp.json();
				}
			})
			.then(json => setUsers(json.data));
	}, []);

	const onChangeHandler = text => {
		let matches = [];
		if (text.length > 0) {
			matches = users.filter(user => {
				const regex = new RegExp(`${text}`, "gi");
				return user.email.match(regex);
			});
		}
		setSuggestions(matches);
		setText(text);
	};

	return (
		<div className="text-center mt-5">
			<div className="container">
				<input
					type="text"
					className="col-md-12 input"
					onChange={e => onChangeHandler(e.target.value)}
					value={text}
					onBlur={() => setSuggestions([])}
				/>
			</div>

			{suggestions &&
				suggestions.map((suggestion, i) => (
					<div key={i} className="suggestion col-md-12 justify-content-md-center">
						{suggestion.email}
					</div>
				))}
		</div>
	);
};
