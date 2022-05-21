import React from 'react';
import './App.css';
import { getData, login } from './authentication';
import { Presence } from "./interfaces/Presence";
import { User } from "./interfaces/User";
import { UserScreen } from './Components/UserScreen';
import DefaultProfilePicture from "./img/blank-profile-picture.webp"
import { OfficeLocation } from './OfficeLocation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Button, Input, Menu, MenuItem, Toolbar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AppBar from '@mui/material/AppBar';
function onlyUnique(value: any, index: number, self: any[]) {
  return self.indexOf(value) === index;
}

enum FilterState {
  ALL, LICENCED
}
//not implemented
export const BadgeContext = React.createContext({
  value: [] as string[],
  setValue: (val: string[]) => { }
});
function App() {

  const [userData, setUserData] = React.useState([] as Array<Presence & User>);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null as unknown as Element | null);
  const [filter, setFilter] = React.useState(FilterState.ALL);
  const [inputValue, setInputValue] = React.useState("");
  const cachedData = React.useRef([] as Array<Presence & User>);
  const [isLoggedIn, setisLoggedIn] = React.useState(false);
  //not implemented
  const [badgeState, setBadgeState] = React.useState([] as string[]);
  React.useEffect(() => {
    cachedData.current = []
    setUserData([])
    if (isLoggedIn) {
      login().then(() => {
        getData().then(res => {
          console.log(res);


          if (res) {
            setUserData(res)
            cachedData.current = res

          }
        })
          .catch(() => {
            setisLoggedIn(false)
          })
      })
    }

  }, [isLoggedIn]);
  React.useEffect(() => {


    return () => {

    }
  }, []);
  React.useEffect(() => {
    //filter logic toolbar
    setUserData(cachedData.current.filter((item) => {
      return (filter == FilterState.ALL || item.isLiscenced)
        && (
          item.displayName.toLowerCase().includes(inputValue.toLowerCase()) ||
          item.mail && item.mail.toLowerCase().includes(inputValue.toLowerCase())
        )
    }
    ))
  }, [filter, inputValue])
  return (
    <BadgeContext.Provider value={{ setValue: (val) => setBadgeState(val), value: badgeState }}>
      <div>
        <AppBar position="static" color='transparent' className='appbar'>
          <Toolbar variant="dense" style={{
            display: "flex",
            justifyContent: "center"
          }}>

            <SearchIcon />
            <Input
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={
                (e) => {
                  const target = e.target as HTMLInputElement;
                  setInputValue(target.value)
                }
              }
              value={inputValue}
            />

            <Button
              onClick={(e) => {
                e.preventDefault()
                if (isLoggedIn) {
                  getData().then(res => {
                    console.log(res);

                    if (res) {
                      setUserData(res)
                      cachedData.current = res
                    }
                  })
                }
              }}
            >
              Refresh
            </Button>


            <Button
              id="menu-button"
              aria-haspopup="true"
              onClick={(ev) => {
                setOpenMenu(true)
                setAnchorEl(ev.currentTarget);
              }}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Filter
            </Button>
            <Menu open={openMenu} anchorEl={anchorEl}
              onClose={(e) => {
                setAnchorEl(null)
                setOpenMenu(false)
              }}
            >
              <MenuItem key={0} onClick={(e) => {
                setAnchorEl(null)
                setOpenMenu(false)
                setFilter(FilterState.ALL)
              }}
              >
                All
              </MenuItem>
              <MenuItem key={1} onClick={(e) => {
                setAnchorEl(null)
                setOpenMenu(false)
                setFilter(FilterState.LICENCED)
              }}
              >
                Licenced
              </MenuItem>
            </Menu>
            {isLoggedIn ?
              <Button onClick={
                (e) => {
                  setisLoggedIn(false)
                }
              }>
                Sign-Out
              </Button> :
              <Button onClick={
                (e) => {
                  setisLoggedIn(true)
                }
              }>
                Sign-In
              </Button>
            }

          </Toolbar>

        </AppBar>
        <main>
          {
            userData.map(res => res.officeLocation).filter(onlyUnique).map((val, index) => <>
              <OfficeLocation title={val} key={index}>
                <section className="cards">
                  {
                    userData.filter(user => user.officeLocation == val).map(val =>
                      <UserScreen key={val.id}
                        id={val.id}
                        name={val.displayName}
                        srcImage={DefaultProfilePicture}
                        mail={val.mail} availability={val.availability}
                        businessPhones={val.businessPhones}
                        jobTitle={val.jobTitle}
                        preferredLanguage={val.preferredLanguage} />)
                  }
                </section>
              </OfficeLocation>
            </>)
          }

        </main>


      </div>
    </BadgeContext.Provider>
  );
}

export default App;