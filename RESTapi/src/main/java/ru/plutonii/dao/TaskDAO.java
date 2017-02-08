package ru.plutonii.dao;

import ru.plutonii.model.Task;

import java.util.List;

/**
 * Created by plutonii on 08.02.17.
 */
public interface TaskDAO {
    Task insert(Task task);
    void delete(Task task);
    Task findById(int id);
    List<Task> findByMakerId(int id);
    List<Task> findByProjectId(int id);
}
