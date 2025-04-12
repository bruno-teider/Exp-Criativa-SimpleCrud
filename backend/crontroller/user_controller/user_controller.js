import { db } from "../../model/db.js";

export const getUser = (_, res) => {
  const q = "SELECT * FROM usuario";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const getSingleUser = (req, res) => {
  const idusuario = req.params.id;
  const q = "SELECT * FROM usuario WHERE idusuario = ?";
  db.query(q, [idusuario], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const postUser = (req, res) => {
  const { nome, idade, email, comida_favorita } = req.body;

  if (!nome || !idade || !email || !comida_favorita) {
    return res.status(400).json({
      error: "Por favor insira os campos corretos",
    });
  }

  const q =
    "INSERT INTO usuario (nome, idade, email, comida_favorita) VALUES (?, ?, ?, ?)";
  db.query(q, [nome, idade, email, comida_favorita], (err, data) => {
    if (err) return res.json(err);
    return res.status(201).json({ message: "Usuário criado com sucesso." });
  });
};

export const deleteUser = (req, res) => {
  const idusuario = req.params.id;
  const q = "DELETE FROM usuario WHERE idusuario = ?";
  db.query(q, [idusuario], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json({ message: "Usuário deletado com sucesso." });
  });
};

export const updateUser = (req, res) => {
  const idusuario = req.params.id;
  const updates = Object.entries(req.body);

  if (updates.length === 0) {
    return res.status(400).json({ error: "Nenhum campo atualizado." });
  }

  const setClause = updates.map(([key]) => `${key} = ?`).join(", ");
  const values = updates.map(([, value]) => value);
  const q = `UPDATE usuario SET ${setClause} WHERE idusuario = ?`;

  values.push(idusuario);

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json({ message: "Usuário atualizado com sucesso." });
  });
};
