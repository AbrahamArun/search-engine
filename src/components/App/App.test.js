import React from "react";
import { mount, shallow } from 'enzyme';
import App from "./App";

it("should render the app", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
});

it("when we enter a keyword, it should display some suggestions", () => {
    const wrapper = mount(<App />);
    wrapper.find("input[type='text']").simulate("change", {
        target: { value: 'achieve' }
    })
    expect(wrapper.find("li")).toHaveLength(3);
})

it("should clear suggestions on selecting one", () => {
    const wrapper = mount(<App />);
    wrapper.find("input[type='text']").simulate("change", {
        target: { value: 'achieve' }
    })
    wrapper.find("li").at(0).text()
    wrapper.find("li").at(0).simulate("click")
    expect(wrapper.find("li")).toHaveLength(0);
})

it("should replace the search term on selecting a suggestion", () => {
    const wrapper = mount(<App />);
    wrapper.find("input[type='text']").simulate("change", {
        target: { value: 'achieve' }
    })
    wrapper.find("li").at(0).text()
    wrapper.find("li").at(0).simulate("click")
    const inputValue = wrapper.find("input[type='text']").get(0).props.value;
    expect(inputValue).toEqual('The Richest Man in Babylon')
})