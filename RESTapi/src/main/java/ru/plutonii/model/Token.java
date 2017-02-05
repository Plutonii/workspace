package ru.plutonii.model;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Created by plutonii on 04.02.17.
 */
@Entity(name = "token")
public class Token {
    private int id;
    private int userId;
    private String token;
    private Timestamp lifetime;

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
    @Column(name = "user_id", nullable = false)
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "token", nullable = true, length = 255)
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Basic
    @Column(name = "lifetime", nullable = true)
    public Timestamp getLifetime() {
        return lifetime;
    }

    public void setLifetime(Timestamp lifetime) {
        this.lifetime = lifetime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Token token1 = (Token) o;

        if (id != token1.id) return false;
        if (userId != token1.userId) return false;
        if (token != null ? !token.equals(token1.token) : token1.token != null) return false;
        if (lifetime != null ? !lifetime.equals(token1.lifetime) : token1.lifetime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + userId;
        result = 31 * result + (token != null ? token.hashCode() : 0);
        result = 31 * result + (lifetime != null ? lifetime.hashCode() : 0);
        return result;
    }
}
