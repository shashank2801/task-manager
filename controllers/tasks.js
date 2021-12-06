const Task = require('../models/tasks');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async(req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
})

const createTask = asyncWrapper(async(req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });

})

const getTask = asyncWrapper(async(req, res, next) => {

    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });

    if (!task) {
        createCustomError(`No task with id: ${taskId}`, 404);
        // const error = new Error('Not Found');
        // error.status = 404;
        // return next(error);
        // res.status(404).json({ msg:  });
    }

    res.status(201).json({ task });

    // res.json({ "id": req.params.id });
})


const deleteTask = asyncWrapper(async(req, res) => {

    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task)
        createCustomError(`No task with id: ${taskId}`, 404);

    res.send(200).json({ task });

    // res.send('delete task');
})

const updateTask = asyncWrapper(async(req, res) => {

    const { id: taskId } = req.params;

    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
        new: true,
        runValidators: true,
    });


    if (!task)
        createCustomError(`No task with id: ${taskId}`, 404);

    res.status(200).json({ task });


    // res.send('update task');
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}