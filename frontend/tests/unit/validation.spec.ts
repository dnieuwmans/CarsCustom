import Validation from "@/utils/Validation";

describe('Validation', () => {
    const data = {
        firstname: 'Danny',
        lastname: 'Nieuwmans',
        email: 'danny@nieuwmans.com',
        phone: '0612345678',
    };

    it('Loads errors object', () => {
        const validation = new Validation(data);

        expect(validation.errors).toMatchObject({ firstname: '', lastname: '', email: '', phone: ''});
    });

    it('Loads fields object', () => {
        const validation = new Validation(data);

        expect(validation.fields).toMatchObject(['firstname', 'lastname', 'email', 'phone']);
    });

    it('Validates valid string', () => {
        const validation = new Validation(data);

        validation.string('firstname', data.firstname);

        expect(validation.hasError('firstname')).toBeFalsy();
        expect(validation.errors.firstname).toEqual('');
        expect(validation.hasErrors()).toBeFalsy();
    });

    it('Validates invalid string', () => {
        const validation = new Validation(data);

        validation.string('firstname', 'ab', 3);

        expect(validation.hasError('firstname')).toBeTruthy();
        expect(validation.errors.firstname).not.toEqual('');
        expect(validation.hasErrors()).toBeTruthy();
    });

    it('Validates valid email', () => {
        const validation = new Validation(data);

        validation.email('email', data.email);

        expect(validation.hasError('email')).toBeFalsy();
        expect(validation.errors.firstname).toEqual('');
        expect(validation.hasErrors()).toBeFalsy();
    });

    it('Validates invalid email', () => {
        const validation = new Validation(data);

        validation.email('email', 'danny.nieuwmans.com');

        expect(validation.hasError('email')).toBeTruthy();
        expect(validation.errors.email).not.toEqual('');
        expect(validation.hasErrors()).toBeTruthy();
    });

    it('Validates valid phone number', () => {
        const validation = new Validation(data);

        validation.phone('phone', data.phone);

        expect(validation.hasError('phone')).toBeFalsy();
        expect(validation.errors.phone).toEqual('');
        expect(validation.hasErrors()).toBeFalsy();
    });

    it('Validates invalid phone number', () => {
        const validation = new Validation(data);

        validation.phone('phone', '+97fgdvde78894');

        expect(validation.hasError('phone')).toBeTruthy();
        expect(validation.errors.phone).not.toEqual('');
        expect(validation.hasErrors()).toBeTruthy();
    });

    it('Validates valid password confirmation', () => {
        // NOTE: we override the data so we can check the passwords
       const data = {
           pass: 'test',
           confirmPass: 'test',
       };

        const validation = new Validation(data);

        validation.confirmPassword('pass', data.pass, data.confirmPass);

        expect(validation.hasError('pass')).toBeFalsy();
        expect(validation.errors.pass).toEqual('');
        expect(validation.hasErrors()).toBeFalsy();
    });

    it('Validates invalid password confirmation', () => {
        // NOTE: we override the data so we can check the passwords
        const data = {
            pass: 'test',
            confirmPass: 'test1234',
        };

        const validation = new Validation(data);

        validation.confirmPassword('pass', data.pass, data.confirmPass);

        expect(validation.hasError('pass')).toBeTruthy();
        expect(validation.errors.pass).not.toEqual('');
        expect(validation.hasErrors()).toBeTruthy();
    });
});
