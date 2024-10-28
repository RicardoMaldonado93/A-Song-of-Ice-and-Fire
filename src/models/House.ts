import { ApiResourceCharacter, ApiResourceHouse } from "./Global";

/* prettier-ignore */
export interface House {
    url:              ApiResourceHouse;
    name:             string;
    region:           string;
    coatOfArms:       string;
    words:            string;
    titles:           string[];
    seats:            string[];
    currentLord:      ApiResourceCharacter;
    heir:             ApiResourceCharacter;
    overlord:         ApiResourceCharacter;
    founded:          string;
    founder:          string;
    diedOut:          string;
    ancestralWeapons: string[];
    cadetBranches:    string[];
    swornMembers:     ApiResourceCharacter[];
}

export interface HouseWithMembers extends Omit<House, "swornMembers"> {
  swornMembers: { name: string; id: string; isDead: boolean; deadAt: string }[];
}
