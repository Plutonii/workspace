package ru.plutonii.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.plutonii.dao.TaskDAO;
import ru.plutonii.exception.TaskNotFound;
import ru.plutonii.model.Task;

import java.util.List;

/**
 * Created by plutonii on 08.02.17.
 */
@Service
public class TaskServiceImpl implements TaskService {

    private TaskDAO taskDAO;

    @Autowired
    public TaskServiceImpl(TaskDAO taskDAO) {
        this.taskDAO = taskDAO;
    }

    public Task insert(Task task) {
        return taskDAO.insert(task);
    }

    public void delete(Task task) {
        taskDAO.delete(task);
    }

    public Task findById(int id) {
        Task realTask = taskDAO.findById(id);
        if (realTask == null) throw new TaskNotFound("task not exists");
        return realTask;
    }

    public List<Task> findByMakerId(int id) {
        List<Task> realTask = taskDAO.findByMakerId(id);
        if (realTask == null) throw new TaskNotFound("task not exists");
        return realTask;
    }

    public List<Task> findByProjectId(int id) {
        List<Task> realTask = taskDAO.findByProjectId(id);
        if (realTask == null) throw new TaskNotFound("task not exists");
        return realTask;
    }
}
