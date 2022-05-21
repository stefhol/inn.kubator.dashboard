import React from 'react';
import './App.css';
import { getData, getAccounts, Presence, User, login } from './authentication';
import { UserScreen } from './UserScreen';
import DefaultProfilePicture from "./img/blank-profile-picture.webp"
import { OfficeLocation } from './OfficeLocation';
import { SearchComp } from './SearchComp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Button, Input, Menu, MenuItem } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
function onlyUnique(value: any, index: number, self: any[]) {
  return self.indexOf(value) === index;
}

enum FilterState {
  ALL, LICENCED
}

function App() {

  const [userData, setUserData] = React.useState([] as Array<Presence & User>);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null as unknown as Element | null);
  const [filter, setFilter] = React.useState(FilterState.ALL);
  const [inputValue, setInputValue] = React.useState("");
  const cachedData = React.useRef([] as Array<Presence & User>);
  React.useEffect(() => {
    login().then(() => {
      getData().then(res => {
        console.log(res);

        if (res) {
          setUserData(res)
          cachedData.current = res
        }
      })
    })

    return () => {

    }
  }, []);
  React.useEffect(() => {
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
    <div>
      <header>
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
            getData().then(res => {
              console.log(res);

              if (res) {
                setUserData(res)
                cachedData.current = res
              }
            })
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
          <MenuItem onClick={(e) => {
            setAnchorEl(null)
            setOpenMenu(false)
            setFilter(FilterState.ALL)
          }}
          >
            All
          </MenuItem>
          <MenuItem onClick={(e) => {
            setAnchorEl(null)
            setOpenMenu(false)
            setFilter(FilterState.LICENCED)
          }}
          >
            Licenced
          </MenuItem>
        </Menu>
      </header>
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
