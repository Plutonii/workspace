package ru.plutonii.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.plutonii.model.Task;
import ru.plutonii.service.TaskService;

import java.util.List;

/**
 * Created by plutonii on 08.02.17.
 */

@RestController
@RequestMapping("/api")
public class TaskController {

    private TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    @GetMapping(path = "/task/{id}", produces = "application/json")
    @ResponseBody
    Task getById(@PathVariable(name="id") int id){
        return taskService.findById(id);
    }

    @GetMapping(path = "/task/userid/{id}", produces = "application/json")
    @ResponseBody
    List<Task> getByUserId(@PathVariable(name = "id") int id){
        return taskService.findByMakerId(id);
    }

    @GetMapping(path = "/task/project/{id}", produces = "application/json")
    @ResponseBody
    List<Task> getByProjectId(@PathVariable(name="id") int id){
        return taskService.findByProjectId(id);
    }

    @PostMapping(path = "/task", consumes = "application/json", produces = "application/json")
    @ResponseBody
    Task addTask(@RequestBody Task task){
        return taskService.insert(task);
    }

    @DeleteMapping(path = "/task", consumes = "application/json")
    void deleteTask(@RequestBody Task task){
        taskService.delete(task);
    }
}
