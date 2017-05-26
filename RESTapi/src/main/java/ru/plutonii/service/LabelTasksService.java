package ru.plutonii.service;

import ru.plutonii.model.LabelTasks;

import java.util.List;

/**
 * Created by rakr on 5/26/2017.
 */
public interface LabelTasksService {
    LabelTasks addLabelTasks(LabelTasks labelTasks);
    void deleteLabelTasks(int id);
    List<LabelTasks> getLabelTasksListByTaskId(int taskId);
    List<Integer> getLabelIdsListByTaskId(int taskId);
}
