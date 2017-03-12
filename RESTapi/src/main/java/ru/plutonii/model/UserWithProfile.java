package ru.plutonii.model;

/**
 * Created by plutonii on 12.03.17.
 */
public class UserWithProfile {
    private User user;
    private UserProfile userProfile;

    public UserWithProfile() {
    }

    public UserWithProfile(User user, UserProfile userProfile) {
        this.user = user;
        this.userProfile = userProfile;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserWithProfile that = (UserWithProfile) o;

        if (user != null ? !user.equals(that.user) : that.user != null) return false;
        return userProfile != null ? userProfile.equals(that.userProfile) : that.userProfile == null;
    }

    @Override
    public int hashCode() {
        int result = user != null ? user.hashCode() : 0;
        result = 31 * result + (userProfile != null ? userProfile.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "UserWithProfile{" +
                "user=" + user +
                ", userProfile=" + userProfile +
                '}';
    }
}
