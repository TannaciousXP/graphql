// import './style/style.css';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Router, Route, hashHistory, IndexRoute } from 'react-router';
// import ApolloClient from 'apollo-client';
// import { ApolloProvider } from 'react-apollo';

// import App from './components/App';
// import SongList from './components/SongList';
// import SongCreate from './components/SongCreate';
// import SongDetail from './components/SongDetail';

// const client = new ApolloClient({
//   dataIdFromObject: o => o.id
// });

// const Root = () => {
//   return (
//     <ApolloProvider client={client}>
//       <Router history={hashHistory}>
//         <Route path="/" component={App}>
//           <IndexRoute component={SongList} />
//           <Route path="songs/new" component={SongCreate} />
//           <Route path="songs/:id" component={SongDetail} />
//         </Route>
//       </Router>
//     </ApolloProvider>
//   );
// };

// ReactDOM.render(
//   <Root />,
//   document.querySelector('#root')
// )

import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client'; // Rendering Agnostics: Gets information from the store and cache the data for the front end
import { ApolloProvider } from 'react-apollo'; // Providers acts like the glue between store and front end

import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const client = new ApolloClient({}); // interacts with backend client
/*
  assumes that the path is /graphl from server

  IndexRoute: will put the SongList component in the route "/"
*/

const Root = () => (
  <ApolloProvider client={client}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SongList}/>
        <Route path="songs/new" component={SongCreate}/>
        <Route path="songs/:id" component={SongDetail}/>
      </Route>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
