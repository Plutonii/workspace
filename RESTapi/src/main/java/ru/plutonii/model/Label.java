package ru.plutonii.model;

import javax.persistence.*;

/**
 * Created by plutonii on 20.05.17.
 */
@Entity(name = "label")
public class Label {
    private int id;
    private String title;
    private Integer colourId;
    private Project project;

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
    @Column(name = "title", nullable = true, length = 45)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "colourId", nullable = false)
    public Integer getColourId() {
        return colourId;
    }

    public void setColourId(Integer colourId) {
        this.colourId = colourId;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "projectId", nullable = false)
    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
