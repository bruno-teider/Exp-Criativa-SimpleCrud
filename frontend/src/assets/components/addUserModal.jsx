import React, { useState, useEffect } from "react";

function AddUserModal({ visible, setVisible, setRefresh }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [adduserData] = useState({
    nome: "",
    email: "",
    idade: "",
    comida_favorita: "",
  });

  const addUser = () => {
    fetch("http://localhost:8080/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adduserData),
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

  useEffect(() => {
    setSuccess(false);
    setError(false);
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.25)", zIndex: 50 }}
    >
      <div className="flex flex-col w-1/3 gap-4 justify-center bg-amber-100 p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold">Adicionar Usuário</h1>
        {success ? (
          <>
            <div className="bg-green-200 p-4 rounded-lg">
              <p className="text-green-700">Usuário adicionado com sucesso!</p>
            </div>
            <button
              onClick={() => {
                setVisible(false);
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
                Ocorreu um erro ao adicionar o usuário.
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
              placeholder="Nome"
              className="bg-amber-50 border border-gray-300 rounded-lg p-2 ml-4"
              onChange={(e) => (adduserData.nome = e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="bg-amber-50 border border-gray-300 rounded-lg p-2 ml-4"
              onChange={(e) => (adduserData.email = e.target.value)}
            />
            <input
              type="number"
              placeholder="Idade"
              className="bg-amber-50 border border-gray-300 rounded-lg p-2 ml-4"
              onChange={(e) => (adduserData.idade = e.target.value)}
            />
            <input
              type="text"
              placeholder="Comida Favorita"
              className="bg-amber-50 border border-gray-300 rounded-lg p-2 ml-4"
              onChange={(e) => (adduserData.comida_favorita = e.target.value)}
            />

            <div className="flex gap-4 justify-center items-center mt-2 px-4 py-2">
              <button
                onClick={() => setVisible(false)}
                className="w-full bg-red-400 p-3 px-6 rounded-lg cursor-pointer hover:bg-red-500 shadow-md transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={() => addUser()}
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

export default AddUserModal;
