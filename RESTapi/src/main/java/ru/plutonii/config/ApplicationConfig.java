package ru.plutonii.config;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.AvailableSettings;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.util.Properties;

/**
 * Created by plutonii on 28.04.17.
 */
@Configuration
@ComponentScan(basePackages = {"ru.plutonii"}, excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE,
        value = {MVCConfig.class, WebConfig.class}))
@EnableTransactionManagement
public class ApplicationConfig {

    @Bean
    public DriverManagerDataSource driverManagerDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/workspace");
        dataSource.setUsername("plug");
        dataSource.setPassword("qwerty");
        return dataSource;
    }

    @Bean
    public HibernateTransactionManager getManager(SessionFactory sessionFactory){
        return new HibernateTransactionManager(sessionFactory);
    }

    @Bean
    public LocalSessionFactoryBean getSessionFactoryBean(){
        LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
        sessionFactory.setDataSource(driverManagerDataSource());
        sessionFactory.setPackagesToScan("ru.plutonii");
        sessionFactory.setHibernateProperties(getHibernateProperties());
        return sessionFactory;
    }

    private Properties getHibernateProperties(){
        Properties properties = new Properties();
        properties.put(AvailableSettings.DIALECT, "org.hibernate.dialect.MySQL5Dialect");
        properties.put(AvailableSettings.SHOW_SQL, true);
        return properties;
    }
}
