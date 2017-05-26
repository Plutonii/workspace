package ru.plutonii.model;

import javax.persistence.*;

/**
 * Created by rakr on 5/26/2017.
 */
@Entity(name = "labeltasks")
public class LabelTasks {
    private int id;
    private int labelId;
    private int taskId;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "labelId", nullable = false)
    public int getLabelId() {
        return labelId;
    }

    public void setLabelId(int labelId) {
        this.labelId = labelId;
    }

    @Basic
    @Column(name = "taskId", nullable = false)
    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }
}
