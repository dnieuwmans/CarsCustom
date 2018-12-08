import { roleEnum } from './Roles';
import { isValidRole } from './Roles';

// Email regex Scott Gonzalez.
const regexes = {
    email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
    phone: /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/,
    userName: /^[a-zA-Z0-9_]*$/,
};

export default class Validation {
    public fields: string[];
    public errors: any;

    constructor(object: any) {
        this.errors = {};
        this.fields = Object.keys(object);

        this.fields.forEach((field) => {
            this.errors[field] = '';
        })
    }

    public hasError(field: string) {
        return this.errors[field] !== '';
    }

    public hasErrors() {
        let count = 0;

        this.fields.forEach((field) => {
            if (this.hasError(field)) {
                count += 1;
            }
        });

        return count > 0;
    }

    public string(field: string, value: string, min: number = 2, max: number = 100) {
        const val = value.trim();

        this.errors[field] = '';

        if (val.length < min || val.length > max) {
            this.errors[field] = `This field does not match the required length. Min: ${min}, max: ${max}.`;
        }
    }

    public email(field: string, value: string) {
        const val = value.trim();

        this.errors[field] = '';

        if (!val.match(regexes.email)) {
            this.errors[field] = 'The value is not a valid email address.';
        }
    }

    public userName(field: string, value: string) {
        this.errors[field] = '';

        this.string(field, value);

        if (!value.match(regexes.userName)) {
            this.errors[field] = 'The value is not a valid username.';
        }
    }

    public role(field: string, value: string) {
        this.errors[field] = '';

        if (!isValidRole(value)) {
            this.errors[field] = 'Please assign a role.';
        }
    }

    public phone(field: string, value: string) {
        const val = value.trim();

        this.errors[field] = '';

        if(!val.match(regexes.phone)) {
            this.errors[field] = 'The value is not a valid phone number.';
        }
    }

    public confirmPassword(field: string, password: string, confirmPassword: string) {
        if (password.trim() !== confirmPassword.trim()){
            this.errors[field] = 'Password and confirmation password do not match.';
        }
    }

    public notBlank(field: string, value: string) {
        const val = value.trim();

        this.errors[field] = '';

        if (val === '') {
            this.errors[field] = 'The value may not be empty.';
        }
    }
}