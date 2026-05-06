import { feanorUtilityGroups } from "./feanorUtilities";
import { feanorTheoryTopics } from "./feanorTheory";

export const feanorHeaderItems = [
    {
        id: "overview",
        name: "Vista general",
        routeName: "el-codice-de-feanor"
    },
    {
        id: "teoria",
        name: "Teoria",
        subs: feanorTheoryTopics.map(topic => ({
            label: topic.label,
            route: { name: topic.routeName }
        }))
    },
    ...feanorUtilityGroups.map(group => ({
        id: group.id,
        name: group.name,
        subs: group.utilities.map(utility => ({
            label: utility.label,
            route: { name: utility.routeName }
        }))
    }))
];
