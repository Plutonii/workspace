package ru.plutonii.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.plutonii.model.Label;
import ru.plutonii.service.LabelService;

import java.util.List;

/**
 * Created by rakr on 5/26/2017.
 */
@RestController
@RequestMapping("/api")
public class LabelController {

    private LabelService labelService;

    @Autowired
    public LabelController(LabelService labelService) {
        this.labelService = labelService;
    }

    @GetMapping(path = "/label/{id}")
    @ResponseBody
    Label getLabelById(@PathVariable(name = "id") int id) {
        return labelService.getLabelById(id);
    }

    @GetMapping(path = "/label/projectid/{id}")
    @ResponseBody
    List<Label> getlabelsByProjectId(@PathVariable(name = "id") int id){
        return labelService.getLabelsByProjectId(id);
    }

    @PostMapping("/label")
    Label addlabel(@RequestBody Label label){
        return labelService.addLabel(label);
    }

    @DeleteMapping("/label/{id}")
    void deleteLabel(@PathVariable(name = "id") int id){
        labelService.deleteLabelById(id);
    }
}