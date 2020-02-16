import {shallowMount} from '@vue/test-utils'
import Dialog from "../../src/components/Dialog";

const $getLabel = () => {};

describe('Add user cases', () => {
    const wrapper = shallowMount(
        Dialog, {
            propsData: {
                user: {
                    name: '',
                    surName: '',
                    login: ''
                },
                keyword: 'users',
                isNew: true,
                logins: ['Boss', 'Monro', 'Query']
            },
            mocks: {$getLabel}
        }
    );

    const name = wrapper.find('input[id="name"]');
    const login = wrapper.find('input[id="login"]');
    const surName = wrapper.find('input[id="surName"]');
    const button = wrapper.find('button');

    it('All fields data is valid', () => {
        name.element.value = 'Valeria';
        name.trigger('input');

        surName.element.value = 'Roberts';
        surName.trigger('input');

        login.element.value = 'Quick';
        login.trigger('input');

        button.trigger('click');

        expect(wrapper.vm.errors).toStrictEqual([]);
        expect(wrapper.vm.editedUser).toStrictEqual({
            name: 'Valeria',
            surName: 'Roberts',
            login: 'Quick'
        });
    });

    it('All fields are empty', () => {
        name.element.value = '';
        name.trigger('input');

        surName.element.value = '';
        surName.trigger('input');

        login.element.value = '';
        login.trigger('input');

        button.trigger('click');

        expect(wrapper.vm.errors).toStrictEqual([
            "User name cannot be empty",
            "User surname cannot be empty",
            "User login must be between 4 and 5 symbols"
        ]);
        expect(wrapper.vm.editedUser).toStrictEqual({
            name: '',
            surName: '',
            login: ''
        });
    });

    it('Name is empty', () => {
        name.element.value = '';
        name.trigger('input');

        surName.element.value = 'Roberts';
        surName.trigger('input');

        login.element.value = 'Quick';
        login.trigger('input');

        button.trigger('click');

        expect(wrapper.vm.errors).toStrictEqual(["User name cannot be empty"]);
        expect(wrapper.vm.editedUser).toStrictEqual({
            name: '',
            surName: 'Roberts',
            login: 'Quick'
        });
    });

    it('Surname is empty', () => {
        name.element.value = 'Valeria';
        name.trigger('input');

        surName.element.value = '';
        surName.trigger('input');

        login.element.value = 'Quick';
        login.trigger('input');

        button.trigger('click');

        expect(wrapper.vm.errors).toStrictEqual(["User surname cannot be empty"]);
        expect(wrapper.vm.editedUser).toStrictEqual({
            name: 'Valeria',
            surName: '',
            login: 'Quick'
        });
    });

    it('Login is empty', () => {
        name.element.value = 'Valeria';
        name.trigger('input');

        surName.element.value = 'Roberts';
        surName.trigger('input');

        login.element.value = '';
        login.trigger('input');

        button.trigger('click');

        expect(wrapper.vm.errors).toStrictEqual(["User login must be between 4 and 5 symbols"]);
        expect(wrapper.vm.editedUser).toStrictEqual({
            name: 'Valeria',
            surName: 'Roberts',
            login: ''
        });
    });

    it('Login is too long', () => {
        name.element.value = 'Valeria';
        name.trigger('input');

        surName.element.value = 'Roberts';
        surName.trigger('input');

        login.element.value = 'Valerie';
        login.trigger('input');

        button.trigger('click');

        expect(wrapper.vm.errors).toStrictEqual(["User login must be between 4 and 5 symbols"]);
        expect(wrapper.vm.editedUser).toStrictEqual({
            name: 'Valeria',
            surName: 'Roberts',
            login: 'Valerie'
        });
    });

    it('Login is not unique', () => {
        name.element.value = 'Valeria';
        name.trigger('input');

        surName.element.value = 'Roberts';
        surName.trigger('input');

        login.element.value = 'Boss';
        login.trigger('input');

        button.trigger('click');

        expect(wrapper.vm.errors).toStrictEqual(["User login 'Boss' already exists"]);
        expect(wrapper.vm.editedUser).toStrictEqual({
            name: 'Valeria',
            surName: 'Roberts',
            login: 'Boss'
        });
    });
});

describe('Edit user cases', () => {
    const wrapper = shallowMount(
        Dialog, {
            propsData: {
                user: {
                    name: 'Valeria',
                    surName: 'Roberts',
                    login: 'Quick'
                },
                keyword: 'users',
                isNew: false,
                logins: ['Boss', 'Monro', 'Query']
            },
            mocks: {$getLabel}
        }
    );
    const button = wrapper.find('button');
    const surName = wrapper.find('input[id="surName"]');
    const name = wrapper.find('input[id="name"]');

    beforeEach(() => {
        name.element.value = 'Valeria';
        name.trigger('input');

        surName.element.value = 'Roberts';
        surName.trigger('input');
    });

    it('Login field is not editable', () => {
        expect(wrapper.find('input[id="login"]').exists()).toBeFalsy()
    });

    it('Successful name update', () => {
        name.element.value = 'Christi';
        name.trigger('input');

        button.trigger('click');

        expect(wrapper.vm.errors).toStrictEqual([]);
        expect(wrapper.vm.editedUser).toStrictEqual({
            name: 'Christi',
            surName: 'Roberts',
            login: 'Quick'
        });
    });

    it('Successful surname update', () => {
        surName.element.value = 'Lovejoy';
        surName.trigger('input');

        button.trigger('click');

        expect(wrapper.vm.errors).toStrictEqual([]);
        expect(wrapper.vm.editedUser).toStrictEqual({
            name: 'Valeria',
            surName: 'Lovejoy',
            login: 'Quick'
        });
    });

    it('Successful name and surname update', () => {
        name.element.value = 'Christi';
        name.trigger('input');

        surName.element.value = 'Lovejoy';
        surName.trigger('input');

        button.trigger('click');

        expect(wrapper.vm.errors).toStrictEqual([]);
        expect(wrapper.vm.editedUser).toStrictEqual({
            name: 'Christi',
            surName: 'Lovejoy',
            login: 'Quick'
        });
    });

    it('Name became empty', () => {
        name.element.value = '';
        name.trigger('input');

        button.trigger('click');

        expect(wrapper.vm.errors).toStrictEqual(["User name cannot be empty"]);
        expect(wrapper.vm.editedUser).toStrictEqual({
            name: '',
            surName: 'Roberts',
            login: 'Quick'
        });
    });

    it('Surname became empty', () => {
        surName.element.value = '';
        surName.trigger('input');

        button.trigger('click');

        expect(wrapper.vm.errors).toStrictEqual(["User surname cannot be empty"]);
        expect(wrapper.vm.editedUser).toStrictEqual({
            name: 'Valeria',
            surName: '',
            login: 'Quick'
        });
    });
});
