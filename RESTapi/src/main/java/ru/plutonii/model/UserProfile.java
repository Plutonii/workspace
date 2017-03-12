package ru.plutonii.model;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Created by plutonii on 12.03.17.
 */
@Entity(name = "user_profile")
@Table(name = "user_profile", schema = "workspace")
public class UserProfile {
    private int userId;
    private Timestamp lastActivity;
    private int numberOfTasks;
    private int numberOfCompletedTasks;
    private int numberOfProjects;
    private String pathOfAvatar;

    @Id
    @Column(name = "user_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "last_activity", nullable = true)
    public Timestamp getLastActivity() {
        return lastActivity;
    }

    public void setLastActivity(Timestamp lastActivity) {
        this.lastActivity = lastActivity;
    }

    @Basic
    @Column(name = "number_of_tasks", nullable = false)
    public int getNumberOfTasks() {
        return numberOfTasks;
    }

    public void setNumberOfTasks(int numberOfTasks) {
        this.numberOfTasks = numberOfTasks;
    }

    @Basic
    @Column(name = "number_of_completed_tasks", nullable = false)
    public int getNumberOfCompletedTasks() {
        return numberOfCompletedTasks;
    }

    public void setNumberOfCompletedTasks(int numberOfCompletedTasks) {
        this.numberOfCompletedTasks = numberOfCompletedTasks;
    }

    @Basic
    @Column(name = "number_of_projects", nullable = false)
    public int getNumberOfProjects() {
        return numberOfProjects;
    }

    public void setNumberOfProjects(int numberOfProjects) {
        this.numberOfProjects = numberOfProjects;
    }

    @Basic
    @Column(name = "path_of_avatar", nullable = true, length = 255)
    public String getPathOfAvatar() {
        return pathOfAvatar;
    }

    public void setPathOfAvatar(String pathOfAvatar) {
        this.pathOfAvatar = pathOfAvatar;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserProfile that = (UserProfile) o;

        if (userId != that.userId) return false;
        if (numberOfTasks != that.numberOfTasks) return false;
        if (numberOfCompletedTasks != that.numberOfCompletedTasks) return false;
        if (numberOfProjects != that.numberOfProjects) return false;
        if (lastActivity != null ? !lastActivity.equals(that.lastActivity) : that.lastActivity != null) return false;
        if (pathOfAvatar != null ? !pathOfAvatar.equals(that.pathOfAvatar) : that.pathOfAvatar != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = userId;
        result = 31 * result + (lastActivity != null ? lastActivity.hashCode() : 0);
        result = 31 * result + numberOfTasks;
        result = 31 * result + numberOfCompletedTasks;
        result = 31 * result + numberOfProjects;
        result = 31 * result + (pathOfAvatar != null ? pathOfAvatar.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "UserProfile{" +
                "userId=" + userId +
                ", lastActivity=" + lastActivity +
                ", numberOfTasks=" + numberOfTasks +
                ", numberOfCompletedTasks=" + numberOfCompletedTasks +
                ", numberOfProjects=" + numberOfProjects +
                '}';
    }
}
