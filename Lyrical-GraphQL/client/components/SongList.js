// import React, { Component } from 'react';
// import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';
// import { Link } from 'react-router';
// import query from '../queries/fetchSongs';

// class SongList extends Component {
//   onSongDelete(id) {
//     this.props.mutate({ variables: { id } })
//       .then(() => this.props.data.refetch());
//   }

//   renderSongs() {
//     return this.props.data.songs.map(({ id, title }) => {
//       return (
//         <li key={id} className="collection-item">
//           <Link to={`/songs/${id}`}>
//             {title}
//           </Link>
//           <i
//             className="material-icons"
//             onClick={() => this.onSongDelete(id)}
//           >
//             delete
//           </i>
//         </li>
//       );
//     });
//   }

//   render() {
//     if (this.props.data.loading) { return <div>Loading...</div>; }

//     return (
//       <div>
//         <ul className="collection">
//           {this.renderSongs()}
//         </ul>
//         <Link
//           to="/songs/new"
//           className="btn-floating btn-large red right"
//         >
//           <i className="material-icons">add</i>
//         </Link>
//       </div>
//     );
//   }
// }

// const mutation = gql`
//   mutation DeleteSong($id: ID) {
//     deleteSong(id: $id) {
//       id
//     }
//   }
// `;

// export default graphql(mutation)(
//   graphql(query)(SongList)
// );

import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/fetchSongs';
import mutation from '../queries/mutationDelete';


class SongList extends Component {
  onSongDelete(id) {
    console.log(id);
    // this.props.mutate({
    //   variables: {
    //     id
    //   },
    //   refetchQueries: [{query}]
    // })

    // We can use this because this class has one query bound to it
    this.props.mutate({
      variables: {
        id
      }
    }).then(()=> this.props.data.refetch());
  }
  renderSongsList() {
    // return this.props.data.songs.map(song => {
    //   return (
    //     <li key={song.id} className="collection-item">
    //       {song.title}
    //     </li>
    //   )
    // })
    let songsSort = [...this.props.data.songs].sort((song1, song2) => {
      const a = song1.title.toUpperCase();
      const b = song2.title.toUpperCase();
      return a < b ? -1 : 1;

    });

    return songsSort.map(({id, title}) => {
      return (
        <li key={id} className="collection-item">
          <Link className="del" to={`/songs/${id}`}>{title}</Link>
          <i
            className="floating right material-icons del"
            onClick={() => this.onSongDelete(id)}
          >
          delete
          </i>
        </li>
      )
    })
  }

  render() {
    if (this.props.data.loading === true) { return (<div>Loading...</div>)}
    return (
      <section>
        <ul className="collection">
          {this.renderSongsList()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </section>
    )
  }
}

export default graphql(mutation)(
  graphql(query)(SongList)
);