import React, { Component } from 'react'
import {
    Row,
    Col,
    Card,
    Avatar
} from 'antd';
import '../styles/articles.css'
import { BoxLoading } from 'react-loadingg';
import { instanceAxios, baseURL } from '../config/instance-axios';

const { Meta } = Card;

class Articles extends Component {
    state = {
      results: [],
      isLoading: true,
      errors: null
    };

    componentDidMount() {
      instanceAxios
        .get(`${baseURL}`)
        .then(response => {
          this.setState({
            results: response.data.results,
            isLoading: false
          });
        })

        .catch(error => this.setState({ 
            error, 
            isLoading: false 
        }));
    }

    render() {
      const { isLoading, results } = this.state;

      return (
          <div>
            {!isLoading ? (
              results.map(result => {
                const { _id, title, abstract } = result;
                return (
                    <Row gutter={16}>
                        <Col span={8}>
                        <Card style={{ width: 300, marginTop: 16 }} bordered={true} key={_id}>
                            <Meta
                            avatar={
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            }
                            title={title}
                            description={abstract}
                            />
                        </Card>
                        </Col>
                    </Row>
                );
              })
            ) : (
              <BoxLoading/>
            )}
          </div>
      );
    }
  }

  export default Articles;