import React, { Component } from 'react'
import {Grid} from '@material-ui/core'
import SearchBar from './components/SearchBar'
import VideoDetail from './components/VideoDetail'
import VideoList from './components/VideoList'
import YouTube from './api/YouTube'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            videos: [],
            selectedVideo: null
        }
    }

    componentDidMount() {
        this.handleSubmit('BB ki vines')
    }

    handleSubmit = async(searchTerm) => {
        const response = await YouTube.get('search' , {
            params: {
            part: 'snippet',
            maxResults: 5,
            key: 'AIzaSyAJBbZ2BjOj6DZBvpnHZ6RTyMYXoqgOTTo',
            q: searchTerm,
        }
    })
        //console.log(response.data.items);
        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        })
    }

    onVideoSelect = (video) => {
        this.setState({
            selectedVideo:video
        })
    }

    render() {
        const {selectedVideo, videos} = this.state
        return (
            <Grid justify="center" container spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit}/>
                        </Grid>

                        <Grid item xs={8}>
                            <VideoDetail video={selectedVideo}/>
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
export default App