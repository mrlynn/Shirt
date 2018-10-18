import {
  Stitch,
  AnonymousCredential
} from 'mongodb-stitch-browser-sdk';

class StitchApp {
  constructor() {
    this.init()
  }
  init = () => {
    const client = Stitch.initializeDefaultAppClient('dankshirts-waggl');
    this.client = client
  }

  authenticate = async () => {
    if (this.client.auth.isLoggedIn) {
      await this.client.auth.logout()
    }
    const credential = new AnonymousCredential();
    return this.client.auth.loginWithCredential(credential);
  }

  generateMockups = async (graphicURL) => {
    const variants = [
      { color: 'White', size: 'M', id: 4874 },
      { color: 'Black', size: 'M', id: 4867 }
    ];

    const placements = ['full', 'pocket'];
    const variantIds = variants.map(v => v.id);

    console.log('placements', placements)

    const mockups = placements.map(async (placement) => {
      let taskId = await this.startMockupTask(graphicURL, variantIds, placement);
      const tempMockups = await this.getMockupsFromTask(taskId);

      return tempMockups.map(mockup => {
        const variantId = mockup['variant_ids'][0];
        const color = variants.filter(v => v.id === variantId)[0];

        return {
          variantId,
          color,
          placement,
          mockupURL: mockup['mockup_url']
        };
      });
    });

    const flattenArray = arr => arr.reduce((acc, curr) => { return acc.concat(curr) }, [])
    return await Promise.all(mockups).then(flattenArray);
  }

  startMockupTask = async (graphicURL, variantIds, placement) => {
    let graphicPosition = {
      area_width: 1800,
      area_height: 2400,
      width: 1800,
      height: 1800,
      top: 300,
      left: 0
    };

    if (placement === 'pocket') {
      graphicPosition.width = 900;
      graphicPosition.height = 900;
      graphicPosition.top = 100;
      graphicPosition.left = 1200;
    }

    const action = {
      action: 'generateMockup',
      productId: 108,
      variant_ids: variantIds,
      format: 'png',
      files: [
        {
          placement: 'front',
          image_url: graphicURL,
          position: graphicPosition
        }
      ]
    };

    const response = await this.client.callFunction('printful', [action]);
    const responseObject = JSON.parse(response);
    return responseObject.result.task_key;
  }

  getMockupsFromTask = async (taskId) => {
    const response = await this.client.callFunction('printful', [{
      action: 'getMockupResults',
      task_key: taskId
    }]);

    const { code, result } = JSON.parse(response);

    if (result.status === 'completed') {
      return result.mockups;
    } else if (code === 404) {
      throw 'invalid task'
    } else {
      return await this.getMockupsFromTask(taskId)
    }
  }
}

export default StitchApp
