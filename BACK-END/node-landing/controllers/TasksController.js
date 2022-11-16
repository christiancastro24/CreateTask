const Tasks = require('../models/Tasks')
const User = require('../models/User')
const jwt = require("jsonwebtoken");

module.exports = class TasksController {

    /** @TAREFAS DO USUÁRIO */
    static async getTasks(req, res) {
        const { UserId } = req.body

        const tasks = await Tasks.findAll({ raw: true,  where: { UserId: UserId}})
        return res.status(200).json({ tasks })
    }

    /** @CRIAR TAREFA */
    static async createTasks(req, res) {
        const { title, description, UserId } = req.body
        
        try {
            await Tasks.create({ title, description, UserId: UserId })
            return res.status(200).json({ title, description, UserId })

        } catch (err) {
            return res.status(500).json({ message: "Erro ao criar Tarefa" })
        }
    }

    /** @ACESSAR TAREFA ESPECÍFICA */
    static async getTask(req, res) {
        const { id } = req.params

        try {
            const task = await Tasks.findOne({ where: { id: id } })
            return res.status(200).json({ task })

        } catch (err) {
            return res.status(404).json({ message: "Erro ao achar a task", return: err.message})
        }
    }


    /** @DELETAR TAREFA */
    static async deleteTask(req, res) {
        const { id } = req.params

        try {
            await Tasks.destroy({ where: { id: id }})
            return res.status(200).json({ message: "Tarefa excluída com sucesso", status: "success"})

        } catch (err) {
            return res.status(401).json({ message: "Erro ao excluir tarefa", status: err.message })
        }
    }
}