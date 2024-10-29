import { useEffect, useState } from "react";

export const Playground = () => {
	const [message, setMessage] = useState<string>("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:8000");
				const data = await response.json();
				setMessage(data.message);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<h1>Playground</h1>
			<p>{message}</p>
		</div>
	);
};

export default Playground;
