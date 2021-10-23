import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0xFD95E36D34F909DB86734413611B1CcCDE8614bE'
);

export default instance;