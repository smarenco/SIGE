import { Button } from "antd";
import React from "react";
import Loading from "./Loading";

const widthDefault = 680;
const heightDefault = 480;

const STATE_IDLE = 0;
const STATE_INIT = 1;
const STATE_TAKEN = 2;

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: props.width ?? widthDefault,
            height: props.height ?? heightDefault,
            currentState: STATE_IDLE,
            loading: true,
        };
        this.stream = undefined;
        this.startCamera = this.startCamera.bind(this);
        this.stopCamera = this.stopCamera.bind(this);
        this.newPhoto = this.newPhoto.bind(this);
        this.takeSnapshot = this.takeSnapshot.bind(this);
        this.onTakeSnapshot = this.onTakeSnapshot.bind(this);
        this.setSize = this.setSize.bind(this);
        this.videoRef = React.createRef();
        this.canvasRef = React.createRef();
        this.context = undefined;
    }

    componentDidMount() {
        this.startCamera();
    }

    componentWillUnmount() {
        this.stopCamera();
    }

    render() {
        return (
            <div style={{ marginTop: 25, paddingRight: 38, width: 438 }}>
                <Loading loading={this.state.loading}>
                    <video style={{ display: this.state.currentState === STATE_INIT ? 'inline-block' : 'none', objectFit: 'contain' }} ref={this.videoRef} autoPlay width={this.state.width} height={this.state.height}></video>
                    <canvas style={{ display: this.state.currentState === STATE_TAKEN ? 'inline-block' : 'none' }} ref={this.canvasRef} width={this.state.width} height={this.state.height}></canvas>
                    {/* <button disabled={this.state.currentState !== STATE_IDLE} onClick={this.startCamera}>Start camera</button>
                    <button disabled={this.state.currentState !== STATE_TAKEN} onClick={this.newPhoto}>New photo</button>
                    <button disabled={this.state.currentState !== STATE_INIT} onClick={() => this.onTakeSnapshot(this.takeSnapshot())}>Take photo</button> */}
                </Loading>
                <div style={{ position: 'absolute', marginTop: 25, marginLeft: -38 }}>
                    <Button disabled={this.state.currentState !== STATE_TAKEN} onClick={this.newPhoto} style={{ marginRight: 10 }}>Nueva foto</Button>
                    <Button disabled={this.state.currentState !== STATE_INIT} onClick={() => this.onTakeSnapshot(this.takeSnapshot())} type="primary">Tomar fotografía</Button>
                </div>
            </div>
        );
    }

    startCamera() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                this.stream = stream;
                this.setState({ loading: false });
                const { width, height } = stream.getVideoTracks()[0].getSettings();
                let newWidth = this.state.width, newHeight = newWidth * height / width;
                this.setSize(newWidth, newHeight);
                this.videoRef.current.srcObject = stream;
                this.videoRef.current.play();
                this.setState({ currentState: STATE_INIT });
            });
        }
    }

    stopCamera() {
        this.stream.getTracks().forEach(track => track.stop());
    }

    newPhoto() {
        this.setState({ currentState: STATE_INIT });
        if (typeof this.props.onNewPhoto === 'function') {
            this.props.onNewPhoto();
        }
    }

    takeSnapshot() {
        this.context = this.canvasRef.current.getContext('2d');
        this.context.drawImage(this.videoRef.current, 0, 0, this.state.width, this.state.height);
        this.setState({ currentState: STATE_TAKEN });
        return this.canvasRef.current.toDataURL();
    }

    setSize(width, height) {
        this.setState({ width, height });
    }

    onTakeSnapshot(data) {
        if (typeof this.props.onTakeSnapshot === 'function') {
            this.props.onTakeSnapshot(data);
        }
    }
    
}