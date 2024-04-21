import React from 'react';
import './style.css';
// Importam custom hook-urile.
import { useFetch } from './hooks/useFetch';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  // Pentru a folosi custom hook-ul useFetch, il apelam, dandu-i ca argument url-ul.
  const users = useFetch('https://jsonplaceholder.typicode.com/users');
  const posts = useFetch('https://jsonplaceholder.typicode.com/posts');
  // Pentru a folosi custom hook-ul useLocalStorage, il apelam, dandu-i ca argumente cheia din local storage si valoarea asociata.
  const [displayedCategory, setDisplayedCategory] = useLocalStorage(
    'displayedCategory',
    'users'
  );
  const [favoriteUser, setFavoriteUser] = useLocalStorage('favoriteUser', null);

  function handleUsersClick() {
    // Adaugam noua valoare pentru cheia displayedCategory din localStorage.
    setDisplayedCategory('users');
  }

  function handlePostsClick() {
    // Adaugam noua valoare pentru cheia displayedCategory din localStorage.
    setDisplayedCategory('posts');
  }

  function handleUserClick(name, email) {
    // Construim obiectul aduagat in localStorage.
    const favoriteUser = {
      name,
      email,
    };
    // Adaugam noua valoare pentru cheia users din localStorage.
    setFavoriteUser(favoriteUser);
  }

  return (
    <div className="App">
      <button onClick={handleUsersClick}>Afiseaza useri</button>
      <button onClick={handlePostsClick}>Afiseaza postari</button>
      <h1>User favorit</h1>
      {/* Afisam userul favorit. */}
      {favoriteUser ? (
        <div>
          <h2>{favoriteUser.name}</h2>
          <p>{favoriteUser.email}</p>
        </div>
      ) : (
        <p>Nu ai selectat un user favorit</p>
      )}
      {/* Avand in vedere ca useFetch returneaza null in prima faza, avem de pus o extra conditie. */}
      {/* Daca categoria afisata pe ecran este users si daca avem useri, ii afisam pe ecran. */}
      {displayedCategory === 'users' &&
        users &&
        users.map((user) => {
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
      {displayedCategory === 'posts' &&
        posts &&
        posts.map((post) => {
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
