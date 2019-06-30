import {configure, shallow} from 'enzyme';//to configure enzyme and connect it to the react version
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
configure({adapter:new Adapter()});


import {Details} from './Details';
import {ButtonContainerDark} from './Button';

//It creates a block that groups related tests together "describe('group_name', function)" here the group name is '<Details />'
//It is a Jest method. in react Jest is used by default for testing that is why we use this "describe method"
describe('<Details />', ()=>{

    let wrapper;
    beforeEach(()=>{            //we add this props of "detailProduct" because this '<Details />' expects a props with this name but when we do shallow render it is not connected to the Redux store thus not getting the props so we make empty space for this prop and later in "wrapper.setProps({inCart:true});" set the prop
        wrapper=shallow(<Details detailProduct={()=>{}}/>); //Shallow rendering the testing component and storing the reasult in to the "wrapper" const
    });

    //It allows us to write one individual test. The function is the actual testing function where we write the actual testing logic
    it('Should render <ButtonContainerDark>', ()=>{
       // const wrapper=shallow(<Details/>); //Shallow rendering the testing component and storing the reasult in to the "wrapper" const

        wrapper.setProps({inCart:true});
        expect(wrapper.find(ButtonContainerDark)).toHaveLength(2); //this method checks the expected results exists or not
    })
});
