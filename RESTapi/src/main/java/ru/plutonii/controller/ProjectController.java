package ru.plutonii.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.plutonii.model.Project;
import ru.plutonii.service.ProjectService;

import java.util.List;

/**
 * Created by plutonii on 05.02.17.
 */

@CrossOrigin(origins = "http://plutonii.ru", exposedHeaders = "token") //for dev
@RestController
@RequestMapping("/api")
public class ProjectController {

    private ProjectService projectService;

    @Autowired
    ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping(path = "/project/{id}")
    @ResponseBody
    Project getProjectById(@PathVariable(name = "id") int id) {
        return projectService.findById(id);
    }

    @GetMapping(path = "/project/userid/{id}")
    @ResponseBody
    List<Project> getProjectsByUserId(@PathVariable(name = "id") int id){
        return projectService.findByUserId(id);
    }

    @PostMapping("/project")
    Project addProject(@RequestBody Project project){
        return projectService.insert(project);
    }

    @DeleteMapping("/{id}/project")
    void deleteProject(@PathVariable(name = "id") int id){
        projectService.delete(id);
    }
}
