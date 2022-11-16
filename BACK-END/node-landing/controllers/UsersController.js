const User = require("../models/User");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class UserController {

  /** @REGISTER */

  static async createAccount(req, res) {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ where: { email: email } });

      if (userExist) {
        return res.status(400).json({ status: "Error", message: "Usuário já existe com esse e-mail, escolha outro" });
      }
    

    if(!name || !password) {
      return res.status(400).json({ message: "O nome e senha são obrigatórios"})
    }

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    return res.status(200).json({
      status: "success",
      id: user.id,
      name,
      email,
      password,
    });
  }

    /** @LOGIN */
    
    static async login(req, res) {
      const { email, password } = req.body;
  
      const user = await User.findOne({ where: { email: email } });
  
      const generateToken = jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + 60 * 60, UserId: user?.id },
        "secret"
      );
  
      if (!user) {
        return res.status(404).json({ message: "Erro ao achar usuário!" });
      }
  
      const passwordMatch = bcrypt.compareSync(password, user.password);
  
      if (!passwordMatch) {
        return res.status(403).json({ message: "Senha inválida" });
      }

      req.session.idUser = user.id
      console.log(req.session)

      return res.status(200).json({
        status: "success",
        email,
        password,
        token: generateToken,
        code: 200,
      });
  
    }

  /** @TODOS @USUÁRIOS */

  static async getUsers(req, res) {
    const users = await User.findAll({ raw: true });
    return res.status(200).json({ users });
  }

  /** @USUÁRIO @ESPECIFÍCO */
  static async getAccountUser(req, res) {
    const { id } = req.params;

    const userExist = await User.findOne({ raw: true, where: { id: id } });

    const { name, email, image } = userExist;

    if (!userExist) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json({ name, email, image });
  }


  /** @ATUALIZAÇÃO */

  static async updateUser(req, res) {
    const { name, email } = req.body;
    const { id } = req.params;

    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      return res.status(404).json({ message: "Erro ao achar usuário!" });
    }

    let image = ''

    if (req.file) {
      image = req.file.filename
    }

    if (image) {
      const imageName = req.file.filename
      user.image = imageName
    }
 
    try {
      await User.update({name, email, image}, { where: { id: id } });
      return res
        .status(200)
        .json({ message: "Sucesso ao editar usuário", status: "success", user });
    } catch (err) {
      return res.status(403).json({ message: err.message, status: "oi" });
    }
  }

  /** @DELETAR */

  static async deleteUser(req, res) {
    const { id } = req.params;

    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      return res.status(404).json({ message: "Erro ao achar usuário!" });
    }

    try {
      await User.destroy({ where: { id: id } });
      return res
        .status(200)
        .json({ message: "Uusário excluído", status: "success" });
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  }
};