/**
 * Mock SConnect user response for demo employee ID 99999.
 * Based on real Kay banner data from the dev API.
 */
import type { SConnectUserResponse } from '../../types/custom-apps/sconnect-home';

export const SCONNECT_DEMO_EMPLOYEE_ID = '99999';

export function buildMockUser(employeeId: string): SConnectUserResponse {
  return {
    employeeId,
    firstName: 'Demo',
    lastName: 'User',
    inError: false,
    atHome: false,
    supportCenter: '1',
    ipAddress: '127.0.0.1',
    bannerDetail: 'kay',
    storeNumber: '1234',
    completedCovidSurveyToday: true,
    showCovidSurvey: false,
    favorites: [],
    categories: [],
    adminBannerDetails: [
      {
        name: 'Kay',
        value: 'kay',
        categories: [
          {
            id: 1, name: 'Selling Tools', description: 'Selling Tools', itemOrder: 1, active: true,
            buttons: [
              { id: 2041, name: 'KayOutlet Website', description: 'KayOutlet.com/aos Website for Kay', url: 'https://www.kayoutlet.com/aos', image: 'http://cassiprod.jewels.com/SConnect/kayoutlet.jpg', itemOrder: 0, active: true, atHome: false, externalBrowser: true, categories: [] },
              { id: 232, name: 'Le Vian Style Bar', description: 'Le Vian Style Bar', url: 'https://stylebar1.levian.com/', image: 'http://cassiprod.jewels.com/SConnect/levianstylebar.png', itemOrder: 10, active: true, atHome: false, externalBrowser: true, categories: [] },
              { id: 2061, name: 'MyWork Login', description: 'MyWork Login', url: 'https://cfs01.jewels.com/cfs/login/fieldapps', image: 'http://cassiprod.jewels.com/SConnect/MyWork.png', itemOrder: 20, active: true, atHome: true, externalBrowser: true, categories: [] },
              { id: 2515, name: 'Signet Net', description: 'Signet Net Portal', url: 'https://net.signetjewelers.com/', image: 'http://cassiprod.jewels.com/SConnect/kay_holiday_commercials.png', itemOrder: 30, active: true, atHome: false, externalBrowser: false, categories: [] },
              { id: 2661, name: 'Enchanted Disney', description: 'Enchanted Disney Collection', url: 'http://cassiprod.sterling.com/SellingSystem/EnchantedDisney/index.html', image: 'http://cassiprod.jewels.com/SConnect/enchanted_disney.png', itemOrder: 40, active: true, atHome: false, externalBrowser: true, categories: [] },
            ],
          },
          {
            id: 2, name: 'Admin Tools', description: 'Admin Tools', itemOrder: 2, active: true,
            buttons: [
              { id: 2061, name: 'MyWork Login', description: 'MyWork Login', url: 'https://cfs01.jewels.com/cfs/login/fieldapps', image: 'http://cassiprod.jewels.com/SConnect/MyWork.png', itemOrder: 0, active: true, atHome: false, externalBrowser: true, categories: [] },
              { id: 1844, name: 'Genesis Account Lookup', description: 'Genesis Account Lookup', url: 'https://genesisaccountlookup.jewels.com/', image: 'http://cassiprod.jewels.com/SConnect/genesis_acct_lookup.png', itemOrder: 100, active: true, atHome: false, externalBrowser: false, categories: [] },
              { id: 2369, name: 'Care Remedy', description: 'Care - Remedy', url: 'https://careprod.jewels.com/RemedyWeb', image: 'http://cassiprod.jewels.com/SConnect/care-remedy.png', itemOrder: 110, active: true, atHome: false, externalBrowser: true, categories: [] },
            ],
          },
          {
            id: 3, name: 'Research Tools', description: 'Research Tools', itemOrder: 3, active: true,
            buttons: [
              { id: 1859, name: 'Kay Facebook', description: 'Kay Facebook Mobile', url: 'http://www.facebook.com/KayJewelers?ref=ts', image: 'http://cassiprod.jewels.com/SConnect/facebook_kay.png', itemOrder: 100, active: true, atHome: false, externalBrowser: false, categories: [] },
              { id: 1860, name: 'Kay Twitter', description: 'Kay Twitter', url: 'http://mobile.twitter.com/KayJewelers', image: 'http://cassiprod.jewels.com/SConnect/twitter_kay.png', itemOrder: 110, active: true, atHome: false, externalBrowser: false, categories: [] },
              { id: 1861, name: 'Kay YouTube', description: 'Kay YouTube Channel', url: 'http://www.youtube.com/KayJewelers', image: 'http://cassiprod.jewels.com/SConnect/KayYouTube.png', itemOrder: 120, active: true, atHome: false, externalBrowser: false, categories: [] },
            ],
          },
          {
            id: 4, name: 'Training Tools', description: 'Training Tools', itemOrder: 4, active: true,
            buttons: [
              { id: 1862, name: 'Learning Portal', description: 'Kay Learning Portal', url: 'https://signet.csod.com/samldefault.aspx?ouid=3', image: 'http://cassiprod.jewels.com/SConnect/learningportal.png', itemOrder: 10, active: true, atHome: false, externalBrowser: false, categories: [] },
              { id: 1863, name: 'Tolkowsky Training', description: 'Kay Tolkowsky Training', url: 'http://cassiprod.sterling.com/eLearning/TolkowskyTraining/', image: 'http://cassiprod.jewels.com/SConnect/tolkowskytraining.png', itemOrder: 61, active: true, atHome: false, externalBrowser: false, categories: [] },
            ],
          },
          {
            id: 5, name: 'Catalog Tools', description: 'Catalog Tools', itemOrder: 5, active: true,
            buttons: [
              { id: 1864, name: 'Dana Augustine Inc', description: 'Dana Augustine Inc Catalog', url: 'http://signet.danaaugustineinc.com/', image: 'http://cassiprod.jewels.com/SConnect/dana_augustine_inc.png', itemOrder: 100, active: true, atHome: false, externalBrowser: false, categories: [] },
              { id: 1865, name: 'DRS Jewelry', description: 'DRS Jewelry Catalog', url: 'http://www.drsjewelry.com/Sterling', image: 'http://cassiprod.jewels.com/SConnect/drs.png', itemOrder: 120, active: true, atHome: false, externalBrowser: false, categories: [] },
              { id: 1866, name: 'Frederick Goldman', description: 'Frederick Goldman Online Catalog', url: 'http://sterlingcatalog.fgoldman.com/', image: 'http://cassiprod.jewels.com/SConnect/frederick_goldman_online_catalog.png', itemOrder: 130, active: true, atHome: false, externalBrowser: false, categories: [] },
              { id: 1868, name: 'Overnight Mountings', description: 'Overnight Mountings Catalog', url: 'http://sterling.ovnight.com/', image: 'http://cassiprod.jewels.com/SConnect/OvernightMountings_button.png', itemOrder: 140, active: true, atHome: false, externalBrowser: false, categories: [] },
            ],
          },
          {
            id: 6, name: 'Video Tools', description: 'Video Tools', itemOrder: 6, active: true,
            buttons: [
              { id: 1873, name: 'In-Store Experience', description: 'Kay In-Store Experience Video', url: 'http://cassiprod.jewels.com/jwplayervideos/index.html?id=u88hXC3B', image: 'http://cassiprod.jewels.com/SConnect/kay_instore_experience.png', itemOrder: 21, active: true, atHome: false, externalBrowser: false, categories: [] },
              { id: 1875, name: 'St. Jude Video Series', description: 'St. Jude Video Series', url: 'http://cassiprod.jewels.com/jwplayervideos/index.html?id=WAze8pRt', image: 'http://cassiprod.jewels.com/SConnect/stJudeVideoSeries.png', itemOrder: 48, active: true, atHome: false, externalBrowser: false, categories: [] },
              { id: 1877, name: 'Video Instructions', description: 'Video Instruction Series', url: 'http://cassiprod.sterling.com/Portal/sites/videoInstructions/index.html', image: 'http://cassiprod.jewels.com/SConnect/videoInstructionSeries.png', itemOrder: 64, active: true, atHome: false, externalBrowser: false, categories: [] },
            ],
          },
        ],
      },
    ],
  };
}
