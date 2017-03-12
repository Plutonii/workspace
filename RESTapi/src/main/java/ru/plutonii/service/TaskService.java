package ru.plutonii.service;

import ru.plutonii.model.Task;

import java.util.List;

/**
 * Created by plutonii on 08.02.17.
 */
public interface TaskService {
    Task insert(Task task);
    void delete(int taskId);
    Task findById(int id);
    List<Task> findByMakerId(int id);
    List<Task> findByProjectId(int id);
}
