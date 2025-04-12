import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Detailed() {
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

  function deleteUser(id) {
    fetch(`http://localhost:8080/usuarios/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsersData(usersData.filter((user) => user.idusuario !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="bg-white min-h-screen p-6 ">
      <div className="flex justify-center mb-6 gap-4">
        <Link to="/">
          <button className="bg-amber-400 p-3 px-6 rounded-lg cursor-pointer hover:bg-amber-500 shadow-md transition-all duration-200">
            Voltar
          </button>
        </Link>
        <button className="bg-cyan-400 p-3 px-6 rounded-lg cursor-pointer hover:bg-cyan-500 shadow-md transition-all duration-200">
          Adicionar Usuário
        </button>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        {usersData.length > 0 ? (
          usersData.map((user) => (
            <div
              className="flex justify-around h-28 mt-4 w-2/3"
              key={user.idusuario}
            >
              <div
                key={user.idusuario}
                className="bg-amber-100 p-6 w-1/2 rounded-lg shadow-md flex items-center justify-center"
              >
                <h2 className="text-md font-semibold">{user.nome}</h2>
              </div>
              <div className="flex gap-4 justify-center items-center">
                <button className="bg-purple-400 p-3 px-7 rounded-lg cursor-pointer hover:bg-purple-500 shadow-md transition-all duration-200">
                  Editar
                </button>

                <button
                  onClick={() => deleteUser(user.idusuario)}
                  className="bg-red-400 p-3 px-6 rounded-lg cursor-pointer hover:bg-red-500 shadow-md transition-all duration-200"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhum usuário encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default Detailed;
