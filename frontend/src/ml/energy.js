import { productivityFeature, restFeature } from "./productivity.js";
import { sleepData } from "./sleep.js";

let energy = 10; // Starting energy level

export function productivityEnergy(productivityFeature) {
    if (productivityFeature == 60)
        energy -= 3;
    else if (productivityFeature > 120)
        energy -= 5;

    return energy;
}

export function restEnergy(restFeature) {
    if (restFeature == 30)
        energy += 2;
    else if (restFeature > 60)
        energy += 5;

    return energy;
}

export function sleepEnergy(sleepRecords) {
    if (sleepRecords >= 0 && sleepRecords <= 4)
        energy -= 2;
    else if (sleepRecords > 4 && sleepRecords <= 6)
        energy -= 1;
    else if (sleepRecords > 6 && sleepRecords <= 8)
        energy += 2;
    else
        energy += 3;

    return energy;
}