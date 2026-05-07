package com.AquaLifeLine.Backend;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/kunden")
public class KundenController {

    private final KundenService userService;

    public KundenController(KundenService userService) {
        this.userService = userService;
    }

    @GetMapping("/{name}")
    public Kunde getKundeByName(@PathVariable String name) {
        return userService.getKundeByName(name);
    }

    @PostMapping
    public Kunde createKunde(@RequestBody Kunde kunde) {
        return userService.saveKunde(kunde);
    }

    @DeleteMapping("/{id}")
    public void deleteKunde(@PathVariable long id) {
        userService.deleteKunde(id);
    }
}
