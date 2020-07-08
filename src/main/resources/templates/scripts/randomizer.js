class Player {
    constructor(name, regions, modifiers) {
        this.name = name;
        this.regions = regions;
        this.modifiers = modifiers;
    }
}

class Region {
    constructor(name, active, imgUrl) {
        this.name = name;
        this.active = active;
        this.imgUrl = imgUrl;
    }
}

class Modifier {
    constructor(id, description, active) {
        this.id = id;
        this.description = description;
        this.active = active;
    }
}

//main class, control the randomization of all components
class Randomizer {
    constructor(p1Regions, p2Regions, modifiers) {
        this.p1Regions = p1Regions;
        this.p2Regions = p2Regions;
        this.modifiers = modifiers;
    };

    randomInt(min, max) {
        return min + Math.floor((max - min) * Math.random());
    }

    get2P1Regions() {
        if (this.p1Regions.length < 1) {
            alert("Select one or more Regions for Player 2");
            return;
        }
        var regionsRandomized = [];
        regionsRandomized.push(this.p1Regions[this.randomInt(0, this.p1Regions.length)]);
        regionsRandomized.push(this.p1Regions[this.randomInt(0, this.p1Regions.length)]);
        return regionsRandomized;
    }

    get2P2Regions() {
        if (this.p2Regions.length < 1) {
            alert("Select one or more Regions for Player 2");
            return;
        }
        var regionsRandomized = [];
        regionsRandomized.push(this.p2Regions[this.randomInt(0, this.p2Regions.length)]);
        regionsRandomized.push(this.p2Regions[this.randomInt(0, this.p2Regions.length)]);
        return regionsRandomized;
    }

    get1Modifier() {
        var modifiers = [];
        modifiers.push(this.modifiers[this.randomInt(0, this.modifiers.length)]);
        return modifiers;
    }

    refreshRandomizer() {
        this.p1Regions = [];
        this.p2Regions = [];
        this.modifiers = [];

        if ($("#p1-bilgewater").is(":checked")) {
            this.p1Regions.push(new Region("bilgewater", true, "img/Bilgewater-Icon.png"));
        }
        if ($("#p1-demacia").is(":checked")) {
            this.p1Regions.push(new Region("demacia", true, "img/Demacia-Icon.png"));
        }
        if ($("#p1-freljord").is(":checked")) {
            this.p1Regions.push(new Region("freljord", true, "img/Freljord-Icon.png"));
        }
        if ($("#p1-ionia").is(":checked")) {
            this.p1Regions.push(new Region("ionia", true, "img/Ionia-Icon.png"));
        }
        if ($("#p1-noxus").is(":checked")) {
            this.p1Regions.push(new Region("noxus", true, "img/Noxus-Icon.png"));
        }
        if ($("#p1-piltover").is(":checked")) {
            this.p1Regions.push(new Region("piltover", true, "img/Piltover-Zaun-Icon.png"));
        }
        if ($("#p1-shadow").is(":checked")) {
            this.p1Regions.push(new Region("shadow", true, "img/Shadow-Isle-Icon.png"));
        }

        if ($("#p2-bilgewater").is(":checked")) {
            this.p2Regions.push(new Region("bilgewater", true, "img/Bilgewater-Icon.png"));
        }
        if ($("#p2-demacia").is(":checked")) {
            this.p2Regions.push(new Region("demacia", true, "img/Demacia-Icon.png"));
        }
        if ($("#p2-freljord").is(":checked")) {
            this.p2Regions.push(new Region("freljord", true, "img/Freljord-Icon.png"));
        }
        if ($("#p2-ionia").is(":checked")) {
            this.p2Regions.push(new Region("ionia", true, "img/Ionia-Icon.png"));
        }
        if ($("#p2-noxus").is(":checked")) {
            this.p2Regions.push(new Region("noxus", true, "img/Noxus-Icon.png"));
        }
        if ($("#p2-piltover").is(":checked")) {
            this.p2Regions.push(new Region("piltover", true, "img/Piltover-Zaun-Icon.png"));
        }
        if ($("#p2-shadow").is(":checked")) {
            this.p2Regions.push(new Region("shadow", true, "img/Shadow-Isle-Icon.png"));
        }

        for (modifier of allModifiers) {
            if ($(modifier.id).is(":checked")) {
                this.modifiers.push(modifier);
            }
        }

    }
}

