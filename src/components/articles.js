import React, { Component } from 'react'
import {
    Row,
    Col,
    Card,
    Avatar,
    Space,
    Divider
} from 'antd';
import '../styles/articles.css'
import 'antd/dist/antd.css';
import { BoxLoading } from 'react-loadingg';
import { instanceAxios, baseURL } from '../config/instance-axios';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { DialogContent, IconButton, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import { FaWindowClose } from 'react-icons/fa';

const { Meta } = Card;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }));

class Articles extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            isLoading: true,
            errors: null,
            open: false
        };
        this.handleViewOpen = this.handleViewOpen.bind(this)
    }
    

    componentDidMount() {
      instanceAxios.get(`${baseURL}`)
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

    // data under dialog
    handleViewOpen = (data) => {
        this.setState({
            title: data.result.title,
            abstract: data.result.abstract,
            byline: data.result.byline,
            published_date: data.result.published_date,
            caption: data.result.media.caption,
            url: data.result.url,
            type: data.result.type,
            viewOpen: true
        })
    }

    render() {
      const { isLoading, results } = this.state;

      const DialogTitle = ((props) => {
        const { children, classes, onClose, ...other } = props;
        return (
            <MuiDialogTitle disablep className={classes.root} {...other}>
                <p variant="h6">{children}</p>
                {onClose ? (
                    <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}></IconButton>
                ) : null}
            </MuiDialogTitle>
        )
        })

        const { viewOpen } = this.state;

        const handleViewClose = () => {
            this.setState({ viewOpen: false })
        }

    const classes = useStyles;

      return (
          <div>
              <h3>Most Popular Articles</h3>
              <Row gutter={16}>
                    {!isLoading ? (results.map(result => {
                        return (
                            <Col className="gutter-row" span={8} xs ={24} xl={8}>
                            <div className="site-card-wrapper">
                                <Card 
                                    className="card" 
                                    bordered={true} 
                                    hoverable key={result.id}>
                                    <Meta avatar={
                                        <Avatar src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png" />
                                    }
                                    title={result.title}
                                    description={result.abstract}
                                    onClick={() => this.handleViewOpen({ result })}
                                    />
                                    <Row>
                                        <Space>
                                            <p>{result.byline}</p>
                                            <br/>
                                            <p>{result.published_date}</p>
                                        </Space>
                                    </Row>
                                </Card>
                            </div></Col>
                        );
                    })
                    ) : (
                    <BoxLoading/>
                    )}
                </Row>

                {/* view more details on the article on this dialog */}
                <Dialog
                    fullWidth
                    open={viewOpen}
                    className="dialogeStyle"
                    onClose={handleViewClose}
                    TransitionComponent={Transition}>

                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleViewClose} aria-label="close">
                            <FaWindowClose style={{color:'#000'}}/>
                        </IconButton>
                    </Toolbar>

                    <DialogContent >
                        <h2>{this.state.title}</h2>
                        <span style={{color: "#5C6E80"}}>{this.state.abstract}</span>
                        <br/>
                        {/* <img src={this.state.image} alt="photo"/> */}
                        <span>{this.state.caption}</span>
                        <span style={{color: "#33373B"}}>{this.state.byline}</span>
                        <br/>
                        <br/>
                        <p style={{color: "#505861"}}>{this.state.published_date}</p>
                        <Divider/>
                        <DialogContentText id="alert-dialog-description">
                           <a href={this.state.url} target="_blank" rel="noreferrer">Read full {this.state.type} here</a>
                        </DialogContentText>

                    </DialogContent>
                </Dialog>
          </div>
      );
    }
  }

  export default Articles;