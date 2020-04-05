import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './store'

test('VAI COMEÇAR, A CYBER LUTAAAAA... ATÉ CAIR! NÃO PERCA O CONTROLE, E AO TOPO VAMOS SUBIR!', () => {
  const { getByText } = render(<Provider store={store}><App /> </Provider>);
  const linkElement = getByText(/JOGAR!/i, {selector: 'button'});
  expect(linkElement).toBeInTheDocument();
});
