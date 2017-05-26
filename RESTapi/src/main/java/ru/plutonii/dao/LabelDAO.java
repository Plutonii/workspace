package ru.plutonii.dao;

import ru.plutonii.model.Label;

import java.util.List;

/**
 * Created by rakr on 5/26/2017.
 */
public interface LabelDAO {
    Label insert(Label label);
    void delete(Label label);
    List<Label> findByProjectId(int id);
    Label findById(int id);
}
