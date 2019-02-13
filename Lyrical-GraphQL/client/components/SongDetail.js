// import React, { Component } from 'react';
// import { graphql } from 'react-apollo';
// import { Link } from 'react-router';
// import fetchSong from '../queries/fetchSong';
// import LyricCreate from './LyricCreate';
// import LyricList from './LyricList';

// class SongDetail extends Component {
//   render() {
//     const { song } = this.props.data;

//     if (!song) { return <div>Loading...</div>; }

//     return (
//       <div>
//         <Link to="/">Back</Link>
//         <h3>{song.title}</h3>
//         <LyricList lyrics={song.lyrics} />
//         <LyricCreate songId={this.props.params.id} />
//       </div>
//     );
//   }
// }

// export default graphql(fetchSong, {
//   options: (props) => { return { variables: { id: props.params.id } } }
// })(SongDetail)


import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import grabSong from '../queries/grabSong';
import LyricCreate from './LyricCreate';

class SongDetail extends Component {

  render() {
    const { song } = this.props.data;
    // looks to show data without having data first
    if (!song) { return <div>Loading...</div>}
    return (
      <div>
        <h3>{song.title}</h3>
        <LyricCreate/>
        <Link to="/" className="btn-floating btn-large red">
          <i className="material-icons">navigate_before</i>
        </Link>
      </div>
    )
  }
}

export default graphql(grabSong, {
  options: (props) => { return { variables: {id: props.params.id}}}
})(SongDetail);