package ru.plutonii.dao;

import ru.plutonii.model.LabelTasks;

import java.util.List;

/**
 * Created by rakr on 5/26/2017.
 */
public interface LabelTasksDAO {
    LabelTasks insert(LabelTasks labelTasks);
    void remove(LabelTasks labelTasks);
    void removeByLabelIdAndTaskId(int labelId, int taskId);
    List<LabelTasks> getLabelTasksByTaskId(int id);
    LabelTasks findById(int id);
}
