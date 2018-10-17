import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';

import Router from '../../router';

import {
  Stitch,
  AnonymousCredential
} from "mongodb-stitch-browser-sdk";

import './app.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <StripeProvider apiKey="pk_test_12345">
          <Router />
        </StripeProvider>
      </div>
    );
  }
}

const client = Stitch.initializeDefaultAppClient('dankshirts-waggl');

client.auth.loginWithCredential(new AnonymousCredential())

async function generateMockups(graphicURL) {
  const variants = [
    { color: "White", size: "M", id: 4874 },
    { color: "Black", size: "M", id: 4867 }
  ];

  const placements = ["full", "pocket"];

  const variantIds = variants.map(v => v.id);

  const mockups = placements.map(async (placement) => {
    const taskId = await startMockupTask(graphicURL, variantIds, placement);
    const tempMockups = await getMockupsFromTask(taskId);

    return tempMockups.map(mockup => {
      const variantId = mockup["variant_ids"][0];
      const color = variants.filter(v => v.id === variantId)[0];

      return {
        variantId,
        color,
        placement,
        mockupURL: mockup["mockup_url"]
      };
    });
  });

  return await Promise.all(mockups)
    .then(arr => arr.reduce((acc, curr) => { return acc.concat(curr) }, []));
}

async function startMockupTask(graphicURL, variantIds, placement) {
  let graphicPosition = {
    area_width: 1800,
    area_height: 2400,
    width: 1800,
    height: 1800,
    top: 300,
    left: 0
  };

  if (placement === "pocket") {
    graphicPosition.width = 900;
    graphicPosition.height = 900;
    graphicPosition.top = 100;
    graphicPosition.left = 1200;
  }

  const action = {
    action: "generateMockup",
    productId: 108,
    variant_ids: variantIds,
    format: "png",
    files: [
      {
        placement: "front",
        image_url: graphicURL,
        position: graphicPosition
      }
    ]
  };

  const response = await client.callFunction('printful', [action]);
  const responseObject = JSON.parse(response);
  return responseObject.result.task_key;
}

async function getMockupsFromTask(taskId) {
  const response = await client.callFunction('printful', [{
    action: 'getMockupResults',
    task_key: taskId
  }]);

  const responseObject = JSON.parse(response);

  if (responseObject.result.status !== "completed") {
    return getMockupsFromTask(taskId);
  }

  return responseObject.result.mockups;
}

export default App;
