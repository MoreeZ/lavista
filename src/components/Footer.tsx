import * as React from 'react';
import airbnbIcon from '../images/airbnb.svg';
import tripadvisorIcon from '../images/tripadvisor.svg';
import facebookIcon from '../images/facebook.svg';


export interface IFooterProps {
}

export default function Footer(props: IFooterProps) {
  return (
    <div className='footer scale-content-width'>
      <div className='footer-top'>
        <div className='text'>Canoa, Ecuador</div>
        <div className='text'>
        <a target="_blank" href="mailto:hello@lctutors.com">lavistacanoa@gmail.com</a>
        </div>
        <div className='icon-cont text'>
          <img src={airbnbIcon} />
          <img src={tripadvisorIcon} />
          <img src={facebookIcon} />
        </div>
        <hr color='white ' />
      </div>
      <div className='footer-bottom'>
        <div className='privacy-policy text'><a target="_blank" href='/#'>We care about your privacy.</a></div>
        <div className='copyright'>
Copyright ©2022 La Vista Canoa Hotel - lavistacanoa@gmail.com</div>
      </div>
    </div>
  );
}
