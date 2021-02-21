import React, {useState} from 'react';
import UserProfile from './UserProfile';
import UserProfileApollo from './UserProfileApollo';

const Demo = (): JSX.Element => {
  const [relay, setRelay] = useState(true);

  return (
    <main className="Demo">
      <h1>Demo</h1>
      <h3>Choose your client:</h3>
      <div id="client-switch">
        Apollo
        <label class="switch">
          <input type="checkbox" 
          checked={relay}
          onChange={(e) => setRelay(e.target.checked)}/>
          <span class="slider round"></span>
        </label>
        Relay
      </div>
      {relay
        ? <UserProfile />
        : <UserProfileApollo />
      }
    </main>
  )
}

export default Demo;