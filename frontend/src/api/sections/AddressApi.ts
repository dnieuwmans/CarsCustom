import axios from 'axios';
import _apiKey from './../../ApiKey';

const apiKey = _apiKey;
const route = 'https://api.postcodeapi.nu/v2/addresses/';

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
    public getAddress(zipCode: string, streetNumber: number, debug = true): Promise<any> {
        if (debug) {
            return Promise.resolve(stub);
        }

        return axios.get(route, {
            params: {
                postcode: zipCode,
                number: streetNumber,
            },
            headers: {
                'X-Api-Key': apiKey,
            }
        });
    }
}