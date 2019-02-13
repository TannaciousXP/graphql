// import React, { Component } from 'react';
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';
// import { Link, hashHistory } from 'react-router';
// import query from '../queries/fetchSongs';

// class SongCreate extends Component {
//   constructor(props) {
//     super(props);

//     this.state = { title: '' };
//   }

//   onSubmit(event) {
//     event.preventDefault();

//     this.props.mutate({
//       variables: { title: this.state.title },
//       refetchQueries: [{ query }]
//     }).then(() => hashHistory.push('/'));
//   }

//   render() {
//     return (
//       <div>
//         <Link to="/">Back</Link>
//         <h3>Create a New Song</h3>
//         <form onSubmit={this.onSubmit.bind(this)}>
//           <label>Song Title:</label>
//           <input
//             onChange={event => this.setState({ title: event.target.value })}
//             value={this.state.title}
//           />
//         </form>
//       </div>
//     );
//   }
// }

// const mutation = gql`
//   mutation AddSong($title: String){
//     addSong(title: $title) {
//       title
//     }
//   }
// `;

// export default graphql(mutation)(SongCreate);

import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({title: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
    // Returns a promise
    this.props.mutate({
      variables: {
        title: this.state.title
      },
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/'))
  }

  render() {
    const { title } = this.state;
    return (
      <section>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit}>
          <label>Song Title:</label>
          <input
            onChange={this.onChange}
            value={title}
          />
        </form>
        <Link to="/" className="btn-floating btn-large red right">
          <i className="material-icons">navigate_before</i>
        </Link>
      </section>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`

/*
  mutation AddSong($title: String) { // AddSong is the name of the func, could be different
    addSong(title: $title) { // our schema mutation
        id
        title
    }
  }
*/

export default graphql(mutation)(SongCreate);