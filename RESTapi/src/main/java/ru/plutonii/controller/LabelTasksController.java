package ru.plutonii.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.plutonii.model.LabelTasks;
import ru.plutonii.service.LabelTasksService;

import java.util.List;

/**
 * Created by rakr on 5/26/2017.
 */
@RestController
@RequestMapping("/api")
public class LabelTasksController {

    private LabelTasksService labelTasksService;

    @Autowired
    public LabelTasksController(LabelTasksService labelTasksService) {
        this.labelTasksService = labelTasksService;
    }

    @GetMapping(path = "/labeltasks/taskid/{id}")
    @ResponseBody
    List<Integer> getLabelsIdsByTaskId(@PathVariable(name = "id") int id){
        return labelTasksService.getLabelIdsListByTaskId(id);
    }

    @PostMapping("/labeltasks")
    LabelTasks addLabelTasks(@RequestBody LabelTasks labelTasks){
        return labelTasksService.addLabelTasks(labelTasks);
    }

    @DeleteMapping("/labeltasks/{id}")
    void deleteLabelTasks(@PathVariable(name = "id") int id){
        labelTasksService.deleteLabelTasks(id);
    }

    @DeleteMapping("/labeltasks/{labelId}/{taskId}")
    void deleteLabelTasksByLabelAndtaskId(@PathVariable(name = "labelId") int labelId,
                                          @PathVariable(name = "taskId") int taskId){
        labelTasksService.deleteLabelTasks(labelId, taskId);
    }
}
