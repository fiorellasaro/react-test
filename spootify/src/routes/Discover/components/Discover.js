import React, { Component} from 'react';
import axios from 'axios'
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import api from '../../../config';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }
  
  componentDidMount() {
    axios({
      method: 'GET',
      url: `${api.api.baseUrl}/new-releases`,
      headers: {
        'Authorization': `Bearer ${api.api.token}` 
      }
    })
      .then((response) => {
        this.setState({
          newReleases: response.data.albums.items
        });
      })
      .catch((error) => {

        console.log(error);

      });

      axios({
        method: 'GET',
        url: `${api.api.baseUrl}/featured-playlists`,
        headers: {
          'Authorization': `Bearer ${api.api.token}` 
        }
      })
        .then((response) => {
          this.setState({
            playlists: response.data.playlists.items
          });
          
        })
        .catch((error) => {
  
          console.log(error);
  
        });

        axios({
          method: 'GET',
          url: `${api.api.baseUrl}/categories`,
          headers: {
            'Authorization': `Bearer ${api.api.token}` 
          }
        })
          .then((response) => {
          
            this.setState({
              categories: response.data.categories.items
            });
            
          })
          .catch((error) => {
    
            console.log(error);
    
          });
   }
  render() {


    const { newReleases, playlists, categories } = this.state;




    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
