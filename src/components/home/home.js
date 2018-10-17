import React, { Component } from 'react';

import './home.css';

import Generative from '../generative';
import Header from '../header';
import Purchase from '../purchase';
// import PageLink from '../page-link';
import Share from '../share';
import ShirtConfig from '../shirt-config';
import ShirtPreview from '../shirt-preview';

import { SHIRT_PLACEMENTS } from '../../constants';

const GENERATIVE_VIEW = 'GENERATIVE_VIEW';
const SHIRT_VIEW = 'SHIRT_VIEW';

class Home extends Component {
  state = {
    currentPage: GENERATIVE_VIEW,
    selectedPlacement: Object.keys(SHIRT_PLACEMENTS)[0],
    showPurchaseWindow: false,
    showShareWindow: false
  };

  hidePurchaseWindow = () => {
    this.setState({
      showPurchaseWindow: false
    });
  }

  hideShareWindow = () => {
    this.setState({
      showShareWindow: false
    });
  }

  showPurchaseWindow = () => {
    this.setState({
      showPurchaseWindow: true
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
    this.setState({
      currentPage: SHIRT_VIEW
    });
  }

  selectNewShirtPlacement = newPlacement => {
    this.setState({
      selectedPlacement: newPlacement
    });
  }

  setSofloo = sofloo => {
    this.sofloo = sofloo;
  }

  sofloo = null;

  render() {
    const { currentPage, selectedPlacement, showPurchaseWindow, showShareWindow } = this.state;

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
            setSofloo={this.setSofloo}
          />
        )}
        {currentPage === SHIRT_VIEW && (
          <React.Fragment>
            <div className="row">
              <div className="col-8">
                <ShirtPreview
                  regenerateArtClicked={this.regenerateArtClicked}
                  selectedPlacement={selectedPlacement}
                  sofloo={this.sofloo}
                />
              </div>
              <div className="col-4">
                <ShirtConfig
                  orderTShirtButtonClicked={this.showPurchaseWindow}
                  selectedPlacement={selectedPlacement}
                  shareShirtButtonClicked={this.showShareWindow}
                />
              </div>
            </div>
            {showPurchaseWindow && <Purchase hidePurchaseWindow={this.hidePurchaseWindow}/>}
            {showShareWindow && <Share
              hideShareWindow={this.hideShareWindow}
              shareUrl="coming soon"
            />}
          </React.Fragment>
        )}
        {/* <svg className="home-svg" height="496" width="596" viewBox="0 0 596 496">
          <defs>
            <filter id="svg-shadow" y="-40%" x="-40%" height="180%" width="180%"><feOffset dx="4" dy="21"></feOffset><feGaussianBlur stdDeviation="9" result="offset-blur"></feGaussianBlur><feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"></feComposite><feFlood floodColor="rgba(52, 240, 139, 1)" floodOpacity="0.99" result="color"></feFlood><feComposite operator="in" in="color" in2="inverse" result="shadow"></feComposite><feComponentTransfer in="shadow" result="shadow"><feFuncA type="linear" slope="0.99"></feFuncA></feComponentTransfer></filter><clipPath clipPath="url(#clip-step-13-shape-0)" id="clip-step-12-shape-0"><path d="M 260.5442121446982 370.99721830870004 C 198.5223825027935 338.9988897388631 162.03345499940974 265.49436431362466 197.12543951663872 200.5461430650721 S 302.8820259185717 110.89890839032586 366.93009501160276 139.95166464206915 S 456.3846562849519 248.15129098076955 421.65204435470093 309.5977500085402 S 322.5660417866028 402.99554687853697 260.5442121446982 370.99721830870004 "></path></clipPath><clipPath clipPath="url(#clip-step-12-shape-0)" id="clip-step-11-shape-0"><path d="M 276.9653151402112 365.29221798238075 C 222.42830349250715 336.7257582679649 189.233201385724 272.05910090720266 220.9018684143866 214.6101032034423 S 314.37855471622777 135.75553812100762 370.9375634446612 161.3709506826742 S 449.6098418183499 257.2949338918341 418.30418688552453 311.24807558445576 S 331.5023267879152 393.8586776967967 276.9653151402112 365.2922179823808 "></path></clipPath><clipPath clipPath="url(#clip-step-11-shape-0)" id="clip-step-10-shape-0"><path d="M 290.9109525682573 359.50970599790804 C 243.11172280899223 334.0342775444038 212.88250472480416 277.3217011729651 241.4700946845736 226.6271692029169 S 323.8898747248035 157.49248083281628 373.70621173090086 180.0106055242897 S 442.6705854798795 264.88272856332884 414.45024632962327 312.08815244212394 S 338.7101823275224 384.98513445141225 290.91095256825736 359.50970599790804 "></path></clipPath><clipPath clipPath="url(#clip-step-10-shape-0)" id="clip-step-9-shape-0"><path d="M 302.3811244288365 353.6496823552819 C 260.57255657206065 330.9245165504591 232.98129030257445 281.28205047391117 258.8301183271998 236.59734106349606 S 331.41595004757414 176.10984111170268 375.2360398703217 195.87062916691585 S 435.5668992723588 270.9147538442313 410.09022268699715 312.11798058154477 S 344.1896922856123 376.3748481601047 302.3811244288365 353.6496823552819 "></path></clipPath><clipPath clipPath="url(#clip-step-9-shape-0)" id="clip-step-8-shape-0"><path d="M 311.37583072194866 347.71214705450234 C 274.81077714577316 327.39650444349 249.52953068173815 283.94013524233907 272.98193934226504 244.5206187851797 S 336.95675319186734 191.60761652573555 375.5270478629237 208.95102161055254 S 428.29878429016975 275.39106185638076 405.2241159576461 311.33756000271825 S 347.9408842981241 368.0277896655146 311.37583072194866 347.71214705450234 "></path></clipPath><clipPath clipPath="url(#clip-step-8-shape-0)" id="clip-step-7-shape-0"><path d="M 317.8950714475939 341.6971000955694 C 285.8264700521717 323.4501872098645 262.5272948181668 285.2961337282823 283.92555772976937 250.39700236796787 S 340.51228102593035 203.98560692213354 374.57923570870696 219.2517828551998 S 420.8662210379213 278.31163857093327 399.8519261415703 309.74689070564443 S 349.9636728430162 359.9440129812742 317.895071447594 341.6971000955694 "></path></clipPath><clipPath clipPath="url(#clip-step-7-shape-0)" id="clip-step-6-shape-0"><path d="M 321.9388466057723 335.604541478483 C 293.6199129302309 319.0853659311111 271.97481720984945 285.3505360213143 291.66097348971294 254.2264918118605 S 342.08258041521077 213.24329708182955 372.3926034076715 226.77291290085762 S 413.2691566835825 279.67634266857067 393.97365323876966 307.3459726903232 S 350.2577802813137 352.12371702585494 321.9388466057723 335.60454147848304 "></path></clipPath><clipPath clipPath="url(#clip-step-6-shape-0)" id="clip-step-5-shape-0"><path d="M 323.5071561964837 329.4344712032432 C 298.19166033181466 314.30162801081826 277.87257404446734 284.104264035787 296.1881866220956 256.00908711685764 S 341.6677808411144 219.3797431822611 368.9671509598172 231.514411747526 S 405.5074924087272 279.4848299083756 387.5892972492441 304.13480595675463 S 348.8226520611528 344.5673143956681 323.5071561964837 329.4344712032432 "></path></clipPath><clipPath clipPath="url(#clip-step-5-shape-0)" id="clip-step-4-shape-0"><path d="M 322.6000002197282 323.1868892698499 C 299.5425871301776 309.0983077034987 280.22132573934704 281.5587178010106 297.5071971269174 255.74478828295926 S 339.2681195949527 222.39353557391377 364.3028783651441 233.47627939520493 S 397.58107870824676 277.73649722021133 380.6988581729937 300.11339050493865 S 345.65741330927887 337.2754708362012 322.60000021972826 323.1868892698499 "></path></clipPath><clipPath clipPath="url(#clip-step-4-shape-0)" id="clip-step-3-shape-0"><path d="M 319.21737867550576 316.86179567830334 C 297.67381300999597 303.47453883370144 279.02205603236405 277.7156382972236 295.61800500417826 253.4335953101654 S 334.8839299977761 222.28294212446303 358.3997856236523 232.65851584389443 S 389.48973022331825 274.4305156516422 373.3023360100185 295.28172633487543 S 340.76094434101554 330.24905252290523 319.21737867550576 316.86179567830334 "></path></clipPath><clipPath clipPath="url(#clip-step-3-shape-0)" id="clip-step-2-shape-0"><path d="M 313.35929156381644 310.4591904286033 C 292.58644837154554 297.4294519144295 274.2757495499492 272.57671513709596 290.5206102538784 249.07550819847603 S 328.51556340218923 219.04629599983224 351.2578727353417 229.06112109359447 S 381.2332675007951 269.56602073203396 365.3997307603185 289.6398134465648 S 334.13213475608734 323.4889289427771 313.35929156381644 310.4591904286033 "></path></clipPath><clipPath clipPath="url(#clip-step-2-shape-0)" id="clip-step-1-shape-0"><path d="M 305.0257388846601 303.9790735207498 C 284.2812143394381 290.96247790153154 265.98304989268763 266.14303046337835 282.21501287601757 242.6705269478912 S 320.1632562980014 212.6825351774279 342.8771397002123 222.68409514430516 S 372.8115757999568 263.14243336796494 356.99104242389353 283.1876518400069 S 325.7702634298821 316.99566913996813 305.0257388846601 303.9790735207498 "></path></clipPath><clipPath clipPath="url(#clip-step-1-shape-0)" id="clip-step-0-shape-0"><path d="M 294.21672063803686 297.4214449547429 C 272.7581398034593 284.07359393423553 254.14398290811255 258.4146274108908 270.7012128705959 234.21865155841078 S 309.82701827767505 203.1916174020652 333.2575865182641 213.5274379960263 S 364.22465055009957 255.15973010235248 348.07627100074376 275.9252415152015 S 315.6753014726144 310.76929597525026 294.21672063803686 297.4214449547429 "></path></clipPath>
          </defs>
          <g clipPath="url(#clip-step-13-shape-0)" id="step-13-shape-0"><path className="step-path path-step-13-shape-0" d="M 260.5442121446982 370.99721830870004 C 198.5223825027935 338.9988897388631 162.03345499940974 265.49436431362466 197.12543951663872 200.5461430650721 S 302.8820259185717 110.89890839032586 366.93009501160276 139.95166464206915 S 456.3846562849519 248.15129098076955 421.65204435470093 309.5977500085402 S 322.5660417866028 402.99554687853697 260.5442121446982 370.99721830870004 "></path></g><g clipPath="url(#clip-step-12-shape-0)" id="step-12-shape-0"><path className="step-path path-step-12-shape-0" d="M 276.9653151402112 365.29221798238075 C 222.42830349250715 336.7257582679649 189.233201385724 272.05910090720266 220.9018684143866 214.6101032034423 S 314.37855471622777 135.75553812100762 370.9375634446612 161.3709506826742 S 449.6098418183499 257.2949338918341 418.30418688552453 311.24807558445576 S 331.5023267879152 393.8586776967967 276.9653151402112 365.2922179823808 "></path></g><g clipPath="url(#clip-step-11-shape-0)" id="step-11-shape-0"><path className="step-path path-step-11-shape-0" d="M 290.9109525682573 359.50970599790804 C 243.11172280899223 334.0342775444038 212.88250472480416 277.3217011729651 241.4700946845736 226.6271692029169 S 323.8898747248035 157.49248083281628 373.70621173090086 180.0106055242897 S 442.6705854798795 264.88272856332884 414.45024632962327 312.08815244212394 S 338.7101823275224 384.98513445141225 290.91095256825736 359.50970599790804 "></path></g><g clipPath="url(#clip-step-10-shape-0)" id="step-10-shape-0"><path className="step-path path-step-10-shape-0" d="M 302.3811244288365 353.6496823552819 C 260.57255657206065 330.9245165504591 232.98129030257445 281.28205047391117 258.8301183271998 236.59734106349606 S 331.41595004757414 176.10984111170268 375.2360398703217 195.87062916691585 S 435.5668992723588 270.9147538442313 410.09022268699715 312.11798058154477 S 344.1896922856123 376.3748481601047 302.3811244288365 353.6496823552819 "></path></g><g clipPath="url(#clip-step-9-shape-0)" id="step-9-shape-0"><path className="step-path path-step-9-shape-0" d="M 311.37583072194866 347.71214705450234 C 274.81077714577316 327.39650444349 249.52953068173815 283.94013524233907 272.98193934226504 244.5206187851797 S 336.95675319186734 191.60761652573555 375.5270478629237 208.95102161055254 S 428.29878429016975 275.39106185638076 405.2241159576461 311.33756000271825 S 347.9408842981241 368.0277896655146 311.37583072194866 347.71214705450234 "></path></g><g clipPath="url(#clip-step-8-shape-0)" id="step-8-shape-0"><path className="step-path path-step-8-shape-0" d="M 317.8950714475939 341.6971000955694 C 285.8264700521717 323.4501872098645 262.5272948181668 285.2961337282823 283.92555772976937 250.39700236796787 S 340.51228102593035 203.98560692213354 374.57923570870696 219.2517828551998 S 420.8662210379213 278.31163857093327 399.8519261415703 309.74689070564443 S 349.9636728430162 359.9440129812742 317.895071447594 341.6971000955694 "></path></g><g clipPath="url(#clip-step-7-shape-0)" id="step-7-shape-0"><path className="step-path path-step-7-shape-0" d="M 321.9388466057723 335.604541478483 C 293.6199129302309 319.0853659311111 271.97481720984945 285.3505360213143 291.66097348971294 254.2264918118605 S 342.08258041521077 213.24329708182955 372.3926034076715 226.77291290085762 S 413.2691566835825 279.67634266857067 393.97365323876966 307.3459726903232 S 350.2577802813137 352.12371702585494 321.9388466057723 335.60454147848304 "></path></g><g clipPath="url(#clip-step-6-shape-0)" id="step-6-shape-0"><path className="step-path path-step-6-shape-0" d="M 323.5071561964837 329.4344712032432 C 298.19166033181466 314.30162801081826 277.87257404446734 284.104264035787 296.1881866220956 256.00908711685764 S 341.6677808411144 219.3797431822611 368.9671509598172 231.514411747526 S 405.5074924087272 279.4848299083756 387.5892972492441 304.13480595675463 S 348.8226520611528 344.5673143956681 323.5071561964837 329.4344712032432 "></path></g><g clipPath="url(#clip-step-5-shape-0)" id="step-5-shape-0"><path className="step-path path-step-5-shape-0" d="M 322.6000002197282 323.1868892698499 C 299.5425871301776 309.0983077034987 280.22132573934704 281.5587178010106 297.5071971269174 255.74478828295926 S 339.2681195949527 222.39353557391377 364.3028783651441 233.47627939520493 S 397.58107870824676 277.73649722021133 380.6988581729937 300.11339050493865 S 345.65741330927887 337.2754708362012 322.60000021972826 323.1868892698499 "></path></g><g clipPath="url(#clip-step-4-shape-0)" id="step-4-shape-0"><path className="step-path path-step-4-shape-0" d="M 319.21737867550576 316.86179567830334 C 297.67381300999597 303.47453883370144 279.02205603236405 277.7156382972236 295.61800500417826 253.4335953101654 S 334.8839299977761 222.28294212446303 358.3997856236523 232.65851584389443 S 389.48973022331825 274.4305156516422 373.3023360100185 295.28172633487543 S 340.76094434101554 330.24905252290523 319.21737867550576 316.86179567830334 "></path></g><g clipPath="url(#clip-step-3-shape-0)" id="step-3-shape-0"><path className="step-path path-step-3-shape-0" d="M 313.35929156381644 310.4591904286033 C 292.58644837154554 297.4294519144295 274.2757495499492 272.57671513709596 290.5206102538784 249.07550819847603 S 328.51556340218923 219.04629599983224 351.2578727353417 229.06112109359447 S 381.2332675007951 269.56602073203396 365.3997307603185 289.6398134465648 S 334.13213475608734 323.4889289427771 313.35929156381644 310.4591904286033 "></path></g><g clipPath="url(#clip-step-2-shape-0)" id="step-2-shape-0"><path className="step-path path-step-2-shape-0" d="M 305.0257388846601 303.9790735207498 C 284.2812143394381 290.96247790153154 265.98304989268763 266.14303046337835 282.21501287601757 242.6705269478912 S 320.1632562980014 212.6825351774279 342.8771397002123 222.68409514430516 S 372.8115757999568 263.14243336796494 356.99104242389353 283.1876518400069 S 325.7702634298821 316.99566913996813 305.0257388846601 303.9790735207498 "></path></g><g clipPath="url(#clip-step-1-shape-0)" id="step-1-shape-0"><path className="step-path path-step-1-shape-0" d="M 294.21672063803686 297.4214449547429 C 272.7581398034593 284.07359393423553 254.14398290811255 258.4146274108908 270.7012128705959 234.21865155841078 S 309.82701827767505 203.1916174020652 333.2575865182641 213.5274379960263 S 364.22465055009957 255.15973010235248 348.07627100074376 275.9252415152015 S 315.6753014726144 310.76929597525026 294.21672063803686 297.4214449547429 "></path></g><g clipPath="url(#clip-step-0-shape-0)" id="step-0-shape-0"><path className="step-path path-step-0-shape-0" d="M 280.9322368239467 290.7863047305826 C 258.01654844538734 276.76333390908894 238.7579447784603 249.39049179400044 255.97921023761336 223.7198820300349 S 297.50662715462875 190.57453774436985 322.3992131894971 201.59114964875806 S 355.4725992768158 245.61845489380792 338.6554164908692 267.8525824721488 S 303.8479252025061 304.8092755520762 280.9322368239467 290.7863047305826 "></path></g><g clipPath="url(#clip-step-13-shape-0)" id="step-13-shape-0"><path d="M 260.5442121446982 370.99721830870004 C 198.5223825027935 338.9988897388631 162.03345499940974 265.49436431362466 197.12543951663872 200.5461430650721 S 302.8820259185717 110.89890839032586 366.93009501160276 139.95166464206915 S 456.3846562849519 248.15129098076955 421.65204435470093 309.5977500085402 S 322.5660417866028 402.99554687853697 260.5442121446982 370.99721830870004 "></path></g><g clipPath="url(#clip-step-12-shape-0)" id="step-12-shape-0"><path d="M 276.9653151402112 365.29221798238075 C 222.42830349250715 336.7257582679649 189.233201385724 272.05910090720266 220.9018684143866 214.6101032034423 S 314.37855471622777 135.75553812100762 370.9375634446612 161.3709506826742 S 449.6098418183499 257.2949338918341 418.30418688552453 311.24807558445576 S 331.5023267879152 393.8586776967967 276.9653151402112 365.2922179823808 "></path></g><g clipPath="url(#clip-step-11-shape-0)" id="step-11-shape-0"><path d="M 290.9109525682573 359.50970599790804 C 243.11172280899223 334.0342775444038 212.88250472480416 277.3217011729651 241.4700946845736 226.6271692029169 S 323.8898747248035 157.49248083281628 373.70621173090086 180.0106055242897 S 442.6705854798795 264.88272856332884 414.45024632962327 312.08815244212394 S 338.7101823275224 384.98513445141225 290.91095256825736 359.50970599790804 "></path></g><g clipPath="url(#clip-step-10-shape-0)" id="step-10-shape-0"><path d="M 302.3811244288365 353.6496823552819 C 260.57255657206065 330.9245165504591 232.98129030257445 281.28205047391117 258.8301183271998 236.59734106349606 S 331.41595004757414 176.10984111170268 375.2360398703217 195.87062916691585 S 435.5668992723588 270.9147538442313 410.09022268699715 312.11798058154477 S 344.1896922856123 376.3748481601047 302.3811244288365 353.6496823552819 "></path></g><g clipPath="url(#clip-step-9-shape-0)" id="step-9-shape-0"><path d="M 311.37583072194866 347.71214705450234 C 274.81077714577316 327.39650444349 249.52953068173815 283.94013524233907 272.98193934226504 244.5206187851797 S 336.95675319186734 191.60761652573555 375.5270478629237 208.95102161055254 S 428.29878429016975 275.39106185638076 405.2241159576461 311.33756000271825 S 347.9408842981241 368.0277896655146 311.37583072194866 347.71214705450234 "></path></g><g clipPath="url(#clip-step-8-shape-0)" id="step-8-shape-0"><path d="M 317.8950714475939 341.6971000955694 C 285.8264700521717 323.4501872098645 262.5272948181668 285.2961337282823 283.92555772976937 250.39700236796787 S 340.51228102593035 203.98560692213354 374.57923570870696 219.2517828551998 S 420.8662210379213 278.31163857093327 399.8519261415703 309.74689070564443 S 349.9636728430162 359.9440129812742 317.895071447594 341.6971000955694 "></path></g><g clipPath="url(#clip-step-7-shape-0)" id="step-7-shape-0"><path d="M 321.9388466057723 335.604541478483 C 293.6199129302309 319.0853659311111 271.97481720984945 285.3505360213143 291.66097348971294 254.2264918118605 S 342.08258041521077 213.24329708182955 372.3926034076715 226.77291290085762 S 413.2691566835825 279.67634266857067 393.97365323876966 307.3459726903232 S 350.2577802813137 352.12371702585494 321.9388466057723 335.60454147848304 "></path></g><g clipPath="url(#clip-step-6-shape-0)" id="step-6-shape-0"><path d="M 323.5071561964837 329.4344712032432 C 298.19166033181466 314.30162801081826 277.87257404446734 284.104264035787 296.1881866220956 256.00908711685764 S 341.6677808411144 219.3797431822611 368.9671509598172 231.514411747526 S 405.5074924087272 279.4848299083756 387.5892972492441 304.13480595675463 S 348.8226520611528 344.5673143956681 323.5071561964837 329.4344712032432 "></path></g><g clipPath="url(#clip-step-5-shape-0)" id="step-5-shape-0"><path d="M 322.6000002197282 323.1868892698499 C 299.5425871301776 309.0983077034987 280.22132573934704 281.5587178010106 297.5071971269174 255.74478828295926 S 339.2681195949527 222.39353557391377 364.3028783651441 233.47627939520493 S 397.58107870824676 277.73649722021133 380.6988581729937 300.11339050493865 S 345.65741330927887 337.2754708362012 322.60000021972826 323.1868892698499 "></path></g><g clipPath="url(#clip-step-4-shape-0)" id="step-4-shape-0"><path d="M 319.21737867550576 316.86179567830334 C 297.67381300999597 303.47453883370144 279.02205603236405 277.7156382972236 295.61800500417826 253.4335953101654 S 334.8839299977761 222.28294212446303 358.3997856236523 232.65851584389443 S 389.48973022331825 274.4305156516422 373.3023360100185 295.28172633487543 S 340.76094434101554 330.24905252290523 319.21737867550576 316.86179567830334 "></path></g><g clipPath="url(#clip-step-3-shape-0)" id="step-3-shape-0"><path d="M 313.35929156381644 310.4591904286033 C 292.58644837154554 297.4294519144295 274.2757495499492 272.57671513709596 290.5206102538784 249.07550819847603 S 328.51556340218923 219.04629599983224 351.2578727353417 229.06112109359447 S 381.2332675007951 269.56602073203396 365.3997307603185 289.6398134465648 S 334.13213475608734 323.4889289427771 313.35929156381644 310.4591904286033 "></path></g><g clipPath="url(#clip-step-2-shape-0)" id="step-2-shape-0"><path d="M 305.0257388846601 303.9790735207498 C 284.2812143394381 290.96247790153154 265.98304989268763 266.14303046337835 282.21501287601757 242.6705269478912 S 320.1632562980014 212.6825351774279 342.8771397002123 222.68409514430516 S 372.8115757999568 263.14243336796494 356.99104242389353 283.1876518400069 S 325.7702634298821 316.99566913996813 305.0257388846601 303.9790735207498 "></path></g><g clipPath="url(#clip-step-1-shape-0)" id="step-1-shape-0"><path d="M 294.21672063803686 297.4214449547429 C 272.7581398034593 284.07359393423553 254.14398290811255 258.4146274108908 270.7012128705959 234.21865155841078 S 309.82701827767505 203.1916174020652 333.2575865182641 213.5274379960263 S 364.22465055009957 255.15973010235248 348.07627100074376 275.9252415152015 S 315.6753014726144 310.76929597525026 294.21672063803686 297.4214449547429 "></path></g><g clipPath="url(#clip-step-0-shape-0)" id="step-0-shape-0"><path d="M 280.9322368239467 290.7863047305826 C 258.01654844538734 276.76333390908894 238.7579447784603 249.39049179400044 255.97921023761336 223.7198820300349 S 297.50662715462875 190.57453774436985 322.3992131894971 201.59114964875806 S 355.4725992768158 245.61845489380792 338.6554164908692 267.8525824721488 S 303.8479252025061 304.8092755520762 280.9322368239467 290.7863047305826 "></path></g>
        </svg> */}
      </div>
    );
  }
}

export default Home;
