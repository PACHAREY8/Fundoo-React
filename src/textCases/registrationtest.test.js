import React from 'react';
import {
    shallow,
    mount,
    render
} from 'enzyme';
import RegisterComponent from '../components/registerComponent';
import '../testSetup'
/**
 * describe what we are testing
 **/
describe('RegisterComponent', () => {
    /**
     * make our assertion and what we expect to happen 
     **/
    it('should render without throwing an error', () => {
            expect(shallow( <RegisterComponent/> )
                    .exists())
                .toBe(true)
        })
        /**
         * within the RegisterComponent components describe function
         **/
    it('renders a firstName input', () => {
        expect(shallow( < RegisterComponent / > ).find('[name="firstName"]').length).toEqual(1)
    })
    it('renders a lastName input', () => {
        expect(shallow( < RegisterComponent / > ).find('[name="lastName"]').length).toEqual(1)
    })
    it('renders a userName input', () => {
        expect(shallow( < RegisterComponent / > ).find('[name="userName"]').length).toEqual(1)
    })
    it('renders a password input', () => {
        expect(shallow( < RegisterComponent / > ).find('[name="password"]').length).toEqual(1)
    })
    it('renders a confirm password input', () => {
            expect(shallow( < RegisterComponent / > ).find('[name="confirm_password"]').length).toEqual(1)
        })
        /**
         * within the RegisterComponent components describe function
         **/
    describe('firstName input', () => {
        it('should respond to change event and change the state of the RegisterComponent Component', () => {
            const wrapper = shallow( < RegisterComponent / > );
            wrapper.find('[name="firstName"]').simulate('change', {
                target: {
                    name: 'firstname',
                    value: 'ashwini'
                }
            });
            expect(wrapper.state('firstName')).toEqual('ashwini');
        })
    })
    describe('lastName input', () => {
        it('should respond to change event and change the state of the RegisterComponent Component', () => {
            const wrapper = shallow( < RegisterComponent / > );
            wrapper.find('[name="lastName"]').simulate('change', {
                target: {
                    name: 'lastname',
                    value: 'pachare'
                }
            });
            expect(wrapper.state('lastName')).toEqual('pachare');
        })
    })
    describe('userName input', () => {
        it('should respond to change event and change the state of the RegisterComponent Component', () => {
            const wrapper = shallow( < RegisterComponent / > );
            wrapper.find('[name="userName"]').simulate('change', {
                target: {
                    name: 'userName',
                    value: "ashwini.pachare8@yahoo.com"
                }
            });
            expect(wrapper.state('userName')).toEqual('ashwini.pachare8@yahoo.com');
        })
    })
    describe('Password input', () => {
        it('should respond to change event and change the state of the RegisterComponent Component', () => {
            const wrapper = shallow( < RegisterComponent / > );
            wrapper.find('[name="password"]')
                .simulate('change', {
                    target: {
                        name: 'password',
                        value: 'analogcomm8@'
                    }
                });
            expect(wrapper.state('password')).toEqual('analogcomm8@');
        })
    })
    describe('confirmPassword input', () => {
        it('should respond to change event and change the state of the RegisterComponent Component', () => {
            const wrapper = shallow( < RegisterComponent / > );
            wrapper.find('[name="confirm_password"]')
                .simulate('change', {
                    target: {
                        name: 'confirm_password',
                        value: 'analogcomm8@'
                    }
                });
            expect(wrapper.state('confirm_password')).toEqual('analogcomm8@');
        })
    })
})