import React from 'react';
import { shallow } from '../testSetup';
import LoginComponent from '../components/loginComponent';
const loginSnapshot = shallow(<LoginComponent/>);
describe('Login test ', () => {
    it('should render correctly with no props', () => {
        expect(loginSnapshot).toMatchSnapshot();
      });
    it('Check login details ', () => {
        expect(loginSnapshot.exists()).toBe(true)
    });

    it('renders a email input ', () => {
        expect(loginSnapshot.find('#email').length).toEqual(1);
    });

    it('render a password input ', () => {
        expect(loginSnapshot.find('#password').length).toEqual(1)
    });
});

describe('email input ', () => {
    it('should respond to the change event and change the state of email ', () => {
        // const wrapper = shallow(<LoginComponent />);
        loginSnapshot.find('#email').simulate('change', {
            target: {
                name: 'email',
                value: 'aniketmule331@gmail.com'
            }
        });
        expect(loginSnapshot.state('email')).toEqual('aniketmule331@gmail.com');
    });
})

    describe('password input', () => {
        it('should responde to the change event and change the state of password', () => {
            // const wrapper = shallow(<LoginComponent />);
            loginSnapshot.find('#password').simulate('change', {
                target: {
                    name: 'password',
                    value: '1234567'
                }
            });
            expect(loginSnapshot.state('password')).toEqual('1234567');
        });
})