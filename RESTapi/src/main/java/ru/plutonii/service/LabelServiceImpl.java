package ru.plutonii.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.plutonii.dao.LabelDAO;
import ru.plutonii.model.Label;

import java.util.List;

/**
 * Created by rakr on 5/26/2017.
 */
@Service("labelService")
public class LabelServiceImpl implements LabelService {

    private LabelDAO labelDAO;

    @Autowired
    public LabelServiceImpl(LabelDAO labelDAO) {
        this.labelDAO = labelDAO;
    }

    @Override
    public Label addLabel(Label label) {
        return labelDAO.insert(label);
    }

    @Override
    public List<Label> getLabelsByProjectId(int projectId) {
        return labelDAO.findByProjectId(projectId);
    }

    @Override
    public Label getLabelById(int id) {
        return labelDAO.findById(id);
    }

    @Override
    public void deleteLabelById(int id) {
        labelDAO.delete(labelDAO.findById(id));
    }
}
