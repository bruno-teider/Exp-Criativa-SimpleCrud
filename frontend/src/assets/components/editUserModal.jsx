import React, { useState, useEffect } from "react";

function EditUserModal({ idusuario, setSelectedUserId, setRefresh }) {
  const [success, setSuccess] = useState(false);
  const visible = idusuario !== null;
  const [error, setError] = useState(false);

  const [editUserData, setEditUserData] = useState({
    nome: "",
    email: "",
    idade: "",
    comida_favorita: "",
  });

  const fetchUserData = React.useCallback(async (idusuario) => {
    try {
      const response = await fetch(
        `http://localhost:8080/usuario_unico/${idusuario}`
      );
      const data = await response.json();
      setEditUserData({
        nome: data[0].nome,
        email: data[0].email,
        idade: data[0].idade,
        comida_favorita: data[0].comida_favorita,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  const editUser = () => {
    fetch(`http://localhost:8080/usuarios/${idusuario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editUserData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(true);
          setSuccess(false);
        } else {
          setSuccess(true);
          setError(false);
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setSuccess(false);
    setError(false);
    fetchUserData(idusuario);
  }, [visible, fetchUserData, idusuario]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.25)", zIndex: 50 }}
    >
      <div className="flex flex-col w-1/3 gap-4 justify-center bg-amber-100 p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold">Editar Usuário</h1>
        {success ? (
          <>
            <div className="bg-green-200 p-4 rounded-lg">
              <p className="text-green-700">Usuário editado com sucesso!</p>
            </div>
            <button
              onClick={() => {
                setSelectedUserId(null);
                setRefresh(true);
              }}
              className="w-full bg-green-400 p-3 px-6 rounded-lg cursor-pointer hover:bg-green-500 shadow-md transition-all duration-200"
            >
              Fechar
            </button>
          </>
        ) : error ? (
          <>
            <div className="bg-red-200 p-4 rounded-lg">
              <p className="text-red-700">
                Ocorreu um erro ao editar o usuário.
              </p>
            </div>
            <button
              onClick={() => setError(false)}
              className="w-full bg-red-400 p-3 px-6 rounded-lg cursor-pointer hover:bg-red-500 shadow-md transition-all duration-200"
            >
              Tentar Novamente
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              className="bg-amber-50 border border-gray-300 rounded-lg p-2 ml-4"
              onChange={handleChange}
              value={editUserData.nome}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="bg-amber-50 border border-gray-300 rounded-lg p-2 ml-4"
              onChange={handleChange}
              value={editUserData.email}
            />
            <input
              type="number"
              name="idade"
              placeholder="Idade"
              className="bg-amber-50 border border-gray-300 rounded-lg p-2 ml-4"
              onChange={handleChange}
              value={editUserData.idade}
            />
            <input
              type="text"
              name="comida_favorita"
              placeholder="Comida Favorita"
              className="bg-amber-50 border border-gray-300 rounded-lg p-2 ml-4"
              onChange={handleChange}
              value={editUserData.comida_favorita}
            />

            <div className="flex gap-4 justify-center items-center mt-2 px-4 py-2">
              <button
                onClick={() => setSelectedUserId(null)}
                className="w-full bg-red-400 p-3 px-6 rounded-lg cursor-pointer hover:bg-red-500 shadow-md transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={() => editUser()}
                className="w-full bg-green-400 p-3 px-6 rounded-lg cursor-pointer hover:bg-green-500 shadow-md transition-all duration-200"
              >
                Enviar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EditUserModal;
