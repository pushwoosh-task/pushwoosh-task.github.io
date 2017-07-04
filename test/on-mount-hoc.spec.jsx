import React from 'react';
import {expect} from 'chai';
import {createStore} from 'redux';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';

import onMount from '../src/on-mount-hoc.jsx';

describe('onMount', () => {
  const CompDummy = () => <div>component</div>;
  it('dispatch action on mount', () => {
    const actionCreator = () => ({type: 'FETCH'});
    const reducer = (state = false, action) => action.type == 'FETCH';
    const store = createStore(reducer);
    
    const Comp = onMount(actionCreator)(CompDummy);
    mount(<Provider store={store}>
      <Comp />
    </Provider>);

    expect(store.getState()).to.be.ok; 
  });

  it('pass props', () => {
    const actionCreator = text => ({type: 'SET_TEXT', text});
    const reducer = (state = null, action) => action.text;
    const store = createStore(reducer);
    
    const Comp = onMount(({text}) => actionCreator(text))(CompDummy);
    mount(<Provider store={store}>
      <Comp text={'wow'} />
    </Provider>);

    expect(store.getState()).to.eql('wow'); 
  });
});