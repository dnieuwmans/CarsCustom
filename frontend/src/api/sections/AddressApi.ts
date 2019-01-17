import axios from 'axios';

const stub = {
    data: {
        '_embedded': {
            addresses: [
                {
                    addition: null,
                    city: {id: "2662", label: "'s-Gravenzande"},
                    geo: {},
                    id: "1783200000042595",
                    letter: null,
                    municipality: {id: "1783", label: "Westland"},
                    nen5825: {postcode: "2691 ZZ", street: "GRAVIN ALEIDISSTRAAT"},
                    number: 26,
                    postcode: "2691ZZ",
                    province: {id: "28", label: "Zuid-Holland"},
                    purpose: "woonfunctie",
                    street: "Gravin Aleidisstraat",
                    surface: 103,
                    type: "Verblijfsobject",
                    year: 1969,
                },
            ],
        },
    },
};


export default class AddressApi {
    private route: string;

    constructor(route: string, subRoute: string) {
        this.route = `${route}/${subRoute}`;
    }

    public getAddress(zipCode: string, streetNumber: number, debug = false): Promise<any> {
        if (debug) {
            return Promise.resolve(stub);
        }

        return axios.get(`${this.route}/${zipCode}/${streetNumber}`);
    }
}