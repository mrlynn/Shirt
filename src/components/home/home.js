import React, { Component } from 'react';

import {
  Stitch,
} from "mongodb-stitch-browser-sdk";

import {
  AwsRequest,
  AwsServiceClient,
} from "mongodb-stitch-browser-services-aws";

import './home.css';

import Generative from '../generative';
import Header from '../header';
import Pay from '../pay';
// import PageLink from '../page-link';
import Share from '../share';
import ShirtConfig from '../shirt-config';
import ShirtPreview from '../shirt-preview';

import StitchApp from '../stitch';

import { SHIRT_COLORS, SHIRT_PLACEMENTS } from '../../constants';

const GENERATIVE_VIEW = 'GENERATIVE_VIEW';
const SHIRT_VIEW = 'SHIRT_VIEW';

const stitch = new StitchApp();
stitch.authenticate();

const displayHeight = 500;
const displayWidth = 500;

class Home extends Component {
  state = {
    currentPage: GENERATIVE_VIEW,
    haveMockups: false,
    mockups: [],
    selectedShirtColor: Object.keys(SHIRT_COLORS)[0],
    selectedPlacement: Object.keys(SHIRT_PLACEMENTS)[0],
    showPayWindow: false,
    showShareWindow: false,
    currentImageUrl: ""
  };

  hidePayWindow = () => {
    this.setState({
      showPayWindow: false
    });
  }

  hideShareWindow = () => {
    this.setState({
      showShareWindow: false
    });
  }

  showPayWindow = () => {
    this.setState({
      showPayWindow: true
    });
  }

  showShareWindow = () => {
    this.setState({
      showShareWindow: true
    });
  }

  regenerateArtClicked = () => {
    this.setState({
      currentPage: GENERATIVE_VIEW
    });
  }

  purchaseShirtClicked = () => {
    this.generateSoflooImage(this.soflooRef);

    this.setState({
      currentPage: SHIRT_VIEW
    });
  }

  selectNewShirtColor = newColor => {
    this.setState({
      selectedShirtColor: newColor
    });
  }

  selectNewShirtPlacement = newPlacement => {
    this.setState({
      selectedPlacement: newPlacement
    });
  }

  setCurrentImageUrl = url => {
    this.setState({
      currentImageUrl: url
    });

    this.generateMockups();
  }

  setSoflooRef = ref => {
    this.soflooRef = ref;
  }

  convertImageToBSONBinaryObject = file => {
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
    // Upload the image binary to S3
    const aws = client.getServiceClient(AwsServiceClient.factory, "aws");
    // TODO: Use the image seed for this.
    // ${client.auth.user.id}-
    const key = `${Date.now()}.png`;
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

  generateSoflooImage = svgNodeRef => {
    if (!svgNodeRef) { 
      alert('Svg not built yet please refresh n try again.');
    }
    const svgData = new XMLSerializer().serializeToString(svgNodeRef);

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
        this.setCurrentImageUrl(url);
        console.log(url);
      });
    };
  }

  generateMockups = async () => {
    this.setState({
      haveMockups: false
    });

    const mockups = await stitch.generateMockups(this.state.currentImageUrl);

    this.setState({
      haveMockups: true,
      mockups
    });
  }

  sofloo = null;
  soflooRef = null;

  render() {
    const {
      currentPage,
      haveMockups,
      mockups,
      selectedPlacement,
      selectedShirtColor,
      showPayWindow,
      showShareWindow
    } = this.state;

    return (
      <div className="home">
        <Header />
        <div className="home-links">
          {/* <div className="home-link">
            <PageLink linkText="Shirts" linkUrl="shirts" />
          </div>
          <div className="home-link">
            <PageLink linkText="About" linkUrl="about" />
          </div> */}
        </div>
        {currentPage === GENERATIVE_VIEW && (
          <Generative
            purchaseShirtClicked={this.purchaseShirtClicked}
            setCurrentImageUrl={this.setCurrentImageUrl}
            setSoflooRef={this.setSoflooRef}
          />
        )}
        {currentPage === SHIRT_VIEW && (
          <React.Fragment>
            <div className="row">
              <div className="col-8">
                <ShirtPreview
                  haveMockups={haveMockups}
                  mockups={mockups}
                  regenerateArtClicked={this.regenerateArtClicked}
                  selectedPlacement={selectedPlacement}
                  selectedShirtColor={selectedShirtColor}
                />
              </div>
              <div className="col-4">
                <ShirtConfig
                  orderTShirtButtonClicked={this.showPayWindow}
                  selectedPlacement={selectedPlacement}
                  selectedShirtColor={selectedShirtColor}
                  selectNewShirtColor={this.selectNewShirtColor}
                  selectNewShirtPlacement={this.selectNewShirtPlacement}
                  shareShirtButtonClicked={this.showShareWindow}
                />
              </div>
            </div>
            {showPayWindow && <Pay hidePayWindow={this.hidePayWindow}/>}
            {showShareWindow && <Share
              hideShareWindow={this.hideShareWindow}
              shareUrl="coming soon"
            />}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Home;
