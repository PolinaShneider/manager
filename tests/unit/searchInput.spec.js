import {shallowMount} from '@vue/test-utils'
import SearchInput from "../../src/components/SearchInput";

const data = [
    {name: 'Anya', surName: 'Bell', login: 'Girl'},
    {name: 'Victor', surName: 'The Great', login: 'Boss'},
    {name: 'Liza', surName: 'Lucky', login: 'Monro'},
    {name: 'Olga', surName: 'Safronova', login: 'Query'}
];

describe('Database search', () => {
    it('No data - empty match', () => {
        const wrapper = shallowMount(
            SearchInput, {
                propsData: {data: []}
            }
        );
        expect(wrapper.vm.result).toStrictEqual([]);
    });

    it('No search input — match everything', () => {
        const wrapper = shallowMount(
            SearchInput, {
                propsData: {data}
            }
        );
        expect(wrapper.vm.result).toStrictEqual(data);
    });

    it('Too specific input string - no match', () => {
        const wrapper = shallowMount(
            SearchInput, {
                propsData: {data}
            }
        );
        const input = wrapper.find('input');
        input.element.value = 'Victoria';
        input.trigger('input');
        expect(wrapper.vm.result).toStrictEqual([]);
    });

    it('Search by name', () => {
        const wrapper = shallowMount(
            SearchInput, {
                propsData: {data}
            }
        );
        const input = wrapper.find('input');
        input.element.value = 'An';
        input.trigger('input');
        expect(wrapper.vm.result).toStrictEqual([{name: 'Anya', surName: 'Bell', login: 'Girl'}]);
    });

    it('Search is case insensitive', () => {
        const wrapper = shallowMount(
            SearchInput, {
                propsData: {data}
            }
        );
        const input = wrapper.find('input');
        input.element.value = 'ANYA';
        input.trigger('input');
        expect(wrapper.vm.result).toStrictEqual([{name: 'Anya', surName: 'Bell', login: 'Girl'}]);
    });

    it('Search by surname', () => {
        const wrapper = shallowMount(
            SearchInput, {
                propsData: {data}
            }
        );
        const input = wrapper.find('input');
        input.element.value = 'Lucky';
        input.trigger('input');
        expect(wrapper.vm.result).toStrictEqual([{name: 'Liza', surName: 'Lucky', login: 'Monro'}]);
    });

    it('Search by login', () => {
        const wrapper = shallowMount(
            SearchInput, {
                propsData: {data}
            }
        );
        const input = wrapper.find('input');
        input.element.value = 'Que';
        input.trigger('input');
        expect(wrapper.vm.result).toStrictEqual([{name: 'Olga', surName: 'Safronova', login: 'Query'}]);
    });

    it('Search from the middle of the word', () => {
        const wrapper = shallowMount(
            SearchInput, {
                propsData: {data}
            }
        );
        const input = wrapper.find('input');
        input.element.value = 'rea';
        input.trigger('input');
        expect(wrapper.vm.result).toStrictEqual([{name: 'Victor', surName: 'The Great', login: 'Boss'}]);
    });

    it('When character is deleted, search results are expanded', () => {
        const wrapper = shallowMount(
            SearchInput, {
                propsData: {data}
            }
        );
        const input = wrapper.find('input');
        input.element.value = 'an';
        input.trigger('input');
        expect(wrapper.vm.result).toStrictEqual([{name: 'Anya', surName: 'Bell', login: 'Girl'}]);
        input.element.value = 'a';
        input.trigger('input');
        expect(wrapper.vm.result).toStrictEqual(data);
    });
});
