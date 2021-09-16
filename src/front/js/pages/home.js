import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const [products, setProducts] = useState([]);
	const [text, setText] = useState("");
	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		fetch("https://3001-bronze-fox-4ipzyv4w.ws-us15.gitpod.io/api/products")
			.then(resp => {
				if (resp.ok) {
					return resp.json();
				}
			})
			.then(json => setProducts(json.data));
	}, []);

	const onChangeHandler = text => {
		let matches = [];
		if (text.length > 0) {
			matches = products.filter(product => {
				const regex = new RegExp(`${text}`, "gi");
				return product.name.match(regex);
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
					<div
						onClick={() => setText(suggestion.name)}
						key={i}
						className="suggestion col-md-12 justify-content-md-center">
						{suggestion.name}
					</div>
				))}
		</div>
	);
};
