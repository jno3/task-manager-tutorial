const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json({ tasks });

    }
    catch (err) {
        return res.status(500).json({ msg: err });
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        return res.status(201).json({ task });
    }
    catch (err) {
        return res.status(500).json({ msg: err });
    }
}

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOne({ _id: taskID });
        if (!task) {
            return res.status(404).json({ msg: `no task with id ${taskID}` });
        }
        return res.status(200).json({ task });
    }
    catch (err) {
        return res.status(500).json({ msg: err });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID });
        if (!task) {
            return res.status(404).json({ msg: `no task with id ${taskID}` });
        }
        return res.status(200).json({ task });
    }
    catch (err) {
        return res.status(500).json({ msg: err });
    }
}

const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true
        });
        if (!task) {
            return res.status(404).json({ msg: `no task with id ${taskID}` });
        }
        return res.status(200).json({ task });
    }
    catch (err) {
        return res.status(500).json({ msg: err });
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}