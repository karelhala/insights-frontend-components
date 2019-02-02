import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Donut, { LegendPosition } from './Donut';
import { updateGenerate } from 'c3';

const values = [
    ['value1', 5],
    ['value2', 10],
    ['value3', 20],
    ['value4', 40]
]

describe('Donut component', () => {
    describe('Should render', () => {
        describe('with legend', () => {
            Object.values(LegendPosition).forEach(position => {
                it(`on ${position}`, () => {
                    const wrapper = shallow(<Donut withLegend legendPosition={position} values={values} identifier={`on ${position}`} />);
                    expect(toJson(wrapper)).toMatchSnapshot();
                });
            });

            it('with Link', () => {
                const wrapper = shallow(<Donut values={values} withLegend link="/foo/" identifier="with Link" />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        it('without legend', () => {
            const wrapper = shallow(<Donut values={values} identifier="without legend" />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it('deep render', () => {
            const wrapper = mount(<Donut values={values} withLegend identifier="deep render" />);
        expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    it('should update', () => {
        const wrapper = shallow(<Donut values={values} identifier="should update" />);
        values[1] = ['value1', 10];
        wrapper.setProps({ values });
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();
    });
})
