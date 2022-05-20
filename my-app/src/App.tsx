import React from 'react';
import './App.css';
import { getData, getAccounts, Presence, User } from './authentication';
import { UserScreen } from './UserScreen';
import DefaultProfilePicture from "./img/blank-profile-picture.webp"
import { OfficeLocation } from './OfficeLocation';
function onlyUnique(value: any, index: number, self: any[]) {
  return self.indexOf(value) === index;
}
function App() {
  const [userData, setUserData] = React.useState([] as Array<Presence & User>);
  React.useEffect(() => {
    getData().then(res => {
      console.log(res);

      if (res) { setUserData(res) }
    })
    return () => {

    }
  }, []);
  return (
    <div>

      <main>
        {
          userData.map(res => res.officeLocation).filter(onlyUnique).map((val, index) => <>
            <OfficeLocation title={val} key={index}>
              <section className="cards">
                {
                  userData.filter(user => user.officeLocation == val).map(val => <UserScreen key={val.id} name={val.displayName} srcImage={DefaultProfilePicture} mail={val.mail} availability={val.availability} businessPhones={val.businessPhones} jobTitle={val.jobTitle} preferredLanguage={val.preferredLanguage} />)
                }
              </section>
            </OfficeLocation>
          </>)
        }

      </main>


    </div>
  );
}

export default App;
