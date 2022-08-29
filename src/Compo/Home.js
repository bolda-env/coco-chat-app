import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    document.title = `${user.username} - Coco`;
  });

  useEffect(() => {
    fetch(`http://localhost:5000/user/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const a = function() {
    localStorage.clear();
  };
  return (
    <div>
      Home {user.username} <button onClick={a}>logout</button>
    </div>
  );
}
