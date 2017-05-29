package ru.plutonii.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.plutonii.dao.LabelTasksDAO;
import ru.plutonii.model.LabelTasks;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by rakr on 5/26/2017.
 */
@Service("labeltasksService")
public class LabelTasksServiceImpl implements LabelTasksService {

    private LabelTasksDAO labelTasksDAO;

    @Autowired
    public LabelTasksServiceImpl(LabelTasksDAO labelTasksDAO) {
        this.labelTasksDAO = labelTasksDAO;
    }

    @Override
    public LabelTasks addLabelTasks(LabelTasks labelTasks) {
        return labelTasksDAO.insert(labelTasks);
    }

    @Override
    public void deleteLabelTasks(int id) {
        labelTasksDAO.remove(labelTasksDAO.findById(id));
    }

    @Override
    public void deleteLabelTasks(int labelId, int taskId) {
        labelTasksDAO.removeByLabelIdAndTaskId(labelId, taskId);
    }

    @Override
    public List<LabelTasks> getLabelTasksListByTaskId(int taskId) {
        return labelTasksDAO.getLabelTasksByTaskId(taskId);
    }

    @Override
    public List<Integer> getLabelIdsListByTaskId(int taskId) {
        List<Integer> labelIds = new ArrayList<>();
        labelTasksDAO.getLabelTasksByTaskId(taskId).forEach((value)->{
            labelIds.add(value.getLabelId());
        });
        return labelIds;
    }
}
