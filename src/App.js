import React, { useEffect, useState } from "react";
import "./style.css";

export default function App() {
	const [apiUsers, setApiUsers] = useState([]);
	// Adaugam un state pentru a salva postarile care vin de la JSON Placeholder.
	const [apiPosts, setApiPosts] = useState([]);
	// Adaugam un alt state pentru a decide ce afisam pe ecran. By default, afisam userii.
	const [displayedCategory, setDisplayedCategory] = useState("users");

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((data) => {
				setApiUsers(data);
			});

		// Cerem postarile de la server si actualizam state-ul.
		fetch("https://jsonplaceholder.typicode.com/posts")
			.then((response) => response.json())
			.then((data) => {
				setApiPosts(data);
			});
	}, []);

	function handleUsersClick() {
		// Adaugam noua valoare pentru cheia displayedCategory din localStorage.
		setDisplayedCategory("users");
	}

	function handlePostsClick() {
		// Adaugam noua valoare pentru cheia displayedCategory din localStorage.
		setDisplayedCategory("posts");
	}

	return (
		<div className="App">
			<button onClick={handleUsersClick}>Afiseaza useri</button>
			<button onClick={handlePostsClick}>Afiseaza postari</button>
			{/* Avand in vedere ca useFetch returneaza null in prima faza, avem de pus o extra conditie. */}
			{/* Daca categoria afisata pe ecran este users si daca avem useri, ii afisam pe ecran. */}
			{displayedCategory === "users" &&
				apiUsers.map((user) => {
					return (
						<div
							key={user.id}
							onClick={() => handleUserClick(user.name, user.email)}
						>
							<h2>{user.name}</h2>
							<p>{user.email}</p>
						</div>
					);
				})}
			{/* Avand in vedere ca useFetch returneaza null in prima faza, avem de pus o extra conditie. */}
			{/* Daca categoria afisata pe ecran este posts si daca avem postarile, le afisam pe ecran. */}
			{displayedCategory === "posts" &&
				apiPosts.map((post) => {
					return (
						<div key={post.id}>
							<h2>{post.title}</h2>
							<p>{post.body}</p>
						</div>
					);
				})}
		</div>
	);
}
