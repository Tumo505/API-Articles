import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import '../App.css';
import '../index.css'
import { instanceAxios, baseURL } from '../config/instance-axios';

const { Meta } = Card;

class Articles extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        articles: []
      };
    }
  
    componentDidMount() {
      fetch(`${baseURL}`)
        .then(response => response.json())
        .then(
          (response) => {
            console.log(response)
            this.setState({
              isLoaded: true,
              articles: response.articles
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, articles } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Card.Text>Card Link</Card.Text>
                    <Card.Text>Another Link</Card.Text>
                </Card.Body>
            </Card>
          </>
        );
      }
    }
  }
export default Articles;