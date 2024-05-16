import Country from "../persons/Country";

export function TransformCountry(country){
switch(country){
    case Country.CZECHIA:
        return "Česká republika"
    case Country.SLOVAKIA:
        return "Slovensko"
    default:
        return country;
}
}