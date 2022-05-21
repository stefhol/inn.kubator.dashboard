import * as msal from "@azure/msal-browser";
import { Client } from "@microsoft/microsoft-graph-client";
import { PublicClientApplication, InteractionType, AccountInfo } from "@azure/msal-browser";

import { AuthCodeMSALBrowserAuthenticationProvider, AuthCodeMSALBrowserAuthenticationProviderOptions } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { CalenderEventValue } from "./CalenderEvent";
import { getUnixTime } from "date-fns";
export interface User {
    displayName: string
    id: string
    mail: string
    userPrincipalName: string
    preferredLanguage: string
    jobTitle: string
    businessPhones: string[]
    officeLocation: string | null
    isLiscenced: boolean
}
export interface Presence {
    activity: string
    availability: string
    id: string
}
interface ReturnValue<T> {
    value: T[]
}
const msalConfig = {
    auth: {
        clientId: '3666a5de-8a20-46d6-af21-71c2cb0627b2'
    }
};
export let graphClient: Client;
export const msalInstance = new msal.PublicClientApplication(msalConfig);

function initializeGraphClient(msalClient: msal.PublicClientApplication, account: msal.AccountInfo) {
    // Create an authentication provider
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(msalClient, {
        interactionType: msal.InteractionType.Popup,
        scopes: ["Mail.Send",
            "User.Read",
            "User.Read.All",
            "Presence.Read.All",
            "Calendars.Read",
        ],
        account: account
    });


    // Initialize the Graph client
    graphClient = Client.initWithMiddleware({
        authProvider
    });
}

export async function getAccounts() {

    // need to call getAccount here?
    const currentAccounts = msalInstance.getAllAccounts();
    console.log(currentAccounts);
}
export const login = async () => {
    // Use MSAL to login
    //@ts-ignore
    const authResult = await msalInstance.loginPopup({});
    console.log('id_token acquired at: ' + new Date().toString());

    msalInstance.setActiveAccount(authResult.account);
    console.log(authResult);

    // Initialize the Graph client
    initializeGraphClient(msalInstance, authResult.account as msal.AccountInfo);

}
export async function getData() {
    // Login
    try {

        // Get the user's profile from Graph
        getUser().then(res => {
            // Save the profile in session
            sessionStorage.setItem('graphUser', JSON.stringify(res));
            console.log("succes")
        }).catch(err => console.error(err));
        let allUsers = await getAllUser();
        if (allUsers != null) {
            let presence = await getPresnce(allUsers?.value.map(val => val.id))
            let licenseUser = await getLiscencedUsers();
            if (presence != null) {
                return allUsers.value.map(f => {
                    return {
                        ...f, ...presence?.value.find(pre => pre.id === f.id),
                        isLiscenced: licenseUser.value.find((li) => li.id == f.id) != null ? true : false
                    } as unknown as Presence & User
                })
            }

        }
    } catch (error) {
        console.log(error);
    }

}
async function getUser() {
    return graphClient
        .api('/me')
        // Only get the fields used by the app
        .select('id,displayName,mail,userPrincipalName')
        .get();
}
async function getAllUser() {
    return graphClient
        .api('/users')
        // Only get the fields used by the app
        .top(650)
        .get() as unknown as ReturnValue<User> | null;
}
async function getPresnce(ids: string[]) {
    const presence = {
        ids
    };
    return await graphClient.api('/communications/getPresencesByUserId')
        .post(presence) as unknown as ReturnValue<Presence> | null;
}
async function getLiscencedUsers() {

    return await graphClient.api('/groups/09fb4455-00b3-434b-91e5-fc9e8a854d66/members')
        .select('id,userPrincipalName,displayName')
        .get() as ReturnValue<Partial<User>>;
}
export const getListEvents = async (id: string) => {
    return await graphClient
        .api(`/users/${id}/events`)
        .get() as ReturnValue<CalenderEventValue>;
}
export const getIsInMeeting = async (id: string) => {
    return await graphClient
        .api(`/users/${id}/events`)
        .select('id,start,end')
        .get() as ReturnValue<CalenderEventValue>;
}

export const isInMeeting = (input: ReturnValue<CalenderEventValue>): boolean => {
    let isInMeeting = false;
    let rowArray = input.value;
    rowArray.forEach(row => {
        if (getUnixTime(new Date(row.start.dateTime)) < getUnixTime(new Date()) && getUnixTime(new Date()) < getUnixTime(new Date(row.end.dateTime))) {
            isInMeeting = true
        }
    })
    return isInMeeting



}