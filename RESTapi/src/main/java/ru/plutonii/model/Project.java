package ru.plutonii.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by plutonii on 26.02.17.
 */
@Entity(name = "project")
@Table(name = "project")
public class Project {
    private int id;
    private String title;
    private String description;
    private User user;
    private Integer numberOfTasks;
    private Integer numberOfCompletedTasks;
    private Integer numberOfUsers;

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
    @Column(name = "title", nullable = false, length = 45)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "description", nullable = true, length = 255)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    @Basic
    @Column(name = "number_of_tasks", nullable = true)
    public Integer getNumberOfTasks() {
        return numberOfTasks;
    }

    public void setNumberOfTasks(Integer numberOfTasks) {
        this.numberOfTasks = numberOfTasks;
    }

    @Basic
    @Column(name = "number_of_completed_tasks", nullable = true)
    public Integer getNumberOfCompletedTasks() {
        return numberOfCompletedTasks;
    }

    public void setNumberOfCompletedTasks(Integer numberOfCompletedTasks) {
        this.numberOfCompletedTasks = numberOfCompletedTasks;
    }

    @Basic
    @Column(name = "number_of_users", nullable = true)
    public Integer getNumberOfUsers() {
        return numberOfUsers;
    }

    public void setNumberOfUsers(Integer numberOfUsers) {
        this.numberOfUsers = numberOfUsers;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Project project = (Project) o;

        if (id != project.id) return false;
        if (title != null ? !title.equals(project.title) : project.title != null) return false;
        if (description != null ? !description.equals(project.description) : project.description != null) return false;
        if (user != null ? !user.equals(project.user) : project.user != null) return false;
        if (numberOfTasks != null ? !numberOfTasks.equals(project.numberOfTasks) : project.numberOfTasks != null)
            return false;
        if (numberOfCompletedTasks != null ? !numberOfCompletedTasks.equals(project.numberOfCompletedTasks) : project.numberOfCompletedTasks != null)
            return false;
        return numberOfUsers != null ? numberOfUsers.equals(project.numberOfUsers) : project.numberOfUsers == null;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (user != null ? user.hashCode() : 0);
        result = 31 * result + (numberOfTasks != null ? numberOfTasks.hashCode() : 0);
        result = 31 * result + (numberOfCompletedTasks != null ? numberOfCompletedTasks.hashCode() : 0);
        result = 31 * result + (numberOfUsers != null ? numberOfUsers.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", user=" + user +
                ", numberOfTasks=" + numberOfTasks +
                ", numberOfCompletedTasks=" + numberOfCompletedTasks +
                ", numberOfUsers=" + numberOfUsers +
                '}';
    }
}
