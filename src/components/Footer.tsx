import * as React from 'react';
import twitterIcon from '../images/twitter.svg';
import instagramIcon from '../images/instagram.svg';
import facebookIcon from '../images/facebook.svg';


export interface IFooterProps {
}

export default function Footer(props: IFooterProps) {
  return (
    <div className='footer scale-content-width'>
      <div className='footer-top'>
        <div className='text'>Dublin, Ireland</div>
        <div className='text'>
        <a href="mailto:hello@lctutors.com">hello@lctutors.com</a>
        </div>
        <div className='icon-cont text'>
          <img src={twitterIcon} />
          <img src={instagramIcon} />
          <img src={facebookIcon} />
        </div>
        <hr color='white ' />
      </div>
      <div className='footer-bottom'>
        <div className='privacy-policy text'><a href='/privacy-policy'>Privaty Policy</a></div>
        <div className='copyright'>LC Tutors Ltd, trading as LC Tutors, is registered with the Companies Registration Office in Ireland, registration number 722314. The company operates remotely across Ireland with a staff of 34 full and part time educators and support staff. Olus Academy Ltd has its registered office at Adress blah blah blah</div>
      </div>
    </div>
  );
}
