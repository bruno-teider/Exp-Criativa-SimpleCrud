import { Link } from "react-router-dom";
import "../../App.css";
import { useEffect, useState } from "react";
import React from "react";

function Main() {
  const [usersData, setUsersData] = useState([]);

  function getUserData() {
    fetch("http://localhost:8080/usuarios")
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="bg-white min-h-screen p-6 ">
      <div className="flex justify-center mb-6">
        <Link to="/crud">
          <button className="bg-amber-400 p-3 px-6 rounded-lg cursor-pointer hover:bg-amber-500 shadow-md transition-all duration-200">
            Cadastrar, editar ou excluir
          </button>
        </Link>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Mural de Usuários
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {usersData.length > 0 ? (
            usersData.map((user) => (
              <Link to={`/detailed/${user.idusuario}`}>
                <div
                  key={user.idusuario}
                  className="bg-amber-100 p-6 h-28 rounded-lg shadow-md hover:shadow-lg cursor-pointer hover:bg-amber-200 transition-all duration-200 flex items-center justify-center"
                >
                  <h2 className="text-md font-semibold">{user.nome}</h2>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">Nenhum usuário encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
