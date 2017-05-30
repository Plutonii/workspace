package ru.plutonii.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.plutonii.model.Contact;
import ru.plutonii.model.Team;
import ru.plutonii.model.User;
import ru.plutonii.service.TeamService;

import java.util.List;

/**
 * Created by rakr on 5/30/2017.
 */
@RestController
@RequestMapping("/api")
public class TeamController {

    private TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping(path = "/team/users/{projectId}")
    @ResponseBody
    List<User> getUsersByProjectId(@PathVariable(name = "projectId") int id){
        return teamService.findUsersByProjectId(id);
    }

    @PostMapping("/team")
    Team addTeam(@RequestBody Team team) {
        return teamService.addTeam(team);
    }

    @DeleteMapping("/team/{projectId}/{userId}")
    void deleteContact(@PathVariable(name = "projectId") int projectId,
                       @PathVariable(name = "userId") int userId){
        teamService.removeTeamByProjectAndUserId(projectId, userId);
    }

}
