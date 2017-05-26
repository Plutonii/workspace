package ru.plutonii.service;

import ru.plutonii.model.Label;

import java.util.List;

/**
 * Created by rakr on 5/26/2017.
 */
public interface LabelService {
    Label addLabel(Label label);
    List<Label> getLabelsByProjectId(int projectId);
    Label getLabelById(int id);
    void deleteLabelById(int id);
}
