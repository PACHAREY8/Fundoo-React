import React from 'react';
import { shallow,render } from '../testSetup';
import DashboardComponent from '../components/dashboardComponent';
const dashboardSnapshot = shallow(<DashboardComponent/>);
describe('<DashboardComponent/>', () => {
    it('should render dashboardSnapshot with no props', () => {
        expect(dashboardSnapshot).toMatchSnapshot();
      });
      it('renders three `.foo-bar`s', () => {
        const wrapper = render(dashboardSnapshot);
        expect(wrapper.find('.iconAdjust').length).toEqual(1);
      });
    //   it('rendered the title', () => {
    //     const wrapper = render(<DashboardComponent title="Cart"/>);
    //     expect(wrapper.text()).to.contain('Cart');
    //   });
      it('renders a div', () => {
        const wrapper = render(<div className="iconAdjust"/>);
        expect(wrapper.html()).to.contain('div')
      });
    
})