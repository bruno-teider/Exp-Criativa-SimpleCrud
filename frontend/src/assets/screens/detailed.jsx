import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Detailed() {
  const { userId } = useParams();
  const [userData, setUsersData] = useState([]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/usuario_unico/${userId}`
      );
      const data = await response.json();
      setUsersData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData(userId);
  }, [userId]);

  return (
    <div className="bg-white min-h-screen p-6 ">
      <div className="flex justify-center mb-6">
        <Link to="/">
          <button className="bg-amber-400 p-3 px-6 rounded-lg cursor-pointer hover:bg-amber-500 shadow-md transition-all duration-200">
            Voltar
          </button>
        </Link>
      </div>

      {userData.length > 0 ? (
        <div className="flex flex-col items-center w-full">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {userData[0].nome}
          </h2>

          <div
            key={userData[0].idusuario}
            className=" bg-amber-100 p-6 flex-col rounded-lg shadow-md hover:shadow-lg hover:bg-amber-200 transition-all duration-200 flex items-center justify-center"
          >
            <h2 className="text-md font-semibold">
              Id Usuário: {userData[0].idusuario}
            </h2>
            <h2 className="text-md font-semibold">
              Idade: {userData[0].idade}
            </h2>
            <h2 className="text-md font-semibold">
              Email: {userData[0].email}
            </h2>
            <h2 className="text-md font-semibold">
              Comida Favorita: {userData[0].comida_favorita}
            </h2>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Nenhum usuário encontrado.</p>
      )}
    </div>
  );
}

export default Detailed;