var allRegions = [
    new Region("bilgewater", true, "img/Bilgewater-Icon.png"),
    new Region("demacia", true, "img/Demacia-Icon.png"),
    new Region("freljord", true, "img/Freljord-Icon.png"),
    new Region("ionia", true, "img/Ionia-Icon.png"),
    new Region("noxus", true, "img/Noxus-Icon.png"),
    new Region("piltover", true, "img/Piltover-Zaun-Icon.png"),
    new Region("shadow", true, "img/Shadow-Isle-Icon.png")
];

var allModifiers = [
    new Modifier("no-magic", "No Magics!", true),
    new Modifier("only-commons", "Only Commons!", true),
    new Modifier("only-commons-rares", "Only Commons and Rares!", true),
    new Modifier("no-legends", "No Legends Allowed", true),
    new Modifier("only-cost-3+", "Only 3+ Cost Cards", true),
    new Modifier("only-cost-5-", "Only 5- Cost Cards", true),
];

var p1 = new Player("Player 1", [], "");
var p2 = new Player("Player 2", [], "");

var randomizer = new Randomizer(allRegions, allRegions, allModifiers);


function refreshNames() {
    if ($('#p1-name').val() != "") {
        p1.name = $('#p1-name').val();
    } else {
        p1.name = "Player 1";
    }
    if ($('#p2-name').val() != "") {
        p2.name = $('#p2-name').val();
    } else {
        p2.name = "Player 2";
    }
}

function randomized() {
    //names
    $("#p1-modal-name").html(p1.name);
    $("#p2-modal-name").html(p2.name);

    //randomizing regions
    p1.regions = randomizer.get2P1Regions();
    p2.regions = randomizer.get2P2Regions();

    //randomizing modifiers
    modifiers = randomizer.get1Modifier();

    //test if same region 4both
    if ($("#same-region-for-both").is(":checked")) {
        console.log("same region");
        p2.regions = p1.regions;
    }

    //loading images
    $("#p1-modal-region-1").html("<img class='img-fluid' src='" + p1.regions[0].imgUrl + "'/>");
    $("#p1-modal-region-2").html("<img class='img-fluid' src='" + p1.regions[1].imgUrl + "'/>");
    $("#p2-modal-region-1").html("<img class='img-fluid' src='" + p2.regions[0].imgUrl + "'/>");
    $("#p2-modal-region-2").html("<img class='img-fluid' src='" + p2.regions[1].imgUrl + "'/>");

    //loading modifiers
    if (!(typeof modifiers[0] === 'undefined')) {
        $("#modal-modifiers-list").html("<div class='col-sm-12'>"
            + modifiers[0].description + "</div>");
    } else {
        $("#modal-modifiers-list").html("<div class='col-sm-12'>"
        +"NO MODIFIERS SELECTED" + "</div>");

    }

}



$(document).ready(function () {
    for (modifier of allModifiers) {
        $("#modifiers-list").append("<div class='col-sm-3'>" +
            "<input id = '" + modifier.id + "'type = 'checkbox' checked = '" + modifier.active + "'/>"
            + modifier.description + "</div>"
        )
    }
    $("input").change(function () {
        refreshNames();
        randomizer.refreshRandomizer();
        console.log("something has changed")
    });
})


function findRegionIndex(player, name) {
    var i = 0;
    for (region of player.regions) {
        if (region.name == name) {
            return i;
        }
        i++;
    }
}