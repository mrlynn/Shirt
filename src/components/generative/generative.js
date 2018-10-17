import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { VERSIONS } from '../../constants';
import { generateRandomLayout } from '../../sofloo/layouts';

import Sofloo from './sofloo';

import { 
  AnonymousCredential,
  Stitch,
} from "mongodb-stitch-browser-sdk";

import { 
  AwsRequest,
  AwsServiceClient,
} from "mongodb-stitch-browser-services-aws";

import './generative.css';

const displayHeight = 500;
const displayWidth = 500;

const randomizeAlgorithm = VERSIONS.FULL_RANDOM;

class Generative extends Component {
  static propTypes = {
    purchaseShirtClicked: PropTypes.func.isRequired,
  };

  state = {
    building: true,
    shapes: []
  }

  componentDidMount = () => {
    const png_blob = this.generateNewSofloo();
  }

  setImageRef = image => {
    this.image = image;
    this.generateSoflooImage();
  }

  convertImageToBSONBinaryObject = (file) => {
    return new Promise(resolve => {
      var fileReader = new FileReader();
      fileReader.onload = event => {
        resolve({
          $binary: {
            base64: event.target.result.split(",")[1],
            subType: "00"
          }
        });
      }
      fileReader.readAsDataURL(file);
    })
  }
  
  handleFileUpload = async (client, png_blob) => {
    client.callFunction('callme', [new File([png_blob], 'fuckme.png')]);

    // Upload the image binary to S3
    const aws = client.getServiceClient(AwsServiceClient.factory, "aws");
    const key = `${client.auth.user.id}-${Date.now()}.png`;
    const bucket = "mdb-sofloo";

    const request = new AwsRequest.Builder()
      .withService("s3")
      .withAction("PutObject")
      .withRegion("us-east-1")
      .withArgs({
        ACL: "public-read",
        Bucket: bucket,
        ContentType: 'image/png',
        Key: key,
        Body: await this.convertImageToBSONBinaryObject(new File([png_blob], key))
      });
      
    await aws.execute(request.build());

    return `https://s3.amazonaws.com/${bucket}/${key}`;
  }

  generateSoflooImage = () => {
    const svgData = new XMLSerializer().serializeToString(this.image);

    const canvas = document.createElement('canvas');
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    const ctx = canvas.getContext('2d');

    const img = document.createElement('img');
    img.setAttribute('src', `data:image/svg+xml;base64,${btoa(svgData)}`);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, displayWidth, displayHeight);

      canvas.toBlob(async blobData => {
        const client = Stitch.defaultAppClient;
        const url = await this.handleFileUpload(client, blobData);
        console.log(url);
      });
    };
  }

  generateNewSofloo = () => {
    this.setState({
      building: true
    });

    setTimeout(() => {
      const { shapes } = generateRandomLayout(displayWidth, displayHeight, randomizeAlgorithm);

      this.sofloo = <Sofloo
        height={displayHeight}
        setSvgRef={this.setImageRef}
        shapes={shapes}
        width={displayWidth}
      />;

      this.setState({
        building: false,
        shapes
      });
    }, 10);
  }

  generateClicked = () => {
    this.generateNewSofloo();
  }

  sofloo = null;

  render() {
    const { building } = this.state;

    return (
      <div className="generative">
        <div className="row">
          {building && (
            <div className="generative-loading-container">
              <div className="generative-loading-text">
                loading...
              </div>
              {/* <img
                className="generative-loading"
                alt="Loading..."
                src="loading.gif"
              /> */}
            </div>
          )}
          {!building && this.sofloo}
        </div>
        <div className="row">
          <div
            className="generative-generate-button sofloo-button"
            onClick={this.generateClicked}
          >generate art</div>
          <div
            className="generative-build-tee-button sofloo-button-inverse"
            onClick={this.props.purchaseShirtClicked}
          >build a tee</div>
        </div>
      </div>
    );
  }
}

export default Generative;
